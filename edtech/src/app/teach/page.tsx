import MotionSection from '@/components/MotionSection';
import FeatureGrid from '@/components/FeatureGrid';
import CTASection from '@/components/CTASection';
import { BarChart3, Upload, DollarSign, Users, MessagesSquare, Star, Calendar, Video } from 'lucide-react';

const teacherFeatures = [
  { icon: Upload, title: 'Easy Course Creation', description: 'Upload videos, PDFs, and quizzes via our drag-and-drop interface. Publish in minutes.', color: '#6060f0' },
  { icon: BarChart3, title: 'Earnings Analytics', description: 'Real-time revenue charts, student acquisition data, and month-over-month growth tracking.', color: '#10b981' },
  { icon: Users, title: 'Student Engagement', description: 'Monitor completion rates, quiz scores, and identify students who need extra help.', color: '#fbbf24' },
  { icon: Calendar, title: 'Schedule Management', description: 'Plan and manage live class schedules with automated reminders and RSVP tracking.', color: '#f59e0b' },
  { icon: MessagesSquare, title: 'Doubt Forums', description: 'Integrated Q&A forums where students ask and you answer. AI can handle repetitive doubts.', color: '#a040e0' },
  { icon: Star, title: 'Reviews & Ratings', description: 'Build your reputation with verified student reviews and display your educator score publicly.', color: '#ef4444' },
];

const topEarners = [
  { name: 'Dr. Arvind Kumar', subject: 'Physics', monthly: '₹8.4L', students: 340000 },
  { name: 'Meera Iyer', subject: 'UPSC Polity', monthly: '₹5.2L', students: 180000 },
  { name: 'Rahul Mehta', subject: 'Data Science', monthly: '₹6.8L', students: 520000 },
];

export default function TeachPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-[#080818] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <MotionSection>
            <p className="section-label mb-3">Teach with EduPrime</p>
            <h1 className="section-title mb-4">Share Knowledge.<br />Earn Generously.</h1>
            <p className="text-[#7070a0] max-w-xl mx-auto mb-8">
              Join 1,200+ educators who earn ₹1L–₹12L per month teaching millions of students across India on EduPrime.
            </p>
            <a href="/contact" className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2">
              Apply to Teach
            </a>
          </MotionSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Earning showcase */}
        <MotionSection className="mb-16">
          <h2 className="font-cal text-2xl font-semibold text-white mb-8 text-center">Our Top Educators Earn</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {topEarners.map((e, i) => (
              <MotionSection key={e.name} delay={i * 0.1}>
                <div className="glass-card p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl gradient-brand flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {e.name[0]}
                  </div>
                  <div className="font-cal text-lg font-semibold text-white">{e.name}</div>
                  <div className="text-sm text-[#7070a0] mb-4">{e.subject}</div>
                  <div className="font-cal text-3xl font-semibold gradient-text">{e.monthly}</div>
                  <div className="text-xs text-[#6060a0] mt-1">per month · {(e.students/1000).toFixed(0)}K students</div>
                </div>
              </MotionSection>
            ))}
          </div>
        </MotionSection>

        {/* How it works */}
        <MotionSection className="mb-16">
          <h2 className="font-cal text-2xl font-semibold text-white mb-2 text-center">How It Works</h2>
          <p className="text-[#7070a0] text-center mb-10 max-w-lg mx-auto">From application to earning your first rupee — in 3 simple steps.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Apply & Get Verified', desc: 'Submit your profile, demo video, and expertise. Our team reviews within 48h.' },
              { step: '02', title: 'Create Your Courses', desc: 'Use our studio tools to upload, edit, and publish content. Free recording support provided.' },
              { step: '03', title: 'Teach & Earn', desc: 'Go live, build your student base, and earn 60–70% revenue share on every enrollment.' },
            ].map((s, i) => (
              <MotionSection key={i} delay={i * 0.1}>
                <div className="glass-card p-6 text-center">
                  <div className="font-cal text-5xl font-semibold gradient-text mb-4">{s.step}</div>
                  <h3 className="font-cal text-lg font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-[#7070a0]">{s.desc}</p>
                </div>
              </MotionSection>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="mb-16">
          <h2 className="font-cal text-2xl font-semibold text-white mb-8 text-center">Teacher Tools</h2>
          <FeatureGrid features={teacherFeatures} cols={3} />
        </MotionSection>

        <CTASection
          label="Ready to Teach?"
          title="Start Your Teaching Journey Today"
          subtitle="Apply in 5 minutes. Start earning within a week."
          primaryCTA={{ label: 'Apply Now — It\'s Free', href: '/contact' }}
          secondaryCTA={{ label: 'Learn More', href: '/features' }}
        />
      </div>
    </>
  );
}
