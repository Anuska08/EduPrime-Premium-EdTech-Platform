'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import MotionSection from '@/components/MotionSection';
import { ClipboardList, AlertCircle, Loader2, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  marks: number;
}

export default function CreateTestPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'JEE Preparation',
    duration: '60',
  });

  const [questions, setQuestions] = useState<Question[]>([
    { question: '', options: ['', '', '', ''], correctAnswer: 0, marks: 4 }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!user) router.push('/login');
      else if (user.role !== 'teacher') router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQ = [...questions];
    (newQ[index] as any)[field] = value;
    setQuestions(newQ);
  };

  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    const newQ = [...questions];
    newQ[qIndex].options[optIndex] = value;
    setQuestions(newQ);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0, marks: 4 }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) return;
    const newQ = [...questions];
    newQ.splice(index, 1);
    setQuestions(newQ);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Validation
    if (questions.some(q => !q.question.trim() || q.options.some(opt => !opt.trim()))) {
      setError('Please fill out all question texts and options.');
      setIsSubmitting(false);
      return;
    }

    try {
      const totalMarks = questions.reduce((sum, q) => sum + Number(q.marks), 0);

      const payload = {
        title: formData.title,
        category: formData.category,
        duration: Number(formData.duration),
        totalMarks,
        questions,
      };

      const res = await api.post('/tests', payload);
      if (res.data.success) {
        router.push('/teacher-dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create test. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || !user || user.role !== 'teacher') return null;

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <MotionSection>
        <Link href="/teacher-dashboard" className="inline-flex items-center gap-2 text-[#8080a0] hover:text-white transition-colors mb-6 text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
            <ClipboardList className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-cal text-3xl text-white">Create Test / Quiz</h1>
        </div>
        <p className="text-[#8080a0] text-sm mb-10 ml-13">Build a multiple-choice assessment for students to practice.</p>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Details */}
          <div className="glass-card p-6 md:p-8 space-y-4">
            <h2 className="font-cal text-xl text-white mb-4">Test Details</h2>
            <div>
              <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Test Title *</label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleTextChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                placeholder="e.g. Weekly Mock Test #4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleTextChange}
                  className="w-full px-4 py-3 bg-[#12122a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                >
                  <option value="JEE Preparation">JEE Preparation</option>
                  <option value="NEET Preparation">NEET Preparation</option>
                  <option value="Civil Services">Civil Services</option>
                  <option value="Technology">Technology</option>
                  <option value="School">School</option>
                  <option value="MBA">MBA</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-[#b0b0d0] mb-1.5">Duration (minutes) *</label>
                <input
                  required
                  type="number"
                  min="5"
                  name="duration"
                  value={formData.duration}
                  onChange={handleTextChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Questions Builder */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-cal text-xl text-white">Questions</h2>
              <span className="text-sm text-[#8080a0] font-medium">Total: {questions.length}</span>
            </div>

            {questions.map((q, qIndex) => (
              <div key={qIndex} className="glass-card p-6 md:p-8 space-y-4 relative border-l-4 border-l-[#C084FC]">
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="absolute top-6 right-6 text-[#8080a0] hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                
                <div className="flex items-center gap-3 font-cal text-lg text-white mb-2">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm">
                    {qIndex + 1}
                  </span>
                  Question
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-xs font-medium text-[#8080a0] mb-1">Question Text</label>
                    <input
                      required
                      type="text"
                      value={q.question}
                      onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                      className="w-full px-4 py-3 bg-[#12122a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors"
                      placeholder="What is the capital of..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#8080a0] mb-1">Marks</label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={q.marks}
                      onChange={(e) => handleQuestionChange(qIndex, 'marks', Number(e.target.value))}
                      className="w-full px-4 py-3 bg-[#12122a] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#C084FC]/50 transition-colors text-center"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex gap-3 items-center">
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        <input
                          type="radio"
                          name={`correct-${qIndex}`}
                          checked={q.correctAnswer === oIndex}
                          onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                          className="w-4 h-4 cursor-pointer accent-[#C084FC]"
                        />
                        <span className="text-[10px] text-[#8080a0] uppercase">Correct</span>
                      </div>
                      <input
                        required
                        type="text"
                        value={opt}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        className={`w-full px-4 py-2 bg-[#12122a] border rounded-lg text-sm text-white focus:outline-none transition-colors ${
                          q.correctAnswer === oIndex ? 'border-[#C084FC]' : 'border-white/10 focus:border-[#C084FC]/50'
                        }`}
                        placeholder={`Option ${oIndex + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addQuestion}
              className="w-full py-4 border-2 border-dashed border-[#C084FC]/30 rounded-2xl text-[#C084FC] hover:bg-[#C084FC]/10 hover:border-[#C084FC]/50 transition-all flex items-center justify-center gap-2 font-medium"
            >
              <Plus className="w-5 h-5" /> Add Another Question
            </button>
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-end gap-3 sticky bottom-4 bg-[#080818]/80 backdrop-blur-xl p-4 rounded-2xl shadow-2xl shadow-black/50 border border-white/5 z-10">
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
              className="btn-primary w-40 justify-center"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Publish Test'}
            </button>
          </div>
        </form>
      </MotionSection>
    </div>
  );
}
