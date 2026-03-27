'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  avatar: string;
  role: string;
  course: string;
  rating: number;
  text: string;
  result?: string;
}

export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next: number) => {
    setDir(next > idx ? 1 : -1);
    setIdx(next);
  }, [idx]);

  const prev = () => go((idx - 1 + testimonials.length) % testimonials.length);
  const next = () => go((idx + 1) % testimonials.length);

  const t = testimonials[idx];

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            initial={{ opacity: 0, x: dir * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dir * 60 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="glass-card p-8 md:p-10 relative"
          >
            <Quote className="w-10 h-10 text-[#4040c0] absolute top-6 right-6 opacity-30" />
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-full gradient-brand flex items-center justify-center text-white text-xl font-bold shrink-0"
                style={{ background: `hsl(${t.name.charCodeAt(0) * 3 % 360}, 60%, 40%)` }}
              >
                {t.name[0]}
              </div>
              <div>
                <div className="font-cal text-white font-semibold">{t.name}</div>
                <div className="text-sm text-[#7070a0]">{t.role}</div>
                <div className="text-xs text-[#6060a0] mt-0.5">Enrolled in {t.course}</div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-white/20'}`} />
                ))}
              </div>
            </div>
            <p className="text-[#b0b0d0] leading-relaxed text-base md:text-lg">&ldquo;{t.text}&rdquo;</p>
            {t.result && (
              <div className="mt-6 px-4 py-3 rounded-xl bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 text-sm font-medium">
                🎯 Result: {t.result}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'w-8 bg-[#6060f0]' : 'w-1.5 bg-white/20'}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[#b0b0d0] hover:text-white hover:border-[#6060f0]/50 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={next} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-[#b0b0d0] hover:text-white hover:border-[#6060f0]/50 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
