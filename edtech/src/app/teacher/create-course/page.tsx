'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import MotionSection from '@/components/MotionSection';
import { BookOpen, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateCoursePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'JEE Preparation',
    level: 'Beginner',
    price: '',
    duration: '',
    thumbnail: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!user) router.push('/login');
      else if (user.role !== 'teacher') router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        ...formData,
        price: Number(formData.price) || 0,
        isFree: Number(formData.price) === 0,
      };

      const res = await api.post('/courses', payload);
      if (res.data.success) {
        router.push('/teacher-dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || !user || user.role !== 'teacher') return null;

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-3xl mx-auto">
      <MotionSection>
        <Link href="/teacher-dashboard" className="inline-flex items-center gap-2 text-[#8080a0] hover:text-white transition-colors mb-6 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-cal text-3xl text-white">Create New Course</h1>
        </div>
        <p className="text-[#8080a0] text-sm mb-10 ml-13">Fill in the details below to publish a new course to the catalog.</p>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Course Title *</label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                placeholder="e.g. Advanced Calculus Masterclass"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Description *</label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors resize-none"
                placeholder="What will students learn in this course?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#12122a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                >
                  <option value="JEE Preparation">JEE Preparation</option>
                  <option value="NEET Preparation">NEET Preparation</option>
                  <option value="Civil Services">Civil Services</option>
                  <option value="Technology">Technology</option>
                  <option value="School">School</option>
                  <option value="MBA">MBA</option>
                  <option value="Finance">Finance</option>
                  <option value="Language">Language</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Level *</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#12122a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Price (₹) *</label>
                <input
                  required
                  type="number"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                  placeholder="0 for free"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Duration *</label>
                <input
                  required
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                  placeholder="e.g. 40h or 12 weeks"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Thumbnail URL *</label>
              <input
                required
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                placeholder="https://images.unsplash.com/..."
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
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Publish Course'}
            </button>
          </div>
        </form>
      </MotionSection>
    </div>
  );
}
