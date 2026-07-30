import Image from "next/image";
import memoji from "../../public/memoji.png";

/**
 * A6/A7 — floating memoji. The image levitates on a 9s loop with a synced
 * floor shadow (`.avatar::after`), a soft drop-shadow, and a spring pop on
 * hover (`scale(1.07) rotate(-3deg)`). All motion lives in globals.css so
 * reduced-motion can switch it off in one place.
 *
 * The memoji is transparent and must never sit inside a coloured bubble
 * (components.md) — it floats directly on the page.
 */
export function Avatar() {
  return (
    <div className="avatar">
      <Image src={memoji} alt="Memoji af Benjamin" priority sizes="170px" />
    </div>
  );
}
