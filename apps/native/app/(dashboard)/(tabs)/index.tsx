import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  DateService,
  TaskStatuses,
  eventsAtom,
  getTags,
  tasksAtom,
  tasksFilterSelector,
  useRecoilArrayControls
} from "@digitask/shared-lib";
import { Block, Icon, If } from "@mdreal/ui-kit";

import { palette } from "../../../../../palette";
import { BlockContainer, BlockSection } from "../../../components/blocks";
import { Event } from "../../../components/event";
import { Task } from "../../../components/task/task";
import { TaskType } from "../../../types/task-type";

export default function Index() {
  const connectionTasks = useRecoilValue(tasksAtom(TaskType.Connection));
  const problemTasks = useRecoilValue(tasksAtom(TaskType.Problem));
  const connectionTask = connectionTasks?.find(task => task.status === TaskStatuses.InProgress);

  const finishedConnectionTasks = connectionTasks.filter(task => task.status === TaskStatuses.Completed);
  const finishedProblemTasks = problemTasks.filter(task => task.status === TaskStatuses.Completed);

  const events = useRecoilValue(eventsAtom);
  const event = events[0];

  const controls = useRecoilArrayControls(tasksAtom(TaskType.Connection));
  const setFilter = useSetRecoilState(tasksFilterSelector(TaskType.Connection));

  const date = DateService.from();
  const formattedDate = date.format("DD MMM");

  return (
    <Block.Fade className="bg-neutral-95">
      <Block.Scroll contentClassName="flex justify-center items-start gap-4 p-4">
        <Text className="text-xl">{formattedDate}</Text>

        <BlockContainer className="flex items-center">
          <Block className="size-28">
            <Icon
              name="circle"
              variables={{
                percentage: Math.round(
                  (finishedConnectionTasks.length / (finishedConnectionTasks.length + finishedProblemTasks.length)) *
                    100
                ),
                textSize: 5,
                subtextsize: 4,
                fillFgColor: palette.secondary["80"],
                fillBgColor: palette.primary["50"],
                text: `${finishedConnectionTasks.length + finishedProblemTasks.length} tapşırıq`,
                subtext: "tamamlandı",
                textColor: "black"
              }}
            />
          </Block>

          <Block className="flex flex-row justify-center gap-4">
            <Text>
              <Text>Qoşulmalar</Text>
              <Text> </Text>
              <Text>{finishedConnectionTasks.length},</Text>
            </Text>

            <Text>
              <Text>Problemlər</Text>
              <Text> </Text>
              <Text>{finishedProblemTasks.length}</Text>
            </Text>
          </Block>
        </BlockContainer>

        <BlockSection
          title="Davam edən tapşırıqlar"
          onClick={() => setFilter({ status: TaskStatuses.InProgress })}
          href="/task"
        >
          <If condition={!!connectionTask}>
            <If.Then>
              <BlockContainer>
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/[taskId]/task-type/[taskType]",
                      params: { taskId: connectionTask!.id, taskType: TaskType.Connection }
                    })
                  }
                >
                  <Task
                    task={connectionTask!}
                    tags={getTags(connectionTask)}
                    updateTask={task => controls.update(task.id, task)}
                  />
                </Pressable>
              </BlockContainer>
            </If.Then>

            <If.Else>
              <Text className="text-center text-lg">Tapşırıq tapılmadı</Text>
            </If.Else>
          </If>
        </BlockSection>

        <BlockSection title="Tədbirlər" href="/event">
          <If condition={!!event}>
            <If.Then>
              <Event
                id={event!?.id}
                name={event!?.title}
                date={DateService.from(event!?.date)}
                description={event!?.meeting_description}
              />
            </If.Then>

            <If.Else>
              <Text className="text-center text-lg">Tədbir tapılmadı</Text>
            </If.Else>
          </If>
        </BlockSection>
      </Block.Scroll>
    </Block.Fade>
  );
}
