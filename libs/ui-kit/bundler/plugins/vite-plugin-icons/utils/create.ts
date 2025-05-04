import t from "@babel/types";

export const createImport = (file: string, imports: string[]) =>
  t.importDeclaration(
    imports.map(importName => t.importSpecifier(t.identifier(importName), t.identifier(importName))),
    t.stringLiteral(file)
  );

export const createDefaultImport = (file: string, importName: string) =>
  t.importDeclaration([t.importDefaultSpecifier(t.identifier(importName))], t.stringLiteral(file));

export const createExport = (declaration: t.Declaration) => t.exportNamedDeclaration(declaration, [], null);

export const createFileExport = (source: string) => t.exportAllDeclaration(t.stringLiteral(source));

export const createString = (value: string) => t.stringLiteral(value);

export const createObject = (name: string, properties: t.ObjectProperty[]) =>
  t.objectProperty(createString(name), t.objectExpression(properties));

createObject.pattern = (properties: t.ObjectProperty[]) => t.objectPattern(properties);
createObject.property = (name: string, value: t.Expression | t.PatternLike) =>
  t.objectProperty(createString(name), value, false, true);
createObject.satisfies = (properties: t.ObjectProperty[], type: string) =>
  t.tsSatisfiesExpression(t.objectExpression(properties), t.tsTypeReference(t.identifier(type)));
createObject.as = (properties: t.ObjectProperty[], type: string) =>
  t.tsAsExpression(t.objectExpression(properties), t.tsTypeReference(t.identifier(type)));

export const createVariable = (
  type: "var" | "let" | "const" | "using" | "await using",
  name: string,
  value: t.Expression,
  varType?: t.TSTypeAnnotation
) => {
  const variable = t.variableDeclarator(t.identifier(name), value);
  if (t.isIdentifier(variable.id) && varType) {
    variable.id.typeAnnotation = varType;
  }
  return t.variableDeclaration(type, [variable]);
};

createVariable.const = (name: string, value: t.Expression, varType?: t.TSTypeAnnotation) =>
  createVariable("const", name, value, varType);
createVariable.let = (name: string, value: t.Expression, varType?: t.TSTypeAnnotation) =>
  createVariable("let", name, value, varType);
createVariable.var = (name: string, value: t.Expression, varType?: t.TSTypeAnnotation) =>
  createVariable("var", name, value, varType);
createVariable.using = (name: string, value: t.Expression, varType?: t.TSTypeAnnotation) =>
  createVariable("using", name, value, varType);
createVariable.awaitUsing = (name: string, value: t.Expression, varType?: t.TSTypeAnnotation) =>
  createVariable("await using", name, value, varType);

export const createCallExpression = (callee: string, args: t.Expression[], typeArgs: t.TSType[] = []) => {
  const callExpression = t.callExpression(t.identifier(callee), args);
  if (typeArgs.length) {
    callExpression.typeParameters = t.tsTypeParameterInstantiation(typeArgs);
  }
  return callExpression;
};

export const createInterface = (name: string, properties: t.TSPropertySignature[]) =>
  t.tsInterfaceDeclaration(t.identifier(name), null, [], t.tsInterfaceBody(properties));

createInterface.property = (name: string, type: t.TSType) =>
  t.tsPropertySignature(createString(name), t.tsTypeAnnotation(type));

export const createType = (type: string) => {
  switch (type) {
    case "string":
      return t.tsStringKeyword();
    case "boolean":
      return t.tsBooleanKeyword();
    case "number":
      return t.tsNumberKeyword();
    default:
      return t.tsAnyKeyword();
  }
};

export const createValue = (value: string, type: string) => {
  switch (type) {
    case "boolean":
      return t.booleanLiteral(value === "true");
    case "number":
      return t.numericLiteral(Number(value));
    case "string":
    default:
      return t.stringLiteral(value);
  }
};
