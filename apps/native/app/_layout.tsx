import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

import { Providers } from "@digitask/shared-lib";

import { useHelper } from "../hooks/use-helper";

import "./main.css";

export default function RootLayout() {
  useHelper();

  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />

        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(dashboard)" />
      </Stack>

      <Toast />
    </Providers>
  );
}
