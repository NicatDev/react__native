import { atom } from "recoil";

export const currentPageAtom = atom<number>({
  key: "currentPageAtom",
  default: 1
});

export const totalPagesAtom = atom<number>({
  key: "totalPagesAtom",
  default: 0
});
