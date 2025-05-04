import { useEffect, useRef } from "react";

type ThrottleFunction = (...args: any[]) => void;

export const useThrottle = (callback: ThrottleFunction, delay: number) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastCalledRef = useRef<number>(0);

  const throttledCallback = (...args: any[]) => {
    const now = Date.now();

    if (now - lastCalledRef.current >= delay) {
      callback(...args);
      lastCalledRef.current = now;
    } else {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(
        () => {
          callback(...args);
          lastCalledRef.current = Date.now();
        },
        delay - (now - lastCalledRef.current)
      );
    }
  };

  // Cleanup the timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return throttledCallback;
};
