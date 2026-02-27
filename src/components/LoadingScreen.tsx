import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const duration = 2500; // 2.5 seconds
        const interval = 20; // 20ms update interval
        const step = (100 / (duration / interval));

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onLoadingComplete, 500); // Small delay after bar fills
                    return 100;
                }
                return prev + step;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onLoadingComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-resort-black flex flex-col items-center justify-center overflow-hidden"
        >
            <div className="relative flex flex-col items-center max-w-sm w-full px-8">
                {/* Shimmering Logo Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="mb-12 relative group"
                >
                    {/* Main Logo */}
                    <img
                        src="/tbaytransparentborderlogo.png"
                        alt="Tranquility Bay Resort"
                        className="h-32 md:h-40 w-auto object-contain relative z-10"
                    />

                    {/* Subtle static glow behind logo */}
                    <div className="absolute inset-0 bg-resort-gold/10 blur-3xl rounded-full scale-150 -z-10" />
                </motion.div>

                {/* Elegant Message */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-serif text-2xl md:text-3xl text-white italic tracking-wide">
                        Experience <span className="text-resort-gold">Tranquility</span>
                    </h2>
                    <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/40 mt-3">
                        Loading your retreat
                    </p>
                </motion.div>

                {/* Refined Progress Bar Container */}
                <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                    {/* Progress Fill */}
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-resort-gold"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    />

                    {/* Subtle Glow */}
                    <motion.div
                        className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-resort-gold/50 to-transparent blur-sm"
                        animate={{
                            left: [`${progress - 20}%`, `${progress}%`],
                        }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    />
                </div>

                {/* percentage indicator */}
                <div className="mt-4 flex justify-between w-full">
                    <span className="font-sans text-[8px] uppercase tracking-widest text-resort-gold">Status</span>
                    <span className="font-sans text-[8px] uppercase tracking-widest text-white/40">{Math.round(progress)}%</span>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-resort-gold/5 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[120px]" />
            </div>
        </motion.div>
    );
}
