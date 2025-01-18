"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  TextAnimateProps,
  defaultContainerVariants,
  defaultItemAnimationVariants,
  defaultItemVariants,
  staggerTimings,
} from "./ui/text-animate";

// ... existing animation types and interfaces from text-animate.tsx ...

interface FluidAnimateProps extends TextAnimateProps {
  minFontSize?: number;
  maxFontSize?: number;
}

export default function FluidAnimate({
  children,
  delay = 0,
  duration = 0.3,
  variants,
  className,
  segmentClassName,
  as: Component = "h1",
  startOnView = true,
  once = false,
  by = "word",
  animation = "fadeIn",
  minFontSize = 16,
  maxFontSize = 600,
  ...props
}: FluidAnimateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(minFontSize);
  const MotionComponent = motion.create(Component);

  // Fluid text sizing logic
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

      // Start with maximum size and work down
      textElement.style.fontSize = `${high}px`;

      // If text is smaller than container at max size, keep max size
      if (textElement.scrollWidth <= container.clientWidth) {
        setFontSize(high);
        return;
      }

      // Binary search for the largest font size that fits
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        textElement.style.fontSize = `${mid}px`;

        if (textElement.scrollWidth <= container.clientWidth) {
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      // high is now the largest size that fits
      const finalSize = Math.max(minFontSize, high);
      setFontSize(finalSize);
    }

    adjustFontSize();

    // Also adjust on window resize
    window.addEventListener("resize", adjustFontSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", adjustFontSize);
    };
  }, [children, minFontSize, maxFontSize]);

  // Animation logic
  const finalVariants = animation
    ? {
        container: {
          ...defaultItemAnimationVariants[animation].container,
          show: {
            ...defaultItemAnimationVariants[animation].container.show,
            transition: {
              staggerChildren: staggerTimings[by],
            },
          },
          exit: {
            ...defaultItemAnimationVariants[animation].container.exit,
            transition: {
              staggerChildren: staggerTimings[by],
              staggerDirection: -1,
            },
          },
        },
        item: defaultItemAnimationVariants[animation].item,
      }
    : { container: defaultContainerVariants, item: defaultItemVariants };

  let segments: string[] = [];
  switch (by) {
    case "word":
      segments = children.split(/(\s+)/);
      break;
    case "character":
      segments = children.split("");
      break;
    case "line":
      segments = children.split("\n");
      break;
    case "text":
    default:
      segments = [children];
      break;
  }

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <MotionComponent
          ref={textRef}
          variants={finalVariants.container}
          initial="hidden"
          whileInView={startOnView ? "show" : undefined}
          animate={startOnView ? undefined : "show"}
          exit="exit"
          className={cn("whitespace-nowrap font-abiah", className)}
          style={{
            fontSize: `${fontSize}px`,
            width: "fit-content",
          }}
          {...props}
        >
          {segments.map((segment, i) => (
            <motion.span
              key={`${by}-${segment}-${i}`}
              variants={finalVariants.item}
              custom={i * staggerTimings[by]}
              className={cn(
                by === "line" ? "block" : "inline-block whitespace-pre",
                segmentClassName
              )}
            >
              {segment}
            </motion.span>
          ))}
        </MotionComponent>
      </AnimatePresence>
    </div>
  );
}
