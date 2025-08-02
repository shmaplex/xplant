import { useEffect, useRef } from "react";

export function useAutosave(
  callback: () => Promise<void>,
  deps: any[],
  options?: { debounceMs?: number; intervalMs?: number }
) {
  const { debounceMs = 1500, intervalMs = 45000 } = options || {};
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  // Debounced save on deps change
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      callback();
    }, debounceMs);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [...deps, callback, debounceMs]);

  // Interval save every intervalMs regardless of typing
  useEffect(() => {
    intervalId.current = setInterval(() => {
      callback();
    }, intervalMs);

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [callback, intervalMs]);
}
