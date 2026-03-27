'use client';
import { useEffect, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import StatsCounter from '@/components/StatsCounter';
import CourseCard from '@/components/CourseCard';
import InstructorSpotlight from '@/components/InstructorSpotlight';
import TestimonialSlider from '@/components/TestimonialSlider';
import FeatureGrid from '@/components/FeatureGrid';
import CTASection from '@/components/CTASection';
import MotionSection from '@/components/MotionSection';
import { Video, BookOpen, Brain, Zap, Shield, Globe } from 'lucide-react';
import api from '@/lib/api';

const stats = [
  { value: 5000000, suffix: '+', label: 'Active Learners', description: 'Across India & Global' },
  { value: 1200, suffix: '+', label: 'Expert Educators', description: 'Top IITs & IIMs' },
  { value: 50000, suffix: '+', label: 'Video Lessons', description: 'HD Quality Content' },
  { value: 98, suffix: '%', label: 'Success Rate', description: 'Exam Qualifiers' },
];

const testimonials = [
  { 
    name: 'Ananya Singh', 
    avatar: '', 
    role: 'JEE Advanced AIR 47', 
    course: 'JEE Physics Masterclass', 
    rating: 5,
    text: "EduPrime completely transformed how I studied physics. Dr. Arvind's approach of visual problem solving made even the hardest topics feel intuitive. I went from 60% to AIR 47!",
    result: 'Admitted to IIT Bombay – Computer Science'
  },
  { 
    name: 'Karan Patel', 
    avatar: '', 
    role: 'UPSC Topper 2025', 
    course: 'UPSC Complete Strategy', 
    rating: 5,
    text: 'The structured approach, live doubt sessions, and practice test series on EduPrime gave me the confidence I needed. The study material quality is unmatched anywhere online.',
    result: 'IAS Selection in First Attempt'
  },
  { 
    name: 'Shreya Nair', 
    avatar: '', 
    role: 'Data Engineer at Amazon', 
    course: 'Python & Data Science Bootcamp', 
    rating: 5,
    text: 'Switched careers from mechanical engineering to data science using EduPrime. The project-based learning and placement support were exceptional.',
    result: 'Got 32 LPA Package at Amazon'
  },
];

const features = [
  { icon: Video, title: 'Live Interactive Classes', description: 'Join real-time sessions with top educators featuring polls, doubt-clearing, and collaborative whiteboards.', color: '#6060f0' },
  { icon: Brain, title: 'AI-Powered Learning', description: 'Smart content recommendations, adaptive quizzes, and personalized study plans powered by advanced AI.', color: '#a040e0' },
  { icon: BookOpen, title: 'Rich Study Materials', description: 'Comprehensive notes, practice sheets, previous year papers, and HD video lectures at your fingertips.', color: '#fbbf24' },
  { icon: Zap, title: 'Instant Doubt Resolution', description: '24/7 doubt-solving community with AI chatbot and expert educator responses within minutes.', color: '#10b981' },
  { icon: Shield, title: 'Secure & Reliable', description: 'Enterprise-grade security with 99.9% uptime. Your data, your learning — completely protected.', color: '#ef4444' },
  { icon: Globe, title: 'Learn Anywhere', description: 'Mobile apps for iOS & Android, offline downloads for 50% of content. Never miss a lesson.', color: '#3b82f6' },
];

export default function HomePage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [instructors, setInstructors] = useState<any[]>([]);

  useEffect(() => {
    // Fetch 4 trending courses
    api.get('/courses?limit=4&sort=Most Popular')
      .then(res => {
        if (res.data.success) setCourses(res.data.courses);
      })
      .catch(console.error);

    // Fetch instructors
    api.get('/users/instructors')
      .then(res => {
        if (res.data.success) setInstructors(res.data.instructors.slice(0, 3));
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <HeroSection />

      {/* Stats */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <MotionSection>
          <StatsCounter stats={stats} />
        </MotionSection>
      </section>

      {/* Courses Carousel */}
      <section className="py-20 bg-[#080818]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MotionSection className="text-center mb-12">
            <p className="section-label mb-3">Popular Right Now</p>
            <h2 className="section-title">Trending Courses</h2>
            <p className="text-[#7070a0] mt-4 max-w-xl mx-auto">
              Curated by India&rsquo;s top educators. Thousands of students are already transforming their futures.
            </p>
          </MotionSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.length > 0 ? courses.map((course, i) => (
              <MotionSection key={course._id} delay={i * 0.08} direction="up">
                <CourseCard {...course} id={course._id} instructor={course.instructorName} />
              </MotionSection>
            )) : (
              <div className="col-span-full text-center text-[#6060a0] py-10">Loading trending courses...</div>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <MotionSection className="text-center mb-12">
          <p className="section-label mb-3">Why EduPrime</p>
          <h2 className="section-title">Built for Serious Learners</h2>
        </MotionSection>
        <FeatureGrid features={features} cols={3} />
      </section>

      {/* Instructors */}
      <section className="py-20 bg-[#080818]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <MotionSection className="text-center mb-12">
            <p className="section-label mb-3">Our Educators</p>
            <h2 className="section-title">Learn from the Best</h2>
            <p className="text-[#7070a0] mt-4 max-w-xl mx-auto">
              <em className="accent-tagline">India&rsquo;s most trusted educators</em>, handpicked for quality and results.
            </p>
          </MotionSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instructors.length > 0 ? instructors.map((inst, i) => (
              <MotionSection key={inst._id} delay={i * 0.1} direction="up">
                <InstructorSpotlight 
                  {...inst} 
                  subject={inst.bio?.split('.')[0] || 'Expert Educator'} 
                  experience={`${Math.floor(Math.random() * 10) + 5} yrs`} 
                  courses={Math.floor(Math.random() * 20) + 5} 
                />
              </MotionSection>
            )) : (
              <div className="col-span-full text-center text-[#6060a0] py-10">Loading top educators...</div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <MotionSection className="text-center mb-12">
          <p className="section-label mb-3">Student Success</p>
          <h2 className="section-title">Real Transformations</h2>
        </MotionSection>
        <MotionSection delay={0.2}>
          <TestimonialSlider testimonials={testimonials} />
        </MotionSection>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <MotionSection>
          <CTASection
            label="Start Today"
            title="Your Dream Result Starts Here"
            subtitle="Join 5M+ learners who chose EduPrime to crack their goals. First 7 days completely free."
            primaryCTA={{ label: 'Start Free Trial', href: '/courses' }}
            secondaryCTA={{ label: 'Browse Courses', href: '/courses' }}
          />
        </MotionSection>
      </section>
    </>
  );
}