import { atom } from "recoil";

import { ProfileData } from "../../../types/backend";
import { fields } from "../../../utils";

export const profileAtom = atom<ProfileData | null>({
  key: fields.user.profile.toString(),
  default: null
});
