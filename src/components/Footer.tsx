import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { resortContent } from '../resort-content';

export default function Footer() {
  const { footer, header } = resortContent;

  return (
    <footer className="bg-resort-black text-resort-mist pt-24 pb-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

        {/* Brand */}
        <div id="about" className="md:col-span-1">
          <img
            src="/tbaytransparentborderlogo.png"
            alt={footer.brandName}
            className="h-20 w-auto object-contain mb-6"
          />
          <h2 className="font-serif text-3xl italic text-white mb-4 hidden">{footer.brandName}</h2>
          <p className="font-sans text-sm text-white/60 leading-relaxed mb-6">
            {footer.brandDescription}
          </p>
          <div className="flex gap-4 text-resort-gold">
            <a href="https://www.facebook.com/TranquilityBayMarineandResortonToledoBend/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Facebook size={20} /></a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-resort-gold uppercase mb-6">Explore</h3>
          <ul className="space-y-4 font-sans text-sm text-white/70">
            {header.navLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-white transition-colors">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div id="contact" className="">
          <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-resort-gold uppercase mb-6">Contact</h3>
          <ul className="space-y-4 font-sans text-sm text-white/70">
            <li id="map" className="flex items-start gap-3">
              <MapPin size={16} className="text-resort-gold shrink-0 mt-0.5" />
              <span>{footer.contact.address.split(', ').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-resort-gold shrink-0" />
              <span>{footer.contact.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-resort-gold shrink-0" />
              <span>{footer.contact.email}</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-resort-gold uppercase mb-6">{footer.newsletter.title}</h3>
          <p className="font-sans text-sm text-white/60 mb-4">
            {footer.newsletter.description}
          </p>
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email Address"
              className="bg-white/5 border border-white/10 rounded-none px-4 py-3 font-sans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-resort-gold transition-colors"
            />
            <button className="bg-resort-gold text-resort-black font-sans text-xs font-bold tracking-widest uppercase py-3 hover:bg-white transition-colors">
              {footer.newsletter.buttonText}
            </button>
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-xs text-white/40">
        <p>&copy; {new Date().getFullYear()} {footer.brandName}. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

