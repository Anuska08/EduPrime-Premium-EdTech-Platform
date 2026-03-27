import { Star, Users, BookOpen, Award } from 'lucide-react';
import Link from 'next/link';

interface InstructorProps {
  name: string;
  subject: string;
  bio: string;
  students: number;
  courses: number;
  rating: number;
  experience: string;
  badge?: string;
}

export default function InstructorSpotlight({ name, subject, bio, students, courses, rating, experience, badge }: InstructorProps) {
  const initials = name.split(' ').map(w => w[0]).join('');
  const hue = name.charCodeAt(0) * 3 % 360;

  return (
    <div className="glass-card p-6 flex flex-col gap-5 group">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shrink-0 transition-transform duration-300 group-hover:scale-105"
          style={{ background: `linear-gradient(135deg, hsl(${hue},60%,40%), hsl(${(hue+40)%360},60%,30%))` }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2">
            <h3 className="font-cal text-base font-semibold text-white leading-tight">{name}</h3>
            {badge && (
              <span className="shrink-0 px-2 py-0.5 text-xs rounded-full gradient-brand text-white">{badge}</span>
            )}
          </div>
          <p className="text-sm text-[#8080a0] mt-0.5">{subject}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-amber-400">{rating}</span>
            <span className="text-xs text-[#606080] ml-1">· {experience} exp.</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-[#8080a0] leading-relaxed line-clamp-2">{bio}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <div className="flex items-center gap-1.5 text-xs text-[#6060a0] mb-1">
            <Users className="w-3 h-3" /> Students
          </div>
          <div className="font-cal text-base font-semibold text-white">{(students / 1000).toFixed(0)}K+</div>
        </div>
        <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <div className="flex items-center gap-1.5 text-xs text-[#6060a0] mb-1">
            <BookOpen className="w-3 h-3" /> Courses
          </div>
          <div className="font-cal text-base font-semibold text-white">{courses}</div>
        </div>
      </div>

      <Link href="/courses" className="btn-secondary text-sm py-2 justify-center w-full">
        View Profile
      </Link>
    </div>
  );
}
