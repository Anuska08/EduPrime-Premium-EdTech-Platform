'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
}

interface Props {
  stats: Stat[];
  className?: string;
}

function Counter({ value, suffix = '', prefix = '', duration = 2.5 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - start) / (duration * 1000);
      const progress = Math.min(elapsed, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(ease * value));
      if (progress < 1) frame.current = requestAnimationFrame(animate);
    };
    frame.current = requestAnimationFrame(animate);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-cal text-4xl md:text-5xl font-semibold gradient-text">
      {prefix}{current.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsCounter({ stats, className }: Props) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className ?? ''}`}>
      {stats.map((s, i) => (
        <div key={i} className="glass-card p-6 text-center flex flex-col items-center gap-2">
          <Counter value={s.value} suffix={s.suffix} prefix={s.prefix} />
          <div className="font-cal text-sm font-semibold text-white/90">{s.label}</div>
          {s.description && <div className="text-xs text-[#7070a0]">{s.description}</div>}
        </div>
      ))}
    </div>
  );
}
