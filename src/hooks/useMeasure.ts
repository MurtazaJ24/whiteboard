import { useState, useRef, useEffect } from 'react';

interface Size {
  width: number;
  height: number;
}

function useMeasure<T extends HTMLElement>(): [React.RefObject<T>, Size] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });

  useEffect(() => {
    const target = ref.current;

    if (!target) return;

    const resizeObserver = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    resizeObserver.observe(target);

    return () => {
      resizeObserver.unobserve(target);
    };
  }, []);

  return [ref, size];
}

export default useMeasure;
