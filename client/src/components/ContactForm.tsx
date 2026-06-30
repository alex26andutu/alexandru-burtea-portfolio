/*
 * DESIGN SYSTEM: Warm Editorial Craft
 * ContactForm: Netlify-Forms-compatible message form on the deep surface.
 * Notes:
 *  - The static <form> shell in index.html must match the field names for
 *    Netlify's build-time form detection. See index.html `name="contact"`.
 *  - Honeypot field "bot-field" is hidden via CSS but submitted by bots.
 */

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type Status = 'idle' | 'submitting' | 'success' | 'error';

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot: if filled, silently "succeed" without sending.
    if ((formData.get('bot-field') as string)?.length) {
      setStatus('success');
      form.reset();
      return;
    }

    const payload: Record<string, string> = {
      'form-name': 'contact',
    };
    formData.forEach((value, key) => {
      if (typeof value === 'string') payload[key] = value;
    });

    setStatus('submitting');
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full bg-transparent border-0 border-b border-on-deep/25 px-0 py-3 text-on-deep text-sm placeholder:text-on-deep/60 focus:outline-none focus:border-primary transition-colors';

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-5"
      noValidate
    >
      {/* Netlify needs these in the rendered form too */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Honeypot — hidden from humans */}
      <p className="hidden">
        <label>
          Don&apos;t fill this out if you&apos;re human:{' '}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div>
        <label htmlFor="cf-name" className="sr-only">
          {t.contact.form_name}
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={t.contact.form_name}
          className={inputClass}
          disabled={status === 'submitting'}
        />
      </div>

      <div>
        <label htmlFor="cf-email" className="sr-only">
          {t.contact.form_email}
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t.contact.form_email}
          className={inputClass}
          disabled={status === 'submitting'}
        />
      </div>

      <div>
        <label htmlFor="cf-subject" className="sr-only">
          {t.contact.form_subject}
        </label>
        <input
          id="cf-subject"
          name="subject"
          type="text"
          placeholder={t.contact.form_subject_placeholder}
          className={inputClass}
          disabled={status === 'submitting'}
        />
      </div>

      <div>
        <label htmlFor="cf-message" className="sr-only">
          {t.contact.form_message}
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder={t.contact.form_message}
          className={`${inputClass} resize-none py-3`}
          disabled={status === 'submitting'}
        />
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? t.contact.form_sending : t.contact.form_send}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M1 7h12M8 2l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {status === 'success' && (
        <p
          role="status"
          aria-live="polite"
          className="text-sm text-primary flex items-start gap-2 pt-2"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="mt-0.5 flex-shrink-0">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.contact.form_success}
        </p>
      )}

      {status === 'error' && (
        <p
          role="alert"
          aria-live="assertive"
          className="text-sm text-on-deep/80 pt-2"
        >
          {t.contact.form_error}
        </p>
      )}
    </form>
  );
}
