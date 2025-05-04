import type { ImagePickerAsset } from "expo-image-picker";
import { FC } from "react";

import type { ControlledBaseProps, ControlledComponentBaseProps } from "@mdreal/ui-kit";

export interface FileUploaderProps extends ControlledComponentBaseProps, ControlledBaseProps<ImagePickerAsset> {
  label: string;
  value?: string;
}

export interface FileUploaderExtended {
  Controlled: FC<FileUploaderProps & { name: string; value?: string }>;
}
