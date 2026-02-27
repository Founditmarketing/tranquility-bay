import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Calendar, X, Home, Truck, Tent } from 'lucide-react';

const BOOKING_OPTIONS = [
    {
        label: "Cabins",
        description: "Lakefront & Woodland Escapes",
        href: "https://v2.reservationkey.com/tranquilitybayresort/reserve/c",
        tagline: "The Sanctuary"
    },
    {
        label: "Mobile Homes",
        description: "Modern Comfort by the Water",
        href: "https://v2.reservationkey.com/tranquilitybayresort/112929/c",
        tagline: "Lakeside Living"
    },
    {
        label: "RV Spots",
        description: "Premium Lake-Side Sites",
        href: "https://v2.reservationkey.com/tranquilitybayresort/112928/c",
        tagline: "Nature Reborn"
    }
];

export default function BookingWidget() {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Show after scrolling 600px (past hero)
        if (latest > 600) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
            setIsOpen(false);
        }
    });

    return (
        <>
            {/* Floating Toggle Button */}
            <AnimatePresence>
                {isVisible && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[70] bg-resort-black text-white p-4 md:px-6 md:py-4 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] flex items-center gap-4 border border-white/10 group overflow-hidden"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            className="text-resort-gold"
                        >
                            <Calendar size={20} />
                        </motion.div>
                        <span className="hidden md:block font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">Quick Reservation</span>
                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-6 text-white">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-resort-black/80 backdrop-blur-xl"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative w-[92%] max-w-xl bg-resort-black/95 backdrop-blur-3xl rounded-[32px] md:rounded-[40px] p-8 md:p-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border border-white/10 overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-8 right-8 p-2 rounded-full hover:bg-white/5 transition-all text-white/20 hover:text-white group"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>

                            <div className="mb-10 text-center md:text-left">
                                <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-resort-gold font-bold mb-4 block">Your Escape Awaits</span>
                                <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                                    What would you <br />
                                    <span className="italic text-white/70">like to reserve?</span>
                                </h2>
                            </div>

                            <div className="flex flex-col gap-3">
                                {BOOKING_OPTIONS.map((option, i) => (
                                    <motion.a
                                        key={option.label}
                                        href={option.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.1) }}
                                        className="group relative flex items-center justify-between p-6 rounded-[20px] bg-white/5 border border-white/[0.05] hover:bg-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden"
                                    >
                                        <div className="relative z-10">
                                            <span className="font-sans text-[8px] uppercase tracking-[0.3em] text-resort-gold/50 font-bold block mb-1">{option.tagline}</span>
                                            <h3 className="font-serif text-xl md:text-2xl text-white">{option.label}</h3>
                                            <p className="font-sans text-[9px] text-white/40 uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-1 group-hover:translate-y-0 italic mt-1">{option.description}</p>
                                        </div>

                                        <div className="relative z-10 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-resort-gold group-hover:text-resort-black transition-all duration-500">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </div>

                                        <div className="absolute inset-0 bg-gradient-to-r from-resort-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    </motion.a>
                                ))}
                            </div>

                            <div className="mt-10 flex items-center justify-center gap-4">
                                <div className="h-px flex-1 bg-white/[0.05]" />
                                <p className="font-sans text-[8px] text-white/20 uppercase tracking-[0.3em] font-medium whitespace-nowrap">
                                    Trusted Quality Reservations
                                </p>
                                <div className="h-px flex-1 bg-white/[0.05]" />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
