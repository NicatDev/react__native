import { CodeGenerator } from "@babel/generator";
import t from "@babel/types";

export const generate = (ast: t.Program) => {
  const codeGenerator = new CodeGenerator(ast);
  return codeGenerator.generate();
};
