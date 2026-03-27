'use client';
import { useEffect, useState } from 'react';

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [delta, setDelta] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setDelta({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const pad = (n: number) => String(n).padStart(2, '0');
  const units = [['d', delta.d], ['h', delta.h], ['m', delta.m], ['s', delta.s]] as const;

  return (
    <div className="flex items-center gap-2">
      {units.map(([label, val]) => (
        <div key={label} className="flex flex-col items-center">
          <div className="glass w-12 h-12 rounded-xl flex items-center justify-center font-cal text-xl font-semibold text-white">
            {pad(val)}
          </div>
          <span className="text-[10px] text-[#6060a0] mt-1 uppercase">{label}</span>
        </div>
      ))}
    </div>
  );
}
