export const getCallee = (depth = 1) => {
  const stack = new Error().stack;
  if (!stack) return null;
  const lines = stack.split("\n");
  const line = lines[depth + 3];
  if (!line) return null;
  const match = line.match(/at (.+)$/);
  if (!match) return null;
  const parts = match[1].split(":");
  const file = parts.slice(0, -2).join(":");
  const [lineNo, colNo] = parts.slice(-2);
  return { file, line: parseInt(lineNo), column: parseInt(colNo) };
};
