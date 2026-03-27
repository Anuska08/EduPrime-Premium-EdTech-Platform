import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Users, PlayCircle } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  badge?: string;
  isFree?: boolean;
}

const levelColors: Record<string, string> = {
  Beginner: 'text-emerald-400 bg-emerald-400/10',
  Intermediate: 'text-amber-400 bg-amber-400/10',
  Advanced: 'text-rose-400 bg-rose-400/10',
};

export default function CourseCard(props: CourseCardProps) {
  const { title, instructor, category, level, rating, reviews, students, duration, price, originalPrice, thumbnail, badge, isFree } = props;
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

  return (
    <Link href={`/courses`} className="block group">
      <div className="glass-card overflow-hidden h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07071a]/60 to-transparent" />
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <PlayCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {badge && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold gradient-brand text-white">
                {badge}
              </span>
            )}
            {isFree && (
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                FREE
              </span>
            )}
          </div>
          {discount > 0 && (
            <span className="absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-bold text-white bg-rose-500/80">
              -{discount}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#8080a0]">{category}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${levelColors[level]}`}>{level}</span>
          </div>
          <h3 className="font-cal text-base font-semibold text-white leading-snug line-clamp-2 group-hover:text-[#a0a0ff] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-[#7070a0]">By {instructor}</p>
          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-[#6060a0]">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-amber-400 font-semibold">{rating}</span>
              <span>({reviews.toLocaleString()})</span>
            </span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{students.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{duration}</span>
          </div>
          {/* Price */}
          <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
            {isFree ? (
              <span className="font-cal text-lg font-semibold text-emerald-400">Free</span>
            ) : (
              <div className="flex items-baseline gap-2">
                <span className="font-cal text-xl font-semibold text-white">₹{price.toLocaleString()}</span>
                {originalPrice && <span className="text-sm text-[#6060a0] line-through">₹{originalPrice.toLocaleString()}</span>}
              </div>
            )}
            <button className="text-xs font-semibold text-[#8080f0] hover:text-white transition-colors">
              Enroll →
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
