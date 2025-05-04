import _ from "lodash";
import twColors from "tailwindcss/colors";

import { useCache } from "@/hooks/use-cache";

import { useTailwindConfig } from "../../../hooks/use-tailwind-config";

export const useConvertClassnameToHex = () => {
  const tailwindConfig = useTailwindConfig();
  const cache = useCache("cache:useConvertClassnameToHex");

  const allColors = tailwindConfig.theme?.colors || _.merge(twColors, tailwindConfig.theme?.extend?.colors);

  return (clr: string) => {
    const pureColorName = clr.replace(/^text-/, "").replace(/^bg-/, "");
    if (cache.has(pureColorName)) {
      return cache.get(pureColorName);
    }
    const [pureColor, opacity] = pureColorName.split("/") as [string, string];
    const [color, variant] = pureColor.split("-") as [keyof typeof allColors, string];
    const opacityNumber = +opacity / 100;
    const [opacityString] = (opacity ? Math.round(opacityNumber * 255).toString(16) : "FF").split(".");
    const hex = (variant ? allColors[color][variant] : allColors[color]) + opacityString;
    if (!hex) return null;
    cache.set(pureColorName, hex);
    return hex;
  };
};
