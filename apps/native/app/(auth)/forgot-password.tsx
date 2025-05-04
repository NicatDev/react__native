import { Text } from "react-native";

import { Block, Input } from "@mdreal/ui-kit";

export default function ForgotPassword() {
  return (
    <Block.Scroll className="h-screen px-4 py-28" contentClassName="grid items-center justify-center">
      <Text className="text-center">Mail adresinizi daxil edin.</Text>
      <Input label="Mail adresiniz" icon={{ left: "email" }} />
    </Block.Scroll>
  );
}
