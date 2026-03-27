import { PlayCircle, Clock, BookOpen, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Widget {
  type: 'continue' | 'progress' | 'stat';
  title: string;
  subtitle?: string;
  progress?: number;
  value?: string | number;
  href?: string;
  color?: string;
}

export default function DashboardWidget({ widget }: { widget: Widget }) {
  return (
    <div className="glass-card p-5 group">
      {widget.type === 'continue' && (
        <>
          <div className="flex items-center gap-2 mb-3">
            <PlayCircle className="w-4 h-4 text-[#8080f0]" />
            <span className="text-xs font-semibold text-[#8080f0] uppercase tracking-wider">Continue Learning</span>
          </div>
          <h4 className="font-cal text-sm font-semibold text-white mb-2 line-clamp-2">{widget.title}</h4>
          <p className="text-xs text-[#6060a0] mb-4">{widget.subtitle}</p>
          {widget.progress !== undefined && (
            <div className="mb-4">
              <div className="flex justify-between text-xs text-[#6060a0] mb-1">
                <span>Progress</span>
                <span>{widget.progress}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="progress-bar-fill" style={{ width: `${widget.progress}%` }} />
              </div>
            </div>
          )}
          <Link href={widget.href ?? '/dashboard'} className="btn-primary text-xs py-2 px-4 w-full justify-center">
            Resume <PlayCircle className="w-3.5 h-3.5" />
          </Link>
        </>
      )}

      {widget.type === 'progress' && (
        <>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{widget.subtitle ?? 'Course Progress'}</span>
          </div>
          <h4 className="font-cal text-base font-semibold text-white mb-4">{widget.title}</h4>
          {widget.progress !== undefined && (
            <>
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="url(#prog)" strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - widget.progress / 100)}`}
                    strokeLinecap="round" />
                  <defs>
                    <linearGradient id="prog" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6060f0" />
                      <stop offset="100%" stopColor="#a040e0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-cal text-xl font-semibold text-white">{widget.progress}%</span>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {widget.type === 'stat' && (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-cal text-2xl font-semibold text-white">{widget.value}</div>
            <div className="text-xs text-[#6060a0] mt-0.5">{widget.title}</div>
            {widget.subtitle && <div className="text-xs text-emerald-400 mt-0.5">↑ {widget.subtitle}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
