import { DefaultValue, selector } from "recoil";

import { Backend } from "../../../types";
import { fields } from "../../../utils";
import { signInAtom } from "../../backend";

export const tokenSelector = selector<Pick<Backend.AuthToken, "access_token" | "refresh_token"> | null>({
  key: fields.user.token.toString(),
  get({ get }) {
    const data = get(signInAtom);
    return data ? { access_token: data.access_token, refresh_token: data.refresh_token } : null;
  },
  set({ get, set }, tokens) {
    if (tokens === null || tokens instanceof DefaultValue) {
      set(signInAtom, null);
      return;
    }

    const data = get(signInAtom);
    if (!data) return;
    data.access_token = tokens.access_token;
    data.refresh_token = tokens.refresh_token;
    set(signInAtom, data);
  }
});
