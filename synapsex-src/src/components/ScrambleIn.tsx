import { useEffect, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';
const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

interface ScrambleInProps {
  text: string;
  delay: number;
  triggered: boolean;
}

export function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    if (!triggered) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      let progress = 0;
      interval = setInterval(() => {
        progress += 0.5;
        const revealed = Math.floor(progress);
        let out = '';
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === ' ') out += ' ';
          else if (i < revealed) out += ch;
          else if (i < revealed + 3) out += randomChar();
        }
        setDisplay(out);
        if (revealed >= text.length) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 25);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay, triggered]);

  if (!triggered || display === null) return <span aria-label={text}>&nbsp;</span>;
  return (
    <span aria-label={text}>
      <span aria-hidden="true">{display || ' '}</span>
    </span>
  );
}
