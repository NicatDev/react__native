import { Icons } from "@mdreal/ui-kit";

import { Task } from "../types/backend";

export interface TagProps {
  tag: string;
  icon: keyof Icons;
}

export const getTags = (task?: Task) => {
  if (!task) return [];
  const tags: TagProps[] = [];
  task.is_tv && tags.push({ tag: "tv", icon: "tv" });
  task.is_internet && tags.push({ tag: "internet", icon: "web" });
  task.is_voice && tags.push({ tag: "voice", icon: "voice" });
  return tags;
};
