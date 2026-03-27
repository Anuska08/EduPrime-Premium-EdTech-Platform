'use client';
import { useState } from 'react';
import useSWR from 'swr';
import api from '@/lib/api';
import CourseCard from '@/components/CourseCard';
import MotionSection from '@/components/MotionSection';
import CTASection from '@/components/CTASection';
import { Search, SlidersHorizontal, ChevronDown, TrendingUp, Loader2 } from 'lucide-react';

const categories = ['All', 'JEE Preparation', 'NEET Preparation', 'Civil Services', 'Technology', 'School', 'MBA', 'Finance', 'Language'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = ['Most Popular', 'Highest Rated', 'Newest', 'Price: Low to High', 'Price: High to Low'];

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [sort, setSort] = useState('Most Popular');
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');

  const queryParams = new URLSearchParams();
  if (search) queryParams.set('search', search);
  if (category !== 'All') queryParams.set('category', category);
  if (level !== 'All') queryParams.set('level', level);
  if (priceFilter !== 'all') queryParams.set('price', priceFilter);
  if (sort && sort !== 'Most Popular') queryParams.set('sort', sort);

  const { data, isLoading } = useSWR(`/courses?${queryParams.toString()}`, fetcher);
  const courses = data?.courses || [];

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
        <div className="flex gap-2 mb-8 items-center">
          {(['all', 'free', 'paid'] as const).map(p => (
            <button key={p} onClick={() => setPriceFilter(p)}
              className={`px-4 py-1.5 rounded-full text-sm capitalize transition-colors ${priceFilter === p ? 'gradient-brand text-white' : 'glass text-[#8080a0] hover:text-white'}`}>
              {p === 'all' ? 'All Courses' : p === 'free' ? '🆓 Free' : '💎 Paid'}
            </button>
          ))}
          {!isLoading && (
            <span className="ml-auto text-sm text-[#6060a0]">{data?.total || 0} courses found</span>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20 text-[#6060a0]">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="ml-3 font-cal text-lg text-white">Loading courses...</span>
          </div>
        ) : (
          <>
            {/* Trending section */}
            {category === 'All' && !search && priceFilter === 'all' && level === 'All' && courses.length >= 4 && (
              <MotionSection className="mb-10">
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="w-5 h-5 text-[#8080f0]" />
                  <h2 className="font-cal text-xl font-semibold text-white">Trending This Week</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {courses.slice(0, 4).map((c: any, i: number) => (
                    <MotionSection key={c._id || c.id} delay={i * 0.07}>
                      <CourseCard {...c} />
                    </MotionSection>
                  ))}
                </div>
              </MotionSection>
            )}

            {/* All results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.map((c: any, i: number) => (
                <MotionSection key={c._id || c.id} delay={i * 0.05}>
                  <CourseCard {...c} />
                </MotionSection>
              ))}
            </div>
            {courses.length === 0 && (
              <div className="text-center py-20 text-[#6060a0]">
                <p className="text-4xl mb-4">🔍</p>
                <p className="font-cal text-xl text-white mb-2">No courses found</p>
                <p>Try different search terms or reset filters.</p>
              </div>
            )}
          </>
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
