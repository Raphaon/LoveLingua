export const parseJson = <T>(value: string | null | undefined, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    return fallback;
  }
};

export const stringifyJson = (value: unknown): string => {
  try {
    return JSON.stringify(value ?? {});
  } catch (error) {
    return '{}';
  }
};
