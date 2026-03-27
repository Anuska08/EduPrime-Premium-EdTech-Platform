'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Star, TrendingUp, Users } from 'lucide-react';

const floats = [
  { x: '-8%', y: '20%', text: '🎯 AIR 47 Cracked!' },
  { x: '82%', y: '15%', text: '📈 +340% Engagement' },
  { x: '-5%', y: '70%', text: '🏆 500K+ Enrolled' },
  { x: '78%', y: '65%', text: '⚡ Live Right Now' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#3030c0]/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#a040e0]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#4060f0]/20 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm text-[#b0b0d0]">Trusted by <strong className="text-white">5M+ students</strong> across India</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="hero-headline text-5xl md:text-6xl xl:text-7xl mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Learn From
              <br />
              <span style={{ fontFamily: 'Times New Roman, serif', fontStyle: 'italic', WebkitTextFillColor: 'transparent', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
                India&rsquo;s Best
              </span>
              <br />
              Educators
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="text-lg md:text-xl text-[#9090c0] mb-8 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Live classes, recorded lectures, test series, and AI-powered study plans — everything you need to ace exams and upskill your career.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="/courses" className="btn-primary text-base px-8 py-3.5 glow-brand">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/live-classes" className="btn-secondary text-base px-8 py-3.5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full glass flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                </div>
                Watch Demo
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex flex-wrap items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {['A', 'K', 'P', 'S', 'R'].map((l, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[#07071a] flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: `hsl(${i * 60 + 20}, 60%, 40%)`, zIndex: 5 - i }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-white">12,400+</span>
                  <span className="text-[#6060a0]"> joined this week</span>
                </div>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-[#6060a0]">98% <span className="text-white font-medium">pass rate</span> this year</span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Main card */}
            <div className="glass-card p-6 rounded-2xl">
              {/* Mock class interface */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-emerald-400">LIVE NOW</span>
                </div>
                <span className="text-xs text-[#6060a0]">3,241 watching</span>
              </div>
              {/* Video placeholder */}
              <div className="aspect-video rounded-xl bg-gradient-to-br from-[#1a1a4e] to-[#0d0d28] mb-4 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(rgba(96,60,240,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(96,60,240,0.3) 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
                <div className="w-16 h-16 rounded-full gradient-brand flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
                {/* Equation overlay */}
                <div className="absolute bottom-4 left-4 text-white/60 font-mono text-sm">
                  F = ma · ∫v dt = Δp
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-sm shrink-0">
                  AK
                </div>
                <div>
                  <div className="text-sm font-semibold text-white font-cal">Dr. Arvind Kumar</div>
                  <div className="text-xs text-[#6060a0]">JEE Physics – Chapter 9: Rotational Motion</div>
                </div>
                <div className="ml-auto flex items-center gap-1 text-xs text-[#6060a0]">
                  <Users className="w-3 h-3" /> 3.2K
                </div>
              </div>
              {/* Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-[#6060a0] mb-1.5">
                  <span>Lecture Progress</span><span>47 / 90 min</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="progress-bar-fill" style={{ width: '52%' }} />
                </div>
              </div>
            </div>

            {/* Floating notifications */}
            {floats.map((f, i) => (
              <motion.div
                key={i}
                className="absolute glass px-3 py-2 rounded-xl text-xs font-medium text-white whitespace-nowrap"
                style={{ left: f.x, top: f.y }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
              >
                {f.text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
