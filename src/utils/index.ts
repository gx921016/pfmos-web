/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;
export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useDebounce = <V>(value: V, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
