import MotionSection from '@/components/MotionSection';
import FeatureGrid from '@/components/FeatureGrid';
import CTASection from '@/components/CTASection';
import { MessageSquare, Trophy, Bell, Wifi, Smartphone, BookMarked, Zap, Brain, Shield, BarChart, Users, Star } from 'lucide-react';

const featureGroups = [
  {
    label: 'Learning Experience',
    features: [
      { icon: MessageSquare, title: 'Doubt-Solving Forums', description: 'Post doubts anytime. Get answers from peers, AI, and educators within minutes.', color: '#6060f0' },
      { icon: Brain, title: 'AI Study Assistant', description: 'Personalized study schedules, weak-area detection, and smart revision reminders.', color: '#a040e0' },
      { icon: BookMarked, title: 'Smart Notes', description: 'Auto-generated PDF notes from video lectures. Highlight, annotate, and share.', color: '#3b82f6' },
    ]
  },
  {
    label: 'Engagement & Motivation',
    features: [
      { icon: Trophy, title: 'Gamified Badges', description: 'Earn XP, unlock achievement badges, and climb the leaderboard for every learning milestone.', color: '#fbbf24' },
      { icon: Bell, title: 'Smart Reminders', description: 'AI-powered nudges based on your learning pattern. Study at your optimal time.', color: '#f59e0b' },
      { icon: Star, title: 'Streak & Rewards', description: 'Build and maintain daily study streaks. Unlock premium content and special discounts.', color: '#ef4444' },
    ]
  },
  {
    label: 'Access & Flexibility',
    features: [
      { icon: Wifi, title: 'Offline Downloads', description: 'Download lectures and notes. Learn without internet — on trains, flights, anywhere.', color: '#10b981' },
      { icon: Smartphone, title: 'Mobile App', description: 'Full-featured iOS & Android apps with Dark Mode, gesture controls, and speed controls.', color: '#06b6d4' },
      { icon: Zap, title: 'Fast Performance', description: 'CDN-powered video delivery. 4K quality on good networks, 720p on 2G. Always smooth.', color: '#8b5cf6' },
    ]
  },
];

export default function FeaturesPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-[#080818] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <MotionSection>
            <p className="section-label mb-3">Platform Features</p>
            <h1 className="section-title mb-4">Everything You Need to Succeed</h1>
            <p className="text-[#7070a0] max-w-xl mx-auto">
              EduPrime isn&rsquo;t just a course platform — it&rsquo;s a complete learning ecosystem engineered for performance and engagement.
            </p>
          </MotionSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        {featureGroups.map((group, gi) => (
          <div key={gi}>
            <MotionSection className="mb-8">
              <h2 className="font-cal text-2xl font-semibold text-white flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-sm text-white font-bold">{gi + 1}</span>
                {group.label}
              </h2>
            </MotionSection>
            <FeatureGrid features={group.features} cols={3} />
          </div>
        ))}

        {/* Integrations */}
        <MotionSection>
          <div className="glass-card p-8 text-center">
            <h2 className="font-cal text-2xl font-semibold text-white mb-3">Works with Your Favorite Tools</h2>
            <p className="text-[#7070a0] mb-8 max-w-lg mx-auto">EduPrime integrates with Google Meet, Zoom, Slack, and 50+ platforms for enterprise deployments.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Google Meet', 'Zoom', 'Slack', 'WhatsApp', 'Razorpay', 'AWS', 'Cloudflare', 'OpenAI'].map(tool => (
                <div key={tool} className="glass px-4 py-2 rounded-xl text-sm font-medium text-[#9090b0]">{tool}</div>
              ))}
            </div>
          </div>
        </MotionSection>

        <CTASection
          label="Experience It Yourself"
          title="Try All Features Free for 7 Days"
          subtitle="No credit card required. Cancel anytime."
          primaryCTA={{ label: 'Start Free Trial', href: '/courses' }}
          secondaryCTA={{ label: 'View Pricing', href: '/pricing' }}
        />
      </div>
    </>
  );
}
