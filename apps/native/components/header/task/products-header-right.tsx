import { useGlobalSearchParams, useRouter } from "expo-router";
import { FC, useEffect } from "react";
import { Alert, Pressable, View } from "react-native";

import { api, fields, productsAtom, useRecoilArray } from "@digitask/shared-lib";
import { Button, Icon, When } from "@mdreal/ui-kit";
import { useMutation, useQuery } from "@tanstack/react-query";

import { palette } from "../../../../../palette";
import { useMatchPathOnRoute } from "../../../hooks/use-match-path-on-route";

export const TaskAddAttachmentHeaderRight: FC = () => {
  const [products, controls] = useRecoilArray(productsAtom);
  const { taskId, taskType } = useGlobalSearchParams() as { taskId: string; taskType: "problem" | "connection" };
  const router = useRouter();

  const { refetch } = useQuery({
    queryKey: [fields.tasks.get, taskId],
    queryFn: () => api.services.task.$get(+taskId),
    enabled: !!taskId
  });

  useMatchPathOnRoute(
    /\/products$/,
    () => {
      if (products.length) {
        Alert.alert("Çıxmaq istədiyinizə əminsiniz?", "Çıxmaq istədiyinizdə məhsullar silinəcək. ", [
          { text: "Xeyr", style: "cancel" },
          {
            text: "Bəli",
            onPress: () => {
              controls.clear();
              router.back();
            }
          }
        ]);
        return true;
      }
    },
    [products]
  );

  const bulkUploadProducts = useMutation({
    mutationFn: api.services.warehouse.items.$bulkCreate
  });

  const newProduct = () => {
    router.push({
      pathname: `/(dashboard)/(task)/[taskId]/task-type/[taskType]/add-product`,
      params: { taskId, taskType }
    });
  };

  const handleUploadProducts = async () => {
    await bulkUploadProducts.mutateAsync(
      products.map(product => ({
        task: product.task,
        count: +product.count,
        item: product.item,
        is_tv: product.type === "tv",
        is_internet: product.type === "internet",
        is_voice: product.type === "voice"
      }))
    );
    await refetch({ throwOnError: false });
    controls.clear();
    router.back();
  };

  useEffect(() => {
    !products.length && newProduct();
  }, [products]);

  return (
    <View className="flex flex-row gap-2">
      <Pressable onPressIn={newProduct}>
        <Icon name="plus" variables={{ stroke: palette.primary["50"] }} />
      </Pressable>

      <When condition={!!products.length}>
        <Pressable className="z-10" onPressIn={handleUploadProducts}>
          <Icon name="save" variables={{ fill: palette.primary["50"] }} />
        </Pressable>
      </When>
    </View>
  );
};
