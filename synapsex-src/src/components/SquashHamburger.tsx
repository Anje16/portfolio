import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  mobile?: boolean;
}

const spring = { type: 'spring' as const, stiffness: 300, damping: 20 };

export function SquashHamburger({ isOpen, mobile = false }: SquashHamburgerProps) {
  const w = mobile ? 15 : 18;
  const h = mobile ? 10 : 12;
  const bar = mobile ? 1.2 : 1.5;
  const center = h / 2 - bar / 2;

  const base = 'absolute left-0 block rounded-full bg-white';
  const style = { width: w, height: bar };

  return (
    <span className="relative block" style={{ width: w, height: h }} aria-hidden="true">
      <motion.span
        className={base}
        style={{ ...style, top: 0 }}
        animate={isOpen ? { y: center, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={spring}
      />
      <motion.span
        className={base}
        style={{ ...style, top: center }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={spring}
      />
      <motion.span
        className={base}
        style={{ ...style, top: h - bar }}
        animate={isOpen ? { y: -center, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={spring}
      />
    </span>
  );
}
