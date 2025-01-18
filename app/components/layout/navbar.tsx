import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export default function NavBar() {
  return (
    <nav className="relative flex items-center justify-between h-28 contain">
      <img src="/koko-logo.svg" alt="Koko Logo" />

      <div className="absolute flex items-center gap-8 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 isolate">
        <Link to="/" className="relative w-fit" viewTransition>
          {({ isActive }) => (
            <>
              <span>Home</span>
              {isActive && (
                <motion.span
                  className="absolute rounded-full -left-3 -bottom-1 bg-brand-alt size-8 -z-10 [view-transition-name:active-link]"
                  layoutId="active-link"
                ></motion.span>
              )}
            </>
          )}
        </Link>

        <Link to="/portfolio" className="relative w-fit" viewTransition>
          {({ isActive }) => (
            <>
              <span>Portfolio</span>
              {isActive && (
                <motion.span
                  className="absolute rounded-full -left-3 -bottom-1 bg-brand-alt size-8 -z-10 [view-transition-name:active-link]"
                  layoutId="active-link"
                ></motion.span>
              )}
            </>
          )}
        </Link>
      </div>

      <Button>Book an appointment</Button>
    </nav>
  );
}
