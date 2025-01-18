import { TextAnimate } from "@/components/ui/text-animate";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <div className="relative space-y-8 contain">
      <div className="flex items-center justify-center w-fullst">
        <TextAnimate
          animation="slideUp"
          by="word"
          className="text-[clamp(2rem,calc(14vw+1rem),100rem)] font-abiah text-center text-brand-light"
          segmentClassName="last-of-type:text-brand-dark"
        >
          Makeup By Koko
        </TextAnimate>
      </div>
      <motion.div
        className="grid grid-cols-1 gap-8 md:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="relative col-span-1 md:col-span-2 lg:col-span-1">
          <AnimatedParagraph />
        </motion.div>
      </motion.div>

      <button className="absolute bottom-0 flex items-center gap-4 right-5">
        <span className="text-brand-dark">Explore</span>
        <span className="grid rounded-full size-14 bg-brand place-items-center">
          <img src="/explore-arrow.svg" alt="" />
        </span>
      </button>
    </div>
  );
}

const AnimatedParagraph = () => {
  const lines = [
    <>
      <span className="text-[#C9C1C5]">We blend </span>expert education{" "}
      <span className="text-[#C9C1C5]">with</span>
    </>,
    <>
      luxury beauty services,{" "}
      <span className="text-[#C9C1C5]">creating a space</span>
    </>,
    <>
      where artistry flourishes <span className="text-[#C9C1C5]">and</span>{" "}
      confidence takes center stage.
    </>,
  ];

  return (
    <p className="text-xl leading-relaxed sm:text-2xl text-brand-dark">
      {lines.map((line, index) => (
        <AnimatedLine key={index} delay={index * 0.5}>
          {line}
        </AnimatedLine>
      ))}
    </p>
  );
};

const AnimatedLine = ({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) => {
  return (
    <motion.span
      className="block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.2, 0.65, 0.3, 0.9],
      }}
    >
      {children}
    </motion.span>
  );
};
