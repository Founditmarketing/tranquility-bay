import { motion } from 'motion/react';
import { ChevronLeft, Maximize2, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import rvGalleries from '../data/rv-galleries.json';

type SelectedImage = {
    galleryIndex: number;
    imageIndex: number;
} | null;

export default function RVSportGallery() {
    const [selectedImage, setSelectedImage] = useState<SelectedImage>(null);

    return (
        <div 
            className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-cover bg-center bg-fixed"
            style={{ backgroundImage: "url('/sandy_beach_background.png')" }}
        >
            <div className="max-w-7xl mx-auto bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-resort-green hover:text-resort-black transition-colors font-sans text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            <ChevronLeft size={16} />
                            Back to Resort
                        </Link>
                        <h1 className="font-serif text-5xl md:text-7xl text-resort-black">
                            RV Spots <span className="italic">Gallery</span>
                        </h1>
                        <p className="mt-4 font-sans text-lg text-resort-black/60 max-w-xl">
                            Concrete pads nestled under native towering pines, right against the peaceful shoreline of Toledo Bend.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <span className="font-sans text-xs font-bold tracking-[0.2em] text-resort-accent uppercase">
                            Gallery Collection / 2026
                        </span>
                    </div>
                </div>

                {/* Galleries */}
                <div className="flex flex-col gap-20">
                    {rvGalleries.map((gallery, galleryIndex) => (
                        <div key={gallery.title} className="flex flex-col gap-6">
                            <h2 className="font-serif text-3xl md:text-4xl text-resort-black border-b border-resort-black/10 pb-4">
                                {gallery.title}
                            </h2>
                            
                            {/* Horizontal Scroll Reel */}
                            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
                                {gallery.images.map((imgUrl, imageIndex) => (
                                    <motion.div
                                        key={imgUrl}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "0px 100px 0px 0px" }}
                                        transition={{ duration: 0.5, delay: Math.min(imageIndex * 0.1, 0.5) }}
                                        className="group relative w-72 md:w-96 shrink-0 aspect-[4/3] snap-start overflow-hidden bg-resort-black cursor-pointer shadow-lg"
                                        onClick={() => setSelectedImage({ galleryIndex, imageIndex })}
                                    >
                                        <img
                                            src={imgUrl}
                                            alt={`${gallery.title} Image ${imageIndex + 1}`}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-resort-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="bg-white/10 backdrop-blur-md p-2 rounded-full text-white">
                                                <Maximize2 size={16} />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lightbox */}
                {selectedImage !== null && (
                    <div
                        className="fixed inset-0 z-[100] bg-resort-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            src={rvGalleries[selectedImage.galleryIndex].images[selectedImage.imageIndex]}
                            alt="Fullscreen view"
                            className="max-w-full max-h-full object-contain shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking image
                        />
                        <button
                            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={24} />
                        </button>
                        <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white/70 font-sans text-sm tracking-widest uppercase">
                            {rvGalleries[selectedImage.galleryIndex].title} — {selectedImage.imageIndex + 1} / {rvGalleries[selectedImage.galleryIndex].images.length}
                        </div>
                    </div>
                )}
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
        </div>
    );
}
