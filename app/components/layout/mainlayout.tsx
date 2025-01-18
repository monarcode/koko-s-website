import { useLenis } from "lenis/react";
import { ReactNode } from "react";
import Footer from "./footer";
import NavBar from "./navbar";

export default function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const lenis = useLenis();

  return (
    <div className="flex flex-col w-screen min-h-dvh">
      <div className="relative z-10 flex flex-col bg-[#FBFFFE]">
        <NavBar />
        {children}
      </div>

      <div className="sticky inset-x-0 bottom-0 z-0 flex flex-col">
        <img
          src="/koko-logo-large.svg"
          alt="Koko Logo"
          className="w-[clamp(200px, 10vw, 800px)] h-80 relative translate-y-20 mx-auto"
        />
        <Footer />
      </div>
    </div>
  );
}
