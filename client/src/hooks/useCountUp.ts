/*
 * useCountUp — count from 0 → target when an element enters the viewport.
 * Parses "10+" as 10 with suffix "+", "100%" as 100 with suffix "%", etc.
 * Respects prefers-reduced-motion.
 */

import { useEffect, useRef, useState } from 'react';

interface Parsed {
  prefix: string;
  number: number | null;
  suffix: string;
}

function parseValue(raw: string): Parsed {
  const match = raw.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  if (!match) return { prefix: '', number: null, suffix: raw };
  const number = parseFloat(match[2].replace(',', '.'));
  return { prefix: match[1], number: Number.isNaN(number) ? null : number, suffix: match[3] };
}

export function useCountUp(
  rawValue: string,
  durationMs = 1400
): { ref: React.RefObject<HTMLElement>; display: string } {
  const ref = useRef<HTMLElement>(null);
  const parsed = parseValue(rawValue);
  const [current, setCurrent] = useState<number>(parsed.number ?? 0);
  const startedRef = useRef(false);

  useEffect(() => {
    // Non-numeric value or reduced-motion preference — short-circuit
    if (parsed.number === null) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrent(parsed.number);
      return;
    }

    setCurrent(0);
    startedRef.current = false;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const target = parsed.number as number;

            function tick(now: number) {
              const elapsed = now - start;
              const t = Math.min(1, elapsed / durationMs);
              // Ease-out cubic for natural deceleration
              const eased = 1 - Math.pow(1 - t, 3);
              setCurrent(target * eased);
              if (t < 1) {
                window.requestAnimationFrame(tick);
              } else {
                setCurrent(target);
              }
            }

            window.requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [parsed.number, durationMs]);

  // Render: integer if target is integer, else 1 decimal
  const display =
    parsed.number === null
      ? rawValue
      : `${parsed.prefix}${
          Number.isInteger(parsed.number) ? Math.round(current) : current.toFixed(1)
        }${parsed.suffix}`;

  return { ref, display };
}
