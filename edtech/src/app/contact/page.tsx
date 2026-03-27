'use client';
import { useState } from 'react';
import MotionSection from '@/components/MotionSection';
import { Mail, Phone, MapPin, Send, ChevronDown, Calendar } from 'lucide-react';

const faqs = [
  { q: 'How do I enroll in a course?', a: 'Simply browse the Courses page, click "Enroll", and complete payment. Instant access granted!' },
  { q: 'Can I get a refund if I\'m not satisfied?', a: 'Yes, we offer a 7-day money-back guarantee on all paid courses, no questions asked.' },
  { q: 'How do live classes work?', a: 'Live classes are conducted via our platform. You join with a link, interact in real-time, and replay the recording later.' },
  { q: 'Is there a mobile app?', a: 'Yes! Our Android & iOS apps are available for free. Download from the Play Store or App Store.' },
  { q: 'Can institutions get bulk discounts?', a: 'Absolutely. Contact our enterprise team for custom pricing for schools, coaching centres, and corporates.' },
];

export default function ContactPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <section className="pt-28 pb-16 bg-[#080818] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <MotionSection>
            <p className="section-label mb-3">Contact & Support</p>
            <h1 className="section-title mb-4">We&rsquo;re Here to Help</h1>
            <p className="text-[#7070a0] max-w-xl mx-auto">
              Questions about courses, billing, or technical issues? Our support team responds within 2 hours.
            </p>
          </MotionSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <MotionSection direction="left">
            <h2 className="font-cal text-2xl font-semibold text-white mb-6">Send a Message</h2>
            {sent ? (
              <div className="glass-card p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-cal text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-[#8080a0]">Our team will reply to your email within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Your Name', key: 'name', type: 'text', placeholder: 'Rohan Sharma' },
                    { label: 'Email Address', key: 'email', type: 'email', placeholder: 'rohan@example.com' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-medium text-[#9090b0] mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        required
                        value={form[f.key as keyof typeof form]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-[#505070] border border-white/10 focus:border-[#6060f0]/50 focus:outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#9090b0] mb-1.5">Subject</label>
                  <select
                    required
                    value={form.subject}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    className="w-full px-4 py-3 glass rounded-xl text-white border border-white/10 focus:border-[#6060f0]/50 focus:outline-none transition-colors bg-transparent"
                  >
                    <option value="" className="bg-[#0d0d28]">Select a topic</option>
                    {['Course Query', 'Billing & Payments', 'Technical Support', 'Career Counselling', 'Enterprise Sales', 'Other'].map(s => (
                      <option key={s} value={s} className="bg-[#0d0d28]">{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#9090b0] mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your query in detail..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder:text-[#505070] border border-white/10 focus:border-[#6060f0]/50 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-3.5 text-base">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Book demo */}
            <div className="glass-card p-5 mt-6 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-cal text-sm font-semibold text-white">Book a Free Demo</div>
                <div className="text-xs text-[#6060a0]">30-min live walkthrough with a product specialist</div>
              </div>
              <button className="btn-secondary text-sm py-2 px-4 shrink-0">Schedule</button>
            </div>
          </MotionSection>

          {/* Info + FAQs */}
          <div>
            <MotionSection direction="right">
              <h2 className="font-cal text-2xl font-semibold text-white mb-6">Get in Touch</h2>
              <div className="space-y-4 mb-10">
                {[
                  { icon: Mail, label: 'Email Support', value: 'hello@eduprime.in', sub: 'Response within 2 hours' },
                  { icon: Phone, label: 'Phone Support', value: '+91 98765 43210', sub: 'Mon–Sat, 9 AM – 8 PM IST' },
                  { icon: MapPin, label: 'Headquarters', value: 'Bengaluru, Karnataka', sub: 'EduPrime Technologies Pvt. Ltd.' },
                ].map(item => (
                  <div key={item.label} className="glass-card p-4 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl gradient-brand flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-cal text-sm font-semibold text-white">{item.value}</div>
                      <div className="text-xs text-[#6060a0]">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQs */}
              <h3 className="font-cal text-xl font-semibold text-white mb-4">Frequently Asked</h3>
              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <div key={i} className="glass-card overflow-hidden">
                    <button
                      onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="font-cal text-sm font-semibold text-white pr-4">{f.q}</span>
                      <ChevronDown className={`w-4 h-4 text-[#6060a0] shrink-0 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`} />
                    </button>
                    {faqOpen === i && (
                      <div className="px-5 pb-4 text-sm text-[#8080a0] border-t border-white/5 pt-3">
                        {f.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </MotionSection>
          </div>
        </div>
      </div>
    </>
  );
}
