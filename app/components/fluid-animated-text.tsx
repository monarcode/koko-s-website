import { cn } from "@/lib/utils";
import { motion, MotionProps, Variants } from "framer-motion";
import { ElementType, useEffect, useRef, useState } from "react";

export type AnimationType = "text" | "word" | "character" | "line";
export type AnimationVariant =
  | "fadeIn"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown";

export interface FluidAnimatedTextProps extends MotionProps {
  children: string;
  className?: string;
  segmentClassName?: string;
  delay?: number;
  duration?: number;
  variants?: Variants;
  as?: ElementType;
  by?: AnimationType;
  startOnView?: boolean;
  once?: boolean;
  animation?: AnimationVariant;
  minFontSize?: number;
  maxFontSize?: number;
}

const staggerTimings: Record<AnimationType, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const createContainerVariants = (by: AnimationType) => ({
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTimings[by],
      delayChildren: 0,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: staggerTimings[by],
      staggerDirection: -1,
    },
  },
});

const defaultAnimationVariants: Record<AnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      filter: "blur(10px)",
      transition: { duration: 0.3, ease: "easeIn" },
    },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  },
  blurInDown: {
    hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      filter: "blur(10px)",
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 1.2 },
    show: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 },
  },
};

export default function FluidAnimatedText({
  children,
  delay = 0,
  duration = 0.3,
  variants,
  className,
  segmentClassName,
  as = "div",
  startOnView = true,
  once = false,
  by = "word",
  animation = "fadeIn",
  minFontSize = 20,
  maxFontSize = 300,
  ...props
}: FluidAnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(minFontSize);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measureDiv = document.createElement("div");
    measureDiv.style.position = "absolute";
    measureDiv.style.visibility = "hidden";
    measureDiv.style.height = "auto";
    measureDiv.style.width = "auto";
    measureDiv.style.whiteSpace = "nowrap";
    measureDiv.style.display = "inline-block";
    measureDiv.textContent = children;
    document.body.appendChild(measureDiv);

    const resizeObserver = new ResizeObserver(() => {
      adjustFontSize(measureDiv);
    });

    resizeObserver.observe(container);

    function adjustFontSize(measureElement: HTMLElement) {
      let low = minFontSize;
      let high = maxFontSize;
      let bestFit = minFontSize;

      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        measureElement.style.fontSize = `${mid}px`;

        const containerWidth = container.clientWidth;
        const elementWidth = measureElement.offsetWidth;

        if (elementWidth <= containerWidth) {
          bestFit = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      setFontSize(bestFit);
    }

    adjustFontSize(measureDiv);

    return () => {
      resizeObserver.disconnect();
      document.body.removeChild(measureDiv);
    };
  }, [children, minFontSize, maxFontSize]);

  const segments =
    by === "word"
      ? children.split(/(\s+)/)
      : by === "character"
        ? children.split("")
        : by === "line"
          ? children.split("\n")
          : [children];

  const Component = motion[as as keyof typeof motion] as React.ElementType;

  return (
    <div ref={containerRef} className="w-full">
      <Component
        initial="hidden"
        animate="show"
        exit="exit"
        className={cn("w-full flex items-center justify-center", className)}
        style={{ fontSize: `${fontSize}px` }}
        variants={createContainerVariants(by)}
        {...props}
      >
        {segments.map((segment, i) => (
          <motion.span
            key={`${by}-${segment}-${i}`}
            variants={variants || defaultAnimationVariants[animation]}
            className={cn(
              "inline-block",
              by === "line" ? "block" : "whitespace-pre",
              segmentClassName
            )}
          >
            {segment}
          </motion.span>
        ))}
      </Component>
    </div>
  );
}
