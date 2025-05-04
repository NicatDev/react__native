import { AtomFamilyOptions, RecoilState, SerializableParam, atomFamily } from "recoil";

import { WithPaginationDefaults } from "../../types/with/pagination-defaults";
import { withPaginationDefaults } from "../pagination/with-pagination-defaults";

export const paginatedAtomFamily = <T, P extends SerializableParam>(
  options: AtomFamilyOptions<T[], P>
): ((param: P) => RecoilState<WithPaginationDefaults<T>>) => {
  // @ts-ignore
  return atomFamily({
    ...options,
    // @ts-ignore
    default: withPaginationDefaults("default" in options ? options.default : [])
  });
};
