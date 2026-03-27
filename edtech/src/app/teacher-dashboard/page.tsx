'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import MotionSection from '@/components/MotionSection';
import Link from 'next/link';

// ── Types ────────────────────────────────────────────────────────────────────
interface TeacherStats {
  totalCourses: number;
  publishedCourses: number;
  totalStudents: number;
  upcomingClassesCount: number;
  avgRating: string | number;
}

interface Course {
  _id: string;
  title: string;
  students: number;
  isPublished: boolean;
  rating: number;
  category: string;
  level: string;
}

interface LiveClass {
  _id: string;
  title: string;
  subject: string;
  scheduledAt: string;
  duration: number;
  meetLink?: string;
}

// ── Quick Actions ─────────────────────────────────────────────────────────────
const quickActions = [
  { label: 'Create New Course', href: '/teacher/create-course', icon: '📝' },
  { label: 'Schedule Live Class', href: '/teacher/schedule-class', icon: '📡' },
  { label: 'Add Test / Quiz', href: '/teacher/create-test', icon: '📝' },
  { label: 'Browse All Courses', href: '/courses', icon: '📚' },
  { label: 'View Student Dashboard', href: '/dashboard', icon: '📊' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) +
    ' · ' + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function TeacherDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<TeacherStats | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [upcomingClasses, setUpcomingClasses] = useState<LiveClass[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboard = useCallback(async () => {
    try {
      setDataLoading(true);
      const res = await api.get('/teacher/dashboard');
      if (res.data.success) {
        setStats(res.data.stats);
        setCourses(res.data.courses);
        setUpcomingClasses(res.data.upcomingClasses);
      }
    } catch {
      setError('Failed to load dashboard data.');
    } finally {
      setDataLoading(false);
    }
  }, []);

  // Auth guard
  useEffect(() => {
    if (!authLoading) {
      if (!user) router.push('/login');
      else if (user.role !== 'teacher') router.push('/dashboard');
      else fetchDashboard();
    }
  }, [user, authLoading, router, fetchDashboard]);

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <div className="mb-10 space-y-3">
          <div className="shimmer h-4 w-32 rounded-full" />
          <div className="shimmer h-9 w-72 rounded-xl" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[...Array(4)].map((_, i) => <div key={i} className="shimmer h-32 rounded-2xl" />)}
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 shimmer h-80 rounded-2xl" />
          <div className="shimmer h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  const statCards = [
    { label: 'Courses Created', value: stats?.totalCourses ?? '—', icon: '📚', sub: `${stats?.publishedCourses ?? 0} published` },
    { label: 'Total Students', value: stats?.totalStudents?.toLocaleString() ?? '—', icon: '🎓', sub: 'across all courses' },
    { label: 'Upcoming Classes', value: stats?.upcomingClassesCount ?? '—', icon: '🎥', sub: upcomingClasses[0] ? `Next: ${formatDate(upcomingClasses[0].scheduledAt).split(' · ')[0]}` : 'None scheduled' },
    { label: 'Avg. Rating', value: stats?.avgRating ?? '—', icon: '⭐', sub: 'across all courses' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <MotionSection className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="section-label mb-1">Teacher Dashboard</p>
            <h1 className="font-cal text-3xl md:text-4xl text-white">
              Welcome back, <span className="gradient-text">{user.name}</span> 👋
            </h1>
            <p className="text-[#8080a0] mt-1 text-sm">Manage your courses, students, and live sessions.</p>
          </div>
        </div>
      </MotionSection>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-4 rounded-xl mb-6">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <MotionSection className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((s) => (
          <div key={s.label} className="glass-card p-5 flex flex-col gap-2">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className="font-cal text-3xl text-white">{s.value}</p>
              <p className="text-xs text-[#8080a0] mt-0.5">{s.label}</p>
            </div>
            <p className="text-xs text-[#C084FC] font-medium">{s.sub}</p>
          </div>
        ))}
      </MotionSection>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* My Courses */}
        <MotionSection className="lg:col-span-2">
          <div className="glass-card p-6">
            <h2 className="font-cal text-xl text-white mb-5">My Courses</h2>
            {courses.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-[#8080a0] text-sm">You haven&apos;t created any courses yet.</p>
                <Link href="/courses" className="btn-primary mt-4 inline-flex text-sm">Browse Courses</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {courses.slice(0, 6).map((course) => (
                  <div
                    key={course._id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/8 hover:border-[#C084FC]/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{course.title}</p>
                      <p className="text-[#8080a0] text-xs mt-0.5">
                        {course.students} student{course.students !== 1 ? 's' : ''} · {course.category} · {course.level}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 ml-4 shrink-0">
                      {course.rating > 0 && (
                        <span className="text-xs text-[#D4AF37] font-semibold hidden sm:block">
                          ⭐ {course.rating.toFixed(1)}
                        </span>
                      )}
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          course.isPublished
                            ? 'bg-green-500/15 text-green-400'
                            : 'bg-yellow-500/15 text-yellow-400'
                        }`}
                      >
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </MotionSection>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Upcoming Live Classes */}
          <MotionSection>
            <div className="glass-card p-6">
              <h2 className="font-cal text-xl text-white mb-4">Upcoming Classes</h2>
              {upcomingClasses.length === 0 ? (
                <p className="text-[#8080a0] text-sm py-4 text-center">No upcoming classes scheduled.</p>
              ) : (
                <div className="space-y-3">
                  {upcomingClasses.map((cls) => (
                    <div key={cls._id} className="p-3 rounded-xl bg-white/5 border border-white/8">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-medium text-sm">{cls.title || cls.subject}</p>
                          <p className="text-[#C084FC] text-xs mt-1">{formatDate(cls.scheduledAt)}</p>
                        </div>
                        <button
                          onClick={() => {
                            const email = window.prompt("Enter student's email to invite:");
                            if (email) {
                              api.post(`/live-classes/${cls._id}/invite`, { email })
                                .then(() => alert(`Invited ${email}`))
                                .catch(err => alert(err.response?.data?.message || 'Error'));
                            }
                          }}
                          className="bg-white/10 hover:bg-[#C084FC]/20 text-[#c0c0e0] hover:text-white text-[10px] px-2 py-1 rounded-md transition-colors"
                        >
                          + Invite
                        </button>
                      </div>
                      {cls.duration && (
                        <p className="text-[#8080a0] text-xs mt-1">{cls.duration} min</p>
                      )}
                      {cls.meetLink && (
                        <a
                          href={cls.meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-2 text-xs text-[#8080f0] hover:text-white transition-colors"
                        >
                          Join Session →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </MotionSection>

          {/* Quick Actions */}
          <MotionSection>
            <div className="glass-card p-6">
              <h2 className="font-cal text-xl text-white mb-4">Quick Actions</h2>
              <div className="flex flex-col gap-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/8 hover:border-[#C084FC]/40 hover:bg-[#C084FC]/5 transition-all group"
                  >
                    <span className="text-lg">{action.icon}</span>
                    <span className="text-sm text-[#c0c0e0] group-hover:text-white transition-colors font-medium">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/8">
                <p className="text-xs text-[#6060a0] text-center">
                  Signed in as <span className="text-[#C084FC]">{user.email}</span>
                </p>
              </div>
            </div>
          </MotionSection>
        </div>
      </div>
    </div>
  );
}
