import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface Props {
  label?: string;
  title: string;
  subtitle?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  variant?: 'gradient' | 'glass';
  children?: ReactNode;
}

export default function CTASection({ label, title, subtitle, primaryCTA, secondaryCTA, variant = 'gradient', children }: Props) {
  return (
    <section className={`relative rounded-2xl overflow-hidden ${variant === 'gradient' ? 'gradient-brand p-px' : ''}`}>
      <div className={`relative rounded-2xl px-8 py-16 md:px-16 text-center overflow-hidden ${variant === 'gradient' ? 'bg-[#0d0d28]' : 'glass'}`}>
        {/* Glow orbs */}
        <div className="absolute -top-20 left-1/4 w-64 h-64 bg-[#6060f0]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-[#a040e0]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {label && <p className="section-label mb-4">{label}</p>}
          <h2 className="section-title mb-4 max-w-3xl mx-auto">{title}</h2>
          {subtitle && <p className="text-[#8080a0] text-lg max-w-xl mx-auto mb-8">{subtitle}</p>}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={primaryCTA.href} className="btn-primary text-base px-8 py-3 glow-brand">
              {primaryCTA.label} <ArrowRight className="w-5 h-5" />
            </Link>
            {secondaryCTA && (
              <Link href={secondaryCTA.href} className="btn-secondary text-base px-8 py-3">
                {secondaryCTA.label}
              </Link>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
