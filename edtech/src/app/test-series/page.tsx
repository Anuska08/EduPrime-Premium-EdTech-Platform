'use client';
import useSWR from 'swr';
import api from '@/lib/api';
import LeaderboardCard from '@/components/LeaderboardCard';
import MotionSection from '@/components/MotionSection';
import CTASection from '@/components/CTASection';
import { ClipboardList, Trophy, BarChart3, Clock, Users, Star, CheckCircle, Loader2 } from 'lucide-react';

const fetcher = (url: string) => api.get(url).then(res => res.data);

// Mock leaderboard/analytics for now since backend doesn't have an aggregated endpoint for this yet
const leaderboard = [
  { rank: 1, name: 'Ananya Singh', score: 9840, change: 0 },
  { rank: 2, name: 'Rohan Gupta', score: 9720, change: 2 },
  { rank: 3, name: 'Preethi Nair', score: 9680, change: -1 },
  { rank: 4, name: 'Siddharth Rao', score: 9540, change: 3 },
  { rank: 5, name: 'Divya Patel', score: 9420, change: 1 },
];

const difficultyColor: Record<string, string> = {
  Easy: 'text-emerald-400 bg-emerald-400/10',
  Medium: 'text-amber-400 bg-amber-400/10',
  Hard: 'text-orange-400 bg-orange-400/10',
  Extreme: 'text-red-400 bg-red-400/10',
};

export default function TestSeriesPage() {
  const { data, isLoading } = useSWR('/tests', fetcher);
  const tests = data?.tests || [];

  const formattedTests = tests.map((t: any) => ({
    ...t,
    difficulty: t.category.includes('JEE') || t.category.includes('UPSC') || t.category.includes('NEET') ? 'Hard' : 'Medium',
    attempts: Math.floor(Math.random() * 80000) + 10000, // mock attempts
    rating: (Math.random() * (5.0 - 4.2) + 4.2).toFixed(1), // mock rating
    featured: t.category.includes('JEE') || t.category.includes('UPSC'),
    color: t.category.includes('JEE') ? '#6060f0' : t.category.includes('Tech') ? '#f60090' : '#10b981',
  }));

  return (
    <>
      <section className="pt-28 pb-16 bg-[#080818] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <MotionSection>
            <p className="section-label mb-3">Test Series</p>
            <h1 className="section-title mb-4">Practice. Analyse. Excel.</h1>
            <p className="text-[#7070a0] max-w-xl mx-auto">
              Simulated exam conditions, instant solutions, detailed analytics, and AI-powered performance insights. Crack any exam with confidence.
            </p>
          </MotionSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Exam Cards */}
          <div className="lg:col-span-2">
            <MotionSection className="mb-6">
              <h2 className="font-cal text-xl font-semibold text-white">Available Tests</h2>
            </MotionSection>
            
            {isLoading ? (
              <div className="flex justify-center py-20 text-[#6060a0]">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="ml-3 font-cal text-lg text-white">Loading tests...</span>
              </div>
            ) : formattedTests.length > 0 ? (
              <div className="space-y-4">
                {formattedTests.map((exam: any, i: number) => (
                  <MotionSection key={exam._id} delay={i * 0.07} direction="left">
                    <div className={`glass-card p-5 ${exam.featured ? 'border-[#6060f0]/40' : ''}`}>
                      {exam.featured && (
                        <div className="flex items-center gap-1.5 mb-3">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="text-xs font-semibold text-amber-400">Featured Test</span>
                        </div>
                      )}
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${exam.color}22`, border: `1px solid ${exam.color}33` }}>
                          <ClipboardList className="w-5 h-5" style={{ color: exam.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-xs font-semibold" style={{ color: exam.color }}>{exam.category || 'General'}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[exam.difficulty] || difficultyColor['Medium']}`}>{exam.difficulty}</span>
                          </div>
                          <h3 className="font-cal text-base font-semibold text-white mb-2">{exam.title}</h3>
                          <div className="flex flex-wrap gap-4 text-xs text-[#6060a0]">
                            <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> {exam.totalMarks} Marks</span>
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {exam.duration} mins</span>
                            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {exam.attempts.toLocaleString()} attempts</span>
                            <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {exam.rating}</span>
                          </div>
                        </div>
                        <button className="btn-primary text-sm px-5 py-2 shrink-0 border border-white/10">
                          Start Test
                        </button>
                      </div>
                    </div>
                  </MotionSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 glass-card">
                <p className="text-[#6060a0] mb-2 font-cal text-lg">No tests currently active.</p>
                <p className="text-[#6060a0] text-sm">Check back soon for new mock exams and assessments.</p>
              </div>
            )}
          </div>

          {/* Leaderboard + Analytics */}
          <div className="space-y-6">
            <MotionSection delay={0.2} direction="right">
              <LeaderboardCard entries={leaderboard} title="Global Leaderboard" />
            </MotionSection>

            <MotionSection delay={0.3} direction="right">
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-5">
                  <BarChart3 className="w-5 h-5 text-[#8080f0]" />
                  <h3 className="font-cal text-base font-semibold text-white">Your Analytics</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Accuracy', value: 78, color: '#6060f0' },
                    { label: 'Speed (Q/hr)', value: 65, color: '#10b981' },
                    { label: 'Consistency', value: 82, color: '#fbbf24' },
                  ].map(s => (
                    <div key={s.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-[#8080a0]">{s.label}</span>
                        <span className="font-semibold text-white">{s.value}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${s.value}%`, background: s.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 p-3 rounded-xl bg-[#6060f0]/10 border border-[#6060f0]/20">
                  <p className="text-sm font-semibold text-white mb-1">AI Insight</p>
                  <p className="text-xs text-[#8080a0]">Focus on &quot;Modern Physics&quot; — your weakest chapter with 54% accuracy. Solving 20 problems daily can raise it to 80%+ in 2 weeks.</p>
                </div>
              </div>
            </MotionSection>
          </div>
        </div>

        <div className="mt-16">
          <CTASection
            label="Get Exam-Ready"
            title="Unlock Full Test Series Access"
            subtitle="200+ full-length mocks, chapter tests, and previous-year papers with AI analytics."
            primaryCTA={{ label: 'Get Pro Access', href: '/pricing' }}
            secondaryCTA={{ label: 'Try Free Tests', href: '/test-series' }}
          />
        </div>
      </div>
    </>
  );
}
