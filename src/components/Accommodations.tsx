import { motion, useTransform, useScroll } from "motion/react";
import { useRef } from "react";
import { resortContent } from "../resort-content";

const Card = ({ item }: { item: typeof resortContent.accommodations.items[0] }) => {
  return (
    <div className="group relative h-[450px] w-[350px] flex-shrink-0 cursor-pointer overflow-hidden md:h-[600px] md:w-[450px]">
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
        <img
          src={item.image}
          alt={item.title}
          className="object-cover w-full h-full"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-resort-black/90 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-500 group-hover:-translate-y-4">
        <span className="mb-2 block font-sans text-xs font-bold tracking-[0.2em] text-resort-gold uppercase">
          {item.category}
        </span>
        <h3 className="font-serif text-3xl text-white md:text-4xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-xs font-sans text-sm font-light leading-relaxed text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {item.description}
        </p>        <a
          href={resortContent.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block border-b border-resort-gold pb-1 font-sans text-xs font-bold tracking-widest text-white uppercase opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100"
        >
          Check Rates
        </a>
      </div>
    </div>
  );
};

export default function Accommodations() {
  const { accommodations } = resortContent;
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Mapping vertical scroll to horizontal movement - adjusted for 3 items
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-55%"]);

  return (
    <section ref={targetRef} id="stay" className="relative h-[300vh] bg-resort-mist">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Section Header */}
        <div className="absolute left-8 top-12 z-10 max-w-sm md:left-20 md:top-24">
          <h2 className="font-serif text-4xl text-resort-black md:text-6xl">
            {accommodations.sectionTitle} <br />
            <span className="italic text-resort-green">{accommodations.sectionSubtitle}</span>
          </h2>
          <p className="mt-4 font-sans text-resort-black/60">
            {accommodations.description}
          </p>
        </div>

        {/* Horizontal Moving Track */}
        <motion.div style={{ x }} className="flex gap-8 pl-[5vw] md:gap-16 md:pl-[40vw]">
          {accommodations.items.map((item) => (
            <Card key={item.id} item={item} />
          ))}

          {/* CTA Card at the end */}
          <div className="flex h-[450px] w-[300px] flex-shrink-0 flex-col items-center justify-center border border-resort-green/20 bg-resort-green/5 md:h-[600px] md:w-[450px]">
            <h3 className="font-serif text-3xl text-resort-green">Ready to Book?</h3>
            <a
              href={resortContent.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded-full bg-resort-green px-8 py-3 font-sans text-sm font-bold text-white transition-colors hover:bg-resort-black text-center"
            >
              Reserve Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
