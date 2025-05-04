import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { useRecoilValue } from "recoil";

import { Backend, DateService, api, eventsAtom, fields } from "@digitask/shared-lib";
import { Block } from "@mdreal/ui-kit";
import { useQuery } from "@tanstack/react-query";

import { Field } from "../../../components/field";

export default function SingleEvent() {
  const { id } = useLocalSearchParams() as { id: string };

  const events = useRecoilValue(eventsAtom);
  const { data: event = events.find(e => e.id === +id) as Backend.SingleEvent } = useQuery({
    queryKey: [fields.event, id],
    queryFn: () => api.services.events.$get(+id)
  });

  if (!id || !event) {
    return (
      <View>
        <Text className="text-center text-lg">Tədbir tapılmadı</Text>
      </View>
    );
  }

  return (
    <Block.Scroll contentClassName="gap-2 p-4">
      <Field label="Görüşün adı" value={event.title} />

      <Field label="Görüş növü" value={event.meeting_type} />
      <Field label="Tarix" value={DateService.from(event.date).format("DD MMM YYYY HH:mm")} />
      <Field label="Tədbir haqqında" value={event.meeting_description} />

      <Field
        label="İştirakçılar"
        value={
          <View>
            {event.participants?.map((participant, idx) => (
              <Text key={participant}>{`${idx + 1}. ${participant}`}</Text>
            ))}
          </View>
        }
      />
    </Block.Scroll>
  );
}
