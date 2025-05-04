import { Image } from "expo-image";
import {
  type ImagePickerAsset,
  ImagePickerResult,
  launchCameraAsync,
  launchImageLibraryAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync
} from "expo-image-picker";
import { FC, useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { api, fields } from "@digitask/shared-lib";
import { ErrorMessageViewer, Icon, If, Modal, ModalRef, withController } from "@mdreal/ui-kit";
import { useMutation } from "@tanstack/react-query";

import { palette } from "../../../palette";
import { convertImageToAsset } from "../utils/convert-image-to-asset";
import { FileUploaderProps } from "./file-uploader.types";

const FileUploaderBase: FC<FileUploaderProps> = ({ label, value: prePickedImage, onChange, error }) => {
  const modalRef = useRef<ModalRef>(null);
  const [isImageUploadedByUser, setIsImageUploadedByUser] = useState(false);
  const [pickedImage, setPickedImage] = useState<ImagePickerAsset | null>(null);

  useEffect(() => {
    !isImageUploadedByUser &&
      !!prePickedImage &&
      convertImageToAsset(prePickedImage).then(asset => {
        setPickedImage(asset);
        asset && onChange?.(asset);
      });
  }, [isImageUploadedByUser, prePickedImage]);

  const uploadFileMutation = useMutation({
    mutationKey: [fields.file.upload],
    mutationFn: (formData: FormData) => api.services.file.upload.$post(formData),
    onSuccess(_data) {}
  });

  const handleImageUpload = (result: ImagePickerResult) => {
    modalRef.current?.close();

    if (result.canceled) return;

    const asset = result.assets[0];
    if (!asset) return;
    onChange?.(asset);
    setPickedImage(asset);
    setIsImageUploadedByUser(true);
  };

  const pickImageFromCamera = async () => {
    const cameraPermission = await requestCameraPermissionsAsync();
    if (cameraPermission.granted) {
      const result = await launchCameraAsync({
        mediaTypes: "images",
        aspect: [16, 9],
        quality: 1,
        allowsMultipleSelection: false
      });

      handleImageUpload(result);
    }
  };

  const pickImageFromLibrary = async () => {
    const imagePermission = await requestMediaLibraryPermissionsAsync();
    if (imagePermission.granted) {
      const result = await launchImageLibraryAsync({
        mediaTypes: "images",
        aspect: [16, 9],
        quality: 1,
        allowsMultipleSelection: false
      });

      handleImageUpload(result);
    } else {
      console.log("Permission denied");
    }
  };

  const onPrepare = () => {
    modalRef.current?.open();
  };

  return (
    <View className="flex gap-2">
      <Text className="text-neutral-60">{label}</Text>
      <TouchableOpacity onPress={onPrepare}>
        <View className="bg-neutral-95 border-neutral-90 flex flex-row rounded-2xl border-2 border-dashed p-4">
          <If condition={!!pickedImage}>
            <If.Then>
              <View className="flex flex-1 items-center justify-center">
                <Text className="text-primary">Yenisini əlavə et</Text>
              </View>
              <View>
                <Image source={pickedImage} style={{ width: 40, height: 40 }} />
              </View>
            </If.Then>

            <If.Else>
              <View className="flex flex-1 items-center justify-center">
                <Text className="text-primary">Şəkil əlave et</Text>
              </View>
              <View className="rounded-full bg-white p-2">
                <Icon name="upload" variables={{ fill: palette.primary["50"] }} />
              </View>
            </If.Else>
          </If>
        </View>

        <ErrorMessageViewer error={error} />
      </TouchableOpacity>

      <Modal ref={modalRef} type="bottom">
        <View className="flex gap-4 p-4">
          <TouchableOpacity onPress={pickImageFromCamera}>
            <View className="bg-neutral-95 border-neutral-90 flex flex-row rounded-2xl border-2 border-dashed p-4">
              <View className="flex flex-1 items-center justify-center">
                <Text className="text-primary">Şəkil çək</Text>
              </View>
              <View className="rounded-full bg-white p-2">
                <Icon name="camera" variables={{ fill: palette.primary["50"] }} />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={pickImageFromLibrary}>
            <View className="bg-neutral-95 border-neutral-90 flex flex-row rounded-2xl border-2 border-dashed p-4">
              <View className="flex-1">
                <Text className="text-primary">Qalereyadan seç</Text>
                <Text className="text-neutral-20">(Maksimum fayl ölçüsü: 25 MB)</Text>
              </View>
              <View className="rounded-full bg-white p-2">
                <Icon name="upload" variables={{ fill: palette.primary["50"] }} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export const FileUploader = withController(FileUploaderBase);
