import { RefreshControl, Text, View } from "react-native";
import { useRecoilValue } from "recoil";

import {
  Backend,
  ProfileViewData,
  api,
  fields,
  formatPhoneNumber,
  profileAtom,
  useRecoilQuery
} from "@digitask/shared-lib";
import { AuthHttp, Block } from "@mdreal/ui-kit";

import { FileUploader } from "../../../components/file-uploader";
import { uploadFile } from "../../../utils/upload-file";

export default function UserProfileData() {
  const profile = useRecoilValue(profileAtom);

  const { refetch, isRefetching } = useRecoilQuery(profileAtom, {
    queryKey: [fields.user.profile],
    queryFn: () => api.accounts.profile.$get,
    isNullable: true
  });

  if (!profile) {
    return (
      <View>
        <Text>İstifadəçi tapılmadı</Text>
      </View>
    );
  }

  const onRefresh = async () => {
    await refetch();
  };

  return (
    <Block.Scroll
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />}
      className="p-4"
      contentClassName="flex gap-4"
    >
      <FileUploader
        label="Profil Şəkli Yüklə"
        name="__profil_picture"
        value={profile.profil_picture}
        onChange={async newImage => {
          await uploadFile(`${AuthHttp.settings().baseUrl}/accounts/profile_image_update/`, newImage, "profil_picture");
        }}
      />

      <ProfileViewData name="full_name" value={`${profile.first_name} ${profile.last_name}`} title="Ad Soyad" />
      <ProfileViewData name="region" value={profile.group.region} title="Region" />

      <ProfileViewData name="group" value={profile.group.group} title="Qrup" />

      <View />

      <ProfileViewData name="group" value={formatPhoneNumber(profile.phone)} title="Telefon nömrəsi" />
      <ProfileViewData name="group" value={profile.email} title="Mail adresi" />
    </Block.Scroll>
  );
}
