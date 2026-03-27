import DashboardWidget from '@/components/DashboardWidget';
import LeaderboardCard from '@/components/LeaderboardCard';
import MotionSection from '@/components/MotionSection';
import { BookOpen, Clock, Award, Bell, PlayCircle, BarChart3, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const widgets = [
  { type: 'stat' as const, title: 'Total Study Hours', value: '284h', subtitle: '12h this week' },
  { type: 'stat' as const, title: 'Courses Enrolled', value: '7', subtitle: '2 completed' },
  { type: 'stat' as const, title: 'Tests Taken', value: '34', subtitle: 'Avg 78% score' },
  { type: 'stat' as const, title: 'Certificates Earned', value: '3', subtitle: 'This year' },
];

const continuing = [
  { type: 'continue' as const, title: 'JEE Physics – Rotational Motion', subtitle: 'Chapter 9 of 22 · Next: Torque & Angular Momentum', progress: 42, href: '/courses' },
  { type: 'continue' as const, title: 'Python Data Science Bootcamp', subtitle: 'Module 5 of 12 · Next: Pandas DataFrames', progress: 40, href: '/courses' },
  { type: 'continue' as const, title: 'UPSC GS Paper 2 – Polity', subtitle: 'Topic 8 of 20 · Next: Parliamentary Procedures', progress: 38, href: '/courses' },
];

const upcoming = [
  { id: '1', time: '3:00 PM', subject: 'Physics', title: 'Live: Gravitation – Final Revision', instructor: 'Dr. Arvind Kumar', color: '#6060f0' },
  { id: '2', time: '6:30 PM', subject: 'Polity', title: 'Live: Constitutional Amendments', instructor: 'Meera Iyer', color: '#f59e0b' },
];

const leaderboard = [
  { rank: 1, name: 'Ananya S.', score: 9840, change: 0 },
  { rank: 2, name: 'You (Anuska)', score: 9720, change: 2 },
  { rank: 3, name: 'Preethi N.', score: 9680, change: -1 },
  { rank: 4, name: 'Siddharth R.', score: 9540, change: 3 },
];

const activity = [
  { icon: PlayCircle, text: 'Watched Lecture 9 – Rotational Motion', time: '2h ago', color: '#6060f0' },
  { icon: CheckCircle, text: 'Completed Mock Test #12 – Score: 84%', time: '5h ago', color: '#10b981' },
  { icon: BookOpen, text: 'Downloaded Chapter 8 Notes', time: 'Yesterday', color: '#fbbf24' },
  { icon: Star, text: 'Earned "Consistency Champion" badge', time: '2 days ago', color: '#a040e0' },
];

export default function DashboardPage() {
  return (
    <>
      <section className="pt-28 pb-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MotionSection>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="section-label mb-1">Student Dashboard</p>
                <h1 className="font-cal text-3xl font-semibold text-white">Welcome back, Anuska 👋</h1>
                <p className="text-[#7070a0] mt-1">You&rsquo;re on a <span className="text-amber-400 font-semibold">14-day streak!</span> Keep it up.</p>
              </div>
              <button className="btn-primary flex items-center gap-2"><Bell className="w-4 h-4" /> 3 Reminders</button>
            </div>
          </MotionSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Stat widgets */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {widgets.map((w, i) => (
            <MotionSection key={i} delay={i * 0.07}>
              <DashboardWidget widget={w} />
            </MotionSection>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <MotionSection>
              <h2 className="font-cal text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <PlayCircle className="w-5 h-5 text-[#8080f0]" /> Continue Learning
              </h2>
              <div className="space-y-4">
                {continuing.map((w, i) => (
                  <DashboardWidget key={i} widget={w} />
                ))}
              </div>
            </MotionSection>

            {/* Today's Schedule */}
            <MotionSection delay={0.15}>
              <h2 className="font-cal text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" /> Today&rsquo;s Schedule
              </h2>
              <div className="space-y-3">
                {upcoming.map(u => (
                  <div key={u.id} className="glass-card p-4 flex items-center gap-4">
                    <div className="text-right shrink-0 text-sm">
                      <div className="font-cal font-semibold text-white">{u.time}</div>
                      <div style={{ color: u.color }} className="text-xs font-medium">{u.subject}</div>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm line-clamp-1">{u.title}</div>
                      <div className="text-xs text-[#6060a0]">{u.instructor}</div>
                    </div>
                    <button className="btn-primary text-xs py-1.5 px-3">Join</button>
                  </div>
                ))}
              </div>
            </MotionSection>

            {/* Certificates */}
            <MotionSection delay={0.2}>
              <h2 className="font-cal text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" /> Certificates
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {['Python Basics Certification', 'JEE Physics Module 1', 'Digital Marketing Foundations'].map(cert => (
                  <div key={cert} className="glass-card p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white line-clamp-1">{cert}</div>
                      <div className="text-xs text-[#6060a0]">Issued 2026</div>
                    </div>
                    <button className="text-xs text-[#8080f0] hover:text-white transition-colors shrink-0">View</button>
                  </div>
                ))}
              </div>
            </MotionSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <MotionSection delay={0.1} direction="right">
              <LeaderboardCard entries={leaderboard} title="Class Rank" />
            </MotionSection>

            {/* Activity timeline */}
            <MotionSection delay={0.2} direction="right">
              <div className="glass-card p-6">
                <h3 className="font-cal text-base font-semibold text-white mb-5 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#8080f0]" /> Recent Activity
                </h3>
                <div className="space-y-4">
                  {activity.map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${a.color}22` }}>
                        <a.icon className="w-3.5 h-3.5" style={{ color: a.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#9090b0] leading-snug">{a.text}</p>
                        <p className="text-xs text-[#505070] mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MotionSection>

            {/* AI Recommendations */}
            <MotionSection delay={0.3} direction="right">
              <div className="glass-card p-6">
                <h3 className="font-cal text-base font-semibold text-white mb-4">🤖 Recommended for You</h3>
                <div className="space-y-3">
                  {['Thermodynamics Deep Dive', 'Statistics for Data Science', 'Essay Writing for UPSC'].map(r => (
                    <Link key={r} href="/courses" className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                      <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-[#9090b0] group-hover:text-white transition-colors">{r}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </MotionSection>
          </div>
        </div>
      </div>
    </>
  );
}
