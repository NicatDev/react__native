import { dirname, extname, relative } from "node:path/posix";

export const relativeImport = (from: string) => {
  return (to: string) => {
    const relativePath = relative(dirname(from), to.replace(extname(to), ""));
    return relativePath.startsWith(".") ? relativePath : `./${relativePath}`;
  };
};
