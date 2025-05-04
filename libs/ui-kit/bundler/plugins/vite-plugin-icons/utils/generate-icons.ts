import { readFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path/posix";

import t from "@babel/types";

import { formatFile } from "../../../utils/format-file";
import { pascalCase } from "../../../utils/pascal-case";
import { relativeImport } from "../../../utils/relative-import";
import { saveFile } from "../../../utils/save-file";
import { IconData, IconDataMap } from "../types/icon-data-map";
import {
  createCallExpression,
  createDefaultImport,
  createExport,
  createFileExport,
  createImport,
  createInterface,
  createObject,
  createString,
  createVariable
} from "./create";
import { dashToCamelCase } from "./dash-to-camel-case";
import { generate } from "./generate";
import { generateDataFromIcon } from "./generate-data-from-icon";
import { getAllIcons } from "./get-all-icons";

export interface GenerateIconsOptions {
  iconsDir?: string;
  internalTypesOutputFile?: string;
  iconsOutputFile?: string;
  iconsNativeOutputFile?: string;
  iconsTypesOutputFile?: string;
}

const typesCode = await readFile(resolve("bundler/plugins/vite-plugin-icons/utils/types-code.ts"), "utf-8");

const formatCode = async (code: string) => {
  return formatFile(code, "typescript");
};

export const generateIcons = async ({
  iconsDir,
  internalTypesOutputFile,
  iconsOutputFile,
  iconsNativeOutputFile,
  iconsTypesOutputFile
}: Required<GenerateIconsOptions>) => {
  const files = {
    icons: iconsOutputFile,
    native: iconsNativeOutputFile,
    internalTypes: internalTypesOutputFile,
    iconTypes: iconsTypesOutputFile
  };

  const relativeFileImports = {
    icons: relativeImport(iconsOutputFile),
    native: relativeImport(iconsNativeOutputFile),
    internalTypes: relativeImport(internalTypesOutputFile),
    iconTypes: relativeImport(iconsTypesOutputFile)
  };

  const icons = await getAllIcons(iconsDir);
  const iconPromises = icons.map(async icon => ({ icon, content: await readFile(icon, "utf-8") }));
  const iconInfo = await Promise.all(iconPromises);

  const iconData = iconInfo.reduce((acc, { icon, content }) => {
    generateDataFromIcon(iconsDir, acc, icon, content);
    return acc;
  }, {} as IconDataMap);

  const iconDataArray = Object.entries(iconData).reduce(
    (acc, [icon, data]) => [...acc, { icon, ...data }],
    [] as (IconData & {
      icon: string;
    })[]
  );

  const ast = {
    icons: [] as t.Statement[],
    native: [] as t.Statement[],
    iconTypes: [] as t.Statement[]
  };

  ast.icons.push(createImport(relativeFileImports.icons(files.internalTypes), ["statefulIcon"]));
  ast.native.push(createImport(relativeFileImports.native(files.internalTypes), ["statefulIcon"]));
  ast.iconTypes.push(
    createImport(relativeFileImports.iconTypes(files.internalTypes), ["IconBaseState", "IconType", "StatefulIcon"])
  );

  iconDataArray.forEach(({ icon, path, states, stateList }) => {
    const file = relative(dirname(iconsOutputFile), path);
    const name = dashToCamelCase(icon);
    ast.icons.push(createDefaultImport(file, name));
    ast.native.push(createDefaultImport(`${file}?native`, name));

    if (stateList.size) {
      stateList.forEach(state => {
        const { path } = states[state]!;
        const file = relative(dirname(iconsOutputFile), path);
        const name = dashToCamelCase(`${icon}-${state}`);
        ast.icons.push(createDefaultImport(file, name));
        ast.native.push(createDefaultImport(`${file}?native`, name));
      });
    }
  });

  const iconNsIcon = t.tsTypeReference(t.identifier("IconType"));
  const importedTypesFromIcons = new Set(["Icons"]);

  const tsProperties: t.TSPropertySignature[] = [];
  const iconDeclarations: t.ObjectProperty[] = [];

  iconDataArray.forEach(({ icon, stateList, states, variables }) => {
    if (stateList.size || variables.length) {
      const stateTypeList: t.TSPropertySignature[] = [];
      const stateObjectProperties: t.ObjectProperty[] = [];

      stateList.forEach(state => {
        const stateVariables = states[state]!.variables;
        const varArray = Object.entries(stateVariables);
        const tupleType = varArray.length
          ? t.tsTupleType(varArray.map(([name]) => t.tsLiteralType(createString(name))))
          : {
              ...t.tsTypeOperator(t.tSArrayType(t.tsStringKeyword())),
              operator: "readonly"
            };

        stateTypeList.push(
          createInterface.property(
            state,
            t.tsTypeReference(t.identifier("IconBaseState"), t.tsTypeParameterInstantiation([tupleType]))
          )
        );

        stateObjectProperties.push(
          createObject(dashToCamelCase(state), [
            createObject.property("icon", t.identifier(dashToCamelCase(`${icon}-${state}`))),
            createObject.property("variables", t.arrayExpression(varArray.map(([name]) => createString(name))))
          ])
        );
      });

      const stateInterfaceName = pascalCase(`${dashToCamelCase(icon)}States`);
      ast.iconTypes.push(createExport(createInterface(stateInterfaceName, stateTypeList)));
      importedTypesFromIcons.add(stateInterfaceName);

      const varArray = Object.entries(variables);
      const tupleType = varArray.length
        ? t.tsTupleType(varArray.map(([name]) => t.tsLiteralType(createString(name))))
        : {
            ...t.tsTypeOperator(t.tsArrayType(t.tsStringKeyword())),
            operator: "readonly"
          };

      tsProperties.push(
        createInterface.property(
          icon,
          t.tsTypeReference(
            t.identifier("StatefulIcon"),
            t.tsTypeParameterInstantiation([t.tsTypeReference(t.identifier(stateInterfaceName)), tupleType])
          )
        )
      );

      iconDeclarations.push(
        createObject.property(
          icon,
          createCallExpression(
            "statefulIcon",
            [
              t.identifier(dashToCamelCase(icon)),
              t.objectExpression(stateObjectProperties),
              t.arrayExpression(varArray.map(([name]) => createString(name)))
            ],
            [t.tsTypeReference(t.identifier(stateInterfaceName)), tupleType]
          )
        )
      );
    } else {
      tsProperties.push(createInterface.property(icon, iconNsIcon));
      iconDeclarations.push(createObject.property(icon, t.identifier(dashToCamelCase(icon))));
    }
  });

  ast.icons.push(createImport(relativeFileImports.icons(files.iconTypes), Array.from(importedTypesFromIcons)));
  ast.native.push(createImport(relativeFileImports.native(files.iconTypes), Array.from(importedTypesFromIcons)));

  const iconsName = "icons";
  const exportedIcons = createExport(
    createVariable.const(
      iconsName,
      createObject.satisfies(iconDeclarations, "Icons"),
      t.tsTypeAnnotation(t.tsTypeReference(t.identifier("Icons")))
    )
  );
  ast.icons.push(exportedIcons);
  ast.native.push(exportedIcons);

  const interfaceName = pascalCase(iconsName);
  const iface = createInterface(interfaceName, tsProperties);
  ast.iconTypes.push(createExport(iface));

  ast.icons.push(createFileExport(relativeFileImports.icons(files.iconTypes)));
  ast.native.push(createFileExport(relativeFileImports.native(files.iconTypes)));

  ast.iconTypes.push(createFileExport(relativeFileImports.iconTypes(files.internalTypes)));

  const programs = {
    icons: t.program(ast.icons),
    native: t.program(ast.native),
    iconTypes: t.program(ast.iconTypes)
  };

  const generatedCodes = {
    icons: generate(programs.icons),
    native: generate(programs.native),
    iconTypes: generate(programs.iconTypes),
    internalTypes: typesCode.replace(
      "@internal/types/icons.generated",
      relativeFileImports.internalTypes(files.iconTypes)
    )
  };

  const promises = [
    formatCode(generatedCodes.icons.code).then(code => saveFile(files.icons, code)),
    formatCode(`// @ts-nocheck\n` + generatedCodes.native.code).then(code => saveFile(files.native, code)),
    formatCode(generatedCodes.iconTypes.code).then(code => saveFile(files.iconTypes, code)),
    formatCode(generatedCodes.internalTypes).then(code => saveFile(files.internalTypes, code))
  ];

  const results = await Promise.allSettled(promises);
  const failed = results.filter((result): result is PromiseRejectedResult => result.status === "rejected");

  if (failed.length) {
    console.log(results);
    process.exit(1);
  }

  return iconDataArray;
};
