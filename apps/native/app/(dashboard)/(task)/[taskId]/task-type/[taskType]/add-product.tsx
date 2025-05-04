import { useLocalSearchParams, useRouter } from "expo-router";
import { KeyboardAvoidingView, Text } from "react-native";
import { useRecoilValue } from "recoil";

import {
  type AddResourceSchema,
  addResourceSchema,
  productsAtom,
  tasksAtom,
  useRecoilArray,
  warehouseAtom
} from "@digitask/shared-lib";
import { Block, Form, Input, Select } from "@mdreal/ui-kit";

import { Warehouse } from "../../../../../../components/warehouse";
import { WarehouseItem } from "../../../../../../components/warehouse/warehouse-item";

type AttachmentType = "tv" | "internet" | "voice";

export default function AddSpecificTaskProduct() {
  const { taskId, taskType, edit, productId } = useLocalSearchParams() as {
    taskId: string;
    taskType: "problem" | "connection";
    edit?: "true";
    productId?: string;
  };
  const router = useRouter();

  const [products, controls] = useRecoilArray(productsAtom);
  const tasks = useRecoilValue(tasksAtom(taskType));
  const currentTask = tasks.find(task => task.id === +taskId);

  const foundItem = edit ? controls.get(+productId!) : {};

  console.log(foundItem, {
    id: edit ? +productId! : products.length,
    task: +taskId,
    ...foundItem
  });

  return (
    <KeyboardAvoidingView className="h-full">
      <Block.Scroll className="border-t-neutral-90 border-t-[1px] bg-white p-4" contentClassName="flex gap-4">
        <Form<AddResourceSchema>
          schema={addResourceSchema}
          defaultValues={{
            id: edit ? +productId! : products.length,
            task: +taskId,
            ...foundItem
          }}
          onSubmit={async product => {
            if (edit) {
              controls.update(+productId!, product);
            } else {
              controls.add(product);
            }

            router.back();
          }}
          onFormError={console.log}
        >
          <Warehouse />
          <WarehouseItem />

          <Select.Controlled<AttachmentType, AddResourceSchema> name="type" label="Servis növünü seçin...">
            {!!currentTask?.is_tv && <Select.Option label="TV" value="tv" />}
            {!!currentTask?.is_internet && <Select.Option label="İnternet" value="internet" />}
            {!!currentTask?.is_voice && <Select.Option label="Səs" value="voice" />}
          </Select.Controlled>

          <Input.Controlled
            name="count"
            label="Say"
            className="border-primary rounded-2xl"
            type="number"
            disabled={false}
          />

          <Form.Button>
            <Text className="p-3 text-center text-white">{edit ? "Düzəliş et" : "Məhsul əlavə et"}</Text>
          </Form.Button>
        </Form>
      </Block.Scroll>
    </KeyboardAvoidingView>
  );
}
