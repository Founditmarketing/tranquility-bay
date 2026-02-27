import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Calendar, Users, Home, Search, ChevronDown } from "lucide-react";
import { resortContent } from "../resort-content";

const BACKGROUND_IMAGES = [
  "/tbaycabinpic.jpg",
  "/tbaypavillionpic2.jpg",
  "/tbaywaterpic2.jpg"
];

interface HeroProps {
  startAnimation?: boolean;
}

export default function Hero({ startAnimation = true }: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selections, setSelections] = useState({
    occasion: "Family Vacation",
    guests: "1-2 Guests",
    lodging: "Cabins"
  });

  const { hero } = resortContent;
  const { scrollY } = useScroll();

  // Logo fades out quickly as we scroll (from 0 to 100px)
  const logoOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.95]);

  useEffect(() => {
    if (!startAnimation) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [startAnimation]);

  const getBookingUrl = () => {
    switch (selections.lodging) {
      case "Mobile Homes":
        return "https://v2.reservationkey.com/tranquilitybayresort/112929/c";
      case "RV Spots":
        return "https://v2.reservationkey.com/tranquilitybayresort/112928/c";
      default:
        return "https://v2.reservationkey.com/tranquilitybayresort/reserve/c";
    }
  };

  return (
    <div id="home" className="relative h-[85vh] min-h-[600px] md:h-screen w-full overflow-hidden bg-resort-black">
      {/* Background Images with Seamless Crossfade and Slow Zoom */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1 }}
          animate={startAnimation ? { opacity: 1, scale: 1.1 } : { opacity: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 4, ease: "easeInOut" },
            scale: { duration: 12, ease: "linear" }
          }}
          className="absolute inset-0 z-0"
        >
          <img
            src={BACKGROUND_IMAGES[currentImageIndex]}
            alt="Tranquility Bay Resort"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-resort-black/50 bg-gradient-to-t from-resort-black/90 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content & Availability Bar */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-[15px] md:justify-center md:pb-0 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="pt-32 mb-[40px] md:pt-0 md:mb-12 flex flex-col items-center"
        >
          <span className="mb-4 block font-sans text-sm font-bold tracking-[0.2em] text-resort-gold uppercase">
            {hero.location}
          </span>

          {/* Mobile Logo vs Desktop Title */}
          <div className="relative w-full flex justify-center items-center">
            {/* Desktop Title */}
            <h1 className="hidden md:block font-serif text-5xl font-light italic text-white md:text-7xl lg:text-8xl">
              {hero.title}
            </h1>

            {/* Mobile Logo with Scroll Fade */}
            <motion.div
              style={{ opacity: logoOpacity, scale: logoScale }}
              className="md:hidden flex justify-center"
            >
              <img
                src="/tbaytransparentborderlogo.png"
                alt="Tranquility Bay Logo"
                className="w-72 h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>

          <p className="mt-6 max-w-lg font-sans text-lg font-light text-resort-mist/90 mx-auto italic leading-relaxed">
            {hero.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative md:absolute md:bottom-12 left-0 right-0 z-20 mx-auto w-full max-w-5xl"
        >
          <div className="flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-resort-black/40 backdrop-blur-xl p-2 shadow-2xl md:flex-row">
            {/* Occasion Dropdown */}
            <div className="group relative flex w-full flex-col border-b border-white/10 px-6 py-4 transition-colors hover:bg-white/5 md:w-1/4 md:border-b-0 md:border-r">
              <div className="flex items-center gap-2 text-resort-gold">
                <Calendar size={16} />
                <span className="font-sans text-xs font-bold uppercase tracking-wider">{hero.searchLabels.dates}</span>
              </div>
              <select
                value={selections.occasion}
                onChange={(e) => setSelections(prev => ({ ...prev, occasion: e.target.value }))}
                className="mt-1 w-full bg-transparent font-serif text-xl text-white outline-none appearance-none cursor-pointer"
              >
                <option value="Family Vacation" className="bg-resort-black text-white">Family Vacation</option>
                <option value="Romantic Getaway" className="bg-resort-black text-white">Romantic Getaway</option>
                <option value="Fishing Trip" className="bg-resort-black text-white">Fishing Trip</option>
                <option value="Corporate Event" className="bg-resort-black text-white">Corporate Event</option>
              </select>
            </div>

            {/* Guests Dropdown */}
            <div className="group relative flex w-full flex-col border-b border-white/10 px-6 py-4 transition-colors hover:bg-white/5 md:w-1/4 md:border-b-0 md:border-r">
              <div className="flex items-center gap-2 text-resort-gold">
                <Users size={16} />
                <span className="font-sans text-xs font-bold uppercase tracking-wider">{hero.searchLabels.guests}</span>
              </div>
              <select
                value={selections.guests}
                onChange={(e) => setSelections(prev => ({ ...prev, guests: e.target.value }))}
                className="mt-1 w-full bg-transparent font-serif text-xl text-white outline-none appearance-none cursor-pointer"
              >
                <option value="1-2 Guests" className="bg-resort-black text-white">1-2 Guests</option>
                <option value="3-5 Guests" className="bg-resort-black text-white">3-5 Guests</option>
                <option value="6+ Guests" className="bg-resort-black text-white">6+ Guests</option>
              </select>
            </div>

            {/* Lodging Dropdown */}
            <div className="group relative flex w-full flex-col px-6 py-4 transition-colors hover:bg-white/5 md:w-1/4">
              <div className="flex items-center gap-2 text-resort-gold">
                <Home size={16} />
                <span className="font-sans text-xs font-bold uppercase tracking-wider">{hero.searchLabels.lodging}</span>
              </div>
              <div className="relative mt-1">
                <select
                  value={selections.lodging}
                  onChange={(e) => setSelections(prev => ({ ...prev, lodging: e.target.value }))}
                  className="w-full bg-transparent font-serif text-xl text-white outline-none appearance-none cursor-pointer pr-8"
                >
                  <option value="Cabins" className="bg-resort-black text-white">Cabins</option>
                  <option value="Mobile Homes" className="bg-resort-black text-white">Mobile Homes</option>
                  <option value="RV Spots" className="bg-resort-black text-white">RV Spots</option>
                </select>
                <ChevronDown size={16} className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
              </div>
            </div>

            {/* Search Button */}
            <div className="p-2 w-full md:w-auto">
              <a
                href={getBookingUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-16 w-full items-center justify-center gap-2 rounded-xl bg-resort-gold px-8 font-sans text-sm font-bold tracking-widest text-resort-black transition-transform hover:scale-105 hover:shadow-lg hover:shadow-resort-gold/20 md:w-auto text-center"
              >
                <Search size={20} />
                <span>{hero.searchLabels.button}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Image Navigation (Vertical Bars) */}
      <div className="absolute right-4 top-[32%] md:top-1/2 z-30 flex -translate-y-1/2 flex-col gap-4 md:right-12">
        {BACKGROUND_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className="group relative h-12 w-1 overflow-hidden rounded-full bg-white/20 transition-all hover:bg-white/40"
          >
            <motion.div
              className="absolute inset-0 bg-resort-gold"
              initial={false}
              animate={{
                height: currentImageIndex === index ? "100%" : "0%"
              }}
              transition={{ duration: 0.5 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

