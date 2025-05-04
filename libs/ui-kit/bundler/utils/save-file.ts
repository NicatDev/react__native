import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path/posix";

export const saveFile = async (file: string, content: string) => {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content, "utf-8");
};
