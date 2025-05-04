import { Variable } from "../types/variable";

export const parseVariable = (variable: string, file: string): Variable => {
  if (!variable.match(parseVariable.variableMatchRegex)) {
    throw new Error(`Invalid variable: "${variable}"`);
  }

  const content = variable.slice(2, -2).trim();
  const isRaw = content.startsWith("$");
  const [name, ...params] = content.split("|").map(s => s.trim()) as [string, string];
  if (!name) throw new Error(`Invalid variable name: ${content}`);
  const {
    type,
    default: defaultValue,
    ...paramsObject
  } = params.reduce(
    (acc, param) => {
      if (!param.match(parseVariable.paramMatchRegex)) {
        throw new Error(`Invalid variable param: ${param} at ${file}`);
      }
      const [_, key, value = ""] = param.match(parseVariable.paramMatchRegex)! as [string, string, string];
      return { ...acc, [key]: value };
    },
    { type: "string" } as Record<string, string> & { type: string }
  );

  return { name: isRaw ? name.slice(1) : name, rawName: name, defaultValue, type, params: paramsObject };
};
parseVariable.variableMatchRegex = /\{\{(.*?)}}/g;
parseVariable.paramMatchRegex = /(\w+)\((.*)\)/;

export const getVariablesFromContent = (file: string, content: string) => {
  const variables: Record<string, Variable> = {};

  const matches = content.matchAll(parseVariable.variableMatchRegex);
  const matchesArray = Array.from(matches);
  matchesArray.forEach(match => {
    const variable = parseVariable(match[0]!.trim(), file);
    if (variables[variable.name]) {
      if (variables[variable.name]!.type !== variable.type) {
        throw new Error(`Variable type mismatch: ${variable.name} at (${file})`);
      }

      if (variable.defaultValue && variables[variable.name]!.defaultValue !== variable.defaultValue) {
        throw new Error(`Variable default value mismatch: ${variable.name} at (${file})`);
      }

      Object.entries(variable.params).forEach(([key, value]) => {
        if (variables[variable.name]!.params[key] !== value) {
          throw new Error(`Variable param mismatch: ${variable.name} at (${file})`);
        }
      });
    } else {
      variables[variable.name] = variable;
    }
  });

  return variables;
};
