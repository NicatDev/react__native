import { ForwardRefRenderFunction, PropsWithChildren, forwardRef, useState } from "react";
import { Dimensions, Pressable, Modal as RNModal, View } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

import { cn } from "../../utils";
import { Icon } from "../icon/icon.native";
import { When } from "../when";
import { useModal } from "./hooks/use-modal";
import { ModalProps, ModalRef } from "./modal.types";

const { height: fullPageHeight } = Dimensions.get("window");
const baseHeight = 300;

const ModalBase: ForwardRefRenderFunction<ModalRef, PropsWithChildren<ModalProps>> = (
  { type, defaultHeight = baseHeight, className, closeBtn = false, animationSpeed = "normal", children },
  ref
) => {
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(defaultHeight);

  const speed =
    animationSpeed === "none"
      ? 0
      : animationSpeed === "fast"
        ? 150
        : animationSpeed === "normal"
          ? 300
          : animationSpeed === "slow"
            ? 500
            : animationSpeed;

  const animatedBackgroundStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const animatedContentStyle = useAnimatedStyle(() =>
    type === "bottom" ? { transform: [{ translateY: translateY.value }] } : { opacity: opacity.value }
  );

  const { isModalVisible, closeModal } = useModal({
    ref,
    onOpen(open) {
      open();
      if (animationSpeed === "none" || animationSpeed === 0) {
        opacity.value = 1;
        translateY.value = 0;
        return;
      }

      opacity.value = withTiming(1, { duration: speed });
      translateY.value = withSpring(0, { damping: 15 });
    },
    onClose(close) {
      if (animationSpeed === "none" || animationSpeed === 0) {
        close();
        return;
      }

      opacity.value = withTiming(0, { duration: speed }, () => runOnJS(close)());
      translateY.value = withTiming(contentHeight ?? defaultHeight, { duration: speed });
    }
  });

  const top = type === "popup" ? (fullPageHeight - (contentHeight ?? defaultHeight)) / 2 : undefined;
  const modalDimensionStyles = { height: contentHeight ?? defaultHeight, top };

  const handleLayout = (event: any) => {
    const { height: measuredHeight } = event.nativeEvent.layout;
    const maxAllowedHeight = fullPageHeight * 0.9;

    const newHeight = Math.min(measuredHeight, maxAllowedHeight);
    if (contentHeight === undefined || contentHeight - newHeight > 2) {
      setContentHeight(newHeight);
    }
  };

  return (
    <RNModal visible={isModalVisible} animationType="none" transparent onRequestClose={closeModal}>
      <Pressable onPress={closeModal}>
        <Animated.View style={animatedBackgroundStyle} className="h-full w-full">
          <View className="h-full w-full bg-black opacity-10" />
        </Animated.View>
      </Pressable>

      <Animated.View
        style={[animatedContentStyle, modalDimensionStyles]}
        className={cn("relative", {
          "absolute left-[12.5%] w-3/4 rounded-2xl bg-white": type === "popup",
          "absolute bottom-0 w-full rounded-t-2xl bg-white": type === "bottom"
        })}
      >
        <View className={className} onLayout={handleLayout}>
          {children}
        </View>

        <When condition={!!closeBtn}>
          <Pressable className="absolute right-4 top-4" onPress={closeModal}>
            <View>
              <Icon
                name="close"
                state="modal"
                variables={{ fill: typeof closeBtn === "boolean" ? "black" : closeBtn.fill || "black" }}
              />
            </View>
          </Pressable>
        </When>
      </Animated.View>
    </RNModal>
  );
};

export const Modal = forwardRef(ModalBase);
