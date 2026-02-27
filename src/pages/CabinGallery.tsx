import { motion } from 'motion/react';
import { ChevronLeft, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CABIN_IMAGES = [
    // User will upload these. Using placeholders for structure.
    { url: "/tbaycabins.jpg", title: "Lakefront Cabin Exterior", category: "Exterior" },
    { url: "/tbaycabinpic.jpg", title: "Rustic Cabin Details", category: "Interior" },
    // Add more as they are uploaded
];

export default function CabinGallery() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
                            Take A <span className="italic">Look</span>
                        </h1>
                        <p className="mt-4 font-sans text-lg text-resort-black/60 max-w-xl">
                            Explore the rustic elegance and modern comfort of our lakeside cabins. Every detail designed for your sanctuary.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <span className="font-sans text-xs font-bold tracking-[0.2em] text-resort-accent uppercase">
                            Gallery Collection / 2026
                        </span>
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CABIN_IMAGES.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative aspect-[4/5] overflow-hidden bg-resort-black cursor-pointer"
                            onClick={() => setSelectedImage(index)}
                        >
                            <img
                                src={image.url}
                                alt={image.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-resort-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <span className="text-resort-accent font-sans text-[10px] uppercase tracking-widest block mb-2">{image.category}</span>
                                <h3 className="text-white font-serif text-xl">{image.title}</h3>
                            </div>

                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-white/10 backdrop-blur-md p-2 rounded-full text-white">
                                    <Maximize2 size={18} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Lightbox Placeholder */}
                {selectedImage !== null && (
                    <div
                        className="fixed inset-0 z-[100] bg-resort-black/95 flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            src={CABIN_IMAGES[selectedImage].url}
                            alt={CABIN_IMAGES[selectedImage].title}
                            className="max-w-full max-h-full object-contain"
                        />
                        <button
                            className="absolute top-8 right-8 text-white hover:text-resort-gold transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function X({ size }: { size: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
    );
}
