import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Method } from "@/components/method";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { CursorPeek } from "@/components/cursor-peek";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Projects />
      <Method />
      <Experience />
      <About />
      <Footer />
      {/* Mounted once — follows the cursor over any [data-peek] row. */}
      <CursorPeek />
    </main>
  );
}
