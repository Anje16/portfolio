import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SynapseXLogo } from './SynapseXLogo';
import { SquashHamburger } from './SquashHamburger';
import { ScrambleText } from './ScrambleText';

interface NavbarProps {
  entranceComplete: boolean;
}

const pillSpring = { type: 'spring' as const, stiffness: 350, damping: 28 };

const NAV_LINKS = [
  { label: 'About', target: () => window.innerHeight },
  { label: 'Metrics', target: () => window.innerHeight * 2 },
];

function scrollToY(y: number) {
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function NavLink({ label, onClick, mobile }: { label: string; onClick: () => void; mobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`${mobile ? 'text-[13px]' : 'text-[16px]'} font-normal text-white/85 hover:text-white transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:underline`}
    >
      <ScrambleText text={label} isHovered={hovered} />
    </button>
  );
}

function DownloadButton({ mobile }: { mobile?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="#download"
      onClick={(e) => e.preventDefault()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
      whileTap={{ scale: 0.97 }}
      className={`${
        mobile ? 'h-9 px-3.5 text-[13px] gap-1.5' : 'h-12 px-6 text-[16px] gap-2'
      } flex items-center bg-white rounded-full text-black font-normal shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`}
      style={{ backgroundColor: '#ffffff' }}
    >
      <i className="bi bi-apple" aria-hidden="true" />
      <ScrambleText text="Download" isHovered={hovered} />
    </motion.a>
  );
}

export function Navbar({ entranceComplete }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const go = (y: number) => {
    setOpen(false);
    scrollToY(y);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 z-50 w-full h-20 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: entranceComplete ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Desktop */}
      <nav aria-label="Main" className="hidden sm:flex h-full items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-2">
          <motion.a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go(0);
            }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
            whileTap={{ scale: 0.98 }}
            className={`${open ? 'hidden md:flex' : 'flex'} h-12 px-5 items-center gap-2.5 bg-white/15 backdrop-blur-md rounded-[14px]`}
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <SynapseXLogo size={18} className="text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white">SynapseX</span>
          </motion.a>

          <motion.div
            className="h-12 flex items-center overflow-hidden bg-white/15 backdrop-blur-md rounded-[14px]"
            initial={false}
            animate={{ width: open ? 290 : 48 }}
            transition={pillSpring}
          >
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`shrink-0 flex items-center justify-center transition-[width,height,background-color,margin] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                open ? 'w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5' : 'w-12 h-12 rounded-[14px]'
              }`}
            >
              <SquashHamburger isOpen={open} />
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  className="flex items-center gap-7 pl-6 pr-4"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25, delay: 0.08 }}
                >
                  {NAV_LINKS.map((l) => (
                    <NavLink key={l.label} label={l.label} onClick={() => go(l.target())} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton />
      </nav>

      {/* Mobile */}
      <nav aria-label="Main" className="flex sm:hidden h-full items-center justify-between gap-2 px-4">
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <motion.a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go(0);
            }}
            className="h-9 flex items-center gap-2 overflow-hidden bg-white/15 backdrop-blur-md rounded-[10px] shrink-0"
            initial={false}
            animate={{ width: open ? 0 : 'auto', paddingLeft: open ? 0 : 14, paddingRight: open ? 0 : 14, opacity: open ? 0 : 1 }}
            transition={pillSpring}
            aria-hidden={open}
            tabIndex={open ? -1 : 0}
          >
            <SynapseXLogo size={15} className="text-white shrink-0" />
            <span className="text-[13px] font-medium tracking-tight text-white whitespace-nowrap">SynapseX</span>
          </motion.a>

          <motion.div
            className="h-9 flex items-center overflow-hidden bg-white/15 backdrop-blur-md rounded-[10px]"
            initial={false}
            animate={{ width: open ? '100%' : 36 }}
            transition={pillSpring}
          >
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={`shrink-0 flex items-center justify-center transition-all duration-300 ${
                open ? 'w-7 h-7 rounded-[8px] bg-white/10 ml-1' : 'w-9 h-9 rounded-[10px]'
              }`}
            >
              <SquashHamburger isOpen={open} mobile />
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  className="flex items-center gap-5 pl-4 pr-3"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25, delay: 0.08 }}
                >
                  {NAV_LINKS.map((l) => (
                    <NavLink key={l.label} label={l.label} mobile onClick={() => go(l.target())} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <DownloadButton mobile />
      </nav>
    </motion.header>
  );
}
