import t from "@babel/types";

import { parseVariable } from "./get-variables-from-content";

export const parseNodeVariables = (
  id: string,
  node: t.StringLiteral,
  updateNode: (node: t.JSXExpressionContainer) => void
) => {
  try {
    const variable = parseVariable(node.value, id);
    updateNode(t.jsxExpressionContainer(t.identifier(variable.name)));
  } catch {
    let value = node.value;
    const matches = Array.from(value.matchAll(parseVariable.variableMatchRegex));
    if (matches.length) {
      const templateLiteralExpressions: t.Expression[] = [];
      const templateLiteralQuasis: t.TemplateElement[] = [];
      let lastIndex = 0;
      for (const match of matches) {
        const valueSlicedString = value.slice(lastIndex, match.index);
        templateLiteralQuasis.push(t.templateElement({ raw: valueSlicedString, cooked: valueSlicedString }));

        const variable = parseVariable(match[0]!.trim(), id);
        templateLiteralExpressions.push(t.identifier(variable.name));
        lastIndex = match.index! + match[0]!.length;
      }
      const valueSlicedString = value.slice(lastIndex);
      templateLiteralQuasis.push(t.templateElement({ raw: valueSlicedString, cooked: valueSlicedString }));
      updateNode(t.jsxExpressionContainer(t.templateLiteral(templateLiteralQuasis, templateLiteralExpressions)));
    }
  }
};
