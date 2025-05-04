import { TaskStatuses } from "../tasks/statuses";
import { Group } from "./group";
import type { WarehouseItem } from "./warehouse-item";

export interface Task {
  id: number;
  user: number;
  full_name: string;
  task_type: string;
  registration_number: string;
  contact_number: string;
  location: string;
  note: string;
  date: string;
  start_time: string;
  end_time: string;
  status: TaskStatuses;
  tv?: Tv;
  voice?: Voice;
  internet?: Internet;
  services: string;
  first_name: string;
  last_name: string;
  phone: string;
  group: Group[];
  latitude: number;
  longitude: number;
  is_tv: boolean;
  is_voice: boolean;
  task_items: TaskItem[];
  is_internet: boolean;
  passport?: any;
  has_tv: boolean;
  has_voice: boolean;
  has_internet: boolean;
}

export interface Internet {
  id: number;
  photo_modem?: any;
  modem_SN: string;
  optical_cable: string;
  fastconnector: string;
  siqnal: string;
  internet_packs?: any;
  task: number;
}

export interface Voice {
  id: number;
  photo_modem?: any;
  modem_SN: string;
  home_number: string;
  password: string;
  task: number;
}

export interface Tv {
  id: number;
  photo_modem: string;
  modem_SN: string;
  rg6_cable: string;
  f_connector: string;
  splitter: string;
  task: number;
}

export interface TaskItem {
  count: number;
  delivery_note: string;
  id: number;
  is_internet: boolean;
  is_tv: boolean;
  is_voice: boolean;
  item: WarehouseItem;
  task: number;
  warehouse_name: string;
}
