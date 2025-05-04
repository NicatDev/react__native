import { FC, useEffect } from "react";
import { Text } from "react-native";

import { DateRange, api, fields, performanceAtom, useRecoilMutation } from "@digitask/shared-lib";
import { Block, If, Table, cn } from "@mdreal/ui-kit";

import { RangePicker } from "../../../components/date-time-picker";

const Loading: FC = () => <Text className="text-center">Loading...</Text>;

export default function Performance() {
  const rangeTableMutation = useRecoilMutation(performanceAtom, {
    mutationKey: [fields.performance],
    mutationFn: (range: Partial<DateRange> | null) => api.services.performance.$get(range)
  });

  useEffect(() => {
    rangeTableMutation.mutate(null);
  }, []);

  const rangeTableData = rangeTableMutation.data || [];

  return (
    <Block.Fade className="bg-neutral-95">
      <Block.Scroll className="relative p-4" contentClassName="flex gap-3">
        <RangePicker onChange={range => rangeTableMutation.mutate(range)} />

        <Table stickyHeader>
          <Table.Header className="bg-primary rounded-t-2xl px-4 py-3">
            <Table.Header.Cell name="name">
              <Text className="text-center text-white">Ad</Text>
            </Table.Header.Cell>
            <Table.Header.Cell name="group">
              <Text className="text-center text-white">Qrup</Text>
            </Table.Header.Cell>
            <Table.Header.Cell name="tasks">
              <Text className="text-center text-white">Tapşırıqlar</Text>
            </Table.Header.Cell>
          </Table.Header>

          <Table.Body className="rounded-b-2xl">
            <If condition={rangeTableMutation.isPending}>
              <If.Then>
                <Table.Row className="rounded-b-2xl bg-white px-2 py-4">
                  <Table.Cell fullCellSpan>
                    <Loading />
                  </Table.Cell>
                </Table.Row>
              </If.Then>

              <If.ElseIf condition={rangeTableMutation.isSuccess}>
                {rangeTableData.map(({ id, first_name, group, task_count }, idx, self) => (
                  <Table.Row
                    key={id}
                    className={cn("bg-white px-2 py-4", { "rounded-b-2xl": self.length - 1 === idx })}
                  >
                    <Table.Cell>
                      <Text className="text-primary text-center">{first_name}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text className="text-center">{group.group}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text className="text-primary text-center">{task_count.total}</Text>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </If.ElseIf>

              <If.ElseIf condition={rangeTableMutation.isError}>
                <Table.Row fullRowSpan>
                  <Table.Cell>
                    <Text>Error</Text>
                  </Table.Cell>
                </Table.Row>
              </If.ElseIf>

              <If.Else>
                <Table.Row fullRowSpan>
                  <Table.Cell fullCellSpan>
                    <Text>No data</Text>
                  </Table.Cell>
                </Table.Row>
              </If.Else>
            </If>
          </Table.Body>
        </Table>
      </Block.Scroll>
    </Block.Fade>
  );
}
