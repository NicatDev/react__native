import { router } from "expo-router";
import { FC, PropsWithChildren } from "react";
import { Pressable, Text } from "react-native";

import { Block, Icon, cn } from "@mdreal/ui-kit";

import { BlockSectionProps } from "./block-section.types";

export const BlockSection: FC<PropsWithChildren<BlockSectionProps>> = ({
  title,
  onClick,
  href,
  className,
  children
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }

    if (href) {
      router.push(href);
    }
  };

  return (
    <Block className={cn("flex gap-6", className)}>
      <Pressable onPress={handleClick}>
        <Block className="flex flex-row items-center justify-between">
          <Text className="text-xl">{title}</Text>
          <Icon name="arrow-right" variables={{ fill: "black" }} />
        </Block>
      </Pressable>

      <Block>{children}</Block>
    </Block>
  );
};
