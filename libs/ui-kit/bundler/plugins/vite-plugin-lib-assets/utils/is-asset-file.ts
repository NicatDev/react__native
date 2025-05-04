import { extname } from "node:path";

export const isAssetFile = (filename: string) => {
  const ext = extname(filename);
  return [".png", ".jpg", ".jpeg", ".gif", ".webp", ".ico"].includes(ext);
};
