import { motion } from 'framer-motion';

const LAYERS = [
  { n: 1, name: 'Capture' },
  { n: 2, name: 'Process' },
  { n: 3, name: 'Interface' },
];

const inView = { once: true, amount: 0.4 };

export function Architecture() {
  return (
    <section className="relative min-h-screen min-h-[100dvh] w-full bg-black flex items-center justify-center">
      <div className="max-w-3xl w-full mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 1.0 }}
        >
          <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8">Architecture</p>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">
            Three layers. Zero friction.
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto">
            Sensor layer captures raw bioelectric signals. Processing layer isolates intent. Interface layer delivers
            structured output to any connected system.
          </p>
        </motion.div>

        <motion.ol
          className="mt-20 flex flex-col items-center gap-4 list-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          {LAYERS.map((l) => (
            <li
              key={l.n}
              className="w-full max-w-md h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6"
            >
              <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase">Layer {l.n}</span>
              <span className="text-white text-[16px] sm:text-[18px] font-light">{l.name}</span>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
