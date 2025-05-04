interface UsePropsReturn<TProps> {
  props: Omit<TProps, `on${string}`>;
  handlers: { [K in keyof TProps as K extends `on${string}` ? K : never]: TProps[K] };
}

export const useProps = <TProps extends Record<string, unknown>>(props: TProps): UsePropsReturn<TProps> => {
  return {
    props: Object.fromEntries(
      Object.entries(props).filter(([key]) => !key.startsWith("on"))
    ) as UsePropsReturn<TProps>["props"],
    handlers: Object.fromEntries(
      Object.entries(props).filter(([key]) => key.startsWith("on"))
    ) as UsePropsReturn<TProps>["handlers"]
  };
};
