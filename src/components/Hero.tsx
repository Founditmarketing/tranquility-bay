import React, { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Users, Home, Search, ChevronDown } from "lucide-react";
import { resortContent } from "../resort-content";

export default function Hero() {
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const { hero } = resortContent;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video / Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={hero.backgroundImage}
          alt="Lake view"
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-resort-black/30 bg-gradient-to-t from-resort-black/80 via-transparent to-transparent" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="mb-4 block font-sans text-sm font-bold tracking-[0.2em] text-resort-gold uppercase">
            {hero.location}
          </span>
          <h1 className="font-serif text-5xl font-light italic text-white md:text-7xl lg:text-8xl">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-lg font-sans text-lg font-light text-resort-mist/90 mx-auto">
            {hero.tagline}
          </p>
        </motion.div>
      </div>

      {/* Floating Availability Bar */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-12 left-0 right-0 z-20 mx-auto w-full max-w-5xl px-4"
      >
        <div className="flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-resort-black/40 backdrop-blur-xl p-2 shadow-2xl md:flex-row">

          {/* Input Group: Dates */}
          <div
            className="group relative flex w-full cursor-pointer flex-col border-b border-white/10 px-6 py-4 transition-colors hover:bg-white/5 md:w-1/4 md:border-b-0 md:border-r"
            onClick={() => setActiveInput('dates')}
          >
            <div className="flex items-center gap-2 text-resort-gold">
              <Calendar size={16} />
              <span className="font-sans text-xs font-bold uppercase tracking-wider">{hero.searchLabels.dates}</span>
            </div>
            <span className="mt-1 font-serif text-xl text-white">Select Dates</span>
          </div>

          {/* Input Group: Guests */}
          <div
            className="group relative flex w-full cursor-pointer flex-col border-b border-white/10 px-6 py-4 transition-colors hover:bg-white/5 md:w-1/4 md:border-b-0 md:border-r"
            onClick={() => setActiveInput('guests')}
          >
            <div className="flex items-center gap-2 text-resort-gold">
              <Users size={16} />
              <span className="font-sans text-xs font-bold uppercase tracking-wider">{hero.searchLabels.guests}</span>
            </div>
            <span className="mt-1 font-serif text-xl text-white">2 Guests</span>
          </div>

          {/* Input Group: Accommodation Type */}
          <div
            className="group relative flex w-full cursor-pointer flex-col px-6 py-4 transition-colors hover:bg-white/5 md:w-1/4"
            onClick={() => setActiveInput('type')}
          >
            <div className="flex items-center gap-2 text-resort-gold">
              <Home size={16} />
              <span className="font-sans text-xs font-bold uppercase tracking-wider">{hero.searchLabels.lodging}</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="font-serif text-xl text-white">All Stays</span>
              <ChevronDown size={16} className="text-white/50" />
            </div>
          </div>

          {/* Search Button */}
          <div className="p-2 w-full md:w-auto">
            <a
              href={resortContent.bookingUrl}
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
  );
}

