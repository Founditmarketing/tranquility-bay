import { motion } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    // Calculate approximate card width + gap based on breakpoints
    const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.82 + 32 : 450 + 64;
    scrollRef.current.scrollBy({ 
      left: direction === 'left' ? -scrollAmount : scrollAmount, 
      behavior: 'smooth' 
    });
  };

  return (
    <section id="stay" className="relative bg-resort-mist py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-start gap-12 md:gap-20">
        
        {/* Section Header */}
        <div className="flex-shrink-0 md:w-1/3 md:sticky md:top-32 z-10 pt-10">
          <h2 className="font-serif text-5xl text-resort-black md:text-7xl">
            {accommodations.sectionTitle} <br className="hidden md:block" /><span className="italic text-resort-green">{accommodations.sectionSubtitle}</span>
          </h2>
          
           {/* Responsive Descriptions */}
           <p className="mt-4 font-sans text-resort-black/60 text-lg">
            {/* @ts-ignore - Adding descriptionDesktop to resort-content later */}
            {accommodations.descriptionDesktop || accommodations.description}
          </p>

          <div className="mt-12 hidden md:block">
            <img
              src="/tbaytransparentlogo.png"
              alt="Resort Logo Accent"
              className="w-[280px] h-auto object-contain pointer-events-none opacity-40"
            />
          </div>

          {/* Scroll Controls */}
          <div className="mt-8 flex gap-4">
            <button 
              onClick={() => scrollByCard('left')}
              className="p-3 rounded-full border border-resort-black/20 hover:bg-resort-black hover:text-white transition-colors text-resort-black"
              aria-label="Scroll Left"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scrollByCard('right')}
              className="p-3 rounded-full border border-resort-black/20 hover:bg-resort-black hover:text-white transition-colors text-resort-black"
              aria-label="Scroll Right"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Native Horizontal Scroll Track */}
        <div 
          ref={scrollRef}
          className="flex-1 w-full bg-transparent overflow-x-auto snap-x snap-mandatory flex gap-6 md:gap-8 pb-8 hide-scrollbar"
        >
          {accommodations.items.map((item) => (
            <motion.div 
               key={item.id} 
               className="snap-start shrink-0"
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "0px 100px 0px 0px" }}
               transition={{ duration: 0.5 }}
            >
               <Card item={item} />
            </motion.div>
          ))}

          {/* CTA Card at the end */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="snap-start relative h-[500px] w-[82vw] md:h-[600px] md:w-[450px] flex-shrink-0 flex-col items-center justify-center overflow-hidden"
          >
            <img
              src="/tbaywaterpic2.jpg"
              alt="Ready to Book"
              className="absolute inset-0 h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-resort-black/80" />
            <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center h-full">
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
          </motion.div>
        </div>

      </div>
      {/* Inject minimal style to hide scrollbar but keep functionality */}
      <style dangerouslySetInnerHTML={{ __html: `
          .hide-scrollbar::-webkit-scrollbar {
              display: none;
          }
          .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
          }
      `}} />
    </section>
  );
}
