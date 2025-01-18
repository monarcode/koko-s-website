import { useEffect, useState } from "react";

/**
 * A utility component that displays the current viewport dimensions and Tailwind CSS breakpoint.
 * This component appears as a fixed overlay at the bottom-right corner of the viewport.
 *
 * Features:
 * - Real-time viewport dimensions (width × height)
 * - Current Tailwind breakpoint indicator (XS, SM, MD, LG, XL, 2XL)
 * - Responsive design that updates on window resize
 * - Fixed positioning for consistent visibility
 *
 * Breakpoints:
 * - XS: < 640px
 * - SM: 640px - 767px
 * - MD: 768px - 1023px
 * - LG: 1024px - 1279px
 * - XL: 1280px - 1535px
 * - 2XL: ≥ 1536px
 */
export default function TailwindDisplayClass() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const { width, height } = dimensions;

  return (
    <div className="fixed bottom-5 right-5 flex items-center gap-2 rounded-full bg-black px-2.5 py-1 font-mono text-xs font-medium text-white">
      <span className="opacity-50">
        {width.toLocaleString()} x {height.toLocaleString()}
      </span>
      <div className="w-px h-4 bg-gray-800" />
      <span className="sm:hidden">XS</span>
      <span className="hidden sm:inline md:hidden">SM</span>
      <span className="hidden md:inline lg:hidden">MD</span>
      <span className="hidden lg:inline xl:hidden">LG</span>
      <span className="hidden xl:inline 2xl:hidden">XL</span>
      <span className="hidden 2xl:inline">2XL</span>
    </div>
  );
}
