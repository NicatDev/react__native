import { router } from "expo-router";

import { StorageKeys } from "@digitask/shared-lib";
import { AuthHttp } from "@mdreal/ui-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthService {
  static async logout() {
    await AuthHttp.settings().removeTokens();
    await AsyncStorage.removeItem(StorageKeys.ACCESS_TOKEN);
    await AsyncStorage.removeItem(StorageKeys.REFRESH_TOKEN);
    await AsyncStorage.removeItem(StorageKeys.USER_EMAIL);
    await AsyncStorage.removeItem(StorageKeys.PHONE_NUMBER);
    router.navigate("/login");
  }
}
