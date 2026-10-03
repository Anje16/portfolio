import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ScrambleIn } from '../components/ScrambleIn';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';

const SENSITIVITY = 0.8;
const EASE = [0.215, 0.61, 0.355, 1] as const;
const HEADING = 'text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]';

interface HeroProps {
  entranceComplete: boolean;
}

/** Scrubs the hero video with horizontal mouse movement (delta-based). Seeks are chained on `seeked`. */
function useMouseScrub(videoRef: React.RefObject<HTMLVideoElement>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lastX: number | null = null;
    let target = 0;
    let seeking = false;

    const seek = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      if (Math.abs(video.currentTime - target) < 0.01) return;
      seeking = true;
      video.currentTime = target;
    };

    const onSeeked = () => {
      seeking = false;
      if (Math.abs(video.currentTime - target) > 0.01) seek();
    };

    const onMove = (e: MouseEvent) => {
      if (lastX === null) {
        lastX = e.clientX;
        return;
      }
      const delta = e.clientX - lastX;
      lastX = e.clientX;
      if (!video.duration) return;
      target += (delta / window.innerWidth) * video.duration * SENSITIVITY;
      target = Math.min(Math.max(target, 0), video.duration - 0.05);
      if (!seeking) seek();
    };

    video.pause();
    video.currentTime = 0;
    video.addEventListener('seeked', onSeeked);
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('mousemove', onMove);
    };
  }, [videoRef]);
}

export function Hero({ entranceComplete }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useMouseScrub(videoRef);

  return (
    <section id="top" className="relative h-screen h-[100dvh] w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={HERO_VIDEO}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 flex h-full flex-col px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* Watermark */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="select-none whitespace-nowrap uppercase opacity-10"
            style={{
              fontFamily: '"Anton SC", sans-serif',
              fontSize: 'clamp(120px, 30vw, 521px)',
              letterSpacing: '-4px',
              lineHeight: 1,
              transform: 'translateY(50px)',
              backgroundImage: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Transcendence
          </span>
        </div>

        <div className="flex-1" />

        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <h1 className={HEADING}>
              <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
            </h1>
            <motion.p
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed"
              initial={{ y: 25, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : { y: 25, opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              Built at the intersection of neuroscience and artificial intelligence. SynapseX continuously maps neural
              pathways, cognitive load, and physiological states into a single adaptive intelligence layer.
            </motion.p>
          </div>

          <h2 className={`${HEADING} text-left md:text-right`}>
            <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
          </h2>
        </div>
      </motion.div>
    </section>
  );
}
