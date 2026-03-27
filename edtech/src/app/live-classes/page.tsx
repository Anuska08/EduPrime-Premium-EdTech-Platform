'use client';
import CountdownTimer from '@/components/CountdownTimer';
import MotionSection from '@/components/MotionSection';
import CTASection from '@/components/CTASection';
import { Video, Users, Clock, BookOpen, ExternalLink, Loader2 } from 'lucide-react';
import useSWR from 'swr';
import api from '@/lib/api';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function LiveClassesPage() {
  const { data, isLoading } = useSWR('/live-classes', fetcher);
  const classes = data?.liveClasses || [];

  // Determine currently live class based on scheduledAt and current time
  const now = new Date().getTime();
  
  const formattedClasses = classes.map((c: any) => {
    const time = new Date(c.scheduledAt).getTime();
    const isLiveNow = time <= now + (15 * 60 * 1000) && time >= now - ((c.duration || 60) * 60 * 1000); // Live if starts in 15 mins or started within duration
    return {
      ...c,
      time: new Date(c.scheduledAt),
      duration: `${c.duration || 60} min`,
      level: 'All Levels',
      isLive: c.isLive || isLiveNow,
      enrolled: Math.floor(Math.random() * 2000) + 1000, // mock enrolled for UI
      max: c.maxAttendees || 5000,
    };
  }).sort((a: any, b: any) => a.time.getTime() - b.time.getTime());

  const liveClass = formattedClasses.find((c: any) => c.isLive);
  const upcoming = formattedClasses.filter((c: any) => !c.isLive && c.time.getTime() > now - ((c.duration || 60) * 60 * 1000));

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-16 bg-[#080818] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <MotionSection>
            {liveClass && (
              <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm text-red-400 font-semibold">1 Class Live Now</span>
              </div>
            )}
            <p className="section-label mb-3">Live Classes</p>
            <h1 className="section-title mb-4">Learn in Real-Time</h1>
            <p className="text-[#7070a0] max-w-xl mx-auto">
              Interactive live sessions with India&rsquo;s best educators. Ask doubts, participate in polls, and learn with thousands of students simultaneously.
            </p>
          </MotionSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {isLoading && (
          <div className="text-center py-20 text-[#6060a0]">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="font-cal text-lg text-white">Loading live schedule...</p>
          </div>
        )}

        {/* Currently Live */}
        {liveClass && (
          <MotionSection className="mb-14">
            <h2 className="font-cal text-2xl font-semibold text-white mb-6 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" /> Happening Now
            </h2>
            <div className="glass-card p-0 overflow-hidden lg:flex">
              <div className="lg:w-2/3 aspect-video bg-gradient-to-br from-[#1a1a4e] to-[#0d0d28] relative flex items-center justify-center">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'linear-gradient(rgba(96,60,240,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(96,60,240,0.4) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
                <div className="text-center z-10">
                  <div className="inline-block px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/30 mb-4">● LIVE</div>
                  <p className="font-mono text-white/40 text-sm">{liveClass.title}</p>
                </div>
                <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-xl text-xs text-white flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-emerald-400" /> {liveClass.enrolled.toLocaleString()} watching
                </div>
              </div>
              <div className="lg:w-1/3 p-6 flex flex-col gap-4">
                <div>
                  <span className="section-label">{liveClass.subject}</span>
                  <h3 className="font-cal text-lg font-semibold text-white mt-1.5 leading-snug">{liveClass.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white text-sm font-bold">
                    {liveClass.instructorName ? liveClass.instructorName[0] : 'I'}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{liveClass.instructorName}</div>
                    <div className="text-xs text-[#6060a0]">{liveClass.duration} session</div>
                  </div>
                </div>
                <div className="flex-1" />
                <button 
                  onClick={() => window.open(liveClass.joinUrl, '_blank')}
                  className="btn-primary w-full justify-center"
                >
                  Join Now <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </MotionSection>
        )}

        {/* Upcoming */}
        {!isLoading && upcoming.length > 0 && (
          <>
            <h2 className="font-cal text-2xl font-semibold text-white mb-6">Upcoming Classes</h2>
            <div className="space-y-4">
              {upcoming.map((c: any, i: number) => (
                <MotionSection key={c._id} delay={i * 0.08} direction="up">
                  <div className="glass-card p-6 flex flex-wrap lg:flex-nowrap items-center gap-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${c.color || '#6060f0'}22`, border: `1px solid ${c.color || '#6060f0'}33` }}
                    >
                      <Video className="w-6 h-6" style={{ color: c.color || '#6060f0' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: c.color || '#6060f0' }}>{c.subject}</span>
                        <span className="text-xs glass px-2 py-0.5 rounded-full text-[#8080a0]">{c.level}</span>
                      </div>
                      <h3 className="font-cal text-base font-semibold text-white line-clamp-1">{c.title}</h3>
                      <p className="text-sm text-[#7070a0] mt-0.5">by {c.instructorName} · {c.time.toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="flex items-center gap-2 text-xs text-[#6060a0]">
                        <Users className="w-3.5 h-3.5" /> {c.enrolled.toLocaleString()} / {c.max.toLocaleString()}
                      </div>
                      <CountdownTimer targetDate={c.time} />
                      <button className="btn-secondary text-sm px-4 py-2">Set Reminder</button>
                    </div>
                  </div>
                </MotionSection>
              ))}
            </div>
          </>
        )}
        
        {!isLoading && upcoming.length === 0 && !liveClass && (
          <div className="text-center py-20 text-[#6060a0]">
            <p className="text-4xl mb-4">📅</p>
            <p className="font-cal text-xl text-white mb-2">No upcoming live classes</p>
            <p>Check back later for new schedules.</p>
          </div>
        )}

        <div className="mt-16">
          <CTASection
            label="Never Miss a Class"
            title="Get Live Class Reminders"
            subtitle="Subscribe and we'll notify you 15 minutes before every session you love."
            primaryCTA={{ label: 'Subscribe for Free', href: '/contact' }}
          />
        </div>
      </div>
    </>
  );
}
