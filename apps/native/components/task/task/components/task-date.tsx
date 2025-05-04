import { FC } from "react";
import { Text } from "react-native";

import { DateService } from "@digitask/shared-lib";

import { TaskDate as TaskDateProps } from "../task.types";

export const TaskDate: FC<TaskDateProps> = ({ start, end }) => {
  const startDate = DateService.from(start);
  const endDate = DateService.from(end);
  const dateParts: string[] = [];

  dateParts.push(startDate.format("DD MMM hh:mm"));
  dateParts.push("-");
  dateParts.push(endDate.format("DD MMM hh:mm"));

  return <Text>{dateParts.join(" ")}</Text>;
};
