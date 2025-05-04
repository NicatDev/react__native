import { useLocalSearchParams, useRouter } from "expo-router";
import { omit } from "lodash";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, Text } from "react-native";
import { useRecoilValue } from "recoil";

import {
  AddAdditionSchema,
  Backend,
  InternetAttachmentSchema,
  TVAttachmentSchema,
  VoiceAttachmentSchema,
  api,
  fields,
  taskAddAttachmentSchema,
  tasksAtom
} from "@digitask/shared-lib";
import { AuthHttp, Block, Form, Input, Select, When, logger } from "@mdreal/ui-kit";
import { useMutation, useQuery } from "@tanstack/react-query";

import { FileUploader } from "../../../../../../../components/file-uploader";
import { uploadFile } from "../../../../../../../utils/upload-file";

type AttachmentType = "tv" | "internet" | "voice";

const translation = {
  tv: "TV",
  internet: "İnternet",
  voice: "Səs"
};

const loading = async (setLoading: (loading: boolean) => void, fn: () => void | Promise<void>) => {
  setLoading(true);
  try {
    await fn();
  } catch (error) {
    logger.error(error);
    setLoading(false);
  }

  setLoading(false);
};

export default function AddSpecificTaskAttachment() {
  const {
    taskId,
    taskType,
    type: attachmentType,
    edit
  } = useLocalSearchParams() as {
    taskId: string;
    taskType: "connection" | "problem";
    type: AttachmentType;
    edit?: "true";
  };
  const [isLoading, setIsLoading] = useState(false);
  const isEditMode = edit === "true";

  const router = useRouter();
  const tasks = useRecoilValue(tasksAtom(taskType));
  const { data: currentTask, refetch } = useQuery({
    queryKey: [fields.tasks.get, taskId],
    queryFn: () => api.services.task.$get(+taskId),
    enabled: !!taskId
  });

  const taskAttachmentCreateMutation = useMutation({
    mutationKey: [fields.tasks.create],
    mutationFn: (
      data: Omit<TVAttachmentSchema | InternetAttachmentSchema | VoiceAttachmentSchema, "passport" | "photo_modem"> & {
        task: number;
      }
    ) => api.services.tasks.$post(data)
  });

  const taskAttachmentUpdateMutation = useMutation({
    mutationKey: [fields.tasks.update],
    mutationFn: (
      data: Omit<TVAttachmentSchema | InternetAttachmentSchema | VoiceAttachmentSchema, "passport" | "photo_modem"> & {
        task: number;
      }
    ) => api.services.tasks.$patch(data.id!, data)
  });

  const { data: internetPacks = [] } = useQuery({
    queryKey: [fields.internetPacks],
    queryFn: () => api.services.internetPacks.$get,
    enabled: attachmentType === "internet"
  });

  useEffect(() => {
    if (!tasks.length) return;
    if ((!currentTask || currentTask[`has_${attachmentType}`]) && !isEditMode) {
      if (router.canGoBack()) router.back();
      else router.replace({ pathname: "/[taskId]/task-type/[taskType]", params: { taskId, taskType } });
    }
  }, [currentTask]);

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: "padding" })} className="h-full">
      <Block.Scroll className="border-t-neutral-90 border-t-[1px] bg-white p-4" contentClassName="flex gap-4 pb-24">
        <Form<AddAdditionSchema>
          schema={taskAddAttachmentSchema}
          defaultValues={{
            ...omit(currentTask?.[attachmentType] || {}, ["task", "splitter_port"]),
            // @ts-expect-error
            internet_packs: currentTask?.[attachmentType]?.internet_packs?.id?.toString(),
            type: attachmentType,
            passport: currentTask?.passport
          }}
          onSubmit={async ({ passport, photo_modem, ...data }) => {
            await loading(setIsLoading, async () => {
              await uploadFile(
                `${AuthHttp.settings().baseUrl}/services/update_task_image/${taskId}/`,
                passport,
                "passport"
              );
              const attachment = await (
                isEditMode ? taskAttachmentUpdateMutation : taskAttachmentCreateMutation
              ).mutateAsync({ ...data, task: +taskId });
              await uploadFile(
                `${AuthHttp.settings().baseUrl}/services/update_${attachmentType}_image/${attachment.id}/`,
                photo_modem,
                "photo_modem"
              );
            });

            await refetch({ throwOnError: false });

            if (router.canGoBack()) router.back();
            else router.replace({ pathname: "/[taskId]/task-type/[taskType]", params: { taskId, taskType } });
          }}
        >
          <FileUploader.Controlled name="passport" label="Şəxsiyyət vəsiqəsinin fotosu" value={currentTask?.passport} />

          <Text className="text-xl">
            Servis məlumatları <Text className="text-primary">{translation[attachmentType]}</Text>
          </Text>

          <FileUploader.Controlled name="photo_modem" label="Modemin arxa fotosu" />

          <Input.Controlled
            name="modem_SN"
            label={<Text className="text-neutral-60">Modem S/N</Text>}
            className="bg-neutral-90 rounded-2xl border-transparent"
          />

          <When condition={attachmentType === "internet"}>
            <Input.Controlled
              name="siqnal"
              label={<Text className="text-neutral-60">Siqnal</Text>}
              className="bg-neutral-90 rounded-2xl border-transparent"
            />

            <Text className="text-neutral-60">İnternet paketləri</Text>
            <Select.Controlled<Backend.InternetPack, AddAdditionSchema>
              name="internet_packs"
              label="Birini seç"
              className="bg-neutral-90 rounded-2xl border-transparent"
            >
              {Array.from(internetPacks || []).map(pack => (
                <Select.Option key={pack.id} value={pack.id.toString()} label={`${pack.name} (${pack.speed})`} />
              ))}
            </Select.Controlled>
          </When>

          <When condition={attachmentType === "voice"}>
            <Input.Controlled
              name="home_number"
              type="number"
              label={<Text className="text-neutral-60">Ev nömrəsi</Text>}
              className="bg-neutral-90 rounded-2xl border-transparent"
            />

            <Input.Controlled
              name="password"
              label={<Text className="text-neutral-60">Parol</Text>}
              className="bg-neutral-90 rounded-2xl border-transparent"
            />
          </When>

          <Input.Controlled
            name="note"
            label={<Text className="text-neutral-60">Qeyd</Text>}
            className="bg-neutral-90 rounded-2xl border-transparent"
          />

          <Form.Button isLoading={isLoading} disabled={isLoading}>
            <Text className="p-4 text-center text-white">Yadda saxla</Text>
          </Form.Button>
        </Form>
      </Block.Scroll>
    </KeyboardAvoidingView>
  );
}
