import { withLayoutContext } from "expo-router";
import { merge } from "lodash";
import { ComponentProps, FC } from "react";

import type {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions
} from "@react-navigation/material-top-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import type { ParamListBase, TabNavigationState } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();

const NavbarNavigator: FC<ComponentProps<typeof Navigator>> = ({ children, ...props }) => {
  return (
    <Navigator
      {...props}
      screenOptions={merge({ tabBarContentContainerStyle: { justifyContent: "space-evenly" } }, props.screenOptions)}
    >
      {children}
    </Navigator>
  );
};

export const NavbarTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(NavbarNavigator);
