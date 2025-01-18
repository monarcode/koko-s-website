import About from "@/modules/home/components/about";
import Banner from "@/modules/home/components/banner";
import Hero from "@/modules/home/components/hero";
import Services from "@/modules/home/components/services";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col gap-y-28">
      <Hero />
      <Banner />
      <About />
      <Services />
    </div>
  );
}
