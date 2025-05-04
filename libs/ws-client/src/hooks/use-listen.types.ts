export interface UseListenProps<TData> {
  isListOfValues?: boolean;
  onMessage?(data: TData): void;
}
