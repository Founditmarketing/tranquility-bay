import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Maximize2, ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MapPage() {
    const [selectedImage, setSelectedImage] = useState<boolean>(false);
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));
    const handleReset = () => setZoom(1);

    return (
        <div className="min-h-screen bg-resort-mist pt-32 pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-resort-green hover:text-resort-black transition-colors font-sans text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            <ChevronLeft size={16} />
                            Back to Resort
                        </Link>
                        <h1 className="font-serif text-5xl md:text-7xl text-resort-black">
                            Resort <span className="italic">Map</span>
                        </h1>
                        <p className="mt-4 font-sans text-lg text-resort-black/60 max-w-xl">
                            Navigate your sanctuary. Explore our property layout, cabin locations, and premium RV sites on the shores of Toledo Bend.
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                        <span className="font-sans text-xs font-bold tracking-[0.2em] text-resort-accent uppercase">
                            Property Layout / 2026
                        </span>
                        <div className="h-px w-24 bg-resort-accent/30" />
                    </div>
                </div>

                {/* Map Display Container */}
                <div className="relative bg-resort-black/5 rounded-2xl border border-resort-black/10 overflow-hidden shadow-inner p-4 md:p-8">
                    {/* Controls */}
                    <div className="absolute top-8 right-8 z-10 flex flex-col gap-2">
                        <button
                            onClick={() => setSelectedImage(true)}
                            className="bg-white/80 backdrop-blur-md p-3 rounded-full text-resort-black hover:bg-resort-gold hover:text-white transition-all shadow-lg border border-black/5"
                            title="Full Screen"
                        >
                            <Maximize2 size={20} />
                        </button>
                        <button
                            onClick={handleZoomIn}
                            className="bg-white/80 backdrop-blur-md p-3 rounded-full text-resort-black hover:bg-resort-gold hover:text-white transition-all shadow-lg border border-black/5"
                            title="Zoom In"
                        >
                            <ZoomIn size={20} />
                        </button>
                        <button
                            onClick={handleZoomOut}
                            className="bg-white/80 backdrop-blur-md p-3 rounded-full text-resort-black hover:bg-resort-gold hover:text-white transition-all shadow-lg border border-black/5"
                            title="Zoom Out"
                        >
                            <ZoomOut size={20} />
                        </button>
                        <button
                            onClick={handleReset}
                            className="bg-white/80 backdrop-blur-md p-3 rounded-full text-resort-black hover:bg-resort-gold hover:text-white transition-all shadow-lg border border-black/5"
                            title="Reset Zoom"
                        >
                            <RotateCcw size={20} />
                        </button>
                    </div>

                    {/* Image Container with Zoom */}
                    <div className="w-full flex justify-center items-center overflow-auto min-h-[600px] cursor-grab active:cursor-grabbing scrollbar-hide">
                        <motion.div
                            animate={{ scale: zoom }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex justify-center"
                        >
                            <img
                                src="/tbaymap.png"
                                alt="Tranquility Bay Resort Map"
                                className="max-w-full h-auto shadow-2xl rounded-lg"
                                referrerPolicy="no-referrer"
                            />
                        </motion.div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <p className="font-sans text-xs font-bold text-resort-black/40 uppercase tracking-widest">
                            Interactive Property Guide / Tranquility Bay
                        </p>
                    </div>
                </div>

                {/* Lightbox Overlay */}
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-resort-black/98 flex items-center justify-center p-4 md:p-12 overflow-hidden"
                            onClick={() => setSelectedImage(false)}
                        >
                            <motion.button
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="absolute top-8 right-8 text-white hover:text-resort-gold transition-colors z-[110] p-2 bg-white/5 backdrop-blur-md rounded-full"
                                onClick={() => setSelectedImage(false)}
                            >
                                <X size={32} />
                            </motion.button>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="w-full h-full flex items-center justify-center p-4"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src="/tbaymap.png"
                                    alt="Tranquility Bay Resort Map Full"
                                    className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                                    referrerPolicy="no-referrer"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
