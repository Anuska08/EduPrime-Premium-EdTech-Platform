'use client';
import { useState } from 'react';
import { Check, Zap } from 'lucide-react';
import Link from 'next/link';
import MotionSection from './MotionSection';

interface Plan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  color?: string;
}

interface Props { plans: Plan[] }

export default function PricingTable({ plans }: Props) {
  const [yearly, setYearly] = useState(false);

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={`text-sm font-medium transition-colors ${!yearly ? 'text-white' : 'text-[#6060a0]'}`}>Monthly</span>
        <button
          onClick={() => setYearly(v => !v)}
          className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${yearly ? 'gradient-brand' : 'bg-white/10'}`}
        >
          <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${yearly ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
        <span className={`text-sm font-medium transition-colors ${yearly ? 'text-white' : 'text-[#6060a0]'}`}>
          Yearly
          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-emerald-400/20 text-emerald-400 border border-emerald-400/30">Save 25%</span>
        </span>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <MotionSection key={plan.name} delay={i * 0.1} direction="up">
            <div className={`relative glass-card p-8 h-full flex flex-col ${plan.popular ? 'border-[#6060f0]/50' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-px left-0 right-0 h-px gradient-brand" />
              )}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full gradient-brand text-white text-xs font-semibold">
                    <Zap className="w-3 h-3" /> Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-cal text-xl font-semibold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-[#7070a0]">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="font-cal text-4xl font-semibold text-white">
                    ₹{yearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-sm text-[#6060a0]">/mo</span>
                </div>
                {yearly && (
                  <p className="text-xs text-emerald-400 mt-1">
                    Billed ₹{plan.yearlyPrice * 12}/yr
                  </p>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full gradient-brand flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-[#9090b0]">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={plan.popular ? 'btn-primary justify-center' : 'btn-secondary justify-center'}
              >
                {plan.cta}
              </Link>
            </div>
          </MotionSection>
        ))}
      </div>
    </div>
  );
}
