import { useEffect, useRef, useState } from "react";

interface FluidTextProps {
  text: string;
  minFontSize?: number;
  maxFontSize?: number;
}

export default function FluidText({
  text,
  minFontSize = 16,
  maxFontSize = 600,
}: FluidTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(minFontSize);

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;

    if (!container || !textElement) return;

    const resizeObserver = new ResizeObserver(() => {
      adjustFontSize();
    });

    resizeObserver.observe(container);

    function adjustFontSize() {
      let low = minFontSize;
      let high = maxFontSize;
      let current = (low + high) / 2;

      while (low <= high) {
        // @ts-ignore
        textElement.style.fontSize = `${current}px`;

        // @ts-ignore
        if (textElement.scrollWidth <= container.clientWidth) {
          low = current + 1;
        } else {
          high = current - 1;
        }

        current = (low + high) / 2;
      }

      setFontSize(Math.floor(high));
    }

    adjustFontSize();

    return () => {
      resizeObserver.disconnect();
    };
  }, [text, minFontSize, maxFontSize]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <h1
        ref={textRef}
        className="font-light leading-none font-sofia-pro whitespace-nowrap"
        style={{ fontSize: `${fontSize}px` }}
      >
        {text}
      </h1>
    </div>
  );
}
