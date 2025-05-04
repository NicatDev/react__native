import { useLocalSearchParams, useRouter } from "expo-router";
import type { FC } from "react";
import { Text, View } from "react-native";
import { useRecoilValue } from "recoil";

import {
  type AddResourceSchema,
  productsAtom,
  useRecoilArrayControls,
  warehouseAtom,
  warehouseItemsAtom
} from "@digitask/shared-lib";
import { Button, Table } from "@mdreal/ui-kit";

interface ProductProps {
  product: AddResourceSchema;
}

export const Product: FC<ProductProps> = ({ product }) => {
  const { taskId, taskType } = useLocalSearchParams() as { taskId: string; taskType: "problem" | "connection" };
  const router = useRouter();

  const warehouses = useRecoilValue(warehouseAtom);
  const warehouseItems = useRecoilValue(warehouseItemsAtom(+product.warehouse!));
  const controls = useRecoilArrayControls(productsAtom);

  const editProduct = (id: number) => {
    router.push({
      pathname: `/(dashboard)/(task)/[taskId]/task-type/[taskType]/add-product`,
      params: { taskId, taskType, edit: "true", productId: id.toString() }
    });
  };

  return (
    <Table.Row key={product.id} className="items-center rounded-b-2xl bg-white px-2 py-4">
      <Table.Cell>
        <Text className="text-center">{warehouses.find(wh => wh.id === +product.warehouse!)?.name}</Text>
      </Table.Cell>
      <Table.Cell>
        <Text className="text-center">{warehouseItems.find(whi => whi.id === product.item)?.equipment_name}</Text>
      </Table.Cell>
      <Table.Cell>
        <Text className="text-center">{product.count}</Text>
      </Table.Cell>
      <Table.Cell>
        <View className="flex gap-2">
          <Button onClick={() => editProduct(product.id)}>
            <Text className="text-white">Düzəliş</Text>
          </Button>
          <Button onClick={() => controls.removeItem(product)}>
            <Text className="text-white">Sil</Text>
          </Button>
        </View>
      </Table.Cell>
    </Table.Row>
  );
};
