'use client';
import PricingTable from '@/components/PricingTable';
import MotionSection from '@/components/MotionSection';
import CTASection from '@/components/CTASection';
import { Check, HelpCircle } from 'lucide-react';
import useSWR from 'swr';
import api from '@/lib/api';

const fetcher = (url: string) => api.get(url).then(res => res.data);

const faqs = [
  { q: 'Can I switch plans anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
  { q: 'Is there a free trial for Pro?', a: 'Yes! Pro Learner includes a 7-day free trial with full access. No credit card required.' },
  { q: 'What payment methods are accepted?', a: 'We accept UPI, debit/credit cards (Visa, Mastercard, Rupay), net banking, and EMI options.' },
  { q: 'Are the certificates recognized?', a: 'EduPrime certificates are recognized by 500+ hiring partners across India and globally.' },
];

export default function PricingPage() {
  const { data, isLoading } = useSWR('/subscriptions', fetcher);
  const plans = data?.plans || [];

  return (
    <>
      <section className="pt-28 pb-16 bg-[#080818] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <MotionSection>
            <p className="section-label mb-3">Pricing</p>
            <h1 className="section-title mb-4">Simple, Transparent Pricing</h1>
            <p className="text-[#7070a0] max-w-xl mx-auto">
              Start free. Upgrade when you&rsquo;re ready. Cancel anytime. No hidden charges — ever.
            </p>
          </MotionSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <MotionSection>
          {isLoading ? (
            <div className="text-center py-20 text-[#6060a0]">Loading pricing plans...</div>
          ) : plans.length > 0 ? (
            <PricingTable plans={plans.map((p: any) => ({
              name: p.name,
              monthlyPrice: p.monthlyPrice,
              yearlyPrice: p.yearlyPrice,
              description: p.description || 'Access to premium EduPrime content.',
              features: p.features,
              popular: p.isPopular,
              cta: p.monthlyPrice === 0 ? 'Start Free' : 'Subscribe Now'
            }))} />
          ) : (
            <div className="text-center py-20 text-[#6060a0]">No pricing plans available.</div>
          )}
        </MotionSection>

        {/* Comparison table */}
        <MotionSection className="mt-20" delay={0.1}>
          <h2 className="font-cal text-2xl font-semibold text-white mb-8 text-center">Feature Comparison</h2>
          <div className="glass-card overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-4 font-cal text-[#8080a0]">Feature</th>
                  {plans.map((p: any) => (
                    <th key={p.name} className={`px-4 py-4 font-cal text-center ${p.isPopular ? 'text-[#8080f0]' : 'text-white'}`}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Free Courses (200+)', true, true, true],
                  ['Live Classes', false, true, true],
                  ['Unlimited Courses', false, true, true],
                  ['Test Series', '5/mo', 'Unlimited', 'Unlimited'],
                  ['AI Study Planner', false, true, true],
                  ['Offline Downloads', false, true, true],
                  ['Certificates', false, true, true],
                  ['White Label', false, false, true],
                  ['Dedicated Support', false, false, true],
                ].map(([feature, ...vals], i) => (
                  <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                    <td className="px-6 py-4 text-[#9090b0] whitespace-nowrap">{feature as string}</td>
                    {vals.map((v, vi) => (
                      <td key={vi} className="px-4 py-4 text-center">
                        {v === true ? <Check className="w-5 h-5 text-emerald-400 mx-auto" strokeWidth={3} /> :
                         v === false ? <span className="text-[#4040600]">—</span> :
                         <span className="text-[#9090b0]">{v}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MotionSection>

        {/* FAQs */}
        <MotionSection className="mt-20" delay={0.2}>
          <h2 className="font-cal text-2xl font-semibold text-white mb-8 text-center">Frequently Asked</h2>
          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="glass-card p-5 group cursor-pointer">
                <summary className="flex items-center justify-between list-none font-cal text-base font-semibold text-white">
                  {f.q}
                  <HelpCircle className="w-5 h-5 text-[#6060a0] shrink-0 ml-4" />
                </summary>
                <p className="text-sm text-[#8080a0] mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </MotionSection>

        <div className="mt-16">
          <CTASection
            title="Not Sure Which Plan?"
            subtitle="Talk to our team and we'll recommend the perfect plan for your learning goals."
            primaryCTA={{ label: 'Book a Free Call', href: '/contact' }}
          />
        </div>
      </div>
    </>
  );
}
