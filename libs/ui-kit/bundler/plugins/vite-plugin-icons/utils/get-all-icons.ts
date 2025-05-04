import { statSync } from "node:fs";
import { readdir } from "node:fs/promises";

export const getAllIcons = async (dir: string) => {
  const icons = await readdir(dir);
  const foundIcons: string[] = [];
  for (const icon of icons) {
    const stats = statSync(`${dir}/${icon}`);
    if (stats.isDirectory()) {
      foundIcons.push(...(await getAllIcons(`${dir}/${icon}`)));
    } else {
      foundIcons.push(`${dir}/${icon}`);
    }
  }
  return foundIcons;
};
