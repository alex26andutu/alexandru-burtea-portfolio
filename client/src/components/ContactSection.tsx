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
const COVER_LETTER_URLS: Record<'en' | 'nl', string> = {
  en: '/documents/Alexandru_Burtea_Cover_Letter_EN.pdf',
  nl: '/documents/Alexandru_Burtea_Cover_Letter_NL.pdf',
};

// WhatsApp deep link — international format, no plus or spaces
const WHATSAPP_NUMBER = '40735488154';
const WHATSAPP_DISPLAY = '+40 735 488 154';
const EMAIL = 'info@alexandruburtea.nl';
const LINKEDIN_URL = 'https://www.linkedin.com/in/alexandru-burtea';
const LINKEDIN_DISPLAY = 'linkedin.com/in/alexandru-burtea';

export default function ContactSection() {
  const { t, language } = useLanguage();

  // Pre-fill WhatsApp message so recruiters get a useful starter
  const waMessage =
    language === 'nl'
      ? 'Hallo Alexandru, ik kom van je portfolio…'
      : 'Hi Alexandru, I came from your portfolio…';
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

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
            Let&apos;s work<br />
            <em>together.</em>
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

              {/* WhatsApp */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-4 border-b border-on-deep/15 hover:border-primary transition-colors"
              >
                <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                  {/* WhatsApp glyph */}
                  <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-on-deep/65 tracking-widest uppercase mb-0.5">{t.contact.whatsapp_label}</p>
                  <span className="text-on-deep/85 group-hover:text-on-deep transition-colors text-sm">
                    {WHATSAPP_DISPLAY}
                  </span>
                  <span className="block text-[11px] text-on-deep/65 mt-0.5">
                    {t.contact.whatsapp_note}
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

            {/* Download buttons */}
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

              <a
                href={COVER_LETTER_URLS[language]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-6 py-4 border border-on-deep/25 text-on-deep/85 hover:border-on-deep/50 hover:text-on-deep transition-colors group"
              >
                <span className="text-sm font-medium">
                  {t.contact.download_cover} ({language.toUpperCase()})
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
