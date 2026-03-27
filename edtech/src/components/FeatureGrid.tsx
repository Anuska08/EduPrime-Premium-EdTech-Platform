import { LucideIcon } from 'lucide-react';
import MotionSection from './MotionSection';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
}

export default function FeatureGrid({ features, cols = 3 }: { features: Feature[]; cols?: 2 | 3 | 4 }) {
  const gridCols = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-2 lg:grid-cols-4' };
  return (
    <div className={`grid grid-cols-1 ${gridCols[cols]} gap-6`}>
      {features.map((f, i) => (
        <MotionSection key={i} delay={i * 0.07} direction="up">
          <div className="glass-card p-6 h-full group cursor-default">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
              style={{ background: f.color ? `${f.color}22` : 'rgba(96,60,240,0.15)', border: `1px solid ${f.color ?? '#6060f0'}33` }}
            >
              <f.icon className="w-6 h-6" style={{ color: f.color ?? '#8080f0' }} />
            </div>
            <h3 className="font-cal text-base font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-sm text-[#7070a0] leading-relaxed">{f.description}</p>
          </div>
        </MotionSection>
      ))}
    </div>
  );
}
