export interface Variable {
  name: string;
  rawName: string;
  type: string;
  defaultValue?: string;
  params: Record<string, string>;
}
