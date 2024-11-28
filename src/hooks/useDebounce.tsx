"use client";
import { RgbColor } from "colord";
import { useEffect, useState } from "react";

export default function useDebounce(value: RgbColor, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
}
