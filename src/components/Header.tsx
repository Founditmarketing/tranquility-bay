import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { resortContent } from '../resort-content';

export default function Header() {
  const { header } = resortContent;
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-resort-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer z-50">
            <span className="font-serif text-2xl italic text-white">{header.brandName}</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {header.navLinks.map((item) => (
              <a key={item.label} href={item.href} className="font-sans text-xs font-bold uppercase tracking-widest text-white/80 hover:text-resort-gold transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4 z-50">
            <a
              href={resortContent.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block border border-resort-gold text-resort-gold hover:bg-resort-gold hover:text-resort-black transition-colors px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-widest text-center"
            >
              {header.bookButtonText}
            </a>
            <button
              className="md:hidden text-white p-2"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-resort-black flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {header.navLinks.map((item, i) => (
                <motion.a
                  key={item.label}
                  custom={i}
                  variants={linkVariants}
                  href={item.href}
                  onClick={toggleMenu}
                  className="font-serif text-4xl text-white hover:text-resort-gold transition-colors italic"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.button
                custom={header.navLinks.length}
                variants={linkVariants}
                className="mt-8 bg-resort-gold text-resort-black px-8 py-3 rounded-full font-sans text-sm font-bold uppercase tracking-widest"
              >
                {header.bookButtonText}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

