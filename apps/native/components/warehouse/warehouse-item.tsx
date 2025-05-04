import type { FC } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useRecoilValue } from "recoil";

import {
  type AddResourceSchema,
  type Backend,
  api,
  fields,
  useRecoilQuery,
  warehouseItemsAtom
} from "@digitask/shared-lib";
import { Select } from "@mdreal/ui-kit";

export const WarehouseItem: FC = () => {
  const form = useFormContext();
  const warehouseId = useWatch({ control: form.control, name: "warehouse" });
  const warehouseItems = useRecoilValue(warehouseItemsAtom(warehouseId));
  useRecoilQuery(warehouseItemsAtom(warehouseId), {
    queryKey: [fields.warehouse.item, warehouseId],
    queryFn: () => api.services.warehouse.items.$get(warehouseId!),
    enabled: !!warehouseId
  });

  return (
    <Select.Controlled<Backend.WarehouseItem, AddResourceSchema> name="item" label="Məhsulu seçin...">
      {warehouseItems.map(item => (
        <Select.Option key={item.id} label={item.equipment_name} value={item.id.toString()} />
      ))}
    </Select.Controlled>
  );
};
