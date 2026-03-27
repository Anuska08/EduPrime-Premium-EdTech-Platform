'use client';
import { useState } from 'react';
import CourseCard from '@/components/CourseCard';
import MotionSection from '@/components/MotionSection';
import CTASection from '@/components/CTASection';
import { Search, SlidersHorizontal, ChevronDown, TrendingUp } from 'lucide-react';

const allCourses = [
  { id: '1', title: 'Complete JEE Physics Masterclass 2025', instructor: 'Dr. Arvind Kumar', category: 'JEE Preparation', level: 'Advanced' as const, rating: 4.9, reviews: 28400, students: 340000, duration: '220h', price: 4999, originalPrice: 12999, thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format', badge: 'Best Seller' },
  { id: '2', title: 'UPSC 2025 – Prelims + Mains Complete Strategy', instructor: 'Meera Iyer', category: 'Civil Services', level: 'Intermediate' as const, rating: 4.8, reviews: 15600, students: 180000, duration: '300h', price: 7999, originalPrice: 18999, thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format', badge: 'Trending' },
  { id: '3', title: 'Python & Data Science Bootcamp', instructor: 'Rahul Mehta', category: 'Technology', level: 'Beginner' as const, rating: 4.7, reviews: 42100, students: 520000, duration: '80h', price: 2999, originalPrice: 8999, thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format', badge: 'New' },
  { id: '4', title: 'Class 12 Mathematics – Board + JEE', instructor: 'Priya Sharma', category: 'School', level: 'Intermediate' as const, rating: 4.8, reviews: 31200, students: 410000, duration: '150h', price: 0, isFree: true, thumbnail: 'https://images.unsplash.com/photo-1596496181848-3091d4878b24?w=600&auto=format' },
  { id: '5', title: 'NEET Biology 2025 – Complete Preparation', instructor: 'Dr. Sunita Rao', category: 'NEET Preparation', level: 'Advanced' as const, rating: 4.9, reviews: 22000, students: 280000, duration: '200h', price: 5999, originalPrice: 14999, thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&auto=format', badge: 'Top Rated' },
  { id: '6', title: 'English Communication & IELTS Mastery', instructor: 'Anita Bose', category: 'Language', level: 'Beginner' as const, rating: 4.6, reviews: 18500, students: 220000, duration: '60h', price: 1999, originalPrice: 5999, thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&auto=format' },
  { id: '7', title: 'Stock Market & Personal Finance 101', instructor: 'Vikram Sood', category: 'Finance', level: 'Beginner' as const, rating: 4.7, reviews: 14200, students: 165000, duration: '45h', price: 0, isFree: true, thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format' },
  { id: '8', title: 'CAT 2025 – Quantitative Ability Deep Dive', instructor: 'Manish Gupta', category: 'MBA', level: 'Advanced' as const, rating: 4.8, reviews: 9800, students: 120000, duration: '100h', price: 3999, originalPrice: 9999, thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format', badge: 'New' },
];

const categories = ['All', 'JEE Preparation', 'NEET Preparation', 'Civil Services', 'Technology', 'School', 'MBA', 'Finance', 'Language'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = ['Most Popular', 'Highest Rated', 'Newest', 'Price: Low to High', 'Price: High to Low'];

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [sort, setSort] = useState('Most Popular');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');

  const filtered = allCourses.filter(c => {
    const q = search.toLowerCase();
    if (q && !c.title.toLowerCase().includes(q) && !c.category.toLowerCase().includes(q)) return false;
    if (category !== 'All' && c.category !== category) return false;
    if (level !== 'All' && c.level !== level) return false;
    if (priceFilter === 'free' && !c.isFree) return false;
    if (priceFilter === 'paid' && c.isFree) return false;
    return true;
  });

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-[#080818] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <MotionSection>
            <p className="section-label mb-3">All Courses</p>
            <h1 className="section-title mb-4">Find Your Perfect Course</h1>
            <p className="text-[#7070a0] max-w-xl mx-auto mb-8">
              From school curriculum to competitive exams and professional upskilling — 1,200+ courses by India&apos;s top educators.
            </p>
            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6060a0]" />
              <input
                type="text"
                placeholder="Search courses, topics, educators..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 glass rounded-xl text-white placeholder:text-[#6060a0] border border-white/10 focus:border-[#6060f0]/50 focus:outline-none transition-colors"
              />
            </div>
          </MotionSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-sm text-[#6060a0]">
            <SlidersHorizontal className="w-4 h-4" /> Filters:
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${category === cat ? 'gradient-brand text-white' : 'glass text-[#8080a0] hover:text-white'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <select value={level} onChange={e => setLevel(e.target.value)}
              className="glass text-sm text-[#9090b0] px-3 py-2 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-[#6060f0]/50 bg-transparent cursor-pointer">
              {levels.map(l => <option key={l} value={l} className="bg-[#0d0d28]">{l}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="glass text-sm text-[#9090b0] px-3 py-2 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-[#6060f0]/50 bg-transparent cursor-pointer">
              {sortOptions.map(s => <option key={s} value={s} className="bg-[#0d0d28]">{s}</option>)}
            </select>
          </div>
        </div>

        {/* Price filter chips */}
        <div className="flex gap-2 mb-8">
          {(['all', 'free', 'paid'] as const).map(p => (
            <button key={p} onClick={() => setPriceFilter(p)}
              className={`px-4 py-1.5 rounded-full text-sm capitalize transition-colors ${priceFilter === p ? 'gradient-brand text-white' : 'glass text-[#8080a0] hover:text-white'}`}>
              {p === 'all' ? 'All Courses' : p === 'free' ? '🆓 Free' : '💎 Paid'}
            </button>
          ))}
          <span className="ml-auto text-sm text-[#6060a0] self-center">{filtered.length} courses</span>
        </div>

        {/* Trending section */}
        {category === 'All' && !search && (
          <MotionSection className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-[#8080f0]" />
              <h2 className="font-cal text-xl font-semibold text-white">Trending This Week</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allCourses.slice(0, 4).map((c, i) => (
                <MotionSection key={c.id} delay={i * 0.07}>
                  <CourseCard {...c} />
                </MotionSection>
              ))}
            </div>
          </MotionSection>
        )}

        {/* All results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((c, i) => (
            <MotionSection key={c.id} delay={i * 0.05}>
              <CourseCard {...c} />
            </MotionSection>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#6060a0]">
            <p className="text-4xl mb-4">🔍</p>
            <p className="font-cal text-xl text-white mb-2">No courses found</p>
            <p>Try different search terms or reset filters.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-20">
          <CTASection
            label="Can't Decide?"
            title="Talk to a Learning Advisor"
            subtitle="Our counselors will help you pick the perfect course for your goals."
            primaryCTA={{ label: 'Book Free Counselling', href: '/contact' }}
          />
        </div>
      </div>
    </>
  );
}
