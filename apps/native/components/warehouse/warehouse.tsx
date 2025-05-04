import type { FC } from "react";
import { useRecoilValue } from "recoil";

import { type AddResourceSchema, Backend, api, fields, useRecoilQuery, warehouseAtom } from "@digitask/shared-lib";
import { Select } from "@mdreal/ui-kit";

export const Warehouse: FC = () => {
  const warehouses = useRecoilValue(warehouseAtom);
  useRecoilQuery(warehouseAtom, {
    queryKey: [fields.warehouse],
    queryFn: () => api.services.warehouse.$getAll
  });

  return (
    <Select.Controlled<Backend.Warehouse, AddResourceSchema> name="warehouse" label="Anbarı seçin...">
      {warehouses.map(warehouse => (
        <Select.Option key={warehouse.id} label={warehouse.name} value={warehouse.id.toString()} />
      ))}
    </Select.Controlled>
  );
};
