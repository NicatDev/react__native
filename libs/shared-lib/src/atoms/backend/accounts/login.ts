import { Platform } from "react-native";
import { atom } from "recoil";

import type { AsyncStorageStatic } from "@react-native-async-storage/async-storage";

import { StorageKeys } from "../../../types";
import { AuthToken } from "../../../types/backend";
import { fields } from "../../../utils";

const storagePromise = Platform.select<Promise<Storage | AsyncStorageStatic>>({
  web: Promise.resolve(window.localStorage),
  native: import("@react-native-async-storage/async-storage").then(m => m.default)
});

export const signInAtom = atom<AuthToken | null>({
  key: fields.user.signIn.toString(),
  default: (async () => {
    const storage = await storagePromise;
    if (!storage) {
      throw new Error("Application is running in an unsupported environment");
    }
    const token = await storage.getItem(StorageKeys.ACCESS_TOKEN);
    const refresh = await storage.getItem(StorageKeys.REFRESH_TOKEN);
    if (!token || !refresh) return null;
    const email = await storage.getItem(StorageKeys.USER_EMAIL);
    const phone = await storage.getItem(StorageKeys.PHONE_NUMBER);

    return {
      access_token: token,
      refresh_token: refresh,
      email: email || "",
      user_type: "",
      is_admin: false,
      phone: phone || ""
    };
  })()
});
