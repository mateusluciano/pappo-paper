import { useState, useEffect } from 'react';

export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer); // limpa o timer se o valor mudar antes do delay
  }, [value, delay]);

  return debounced;
}
