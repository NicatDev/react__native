import { AuthHttp } from "@mdreal/ui-kit";

import { InternetAttachmentSchema, SignInSchema, TVAttachmentSchema, VoiceAttachmentSchema } from "./schemas";
import { Backend, DateRange, MessageOptions, WithPagination } from "./types";
import { PaginatedResponse } from "./types/backend/paginated-response";
import { urlBuilder } from "./utils";

export const authHttp = AuthHttp.instance();

export const api = {
  accounts: {
    login: {
      $post(data: SignInSchema) {
        return authHttp.post<Backend.AuthToken>("/accounts/login/", data);
      }
    },
    profile: {
      get $get() {
        return authHttp.get<Backend.ProfileData>("/accounts/profile/");
      }
    },
    messages: {
      $get(options?: WithPagination<MessageOptions>) {
        return authHttp.get<PaginatedResponse<Backend.Message>>(urlBuilder("/accounts/messages_mobile/", options));
      }
    },
    RoomsApiView: {
      get $get() {
        return authHttp.get<Backend.ChatRoom[]>("/accounts/RoomsApiView/");
      }
    }
  },
  services: {
    task: {
      $get(id: number) {
        return authHttp.get<Backend.Task>(`/services/task/${id}/`);
      }
    },
    events: {
      $getAll() {
        return authHttp.get<Backend.Event[]>("/services/meetings/");
      },
      $get(id: number) {
        return authHttp.get<Backend.SingleEvent>(`/services/meeting/${id}/`);
      }
    },
    tasks: {
      $get(taskType: "connection" | "problem") {
        return authHttp.get<Backend.Task[]>(`/services/status/?task_type=${taskType}`);
      },
      $post({
        type,
        ...data
      }: Omit<TVAttachmentSchema | InternetAttachmentSchema | VoiceAttachmentSchema, "passport" | "photo_modem"> & {
        task: number;
      }) {
        return authHttp.post<{ id: number }>(`/services/create_${type}/`, data);
      },
      $patch(
        id: number,
        {
          type,
          ...data
        }: Omit<TVAttachmentSchema | InternetAttachmentSchema | VoiceAttachmentSchema, "passport" | "photo_modem"> & {
          task: number;
        }
      ) {
        return authHttp.patch<Backend.Task>(`/services/update_${type}/${id}/`, data);
      },
      attachments: {
        $patch(id: number, data: Partial<Backend.Task>) {
          return authHttp.patch<Backend.Task>(`/services/task/${id}/update/`, data);
        }
      }
    },
    performance: {
      $get(range: Partial<DateRange> | null) {
        return authHttp.get<Backend.PerformanceProfile[]>(
          urlBuilder("/services/performance/", {
            start_date: range?.start ? range?.start.format("YYYY-MM-DD") : null,
            end_date: range?.end ? range?.end.format("YYYY-MM-DD") : null
          })
        );
      }
    },
    file: {
      upload: {
        $post(media: FormData) {
          return Promise.resolve(media.get("photo"));
        }
      }
    },
    warehouse: {
      get $getAll() {
        return authHttp.get<Backend.Warehouse[]>("/warehouse/warehouses/");
      },
      $get(id: number) {
        return authHttp.get<Backend.Warehouse>(`/warehouse/warehouses/${id}`);
      },
      items: {
        $get(id: number) {
          return authHttp.get<Backend.WarehouseItem[]>(`/warehouse/warehouse-items/?warehouse=${id}`);
        },
        $bulkCreate(data: Backend.WarehouseBulkCreateItem[]) {
          return authHttp.post<void>("/services/warehouse_changes/bulk_create/", data);
        }
      }
    },
    internetPacks: {
      get $get() {
        return authHttp.get<Backend.InternetPack[]>("/services/services/internet_packs/");
      }
    }
  }
};
