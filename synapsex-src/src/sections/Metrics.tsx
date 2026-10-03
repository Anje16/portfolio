import { motion } from 'framer-motion';
import { BackgroundVideo } from '../components/BackgroundVideo';

const VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4';

const METRICS = [
  { value: '2.4ms', label: 'Synaptic Latency' },
  { value: '99.7%', label: 'Signal Accuracy' },
  { value: '140B', label: 'Neural Parameters' },
];

export function Metrics() {
  return (
    <section id="metrics" className="relative min-h-screen min-h-[100dvh] w-full overflow-hidden bg-black flex items-center justify-center">
      <BackgroundVideo src={VIDEO} />
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-32 pb-32 px-6">
        <motion.h2
          className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center font-normal"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          Performance Metrics
        </motion.h2>
        <dl className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              className="flex flex-col-reverse"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <dt className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide">{m.label}</dt>
              <dd className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none tabular-nums">
                {m.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
