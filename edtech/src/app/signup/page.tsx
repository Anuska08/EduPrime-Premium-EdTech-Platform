'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import MotionSection from '@/components/MotionSection';

type Role = 'student' | 'teacher';

export default function SignupPage() {
  const [role, setRole] = useState<Role>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      if (res.data.success) {
        login(res.data.token, res.data.user);
        if (role === 'teacher') {
          router.push('/teacher-dashboard');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg);
      } else {
        setError(err.response?.data?.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
      <MotionSection className="w-full max-w-md px-6">
        <div className="glass-card p-8">
          <h1 className="font-cal text-3xl font-semibold text-white mb-2 text-center">Create Account</h1>
          <p className="text-[#8080a0] text-sm text-center mb-6">Join millions of learners on EduPrime.</p>

          {/* Role Selector */}
          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-6">
            {(['student', 'teacher'] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 capitalize ${
                  role === r
                    ? 'bg-gradient-to-r from-[#C084FC] to-[#D4AF37] text-white shadow-lg'
                    : 'text-[#8080a0] hover:text-white'
                }`}
              >
                {r === 'student' ? '🎓 Student' : '🏫 Teacher'}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#9090b0] mb-1.5">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full glass bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#505070] focus:outline-none focus:border-[#6060f0]/50 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm text-[#9090b0] mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#505070] focus:outline-none focus:border-[#6060f0]/50 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-[#9090b0] mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-[#505070] focus:outline-none focus:border-[#6060f0]/50 transition-colors"
                placeholder="Min 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 rounded-xl mt-4 flex justify-center items-center gap-2"
            >
              {loading
                ? 'Creating…'
                : `Create ${role === 'student' ? 'Student' : 'Teacher'} Account`}
            </button>
          </form>

          <p className="text-center text-sm text-[#7070a0] mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#8080f0] hover:text-white transition-colors">Sign in</Link>
          </p>
        </div>
      </MotionSection>
    </div>
  );
}
