import MotionSection from '@/components/MotionSection';
import CTASection from '@/components/CTASection';
import { GraduationCap, Layers, Briefcase, Building2, ArrowRight } from 'lucide-react';

const segments = [
  {
    icon: GraduationCap,
    title: 'School Students',
    subtitle: 'Class 6–12',
    description: 'Foundation, board exam prep, and competitive exam readiness for CBSE & State boards. Interactive lessons, past papers, and doubt sessions.',
    color: '#6060f0',
    stats: [{ label: 'Students', v: '2.1M+' }, { label: 'Subjects', v: '20+' }, { label: 'States', v: '28' }],
    cta: 'Explore School Courses',
  },
  {
    icon: Layers,
    title: 'Competitive Exams',
    subtitle: 'JEE · NEET · UPSC · SSC · Banking',
    description: 'India\'s largest test prep platform. Live classes, previous-year papers, mock tests, and expert-led strategies to crack the toughest exams.',
    color: '#f59e0b',
    stats: [{ label: 'Selections', v: '500K+' }, { label: 'Mentors', v: '400+' }, { label: 'Mock Tests', v: '5,000+' }],
    cta: 'Start Exam Prep',
  },
  {
    icon: Briefcase,
    title: 'Professional Upskilling',
    subtitle: 'Tech · Finance · Design · Management',
    description: 'Learn in-demand skills. From Full Stack Dev to Financial Modelling — real-world projects, industry mentors, and job-ready certifications.',
    color: '#10b981',
    stats: [{ label: 'Courses', v: '800+' }, { label: 'Hiring Partners', v: '500+' }, { label: 'Avg Hike', v: '+42%' }],
    cta: 'Upskill Now',
  },
  {
    icon: Building2,
    title: 'Enterprise Training',
    subtitle: 'Teams · Coaching Centres · Universities',
    description: 'Custom LMS deployments, white-labeled portals, analytics dashboards, and bulk licensing for organizations of 10 to 10,000 learners.',
    color: '#a040e0',
    stats: [{ label: 'Companies', v: '350+' }, { label: 'Seats Deployed', v: '200K+' }, { label: 'NPS Score', v: '74' }],
    cta: 'Contact Enterprise',
  },
];

export default function IndustriesPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-[#080818] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <MotionSection>
            <p className="section-label mb-3">Learning Segments</p>
            <h1 className="section-title mb-4">Who We Serve</h1>
            <p className="text-[#7070a0] max-w-xl mx-auto">
              From school students to enterprise teams — EduPrime has purpose-built learning journeys for every goal.
            </p>
          </MotionSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {segments.map((seg, i) => (
            <MotionSection key={seg.title} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className="glass-card p-8 h-full flex flex-col gap-6 group">
                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${seg.color}22`, border: `1px solid ${seg.color}33` }}
                  >
                    <seg.icon className="w-7 h-7" style={{ color: seg.color }} />
                  </div>
                  <div>
                    <h2 className="font-cal text-xl font-semibold text-white">{seg.title}</h2>
                    <p className="text-sm font-medium mt-0.5" style={{ color: seg.color }}>{seg.subtitle}</p>
                  </div>
                </div>
                <p className="text-[#8080a0] leading-relaxed">{seg.description}</p>
                <div className="flex gap-6">
                  {seg.stats.map(s => (
                    <div key={s.label}>
                      <div className="font-cal text-xl font-semibold text-white">{s.v}</div>
                      <div className="text-xs text-[#6060a0]">{s.label}</div>
                    </div>
                  ))}
                </div>
                <a href="/courses" className="btn-secondary text-sm py-2.5 w-full justify-center mt-auto flex items-center gap-2">
                  {seg.cta} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </MotionSection>
          ))}
        </div>

        <div className="mt-16">
          <CTASection
            label="Find Your Path"
            title="Not Sure Where to Start?"
            subtitle="Take our 2-minute quiz and we'll recommend the perfect learning track for you."
            primaryCTA={{ label: 'Take the Quiz', href: '/contact' }}
          />
        </div>
      </div>
    </>
  );
}
