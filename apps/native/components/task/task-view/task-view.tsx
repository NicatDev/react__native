import { useRouter } from "expo-router";
import { type FC, useRef } from "react";
import { FlatList, Platform, Pressable, RefreshControl, Text, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  Backend,
  api,
  fields,
  filteredTasksSelector,
  getTags,
  taskFiltersAtom,
  tasksAtom,
  tasksFilterSelector,
  uppercase,
  useRecoilArrayControls,
  useRecoilQuery
} from "@digitask/shared-lib";
import { Block, Button, cn } from "@mdreal/ui-kit";

import { BlockContainer } from "../../blocks";
import { Task } from "../task";
import type { TasksViewProps } from "./task-view.types";
import { statuses, translations } from "./task-view.utils";

interface TaskItemProps {
  task: Backend.Task;
  taskType: TasksViewProps["taskType"];
}

const TaskItem: FC<TaskItemProps> = ({ task, taskType }) => {
  const controls = useRecoilArrayControls(tasksAtom(taskType));
  const router = useRouter();

  return (
    <Pressable
      key={task.id}
      onPress={() =>
        router.push({
          pathname: "/[taskId]/task-type/[taskType]",
          params: { taskId: task.id, taskType }
        })
      }
    >
      <BlockContainer>
        <Task task={task} tags={getTags(task)} updateTask={updatedTask => controls.update(task.id, updatedTask)} />
      </BlockContainer>
    </Pressable>
  );
};

export const TaskView: FC<TasksViewProps> = ({ taskType, className }) => {
  const tasksContainerRef = useRef<FlatList>(null);
  const filter = useRecoilValue(taskFiltersAtom(taskType));
  const setFilter = useSetRecoilState(tasksFilterSelector(taskType));
  const filteredTasks = useRecoilValue(filteredTasksSelector(taskType));

  const { isFetching, refetch } = useRecoilQuery(tasksAtom(taskType), {
    queryKey: [fields.tasks, taskType],
    queryFn: () => api.services.tasks.$get(taskType)
  });

  const onStatusChange = (status: Backend.Task["status"]) => {
    setFilter({ status });
    if (filter.status !== status) {
      tasksContainerRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  };

  return (
    <Block>
      <View className={cn(className, "my-6", "flex gap-6")}>
        <Block.Scroll horizontal showsHorizontalScrollIndicator={false} contentClassName="flex flex-row gap-4">
          <View />
          {statuses.map(status => (
            <Button
              key={status}
              variant={filter.status === status ? "primary" : "secondary"}
              className="rounded-2.25xl"
              onClick={() => onStatusChange(status)}
            >
              <Text
                className={cn({ "text-primary": filter.status !== status, "text-white": filter.status === status })}
              >
                {uppercase(translations[status])}
              </Text>
            </Button>
          ))}
          <View />
        </Block.Scroll>
      </View>

      <Block className="p-4 pb-20">
        <FlatList
          ref={tasksContainerRef}
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          data={filteredTasks}
          keyExtractor={task => task.id.toString()}
          renderItem={({ item: task }) => <TaskItem task={task} taskType={taskType} />}
          className={cn(Platform.select({ android: "mb-26", ios: "mb-24" }))}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="gap-4"
        />
      </Block>
    </Block>
  );
};
