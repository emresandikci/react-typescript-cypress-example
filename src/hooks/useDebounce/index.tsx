import { useEffect, useState } from 'react';

export default function useDebounce<T, TRef>(
  value: T,
  delay: number,
  elementRef: React.RefObject<TRef>,
  callback?: (value: T) => void
) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (elementRef.current === document.activeElement) {
        if (typeof callback === 'function') callback(value);
        setDebouncedValue(value);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, elementRef, callback]);

  return debouncedValue;
}
