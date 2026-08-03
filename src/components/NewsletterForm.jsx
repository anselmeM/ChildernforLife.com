import { useState } from 'react';
import { CheckCircle2, Mail, Send } from 'lucide-react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_RE.test(trimmed)) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Could not subscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Could not subscribe. Please try again later.');
    }
  };

  const isInvalid = status === 'error';

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 mb-20 text-center">
      <h3 className="text-2xl font-extrabold text-white mb-2">Stay in the loop</h3>
      <p className="text-blue-100/80 text-sm font-semibold mb-6 max-w-md mx-auto">
        Get impact stories, program updates, and ways to help — straight to your inbox.
        No spam, unsubscribe anytime.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" noValidate>
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (isInvalid) setStatus('idle');
          }}
          disabled={status === 'submitting'}
          aria-invalid={isInvalid}
          className="flex-1 min-w-0 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-blue-100/60 focus:outline-none focus:ring-2 focus:ring-[#ffc72c] focus:border-transparent disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'submitting' || !email.trim()}
          className="inline-flex items-center justify-center gap-2 bg-[#ffc72c] text-black font-extrabold px-8 py-3.5 rounded-full hover:bg-[#eebb22] text-[13px] uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-md disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === 'submitting' ? <Mail className="w-4 h-4 animate-pulse" /> : <Send className="w-4 h-4" />}
          {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      <p role="status" aria-live="polite" className="mt-4 text-sm font-semibold min-h-5">
        {status === 'success' && (
          <span className="inline-flex items-center gap-1.5 text-green-300">
            <CheckCircle2 className="w-4 h-4" /> Thanks! Please check your inbox.
          </span>
        )}
        {status === 'error' && <span className="text-red-300">{errorMessage}</span>}
      </p>
    </div>
  );
}
