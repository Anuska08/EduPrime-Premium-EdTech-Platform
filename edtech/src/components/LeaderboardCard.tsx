import { TrendingUp, Trophy, Medal } from 'lucide-react';

interface Entry {
  rank: number;
  name: string;
  score: number;
  change: number;
}

export default function LeaderboardCard({ entries, title = 'Leaderboard' }: { entries: Entry[]; title?: string }) {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-cal text-base font-semibold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" /> {title}
        </h3>
        <span className="section-label">This Week</span>
      </div>
      <div className="space-y-3">
        {entries.map((e) => (
          <div key={e.rank} className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${e.rank <= 3 ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 font-cal ${
              e.rank === 1 ? 'bg-amber-400/20 text-amber-400' :
              e.rank === 2 ? 'bg-slate-400/20 text-slate-400' :
              e.rank === 3 ? 'bg-orange-600/20 text-orange-400' :
              'bg-white/5 text-[#6060a0]'
            }`}>
              {e.rank <= 3 ? <Medal className="w-4 h-4" /> : e.rank}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">{e.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-cal text-sm font-semibold text-white">{e.score.toLocaleString()}</span>
              {e.change !== 0 && (
                <span className={`text-xs flex items-center gap-0.5 ${e.change > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  <TrendingUp className={`w-3 h-3 ${e.change < 0 ? 'rotate-180' : ''}`} />
                  {Math.abs(e.change)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
