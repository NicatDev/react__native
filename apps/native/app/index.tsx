import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

import { api, fields, profileAtom, useRecoilQuery } from "@digitask/shared-lib";
import { Block, cn } from "@mdreal/ui-kit";

import logo from "../assets/images/logo.png";

export default function Index() {
  const router = useRouter();

  const { isSuccess, isError } = useRecoilQuery(profileAtom, {
    queryKey: [fields.user.profile],
    queryFn: () => api.accounts.profile.$get,
    retry: false,
    isNullable: true
  });

  useEffect(() => {
    if (isSuccess) {
      setTimeout(router.replace, 0, "/(dashboard)");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setTimeout(router.replace, 0, "/welcome");
    }
  }, [isError]);

  return (
    <View className={cn("flex items-center pt-60", "bg-primary h-full w-full")}>
      <Block className="flex items-center gap-8">
        <Image source={logo} style={{ width: 180, height: 169 }} />
        <Text className="text-4xl text-white">Digi Task</Text>
      </Block>
    </View>
  );
}
