import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useEffect, useMemo } from "react";
import { useRecoilValue } from "recoil";

import { fields, profileAtom, signInAtom } from "@digitask/shared-lib";
import { logger } from "@mdreal/ui-kit";
import { getOrCreateWsProvider, useWebsocket } from "@mdreal/ws-client";

import { useWsHostUrl } from "./use-ws-host-url";

export interface BackgroundLocationEvent {
  locations: Location.LocationObject[];
}

const sendLocationToWebSocket = (latitude: number, longitude: number) => {
  const ws = getOrCreateWsProvider(fields.location);
  if (ws?.client) {
    ws.client.send({ location: { latitude, longitude } });
  } else {
    logger.warn("WebSocket not initialized, cannot send location");
  }
};

TaskManager.defineTask<BackgroundLocationEvent>(fields.location, async ({ data, error }) => {
  if (error) {
    logger.error("Location tracking error:", error);
    return;
  }

  if (data) {
    const { locations } = data;
    if (locations.length > 0 && locations[0]) {
      const { latitude, longitude } = locations[0].coords;
      logger.debug("location:bacground:update:", { latitude, longitude });

      sendLocationToWebSocket(latitude, longitude);
    }
  }
});

const startLocationTracking = async (): Promise<void> => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus !== "granted") {
    logger.warn("location:foreground:permission denied");
    return;
  }

  const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
  if (backgroundStatus !== "granted") {
    logger.warn("location:background:permission denied");
    return;
  }

  await Location.startLocationUpdatesAsync(fields.location, {
    accuracy: Location.Accuracy.High,
    timeInterval: 5e3,
    distanceInterval: 0,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: "Digitask",
      notificationBody: "Tracking your location in the background"
    }
  });

  logger.debug("Background location tracking started");
};

const stopLocationTracking = async (): Promise<void> => {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(fields.location);
  if (isRegistered) {
    await Location.stopLocationUpdatesAsync(fields.location);
    logger.debug("Background location tracking stopped");
  }
};

export const useLocationInit = () => {
  const wsHostUrl = useWsHostUrl();
  const profileData = useRecoilValue(profileAtom);
  const signInData = useRecoilValue(signInAtom);

  const wsUrl = useMemo(() => {
    const wsUrl = new URL(`${wsHostUrl}/ws/`);
    wsUrl.searchParams.append("email", profileData?.email || "");
    wsUrl.searchParams.append("token", signInData?.access_token || "");
    return wsUrl.toString();
  }, [wsHostUrl, profileData, signInData]);

  useWebsocket(fields.location, wsUrl, {
    onConnect: startLocationTracking,
    onDisconnect: stopLocationTracking
  });

  useEffect(() => {
    return () => {
      stopLocationTracking();
    };
  }, []);
};
