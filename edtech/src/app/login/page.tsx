'use client';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import MotionSection from '@/components/MotionSection';

export default function LoginPage() {
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
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        login(res.data.token, res.data.user);
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center">
      <MotionSection className="w-full max-w-md px-6">
        <div className="glass-card p-8">
          <h1 className="font-cal text-3xl font-semibold text-white mb-2 text-center">Welcome Back</h1>
          <p className="text-[#8080a0] text-sm text-center mb-8">Login to continue your learning journey.</p>
          
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-xl mb-6">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="••••••••"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 rounded-xl mt-4 flex justify-center items-center"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <p className="text-center text-sm text-[#7070a0] mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[#8080f0] hover:text-white transition-colors">Create one</Link>
          </p>
        </div>
      </MotionSection>
    </div>
  );
}
