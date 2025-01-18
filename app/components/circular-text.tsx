"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

// Utility function to calculate position on a circle
const getCirclePosition = (angle: number, radius: number) => ({
  x: Math.cos(angle) * radius,
  y: Math.sin(angle) * radius,
});

// Custom hook to calculate character positions
const useCircularText = (text: string, radius: number) => {
  const [characters, setCharacters] = useState<
    Array<{ char: string; position: { x: number; y: number } }>
  >([]);

  useEffect(() => {
    const angleStep = (Math.PI * 2) / text.length;
    const newCharacters = text.split("").map((char, index) => ({
      char,
      position: getCirclePosition(index * angleStep, radius),
    }));
    setCharacters(newCharacters);
  }, [text, radius]);

  return characters;
};

interface AnimatedCircularTextProps {
  text: string;
  radius?: number;
  duration?: number;
  fontSize?: number;
  color?: string;
}

const AnimatedCircularText: React.FC<AnimatedCircularTextProps> = ({
  text,
  radius = 100,
  duration = 10,
  fontSize = 16,
  color = "black",
}) => {
  const characters = useCircularText(text, radius);

  return (
    <motion.div
      style={{
        position: "relative",
        width: radius * 2,
        height: radius * 2,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {characters.map((char, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(${char.position.x}px, ${char.position.y}px) rotate(${
              (index * 360) / text.length
            }deg)`,
            fontSize: `${fontSize}px`,
            color: color,
          }}
        >
          {char.char}
        </div>
      ))}
    </motion.div>
  );
};

export default AnimatedCircularText;
