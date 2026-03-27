import MotionSection from '@/components/MotionSection';
import CTASection from '@/components/CTASection';
import { Cloud, Shield, Video, Brain, Bell, Zap, Globe, Database, Lock, ArrowRight } from 'lucide-react';

const pillars = [
  { icon: Cloud, title: 'Cloud-Native Scalability', description: 'Auto-scaling infrastructure on AWS handles 10M+ concurrent users during peak exam seasons without a single second of downtime.', color: '#6060f0' },
  { icon: Video, title: 'Secure Video Streaming', description: 'AES-256 encrypted video delivery via global CDN. Adaptive bitrate streaming ensures smooth playback on 2G to gigabit networks.', color: '#3b82f6' },
  { icon: Brain, title: 'AI Recommendation Engine', description: 'Proprietary ML model analyzes 50+ signals to surface the right content at the right time — personalized for each learner.', color: '#a040e0' },
  { icon: Bell, title: 'Real-Time Notifications', description: 'WebSocket-powered notification system delivers class reminders, rank updates, and doubt answers with sub-100ms latency.', color: '#fbbf24' },
  { icon: Lock, title: 'Data Encryption', description: 'End-to-end encryption for all user data at rest and in transit. SOC-2 Type II certified and GDPR compliant.', color: '#ef4444' },
  { icon: Database, title: 'Analytics Pipeline', description: 'Real-time data pipeline processes 500M+ events/day. Educators get rich engagement analytics; students get personalized insights.', color: '#10b981' },
];

const stats = [
  { label: 'Uptime SLA', value: '99.99%' },
  { label: 'Concurrent Users', value: '10M+' },
  { label: 'CDN Nodes', value: '200+' },
  { label: 'Data Processed', value: '500M events/day' },
];

export default function PlatformPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-[#080818] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <MotionSection>
            <p className="section-label mb-3">Platform Infrastructure</p>
            <h1 className="section-title mb-4">Built for Scale &amp; Security</h1>
            <p className="text-[#7070a0] max-w-xl mx-auto">
              Behind every great learning experience is world-class infrastructure. Explore the technology that powers EduPrime at scale.
            </p>
          </MotionSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Stats */}
        <MotionSection className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <div className="font-cal text-3xl font-semibold gradient-text mb-2">{s.value}</div>
                <div className="text-sm text-[#7070a0]">{s.label}</div>
              </div>
            ))}
          </div>
        </MotionSection>

        {/* Architecture diagram (visual) */}
        <MotionSection className="mb-16" delay={0.1}>
          <div className="glass-card p-8">
            <h2 className="font-cal text-xl font-semibold text-white mb-8 text-center">System Architecture</h2>
            <div className="relative">
              {/* Layer visualization */}
              {[
                { label: 'User Layer', items: ['Web App (Next.js)', 'iOS App', 'Android App'], color: '#6060f0' },
                { label: 'API Gateway', items: ['Load Balancer', 'Auth Service', 'Rate Limiter'], color: '#a040e0' },
                { label: 'Core Services', items: ['Course Engine', 'Live Streaming', 'AI Engine', 'Analytics'], color: '#3b82f6' },
                { label: 'Data Layer', items: ['PostgreSQL', 'Redis Cache', 'Elasticsearch', 'S3 Storage'], color: '#10b981' },
              ].map((layer, li) => (
                <div key={li} className="mb-4">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: layer.color }}>
                    {layer.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map(item => (
                      <div
                        key={item}
                        className="px-4 py-2 rounded-xl text-sm font-medium text-white border"
                        style={{ background: `${layer.color}15`, borderColor: `${layer.color}30` }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  {li < 3 && (
                    <div className="flex justify-center my-2">
                      <div className="w-px h-6 bg-white/10" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </MotionSection>

        {/* Infrastructure pillars */}
        <MotionSection className="mb-16" delay={0.15}>
          <h2 className="font-cal text-2xl font-semibold text-white mb-8 text-center">Infrastructure Pillars</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <MotionSection key={i} delay={i * 0.07}>
                <div className="glass-card p-6 group h-full">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${p.color}22`, border: `1px solid ${p.color}33` }}
                  >
                    <p.icon className="w-6 h-6" style={{ color: p.color }} />
                  </div>
                  <h3 className="font-cal text-base font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-[#7070a0] leading-relaxed">{p.description}</p>
                </div>
              </MotionSection>
            ))}
          </div>
        </MotionSection>

        {/* Certifications */}
        <MotionSection delay={0.2} className="mb-16">
          <div className="glass-card p-8 text-center">
            <h2 className="font-cal text-xl font-semibold text-white mb-4">Trusted Certifications</h2>
            <p className="text-[#7070a0] mb-8 max-w-md mx-auto">EduPrime meets the highest international standards for security, privacy, and reliability.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {['SOC-2 Type II', 'ISO 27001', 'GDPR Compliant', 'WCAG 2.1 AA', 'PCI DSS Level 1', 'CERT-In Registered'].map(cert => (
                <div key={cert} className="glass px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" /> {cert}
                </div>
              ))}
            </div>
          </div>
        </MotionSection>

        <CTASection
          label="Enterprise-Grade Trust"
          title="Scale with Confidence"
          subtitle="Deploy EduPrime for your institution with custom SLAs, dedicated support, and white-label options."
          primaryCTA={{ label: 'Talk to Enterprise Team', href: '/contact' }}
        />
      </div>
    </>
  );
}
