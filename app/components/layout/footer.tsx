import { Link } from "@tanstack/react-router";
import FluidText from "../fluid";

export default function Footer() {
  return (
    <div className="bg-brand min-h-[clamp(600px,70vh,800px)] text-white flex flex-col justify-between contain !p-12 relative">
      <div className="flex items-start justify-between">
        <div>
          <img src="/footer-arrow.svg" alt="Footer Arrow" className="w-auto" />
        </div>

        <div className="flex gap-16">
          <div className="flex flex-col gap-5">
            <p className="text-2xl font-medium">Quick Links</p>

            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                className="inline-block transition-opacity duration-300 opacity-50 hover:opacity-100"
              >
                Home
              </Link>
              <Link
                to="/"
                className="inline-block transition-opacity duration-300 opacity-50 hover:opacity-100"
              >
                My portfolio
              </Link>
              <Link
                to="/"
                className="inline-block transition-opacity duration-300 opacity-50 hover:opacity-100"
              >
                Book an appointment
              </Link>
              <Link
                to="/"
                className="inline-block transition-opacity duration-300 opacity-50 hover:opacity-100"
              >
                About me
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="text-2xl font-medium">Socials</p>

            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                className="inline-block transition-opacity duration-300 opacity-50 hover:opacity-100"
              >
                Instagram
              </Link>
              <Link
                to="/"
                className="inline-block transition-opacity duration-300 opacity-50 hover:opacity-100"
              >
                Facebook
              </Link>
              <Link
                to="/"
                className="inline-block transition-opacity duration-300 opacity-50 hover:opacity-100"
              >
                LinkedIn
              </Link>
              <Link
                to="/"
                className="inline-block transition-opacity duration-300 opacity-50 hover:opacity-100"
              >
                Twitter
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <FluidText text="Get In Touch" />

        <div className="flex items-center justify-between">
          <p className="text-3xl underline">diariesofanmua@gmail.com</p>

          <div className="flex items-center gap-10 text-xl">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2"
            >
              <span>Back to top</span>
              <img src="/arrow-up.svg" alt="Footer Arrow" className="w-auto" />
            </button>

            <p>Copyright &copy; Koko 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}
