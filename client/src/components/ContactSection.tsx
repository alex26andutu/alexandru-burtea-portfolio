/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * Contact: Deep editorial slab with heading, contact info + downloads,
 *          and Netlify-Forms message form.
 */

import { useLanguage } from '@/contexts/LanguageContext';
import ContactForm from './ContactForm';

const CV_URLS: Record<'en' | 'nl', string> = {
  en: '/documents/Alexandru_Burtea_CV_EN.pdf',
  nl: '/documents/Alexandru_Burtea_CV_NL.pdf',
};
// One Dutch number, used for both calls and WhatsApp.
const PHONE_NUMBER = '+31684491949';
const PHONE_DISPLAY = '+31 6 84491949';
const EMAIL = 'info@alexandruburtea.nl';
const LINKEDIN_URL = 'https://www.linkedin.com/in/alexandru-burtea-meubelmaker/';
const LINKEDIN_DISPLAY = 'linkedin.com/in/alexandru-burtea-meubelmaker';

export default function ContactSection() {
  const { t, language } = useLanguage();


  return (
    <section
      id="contact"
      className="py-24 md:py-36 bg-surface-deep text-on-deep"
    >
      <div className="container">
        {/* Section header — full width */}
        <div className="max-w-3xl mb-16">
          <span className="section-label mb-6 block tracking-[0.15em] text-primary">
            {t.contact.heading}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6 text-on-deep">
            {t.contact.heading_line1}<br />
            <em>{t.contact.heading_line2}</em>
          </h2>
          <p className="text-on-deep/65 text-base md:text-lg leading-relaxed max-w-2xl">
            {t.contact.subheading}
          </p>

          <div className="mt-8 flex items-start gap-3">
            <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-on-deep/75 text-sm leading-relaxed">{t.contact.location}</span>
          </div>
        </div>

        {/* 2-col: left = direct contact + downloads, right = form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT: direct contact + downloads */}
          <div className="space-y-8">
            <div className="space-y-0">
              {/* Email */}
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-4 py-4 border-b border-on-deep/15 hover:border-primary transition-colors"
              >
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-on-deep/65 tracking-widest uppercase mb-0.5">{t.contact.email_label}</p>
                  <span className="text-on-deep/85 group-hover:text-on-deep transition-colors text-sm break-all">
                    {EMAIL}
                  </span>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="group flex items-center gap-4 py-4 border-b border-on-deep/15 hover:border-primary transition-colors"
              >
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-on-deep/65 tracking-widest uppercase mb-0.5">{t.contact.phone_label}</p>
                  <span className="text-on-deep/85 group-hover:text-on-deep transition-colors text-sm">
                    {PHONE_DISPLAY}
                  </span>
                  <span className="block text-[11px] text-on-deep/65 mt-0.5">
                    {t.contact.phone_note}
                  </span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-4 border-b border-on-deep/15 hover:border-primary transition-colors"
              >
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-on-deep/65 tracking-widest uppercase mb-0.5">{t.contact.linkedin_label}</p>
                  <span className="text-on-deep/85 group-hover:text-on-deep transition-colors text-sm">
                    {LINKEDIN_DISPLAY}
                  </span>
                </div>
                <svg
                  className="w-4 h-4 text-on-deep/40 group-hover:text-primary transition-colors flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            {/* CV download */}
            <div className="space-y-3 pt-4">
              <a
                href={CV_URLS[language]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-6 py-4 bg-on-deep text-surface-deep hover:bg-on-deep/90 transition-colors group"
              >
                <span className="text-sm font-medium">
                  {t.contact.download_cv} ({language.toUpperCase()})
                </span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M7 17L17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT: Message form */}
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-light text-on-deep mb-6">
              {t.contact.form_heading}
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
