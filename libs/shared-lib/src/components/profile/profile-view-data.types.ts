export interface ProfileDataProps<TDataType extends string | number | boolean> {
  name: string;
  title: string;
  value: TDataType;

  onChange?(value: TDataType): void;
}
