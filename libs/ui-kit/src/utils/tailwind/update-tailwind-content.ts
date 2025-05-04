import { Config } from "tailwindcss";
import { FilePath, RawFile } from "tailwindcss/types/config";

const updateFileContentFn = (updateFn: (file: string) => string) => {
  return (file: RawFile | FilePath) => {
    if (typeof file === "string") {
      return updateFn(file);
    }

    return {
      ...file,
      content: updateFn(file.raw)
    };
  };
};

export const updateTailwindContent = (
  content: Config["content"],
  updateFn: (file: string) => string
): Config["content"] => {
  if (Array.isArray(content)) {
    return content.map(updateFileContentFn(updateFn));
  }

  if (typeof content === "object") {
    return {
      ...content,
      files: content.files.map(updateFileContentFn(updateFn))
    };
  }

  return content;
};
