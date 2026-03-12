import { motion } from 'motion/react';
import { resortContent } from '../resort-content';
import { Anchor } from 'lucide-react';

export default function AboutPage() {
  const { about } = resortContent;

  return (
    <div className="bg-resort-mist min-h-screen pt-24 pb-24">
      
      {/* Hero Section */}
      <div className="w-full h-[40vh] md:h-[60vh] relative mb-16 md:mb-24">
         <img 
           src={about.heroImage} 
           alt="Tranquility Bay Resort" 
           className="w-full h-full object-cover"
         />
         <div className="absolute inset-0 bg-resort-black/60 flex flex-col items-center justify-center px-6 text-center">
            <motion.span 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="mb-4 block font-sans text-sm md:text-md font-bold tracking-[0.3em] text-resort-gold uppercase"
            >
               {about.subtitle}
            </motion.span>
            <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="font-serif text-5xl md:text-8xl text-white max-w-4xl leading-tight"
            >
               {about.title}
            </motion.h1>
         </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column: Text & Features */}
        <div className="lg:col-span-7 flex flex-col justify-center">
           <div className="space-y-8 mb-16">
              {about.paragraphs.map((paragraph, index) => (
                 <motion.p 
                   key={index}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.6, delay: index * 0.1 }}
                   className="font-sans text-resort-black/80 text-lg md:text-xl leading-relaxed font-light"
                 >
                   {paragraph}
                 </motion.p>
              ))}
           </div>

           {/* Features Highlight Box */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="bg-resort-black text-white p-8 md:p-12 border-l-4 border-resort-gold"
           >
             <h3 className="font-serif text-3xl mb-8 flex items-center gap-4">
               <Anchor className="text-resort-gold" size={28} />
               Resort Highlights
             </h3>
             <ul className="space-y-6">
                {about.features.map((feature, index) => (
                   <li key={index} className="flex items-center gap-4 font-sans text-lg tracking-wide">
                      <div className="w-2 h-2 bg-resort-gold rounded-full shrink-0" />
                      <span>{feature}</span>
                   </li>
                ))}
             </ul>
           </motion.div>
        </div>

        {/* Right Column: Imagery */}
        <div className="lg:col-span-5 h-[600px] lg:h-auto relative hidden md:block">
           <motion.img 
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             src={about.secondaryImage} 
             alt="Resort Cabins" 
             className="w-full h-full object-cover shadow-2xl"
           />
           {/* Decorative overlapping frame */}
           <div className="absolute -inset-4 border-2 border-resort-gold/30 -z-10 transform translate-x-8 translate-y-8 hidden lg:block" />
        </div>

      </div>
    </div>
  );
}
