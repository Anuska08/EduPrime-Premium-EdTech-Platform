import MotionSection from '@/components/MotionSection';
import CTASection from '@/components/CTASection';

const studies = [
  {
    name: 'Ananya Singh',
    exam: 'JEE Advanced 2025',
    rank: 'AIR 47',
    before: 'Struggling with JEE Physics – scoring 45% in mocks. No structured plan.',
    after: 'Cracked JEE Advanced with AIR 47. Admitted to IIT Bombay – Computer Science.',
    metric: [{ label: 'Mock Test Score', before: '45%', after: '93%' }, { label: 'Study Hours/Day', before: '4h', after: '8h' }, { label: 'Practice Questions', before: '200/mo', after: '1,200/mo' }],
    color: '#6060f0', duration: '11 months'
  },
  {
    name: 'Karan Patel',
    exam: 'UPSC CSE 2025',
    rank: 'IAS Selection',
    before: 'Failed Prelims twice. Overwhelmed by the vast UPSC syllabus with no guidance.',
    after: 'Cleared Prelims, Mains, and Interview in one attempt. Selected as IAS Officer.',
    metric: [{ label: 'Prelims Score', before: '85', after: '134' }, { label: 'Essay Marks', before: '100', after: '160' }, { label: 'Tests Attempted', before: '10', after: '60+' }],
    color: '#f59e0b', duration: '14 months'
  },
  {
    name: 'Shreya Nair',
    exam: 'Career Transition',
    rank: '₹32 LPA @ Amazon',
    before: 'Mechanical engineer with no coding background, earning ₹6 LPA in manufacturing.',
    after: 'Transitioned to Data Engineering role at Amazon with a 432% salary jump.',
    metric: [{ label: 'Salary', before: '₹6 LPA', after: '₹32 LPA' }, { label: 'Python Skills', before: 'Zero', after: 'Advanced' }, { label: 'Projects Built', before: '0', after: '12' }],
    color: '#10b981', duration: '8 months'
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-[#080818] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <MotionSection>
            <p className="section-label mb-3">Case Studies</p>
            <h1 className="section-title mb-4">Real Transformations</h1>
            <p className="text-[#7070a0] max-w-xl mx-auto">
              These aren&rsquo;t just numbers — they&rsquo;re lives changed. Read how EduPrime transformed these students&rsquo; journeys.
            </p>
          </MotionSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {studies.map((s, i) => (
          <MotionSection key={s.name} delay={i * 0.05}>
            <div className="glass-card p-0 overflow-hidden">
              <div className="px-1 py-1" style={{ background: `linear-gradient(90deg, ${s.color}44, transparent)` }} />
              <div className="p-8 grid lg:grid-cols-2 gap-10">
                {/* Story */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
                      style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}88)` }}
                    >
                      {s.name[0]}
                    </div>
                    <div>
                      <h2 className="font-cal text-xl font-semibold text-white">{s.name}</h2>
                      <p className="text-sm" style={{ color: s.color }}>{s.exam}</p>
                      <p className="text-xs text-[#6060a0] mt-0.5">Duration: {s.duration}</p>
                    </div>
                    <div className="ml-auto glass px-4 py-2 rounded-xl text-center">
                      <div className="font-cal text-lg font-semibold text-white">{s.rank}</div>
                      <div className="text-xs text-[#6060a0]">Achievement</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <div className="text-xs font-semibold text-red-400 mb-1 uppercase tracking-wider">Before EduPrime</div>
                      <p className="text-sm text-[#9090b0]">{s.before}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="text-xs font-semibold text-emerald-400 mb-1 uppercase tracking-wider">After EduPrime</div>
                      <p className="text-sm text-[#9090b0]">{s.after}</p>
                    </div>
                  </div>
                </div>
                {/* Metrics */}
                <div>
                  <h3 className="font-cal text-base font-semibold text-white mb-4">Key Metrics</h3>
                  <div className="space-y-4">
                    {s.metric.map(m => (
                      <div key={m.label} className="glass-card p-4">
                        <div className="text-xs text-[#6060a0] mb-3 uppercase tracking-wider">{m.label}</div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 text-center p-3 rounded-xl bg-red-500/10">
                            <div className="text-xs text-red-400 mb-1">Before</div>
                            <div className="font-cal text-lg font-semibold text-white">{m.before}</div>
                          </div>
                          <div className="text-[#4040600] font-bold">→</div>
                          <div className="flex-1 text-center p-3 rounded-xl bg-emerald-500/10">
                            <div className="text-xs text-emerald-400 mb-1">After</div>
                            <div className="font-cal text-lg font-semibold text-white">{m.after}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </MotionSection>
        ))}

        <CTASection
          title="Your Success Story Starts Here"
          subtitle="Join millions who transformed their lives with EduPrime."
          primaryCTA={{ label: 'Start Your Journey', href: '/courses' }}
          secondaryCTA={{ label: 'Read More Stories', href: '/case-studies' }}
        />
      </div>
    </>
  );
}
