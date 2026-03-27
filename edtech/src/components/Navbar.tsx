'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, GraduationCap, Users,
  Layers, Star, Zap, Globe, ChevronDown, Menu, X, ArrowRight, Sun, Moon
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

const courses = [
  { icon: GraduationCap, label: 'JEE / NEET', sub: 'Engineering & Medical' },
  { icon: Layers, label: 'UPSC / SSC', sub: 'Government Exams' },
  { icon: Star, label: 'Class 9–12', sub: 'School Curriculum' },
  { icon: Zap, label: 'Coding & Tech', sub: 'Skill Development' },
  { icon: Globe, label: 'MBA / CAT', sub: 'Management Entrance' },
  { icon: Users, label: 'Corporate', sub: 'Enterprise Training' },
];

const featuredInstructors = [
  { name: 'Dr. Arvind Kumar', subject: 'Physics', students: '2.4M' },
  { name: 'Priya Sharma', subject: 'Mathematics', students: '1.8M' },
  { name: 'Rahul Mehta', subject: 'Chemistry', students: '1.5M' },
];

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses', hasMega: true },
  { href: '/live-classes', label: 'Live Classes' },
  { href: '/test-series', label: 'Test Series' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const megaRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const isLight = theme === 'light';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-cal text-xl text-white font-semibold tracking-tight">
              Edu<span className="gradient-text">Prime</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.href} className="relative">
                {link.hasMega ? (
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? 'text-white bg-white/10'
                        : 'text-[#b0b0d0] hover:text-white hover:bg-white/5'
                    }`}
                    onMouseEnter={() => setMegaOpen(true)}
                    onMouseLeave={() => setMegaOpen(false)}
                    onClick={() => setMegaOpen(v => !v)}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname === link.href
                        ? 'text-white bg-white/10'
                        : 'text-[#b0b0d0] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              whileTap={{ scale: 0.9 }}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isLight
                  ? 'bg-orange-100 text-orange-500 hover:bg-orange-200 border border-orange-200'
                  : 'bg-white/10 text-purple-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isLight ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-4.5 h-4.5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-4.5 h-4.5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            {user ? (
              <>
                <Link href="/dashboard" className="btn-secondary text-sm py-2 px-4 border border-white/10">
                  Dashboard
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-6 h-6 rounded-full gradient-brand flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-white">{user.name.split(' ')[0]}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 py-2 rounded-xl glass border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="px-4 py-2 border-b border-white/10 mb-2">
                      <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                      <p className="text-xs text-[#8080a0] truncate">{user.email}</p>
                    </div>
                    <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors">
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-[#b0b0d0] hover:text-white transition-colors px-2">
                  Sign In
                </Link>
                <Link href="/signup" className="btn-primary text-sm py-2 px-4 shadow-lg shadow-brand/20">
                  Start Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Theme + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`p-2 rounded-lg transition-colors ${
                isLight
                  ? 'text-orange-500 hover:bg-orange-100'
                  : 'text-purple-300 hover:bg-white/10'
              }`}
            >
              {isLight ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="p-2 rounded-lg text-[#b0b0d0] hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mega Menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              ref={megaRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 glass border-t border-white/10 z-40"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8">
                {/* Course Categories */}
                <div className="col-span-8">
                  <p className="section-label mb-5">Browse Categories</p>
                  <div className="grid grid-cols-3 gap-3">
                    {courses.map(c => (
                      <Link
                        key={c.label}
                        href="/courses"
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                        onClick={() => setMegaOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-lg gradient-brand flex items-center justify-center shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                          <c.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white font-cal">{c.label}</div>
                          <div className="text-xs text-[#8080a0]">{c.sub}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Featured Instructors */}
                <div className="col-span-4 border-l border-white/10 pl-8">
                  <p className="section-label mb-5">Top Educators</p>
                  <div className="space-y-4">
                    {featuredInstructors.map(i => (
                      <div key={i.name} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-bold shrink-0">
                          {i.name[0]}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">{i.name}</div>
                          <div className="text-xs text-[#8080a0]">{i.subject} · {i.students} students</div>
                        </div>
                      </div>
                    ))}
                    <Link
                      href="/courses"
                      className="flex items-center gap-1.5 text-sm text-[#8080f0] hover:text-white transition-colors"
                      onClick={() => setMegaOpen(false)}
                    >
                      View all educators <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav-overlay flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
          >
            <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <span className="font-cal text-xl text-white">EduPrime</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-[#b0b0d0] hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3.5 rounded-xl text-base font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-white bg-white/10'
                      : 'text-[#b0b0d0] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="px-5 py-6 border-t border-white/10 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="w-10 h-10 rounded-full gradient-brand flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-xs text-[#8080a0]">{user.email}</div>
                    </div>
                  </div>
                  <Link href="/dashboard" className="btn-secondary w-full justify-center text-white border border-white/10">Dashboard</Link>
                  <button onClick={logout} className="btn-secondary w-full justify-center text-red-400 border border-white/10">Sign Out</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-secondary w-full justify-center text-white border border-white/10">Sign In</Link>
                  <Link href="/signup" className="btn-primary w-full justify-center shadow-lg shadow-brand/20">Create Free Account <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
