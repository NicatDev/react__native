import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text } from "react-native";

import { Block, Button } from "@mdreal/ui-kit";

import logo from "../assets/images/logo.png";

export default function Welcome() {
  const router = useRouter();

  return (
    <Block className="flex h-full items-center justify-between px-4 py-28">
      <Block className="flex items-center gap-6">
        <Block className="bg-primary w-68 rounded-2xl p-6">
          <Image source={logo} style={{ width: 150, height: 140 }} />
        </Block>

        <Block>
          <Text className="text-1.5xl text-center">
            <Text className="text-primary">DigiTask</Text>a xoş gəlmisiniz
          </Text>

          <Block>
            <Text className="text-center text-lg text-neutral-50">
              Tapşırıqlarınızı daha rahat icra edin, performansını qiymətləndirin
            </Text>
          </Block>
        </Block>
      </Block>

      <Button variant="primary" className="w-full p-4" onClick={() => router.push("/(auth)/sign-in")}>
        <Text className="text-center text-white">Daxil ol</Text>
      </Button>
    </Block>
  );
}
