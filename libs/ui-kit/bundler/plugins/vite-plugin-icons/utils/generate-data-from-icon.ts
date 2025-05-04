import { IconDataMap } from "../types/icon-data-map";
import { getVariablesFromContent } from "./get-variables-from-content";

export const generateDataFromIcon = (
  iconsDir: string,
  iconDataMap: IconDataMap,
  file: string,
  content?: string,
  strict = true
) => {
  const name = file.replace(`${iconsDir}/`, "").split("/").join("__").replace(".svg", "");
  let baseName = name;
  let activeState: string | undefined;

  if (name.includes("@")) {
    const [iconName, ...states] = name.split("@") as [string, ...string[]];
    baseName = iconName;
    activeState = states.join("-");
  }

  if (!activeState) {
    iconDataMap[baseName] ||= { path: file, content: content || "", variables: {}, states: {}, stateList: new Set() };
  }

  if (!iconDataMap[baseName] && strict) {
    throw new Error(`Icon state cannot be defined without the base: ${file.replace(`@${activeState}`, "")}`);
  }

  if (activeState) {
    if (!strict) {
      iconDataMap[baseName] ||= { path: file, content: content || "", variables: {}, states: {}, stateList: new Set() };
    }

    iconDataMap[baseName]!.states[activeState] = { path: file, content: content || "", variables: {} };
    iconDataMap[baseName]!.stateList.add(activeState);
  }

  if (content) {
    const variables = getVariablesFromContent(file, content);
    if (activeState) {
      iconDataMap[baseName]!.states[activeState]!.variables = variables;
    } else {
      iconDataMap[baseName]!.variables = variables;
    }
  }
};
