import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Cinematic } from './sections/Cinematic';
import { Metrics } from './sections/Metrics';
import { Technology } from './sections/Technology';
import { Architecture } from './sections/Architecture';
import { Footer } from './sections/Footer';

export default function App() {
  const [entranceComplete, setEntranceComplete] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bg-black text-white" style={{ fontFamily: '"Space Mono", monospace' }}>
      <Navbar entranceComplete={entranceComplete} />
      <main>
        <Hero entranceComplete={entranceComplete} />
        <Cinematic />
        <Metrics />
        <Technology />
        <Architecture />
      </main>
      <Footer />
    </div>
  );
}
