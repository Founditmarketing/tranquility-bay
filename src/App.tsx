import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Accommodations from './components/Accommodations';
import Amenities from './components/Amenities';
import Footer from './components/Footer';
import CabinGallery from './pages/CabinGallery';
import MobileHomeGallery from './pages/MobileHomeGallery';
import MapPage from './pages/MapPage';
import BookingWidget from './components/BookingWidget';
import LoadingScreen from './components/LoadingScreen';

function Home({ startAnimation }: { startAnimation: boolean }) {
  return (
    <>
      <Hero startAnimation={startAnimation} />
      <Accommodations />
      <Amenities />
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Orchestrate the transition
  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure the loading screen has faded out 
    // before triggering the high-impact hero animations
    setTimeout(() => setShowContent(true), 400);
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <main className="bg-resort-mist min-h-screen">
        <Header show={showContent} />
        <Routes>
          <Route path="/" element={<Home startAnimation={showContent} />} />
          <Route path="/cabins/gallery" element={<CabinGallery />} />
          <Route path="/mobile-homes/gallery" element={<MobileHomeGallery />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
        <Footer />
        <BookingWidget />
      </main>
    </Router>
  );
}
