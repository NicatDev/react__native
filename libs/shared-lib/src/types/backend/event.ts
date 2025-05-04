export interface Event {
  id: number;
  title: string;
  meeting_type: string;
  date: string;
  meeting_description: string;
}

export interface SingleEvent extends Event {
  participants: string[];
}
