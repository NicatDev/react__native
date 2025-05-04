import { cacheDirectory, downloadAsync } from "expo-file-system";
import type { ImagePickerAsset } from "expo-image-picker";
import { Image } from "react-native";

export const convertImageToAsset = async (imageUrl: string): Promise<ImagePickerAsset | null> => {
  const fileName = imageUrl.split("/").pop() || "downloaded_image";
  const fileExtension = fileName.includes(".") ? fileName.split(".").pop() : "jpg";
  const uuidFileName = `downloaded_image.${Date.now()}.${fileExtension}`;
  const localUri = `${cacheDirectory}${uuidFileName}`;
  const downloadedImage = await downloadAsync(imageUrl, localUri);

  if (downloadedImage && downloadedImage.status === 200) {
    const asset: ImagePickerAsset = {
      uri: downloadedImage.uri,
      width: 0,
      height: 0,
      type: "image",
      mimeType: `image/${fileExtension}`,
      fileName: uuidFileName,
      duration: null,
      base64: null
    };

    const { width, height } = await new Promise<{ width: number; height: number }>((resolve, reject) => {
      Image.getSize(
        asset.uri,
        (width, height) => resolve({ width, height }),
        error => reject(error)
      );
    });
    asset.width = width;
    asset.height = height;
    return asset;
  }

  return null;
};
