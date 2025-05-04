import { Stack } from "expo-router";

import { ChatRoomHeaderRight, ChatRoomHeaderTitle } from "../../components/header/chat";
import { ProfileHeaderRight, ProfileHeaderTitle } from "../../components/header/profile";
import { TaskAddAttachmentHeaderRight } from "../../components/header/task/products-header-right";
import { useEventsInit } from "../../hooks/use-events-init";
import { useTasksInit } from "../../hooks/use-tasks-init";
import { useWebsocketInit } from "../../hooks/use-websocket-init";
import { TaskType } from "../../types/task-type";

import "../main.css";

export default function DashboardLayout() {
  useWebsocketInit();
  useTasksInit(TaskType.Connection);
  useTasksInit(TaskType.Problem);
  useEventsInit();

  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="(chat)/chat" options={{ title: "Söhbətlər", headerBackButtonDisplayMode: "minimal" }} />
      <Stack.Screen
        name="(chat)/room/[chatRoomId]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerTitle: () => <ChatRoomHeaderTitle />,
          headerRight: () => <ChatRoomHeaderRight />
        }}
      />

      <Stack.Screen
        name="(event)/[id]"
        options={{
          title: "Tədbir",
          headerBackButtonDisplayMode: "minimal"
        }}
      />

      <Stack.Screen
        name="(notification)/notification"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerTitle: () => <ChatRoomHeaderTitle />,
          headerRight: () => <ChatRoomHeaderRight />
        }}
      />

      <Stack.Screen
        name="(profile)/profile-data"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerTitle: () => <ProfileHeaderTitle />,
          headerRight: () => <ProfileHeaderRight />
        }}
      />

      <Stack.Screen name="(tabs)" options={{ headerShown: false, headerBackButtonDisplayMode: "minimal" }} />

      <Stack.Screen
        name="(task)/[taskId]/task-type/[taskType]/index"
        options={{
          title: "Tapşırıq",
          headerBackButtonDisplayMode: "minimal"
        }}
      />
      <Stack.Screen
        name="(task)/[taskId]/task-type/[taskType]/type/[type]"
        options={{
          title: "Tapşırıq",
          presentation: "modal",
          headerBackButtonDisplayMode: "minimal"
        }}
      />
      <Stack.Screen
        name="(task)/[taskId]/task-type/[taskType]/products"
        options={{
          title: "Məhsul əlavə et",
          presentation: "modal",
          headerBackButtonDisplayMode: "minimal",
          headerRight: () => <TaskAddAttachmentHeaderRight />
        }}
      />
      <Stack.Screen
        name="(task)/[taskId]/task-type/[taskType]/add-product"
        options={{
          title: "Məhsul əlavə et",
          presentation: "modal",
          headerBackButtonDisplayMode: "minimal"
        }}
      />
    </Stack>
  );
}
