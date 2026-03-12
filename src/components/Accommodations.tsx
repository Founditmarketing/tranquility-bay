import { motion, useTransform, useScroll } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { resortContent } from "../resort-content";

const Card = ({ item }: { item: typeof resortContent.accommodations.items[0] }) => {
  return (
    <div
      id={item.id === 1 ? "cabins" : item.id === 2 ? "rv-spots" : "mobile-homes"}
      className="group relative h-[500px] w-[82vw] md:h-[600px] md:w-[450px] flex-shrink-0 cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 transition-transform duration-700 md:group-hover:scale-110">
        <img
          src={item.image}
          alt={item.title}
          className="object-cover w-full h-full"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-resort-black/99 via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-resort-black/0 transition-colors duration-500 md:group-hover:bg-resort-black/60" />
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-500 md:group-hover:-translate-y-4 text-left">
        <span className="mb-2 block font-sans text-xs font-bold tracking-[0.2em] text-resort-gold uppercase">
          {item.category}
        </span>
        <h3 className="font-serif text-3xl text-white md:text-4xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-xs font-sans text-sm font-light leading-relaxed text-white/80 opacity-100 md:opacity-0 transition-opacity duration-500 md:group-hover:opacity-100">
          {item.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-6 opacity-100 md:opacity-0 transition-opacity delay-100 duration-500 md:group-hover:opacity-100">
          {(item as any).galleryUrl && (
             <Link
               to={(item as any).galleryUrl}
               className="inline-block border-b border-white pb-1 font-sans text-xs font-bold tracking-widest text-white uppercase hover:text-resort-gold hover:border-resort-gold transition-colors"
             >
               Take A Look
             </Link>
          )}
          <a
            href={item.bookingUrl || resortContent.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-b border-resort-gold pb-1 font-sans text-xs font-bold tracking-widest text-resort-gold uppercase hover:text-white hover:border-white transition-colors"
          >
            Check Rates
          </a>
        </div>
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

  // Calculate precise translation for mobile centering
  // For mobile: 3 items, 82vw width, gap-8 (32px), pl-[9vw] centers first card.
  // We need to move exactly -(82vw + 32px) for each subsequent card.
  const xResponsive = useTransform(scrollYProgress, (latest) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      const cardWidth = window.innerWidth * 0.82;
      const gap = 32;
      const totalMove = (cardWidth + gap) * 3;
      return `-${latest * totalMove}px`;
    }
    // Desktop: 4 items total, pl-[40vw], move enough to get through them
    return `${1 - latest * 56}%`;
  });

  const logoOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  // Header fades out as horizontal scroll begins
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={targetRef} id="stay" className="relative h-[200vh] md:h-[300vh] bg-resort-mist">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Section Header */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute left-8 top-10 z-10 max-w-2xl md:left-20 md:top-28"
        >
          <h2 className="font-serif text-5xl text-resort-black md:text-7xl whitespace-nowrap">
            {accommodations.sectionTitle} <span className="italic text-resort-green">{accommodations.sectionSubtitle}</span>
          </h2>
          {/* Responsive Descriptions */}
          <p className="mt-1 font-sans text-resort-black/60 text-sm md:hidden">
            {accommodations.description}
          </p>
          <p className="hidden md:block mt-4 font-sans text-resort-black/60 text-lg pr-24">
            {/* @ts-ignore - Adding descriptionDesktop to resort-content later */}
            {accommodations.descriptionDesktop || accommodations.description}
          </p>

          {/* Floating Logo - Fades as well since it's inside or via logoOpacity */}
          <motion.div
            style={{ opacity: logoOpacity }}
            className="mt-8 md:mt-12 hidden md:block"
          >
            <img
              src="/tbaytransparentlogo.png"
              alt="Resort Logo Accent"
              className="w-[280px] md:w-[500px] h-auto object-contain pointer-events-none"
            />
          </motion.div>
        </motion.div>

        {/* Horizontal Moving Track */}
        <motion.div style={{ x: xResponsive }} className="flex gap-8 pl-[9vw] md:gap-16 md:pl-[40vw]">
          {accommodations.items.map((item) => (
            <Card key={item.id} item={item} />
          ))}

          {/* CTA Card at the end - Hidden on mobile */}
          <div className="hidden md:flex relative h-[450px] w-[300px] flex-shrink-0 flex-col items-center justify-center overflow-hidden md:h-[600px] md:w-[450px]">
            <img
              src="/tbaywaterpic2.jpg"
              alt="Ready to Book"
              className="absolute inset-0 h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-resort-black/90" />
            <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
              <span className="mb-2 block font-sans text-xs font-bold tracking-[0.2em] text-resort-gold uppercase">
                Reservations
              </span>
              <h3 className="font-serif text-3xl text-white md:text-4xl">
                Ready to Book?
              </h3>
              <a
                href={resortContent.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block border-b border-resort-gold pb-1 font-sans text-xs font-bold tracking-widest text-white uppercase transition-colors hover:text-resort-gold"
              >
                Reserve Now
              </a>
            </div>
          </div>
        </motion.div>

        {/* Mobile Logo Accent - Positioned at bottom to fill gap */}
        <div className="md:hidden absolute bottom-4 left-0 right-0 z-10 flex justify-center px-8">
          <img
            src="/tbaytransparentlogo.png"
            alt="Resort Logo Accent"
            className="w-[160px] h-auto object-contain pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
