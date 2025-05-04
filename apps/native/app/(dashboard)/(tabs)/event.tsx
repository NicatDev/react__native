import { FlatList, Text, View } from "react-native";
import { useRecoilValue } from "recoil";

import { Backend, DateService, eventsAtom } from "@digitask/shared-lib";
import { If } from "@mdreal/ui-kit";

import { Event } from "../../../components/event";

const renderEventItem = ({ item: event }: { item: Backend.Event }) => {
  return (
    <Event
      id={event.id}
      name={event.title}
      date={DateService.from(event.date)}
      description={event.meeting_description}
    />
  );
};

export default function Events() {
  const events = useRecoilValue(eventsAtom);

  return (
    <View className="p-4">
      <If condition={events.length === 0}>
        <If.Then>
          <Text className="text-center text-lg">Tədbir tapılmadı</Text>
        </If.Then>

        <If.Else>
          <FlatList
            data={events}
            renderItem={renderEventItem}
            keyExtractor={event => event.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="gap-4"
          />
        </If.Else>
      </If>
    </View>
  );
}
