import { requestForegroundPermissionsAsync } from "expo-location";

const requestPermission = async (resolve: () => void) => {
  const { status } = await requestForegroundPermissionsAsync();
  if (status === "granted") {
    resolve();
  } else {
    setTimeout(() => requestPermission(resolve), 60 * 1e3);
  }
};

export const requestLocationPermission = async () => {
  const { promise, resolve } = Promise.withResolvers<void>();
  await requestPermission(resolve);
  return promise;
};
