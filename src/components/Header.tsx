import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { resortContent } from '../resort-content';

interface HeaderProps {
  show?: boolean;
}

export default function Header({ show = true }: HeaderProps) {
  const { header } = resortContent;
  const { scrollY } = useScroll();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as any
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as any
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
        ease: [0.22, 1, 0.36, 1] as any
      }
    })
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: 4, pointerEvents: 'none' as const },
    visible: {
      opacity: 1,
      y: 0,
      pointerEvents: 'auto' as const,
      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as any }
    }
  };

  const isHomePage = location.pathname === '/';
  const isLightPageRest = !isHomePage && !isScrolled && !isMobileMenuOpen;

  const headerBgClass = isScrolled || isMobileMenuOpen ? 'bg-resort-black/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent';
  const textColorClass = isLightPageRest ? 'text-resort-black' : 'text-white/80';
  const logoFilter = isLightPageRest ? 'invert-[0.1]' : 'none';

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[60] transition-colors duration-500 ${headerBgClass}`}
        initial={{ y: -100 }}
        animate={show ? {
          y: 0,
          height: isScrolled ? "80px" : (window.innerWidth < 768 ? "100px" : "160px")
        } : { y: -100 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full px-4 md:px-12 h-full flex items-center justify-between relative">
          {/* Mobile Logo on Scroll */}
          <div className="flex-1 flex justify-start md:hidden">
            <AnimatePresence>
              {isScrolled && !isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to="/" className="cursor-pointer">
                    <img
                      src="/tbaytransparentborderlogo.png"
                      alt={header.brandName}
                      style={{ filter: logoFilter }}
                      className="h-10 w-auto object-contain"
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Logo */}
          <div className="hidden md:flex flex-1 justify-start">
            <Link to="/" className={`cursor-pointer z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <motion.img
                src="/tbaytransparentborderlogo.png"
                alt={header.brandName}
                animate={{
                  height: isScrolled ? "40px" : "112px",
                  filter: logoFilter
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center Column: Desktop Nav */}
          <div className="flex-[3] hidden md:flex justify-center h-full">
            <motion.nav
              animate={{
                y: isScrolled ? 0 : -20
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex items-center gap-6 lg:gap-8 h-full"
            >
              {header.navLinks.map((item) => (
                <div
                  key={item.label}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.subLinks && handleMouseEnter(item.label)}
                  onMouseLeave={() => item.subLinks && handleMouseLeave()}
                >
                  {item.href.startsWith('http') ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 font-sans text-[10px] lg:text-xs font-bold uppercase tracking-widest hover:text-resort-gold transition-colors whitespace-nowrap ${textColorClass}`}
                    >
                      {item.label}
                      {item.subLinks && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                    </a>
                  ) : item.href.startsWith('#') || (item.href.startsWith('/#') && location.pathname === '/') ? (
                    <a
                      href={item.href.startsWith('/#') ? item.href.substring(1) : item.href}
                      className={`inline-flex items-center gap-1 font-sans text-[10px] lg:text-xs font-bold uppercase tracking-widest hover:text-resort-gold transition-colors whitespace-nowrap ${textColorClass}`}
                    >
                      {item.label}
                      {item.subLinks && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className={`inline-flex items-center gap-1 font-sans text-[10px] lg:text-xs font-bold uppercase tracking-widest hover:text-resort-gold transition-colors whitespace-nowrap ${textColorClass}`}
                    >
                      {item.label}
                      {item.subLinks && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.subLinks && (
                    <motion.div
                      initial="hidden"
                      animate={activeDropdown === item.label ? "visible" : "hidden"}
                      variants={dropdownVariants}
                      className={`absolute left-1/2 -translate-x-1/2 pt-10 min-w-[200px] transition-[top] duration-500`}
                      style={{ top: isScrolled ? '40px' : '70px' }}
                    >
                      <div className="bg-resort-black/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden shadow-2xl">
                        {item.subLinks.map((sub) => (
                          sub.external ? (
                            <a
                              key={sub.label}
                              href={sub.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-resort-gold hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
                            >
                              {sub.label}
                            </a>
                          ) : (
                            <Link
                              key={sub.label}
                              to={sub.href}
                              className="block px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/70 hover:text-resort-gold hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {sub.label}
                            </Link>
                          )
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.nav>
          </div>

          {/* Right Column: Actions */}
          <div className="flex-1 flex justify-end items-center">
            <motion.div
              animate={{
                y: isScrolled ? 0 : -20
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="hidden md:flex items-center gap-4 z-50"
            >
              <a
                href={resortContent.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-resort-gold text-resort-gold hover:bg-resort-gold hover:text-resort-black transition-colors px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-widest text-center"
              >
                {header.bookButtonText}
              </a>
            </motion.div>
          </div>

          {/* Mobile Hamburger - Corner Positioned, Centered on Scroll */}
          {!isMobileMenuOpen && (
            <button
              className={`md:hidden absolute right-2 z-[70] p-2 transition-all duration-500 rounded-full ${textColorClass} ${isScrolled ? 'top-1/2 -translate-y-1/2' : 'top-2'} ${isScrolled ? '' : 'bg-resort-black/20 backdrop-blur-sm'}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          )}
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
            className="fixed inset-0 z-[65] bg-resort-black flex flex-col pt-32 pb-12 md:hidden overflow-y-auto"
          >
            {/* Branding & Close Controls - Inside Overlay for Visibility */}
            <div className="absolute top-6 left-8 right-6 flex items-center justify-between">
              <img
                src="/tbaytransparentborderlogo.png"
                alt={header.brandName}
                className="h-16 w-auto object-contain"
              />
              <button
                onClick={toggleMenu}
                className="p-2 text-white hover:text-resort-gold transition-colors"
                aria-label="Close menu"
              >
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col w-full h-full">
              {header.navLinks.map((item, i) => (
                <div key={item.label} className="w-full border-b border-white/5 last:border-0">
                  {item.subLinks ? (
                    <div className="w-full">
                      <motion.button
                        custom={i}
                        variants={linkVariants}
                        onClick={() => setExpandedMobileItem(expandedMobileItem === item.label ? null : item.label)}
                        className="flex items-center justify-between w-full px-8 py-4 font-serif text-3xl text-white hover:text-resort-gold transition-all italic text-left"
                      >
                        {item.label}
                        <ChevronDown
                          size={24}
                          className={`text-resort-gold transition-transform duration-300 ${expandedMobileItem === item.label ? 'rotate-180' : '-rotate-90'}`}
                        />
                      </motion.button>
                      <AnimatePresence>
                        {expandedMobileItem === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as any }}
                            className="bg-white/5 overflow-hidden"
                          >
                            <div className="px-12 py-4 flex flex-col gap-4">
                              {item.subLinks.map((sub) => (
                                sub.external ? (
                                  <a
                                    key={sub.label}
                                    href={sub.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-sans text-sm font-bold uppercase tracking-widest text-white/50 hover:text-resort-gold transition-colors"
                                  >
                                    {sub.label}
                                  </a>
                                ) : (
                                  <Link
                                    key={sub.label}
                                    to={sub.href}
                                    onClick={toggleMenu}
                                    className="font-sans text-sm font-bold uppercase tracking-widest text-white/50 hover:text-resort-gold transition-colors"
                                  >
                                    {sub.label}
                                  </Link>
                                )
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : item.href.startsWith('http') ? (
                    <motion.a
                      custom={i}
                      variants={linkVariants}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-8 py-4 font-serif text-3xl text-white hover:text-resort-gold hover:bg-white/5 transition-all italic"
                    >
                      {item.label}
                    </motion.a>
                  ) : (
                    <motion.div
                      custom={i}
                      variants={linkVariants}
                      className="w-full"
                    >
                      <Link
                        to={item.href}
                        onClick={toggleMenu}
                        className="flex items-center justify-between w-full px-8 py-4 font-serif text-3xl text-white hover:text-resort-gold hover:bg-white/5 transition-all italic"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}

              <div className="mt-auto px-8 pt-12">
                <motion.a
                  custom={header.navLinks.length}
                  variants={linkVariants}
                  href={resortContent.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full h-16 items-center justify-center bg-resort-gold text-resort-black rounded-xl font-sans text-sm font-bold uppercase tracking-widest text-center shadow-lg shadow-resort-gold/10"
                >
                  {header.bookButtonText}
                </motion.a>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-8 text-center"
                >
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/30">
                    Toledo Bend Reservoir, Louisiana
                  </p>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
