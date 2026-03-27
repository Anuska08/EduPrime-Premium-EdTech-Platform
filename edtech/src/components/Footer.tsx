import Link from 'next/link';
import { BookOpen, Twitter, Youtube, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const links = {
  'Learn': [
    { label: 'Courses', href: '/courses' },
    { label: 'Live Classes', href: '/live-classes' },
    { label: 'Test Series', href: '/test-series' },
    { label: 'Resources', href: '/resources' },
  ],
  'Platform': [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Industries', href: '/industries' },
  ],
  'Company': [
    { label: 'Teach with Us', href: '/teach' },
    { label: 'Contact', href: '/contact' },
    { label: 'About', href: '/contact' },
  ],
};

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#05051a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-cal text-xl text-white font-semibold">
                Edu<span className="gradient-text">Prime</span>
              </span>
            </Link>
            <p className="text-sm text-[#6060a0] leading-relaxed max-w-xs mb-6">
              India&apos;s premier online learning platform. Learn from top educators, ace competitive exams, and upskill for the future.
            </p>
            <div className="space-y-3 text-sm text-[#6060a0]">
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 shrink-0" /> hello@eduprime.in</div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 shrink-0" /> +91 98765 43210</div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 shrink-0" /> Bengaluru, Karnataka, India</div>
            </div>
            <div className="flex gap-3 mt-6">
              {socials.map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-9 h-9 rounded-xl glass flex items-center justify-center text-[#6060a0] hover:text-white hover:border-[#6060f0]/40 transition-colors">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="font-cal text-sm font-semibold text-white mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-[#6060a0] hover:text-white transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4040600]">© 2026 EduPrime Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-[#404060]">
            <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
