import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Method } from "@/components/method";
import { CursorPeek } from "@/components/cursor-peek";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Method />
      {/* Mounted once — follows the cursor over any [data-peek] row. */}
      <CursorPeek />
    </main>
  );
}
