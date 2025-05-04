import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

import { useAsyncStorageDevTools } from "@dev-plugins/async-storage";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { StorageKeys, queryClient } from "@digitask/shared-lib";
import { AuthHttp } from "@mdreal/ui-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { focusManager, onlineManager } from "@tanstack/react-query";

import { env } from "../env-schema";

onlineManager.setEventListener(setOnline => NetInfo.addEventListener(state => setOnline(!!state.isConnected)));

const authHttpSettings = AuthHttp.settings();

authHttpSettings
  .setBaseUrl(env.EXPO_PUBLIC_API_URL)
  .setStorage(AsyncStorage)
  .setStorageTokenKeys({ access: StorageKeys.ACCESS_TOKEN, refresh: StorageKeys.REFRESH_TOKEN })
  .setRefreshUrl("/accounts/token/refresh/")
  .waitForToken({ timeout: 1e5 })
  .then(authHttpSettings.retrieveTokens());

export const useHelper = () => {
  if (__DEV__) {
    useReactQueryDevTools(queryClient);
    useAsyncStorageDevTools();
  }

  useEffect(() => {
    const onAppStateChange = (status: AppStateStatus) => {
      try {
        focusManager.setFocused(status === "active");
      } catch {}
    };
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);
};
