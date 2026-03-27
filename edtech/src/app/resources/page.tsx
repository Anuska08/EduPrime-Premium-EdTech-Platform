import MotionSection from '@/components/MotionSection';
import CTASection from '@/components/CTASection';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const posts = [
  { title: 'How to Crack JEE Advanced in 6 Months: A Complete Roadmap', category: 'Exam Prep', readTime: '8 min', date: '20 Mar 2026', featured: true, excerpt: 'A proven 6-month strategy combining concept mastery, revision cycles, and full-length mock tests from students who cracked AIR <100.' },
  { title: 'Top 10 Python Libraries Every Data Scientist Must Know in 2026', category: 'Technology', readTime: '6 min', date: '18 Mar 2026', featured: true, excerpt: 'From pandas to PyTorch — a curated breakdown of libraries that power modern ML pipelines, with code examples and use cases.' },
  { title: 'UPSC Prelims 2025: Last 30 Days Revision Strategy', category: 'Civil Services', readTime: '5 min', date: '15 Mar 2026', featured: false, excerpt: 'Meera Iyer shares her high-value revision framework for UPSC aspirants in the final sprint.' },
  { title: 'How AI is Reshaping EdTech in India', category: 'Industry', readTime: '7 min', date: '12 Mar 2026', featured: false, excerpt: 'From personalized study plans to instant doubt resolution — how AI is making quality education accessible at scale.' },
  { title: 'Building a Career in Finance: CFA vs. CPA vs. MBA', category: 'Career', readTime: '9 min', date: '10 Mar 2026', featured: false, excerpt: 'A detailed comparison of the three most valuable finance credentials and which path suits your goals best.' },
  { title: 'Study Smart, Not Hard: Science-Backed Techniques', category: 'Learning', readTime: '5 min', date: '8 Mar 2026', featured: false, excerpt: 'Spaced repetition, the Feynman Technique, and active recall — explained with practical implementation tips.' },
];

const categoryColors: Record<string, string> = {
  'Exam Prep': '#6060f0', 'Technology': '#10b981', 'Civil Services': '#f59e0b',
  'Industry': '#a040e0', 'Career': '#3b82f6', 'Learning': '#ef4444'
};

export default function ResourcesPage() {
  const featured = posts.filter(p => p.featured);
  const rest = posts.filter(p => !p.featured);

  return (
    <>
      <section className="pt-28 pb-16 bg-[#080818] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <MotionSection>
            <p className="section-label mb-3">Resources & Blog</p>
            <h1 className="section-title mb-4">Insights to Power Your Journey</h1>
            <p className="text-[#7070a0] max-w-xl mx-auto">
              Expert-written guides, exam strategies, tech tutorials, and career insights. Curated by educators and toppers.
            </p>
          </MotionSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Featured */}
        <MotionSection className="mb-12">
          <h2 className="font-cal text-2xl font-semibold text-white mb-6">Featured Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map((post, i) => (
              <Link key={i} href="/resources" className="block group">
                <div className="glass-card p-7 h-full flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: categoryColors[post.category], background: `${categoryColors[post.category]}22` }}>
                      {post.category}
                    </span>
                    <span className="text-xs text-[#6060a0] ml-auto flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime} read
                    </span>
                  </div>
                  <h2 className="font-cal text-lg font-semibold text-white group-hover:text-[#a0a0ff] transition-colors leading-snug">{post.title}</h2>
                  <p className="text-sm text-[#7070a0] leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-xs text-[#505070]">{post.date}</span>
                    <span className="flex items-center gap-1 text-sm text-[#8080f0] group-hover:text-white transition-colors">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </MotionSection>

        {/* All articles */}
        <MotionSection delay={0.1}>
          <h2 className="font-cal text-2xl font-semibold text-white mb-6">All Articles</h2>
          <div className="space-y-4">
            {rest.map((post, i) => (
              <MotionSection key={i} delay={i * 0.06} direction="up">
                <Link href="/resources" className="block group">
                  <div className="glass-card p-5 flex items-center gap-5">
                    <BookOpen className="w-8 h-8 shrink-0" style={{ color: categoryColors[post.category] }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-semibold" style={{ color: categoryColors[post.category] }}>{post.category}</span>
                        <span className="text-xs text-[#505070]">{post.date}</span>
                      </div>
                      <h3 className="font-cal text-sm font-semibold text-white group-hover:text-[#a0a0ff] transition-colors line-clamp-1">{post.title}</h3>
                    </div>
                    <div className="text-xs text-[#6060a0] whitespace-nowrap flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#6060a0] group-hover:text-white transition-colors shrink-0" />
                  </div>
                </Link>
              </MotionSection>
            ))}
          </div>
        </MotionSection>

        <div className="mt-16">
          <CTASection
            label="Stay Updated"
            title="Get Weekly Insights in Your Inbox"
            subtitle="Subscribe to our newsletter — exam tips, career guides, and tech deep-dives every Tuesday."
            primaryCTA={{ label: 'Subscribe Free', href: '/contact' }}
          />
        </div>
      </div>
    </>
  );
}
