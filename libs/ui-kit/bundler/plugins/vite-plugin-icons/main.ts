import { normalize, resolve } from "node:path/posix";
import { parse } from "node:path/win32";

import * as walk from "babel-walk";
import { Plugin } from "vite";

import { CodeGenerator, GeneratorOptions } from "@babel/generator";
import { parse as babelParse } from "@babel/parser";
import t from "@babel/types";
import { transform } from "@svgr/core";

import { IconDataMap } from "./types/icon-data-map";
import { Variable } from "./types/variable";
import { createImport, createObject, createType, createValue } from "./utils/create";
import { dashToCamelCase } from "./utils/dash-to-camel-case";
import { generateDataFromIcon } from "./utils/generate-data-from-icon";
import { GenerateIconsOptions, generateIcons } from "./utils/generate-icons";
import { parseNodeVariables } from "./utils/parse-node-variables";

const generate = (node: t.Node, options?: GeneratorOptions, code?: string) => {
  const generator = new CodeGenerator(node, options, code);
  return generator.generate();
};

export const iconsPlugin = async ({
  iconsDir = resolve("src/assets/icons"),
  internalTypesOutputFile = resolve("src/generated/types/icon.ts"),
  iconsOutputFile = resolve("src/generated/utils/icon.ts"),
  iconsNativeOutputFile = resolve("src/generated/utils/icon.native.ts"),
  iconsTypesOutputFile = resolve("src/generated/types/icons.ts")
}: GenerateIconsOptions = {}): Promise<Plugin> => {
  const iconsPromise = generateIcons({
    iconsDir,
    internalTypesOutputFile,
    iconsOutputFile,
    iconsNativeOutputFile,
    iconsTypesOutputFile
  });
  let icons: Awaited<typeof iconsPromise>;

  const windowsDriveLetter = parse(process.cwd()).root.replace(/\\/g, "/");
  const normalizedIconsDir = normalize(iconsDir).replace(windowsDriveLetter, "/");

  return {
    name: "oneiro:core-plugins:icons",
    enforce: "pre",

    async configResolved() {
      icons = await iconsPromise;
    },

    resolveId: {
      order: "pre",
      async handler(id, parent, meta) {
        if (id.endsWith(".svg")) {
          const resolvedId = await this.resolve(id, parent, meta);
          if (!resolvedId) return;
          return `${resolvedId.id}.tsx`;
        }

        if (id.endsWith(".svg?native")) {
          const resolvedId = await this.resolve(id.replace("?native", ""), parent, meta);
          if (!resolvedId) return;
          return `${resolvedId.id}.tsx?native`;
        }
      }
    },

    async load(id) {
      const isNative = id.endsWith("?native");
      const pureId = isNative ? id.replace("?native", "") : id;
      if (!pureId.endsWith(".svg.tsx")) return;

      const normalizedId = normalize(pureId).replace(windowsDriveLetter, "/").replace(".tsx", "");

      const iconDataMap: IconDataMap = {};
      generateDataFromIcon(normalizedIconsDir, iconDataMap, normalizedId, "", false);

      const icon = icons.find(
        icon =>
          icon.path === normalizedId ||
          Array.from(icon.stateList).some(state => icon.states[state]!.path === normalizedId)
      )!;
      if (!icon) {
        this.error(`Icon not found: ${id}`);
      }
      const dataMap = iconDataMap[icon.icon]!;

      let fileContent = icon.content,
        componentName = dashToCamelCase(icon.icon);
      if (!!dataMap.stateList.size) {
        const firstState = Array.from(dataMap.stateList)[0]!;
        fileContent = icon.states[firstState]!.content;
        componentName = dashToCamelCase(`${icon.icon}-${firstState}`);
      }

      return transform(
        fileContent,
        {
          plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
          native: isNative,
          expandProps: false,
          typescript: true,
          jsxRuntime: "automatic"
        },
        { componentName: componentName.slice(0, 1).toUpperCase() + componentName.slice(1) }
      );
    },

    async transform(code, id) {
      const isNative = id.endsWith("?native");
      const pureId = isNative ? id.replace("?native", "") : id;
      if (!pureId.endsWith(".svg.tsx")) return;

      const normalizedId = normalize(pureId).replace(windowsDriveLetter, "/").replace(".tsx", "");
      const iconDataMap: IconDataMap = {};
      generateDataFromIcon(normalizedIconsDir, iconDataMap, normalizedId, "", false);

      const icon = icons.find(
        icon =>
          icon.path === normalizedId ||
          Array.from(icon.stateList).some(state => icon.states[state]!.path === normalizedId)
      )!;
      if (!icon) {
        throw new Error(`Icon not found: ${id}`);
      }
      const dataMap = iconDataMap[icon.icon]!;

      const variables: Record<string, Variable> = {};
      if (!!dataMap.stateList.size) {
        const firstState = Array.from(dataMap.stateList)[0]!;
        Object.assign(variables, icon.states[firstState]!.variables);
      } else {
        Object.assign(variables, icon.variables);
      }
      const vars = Object.keys(variables);

      if (vars.length) {
        const variablePropertiesPattern = t.objectPattern(
          vars.map(variable => {
            const v = variables[variable];
            return createObject.property(
              variable,
              v?.defaultValue !== undefined
                ? t.assignmentPattern(t.identifier(variable), createValue(v.defaultValue, v.type))
                : t.identifier(variable)
            );
          })
        );

        const variableProperties = t.tSTypeLiteral(
          vars.map(v => t.tsPropertySignature(t.identifier(v), t.tsTypeAnnotation(createType(variables[v]!.type))))
        );

        const parsedCode = babelParse(code, { sourceType: "module", plugins: ["jsx", "typescript"] });
        parsedCode.program.body.unshift(createImport("react", ["FC"]));
        const visitors = walk.ancestor({
          VariableDeclarator(node) {
            if (t.isIdentifier(node.id)) {
              node.id.typeAnnotation = t.tsTypeAnnotation(
                t.tsTypeReference(t.identifier("FC"), t.tsTypeParameterInstantiation([variableProperties]))
              );
            }
          },
          ArrowFunctionExpression(node, _) {
            node.params.push(variablePropertiesPattern);
          },
          JSXAttribute(node) {
            if (t.isStringLiteral(node.value)) {
              parseNodeVariables(id, node.value, innerNode => (node.value = innerNode));
            }
          },
          JSXExpressionContainer(node) {
            if (t.isStringLiteral(node.expression)) {
              parseNodeVariables(id, node.expression, innerNode => Object.assign(node, innerNode));
            }
          }
        });
        visitors(parsedCode);
        return generate(parsedCode, { sourceMaps: true });
      }
    }
  };
};
