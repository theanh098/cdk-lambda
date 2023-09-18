type Handlers<T, V extends string | number | symbol> = {
  [K in V]: (value?: V) => T;
};

export function fold<T, V extends string | number | symbol>(
  value: V,
  handlers: Handlers<T, V>
): T {
  return handlers[value](value);
}
