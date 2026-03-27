'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import MotionSection from '@/components/MotionSection';
import { Video, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ScheduleClassPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    date: '',
    time: '',
    duration: '60',
    joinUrl: '',
    maxAttendees: '500',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!user) router.push('/login');
      else if (user.role !== 'teacher') router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Combine date and time into a single Date object
      const scheduledAt = new Date(`${formData.date}T${formData.time}`);

      const payload = {
        title: formData.title,
        subject: formData.subject,
        scheduledAt,
        duration: Number(formData.duration),
        joinUrl: formData.joinUrl,
        maxAttendees: Number(formData.maxAttendees),
      };

      const res = await api.post('/live-classes', payload);
      if (res.data.success) {
        router.push('/teacher-dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to schedule class. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || !user || user.role !== 'teacher') return null;

  // Get minimum date for datetime picker
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-3xl mx-auto">
      <MotionSection>
        <Link href="/teacher-dashboard" className="inline-flex items-center gap-2 text-[#8080a0] hover:text-white transition-colors mb-6 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-cal text-3xl text-white">Schedule Live Class</h1>
        </div>
        <p className="text-[#8080a0] text-sm mb-10 ml-13">Set up a new live interactive session for your students.</p>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Class Title *</label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                placeholder="e.g. Thermodynamics Doubt Solving"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Subject *</label>
              <input
                required
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                placeholder="e.g. Physics"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Date *</label>
                <input
                  required
                  type="date"
                  min={today}
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#12122a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors pointer-cursor"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Time *</label>
                <input
                  required
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#12122a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors pointer-cursor"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Duration (minutes) *</label>
                <input
                  required
                  type="number"
                  min="15"
                  step="15"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Max Attendees</label>
                <input
                  type="number"
                  min="1"
                  name="maxAttendees"
                  value={formData.maxAttendees}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Meeting URL (Zoom, Google Meet, etc) *</label>
              <input
                required
                type="url"
                name="joinUrl"
                value={formData.joinUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                placeholder="https://meet.google.com/..."
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push('/teacher-dashboard')}
              className="px-6 py-3 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-36 justify-center"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Schedule'}
            </button>
          </div>
        </form>
      </MotionSection>
    </div>
  );
}
