import { DefaultValue, atom, selector } from "recoil";

import { Backend } from "../../types";
import { PaginatedResponse } from "../../types/backend/paginated-response";
import { fields } from "../../utils";
import { paginatedAtomFamily } from "../../utils/atoms/paginated-atom-family";

export const messagesAtom = paginatedAtomFamily<Backend.Message, number>({
  key: fields.chat.messages.all.toString(),
  default: []
});

export const activeChatRoomIdAtom = atom<number | null>({
  key: fields.chat.rooms.active.toString(),
  default: 1
});

export const activeChatRoomPageSizeAtom = atom<number>({
  key: fields.chat.messages.size.toString(),
  default: 30
});

export const activeChatRoomMessagesSelector = selector<Backend.Message[]>({
  key: fields.chat.messages.active.toString(),
  get({ get }) {
    const chatRoomId = get(activeChatRoomIdAtom);
    if (!chatRoomId) return [];
    const paginatedMessages = get(messagesAtom(chatRoomId));
    return paginatedMessages.results;
  },
  set({ get, set }, newValue) {
    const chatRoomId = get(activeChatRoomIdAtom);
    if (!chatRoomId) return;
    const paginatedMessages = get(messagesAtom(chatRoomId));

    if (Array.isArray(newValue)) {
      set(messagesAtom(chatRoomId), { ...paginatedMessages, results: [...paginatedMessages.results, ...newValue] });
    }
  }
});

export const activeChatRoomPaginationSelector = selector<Pick<PaginatedResponse, "count" | "next" | "previous">>({
  key: fields.chat.messages.pagination.toString(),
  get({ get }) {
    const chatRoomId = get(activeChatRoomIdAtom);
    if (!chatRoomId) return { count: 0, next: null, previous: null };
    const paginatedMessages = get(messagesAtom(chatRoomId));
    return { count: paginatedMessages.count, next: paginatedMessages.next, previous: paginatedMessages.previous };
  },
  set({ get, set }, newValue) {
    const chatRoomId = get(activeChatRoomIdAtom);
    if (!chatRoomId) return;
    const paginatedMessages = get(messagesAtom(chatRoomId));
    if (newValue instanceof DefaultValue) return;

    set(messagesAtom(chatRoomId), { ...paginatedMessages, ...newValue });
  }
});
