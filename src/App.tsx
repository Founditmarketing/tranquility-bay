import Header from './components/Header';
import Hero from './components/Hero';
import Accommodations from './components/Accommodations';
import Amenities from './components/Amenities';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="bg-resort-mist min-h-screen">
      <Header />
      <Hero />
      <Accommodations />
      <Amenities />
      <Footer />
    </main>
  );
}
