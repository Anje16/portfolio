interface BackgroundVideoProps {
  src: string;
  className?: string;
}

/** Autoplaying, muted, looping decorative video. */
export function BackgroundVideo({ src, className = 'absolute inset-0 h-full w-full object-cover' }: BackgroundVideoProps) {
  return (
    <video
      className={className}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
