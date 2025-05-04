import { FileSystemUploadType, createUploadTask } from "expo-file-system";
import type { ImagePickerAsset } from "expo-image-picker";

import { AuthHttp } from "@mdreal/ui-kit";

import { AuthService } from "../components/services/auth.service";

export const uploadFile = async (url: string, asset: ImagePickerAsset, fileKey: string) => {
  try {
    await AuthHttp.instance().refreshToken();
  } catch {
    await AuthService.logout();
    return;
  }

  const token = AuthHttp.settings().getTokens();
  const uploadTask = createUploadTask(
    url,
    asset.uri,
    {
      fieldName: fileKey,
      httpMethod: "PATCH",
      uploadType: FileSystemUploadType.MULTIPART,
      mimeType: asset.mimeType,
      headers: { Authorization: `Bearer ${token.access}` }
    },
    ({ totalBytesSent, totalBytesExpectedToSend }) => {
      parseFloat((totalBytesSent / (totalBytesExpectedToSend || 1)).toFixed(2));
    }
  );

  const result = await uploadTask.uploadAsync();
  if (!result) {
    throw new Error("File upload failed");
  }
  return result.body;
};
