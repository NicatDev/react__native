import { api, eventsAtom, fields, useRecoilQuery } from "@digitask/shared-lib";

export const useEventsInit = () => {
  useRecoilQuery(eventsAtom, {
    queryKey: [fields.event],
    queryFn: () => api.services.events.$getAll()
  });
};
