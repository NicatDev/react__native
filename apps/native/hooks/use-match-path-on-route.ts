import { usePathname } from "expo-router";
import { type DependencyList, useEffect } from "react";
import { BackHandler } from "react-native";

export const useMatchPathOnRoute = (matchingPath: RegExp, handler: () => boolean | undefined, deps: DependencyList) => {
  const pathname = usePathname();

  useEffect(() => {
    const handleBackPress = () => {
      if (matchingPath.test(pathname)) {
        return handler();
      }
    };

    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, [...deps, pathname]);
};
