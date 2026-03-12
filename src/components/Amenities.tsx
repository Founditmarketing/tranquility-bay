import { motion } from 'motion/react';
import { resortContent } from '../resort-content';

export default function Amenities() {
  const { amenities } = resortContent;

  return (
    <section id="amenities" className="py-24 bg-resort-black text-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <span className="mb-4 block font-sans text-sm font-bold tracking-[0.2em] text-resort-gold uppercase">
            {amenities.sectionLabel}
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light">
            {amenities.titlePrefix} <span className="italic text-resort-accent">{amenities.titleItalic}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-4 md:gap-6">
          {amenities.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative overflow-hidden ${item.span}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-resort-black/90 via-resort-black/20 to-transparent opacity-80 transition-opacity duration-500 md:group-hover:opacity-90" />

              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">{item.title}</h3>
                <p className="font-sans text-sm text-white/70 max-w-sm opacity-100 transform translate-y-0 md:opacity-0 md:translate-y-4 transition-all duration-500 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

