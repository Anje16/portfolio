import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];
const FRAMES_PER_CHAR = 4;

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

export function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const interval = setInterval(() => {
      const revealed = Math.floor(frame / FRAMES_PER_CHAR);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        out += ch === ' ' ? ' ' : i < revealed ? ch : randomChar();
      }
      setDisplay(out);
      frame++;
      if (revealed >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
