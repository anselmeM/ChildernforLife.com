import { useState } from 'react';
import { Briefcase, CheckCircle2 } from 'lucide-react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function MatchingGiftForm() {
  const [form, setForm] = useState({ employeeName: '', email: '', company: '', amount: '', note: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employeeName, email, company } = form;

    if (!employeeName.trim()) {
      setErrorMessage('Please enter your name.');
      setStatus('error');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setErrorMessage('Please enter a valid work email address.');
      setStatus('error');
      return;
    }
    if (!company.trim()) {
      setErrorMessage('Please enter your employer name.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/matching-gift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setForm({ employeeName: '', email: '', company: '', amount: '', note: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Could not submit. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Could not submit. Please try again later.');
    }
  };

  const inputClass = 'w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-[#005c7a] bg-white';

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-start gap-2.5">
        <span className="w-8 h-8 bg-[#005c7a]/10 text-[#005c7a] rounded-full flex items-center justify-center shrink-0">
          <Briefcase className="w-4 h-4" />
        </span>
        <div>
          <h4 className="text-[12.5px] uppercase font-black text-[#005c7a] tracking-wider">Employer Matching Gift</h4>
          <p className="text-gray-500 font-medium text-[11px] leading-relaxed mt-1">
            Many employers match donations. Tell us where you work and we'll help you request a match — it could double your gift at no extra cost.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label htmlFor="matching-name" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Your name *</label>
          <input id="matching-name" name="employeeName" type="text" autoComplete="name" value={form.employeeName} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
        </div>
        <div>
          <label htmlFor="matching-email" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Work email *</label>
          <input id="matching-email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
        </div>
        <div>
          <label htmlFor="matching-company" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Employer *</label>
          <input id="matching-company" name="company" type="text" autoComplete="organization" value={form.company} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
        </div>
        <div>
          <label htmlFor="matching-amount" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Donation amount (optional)</label>
          <input id="matching-amount" name="amount" type="text" placeholder="e.g. US$200" value={form.amount} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
        </div>
        <div>
          <label htmlFor="matching-note" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Note (optional)</label>
          <textarea id="matching-note" name="note" rows={2} value={form.note} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full border border-[#005c7a] text-[#005c7a] font-extrabold text-xs py-3 rounded-xl hover:bg-[#005c7a] hover:text-white transition-colors uppercase tracking-wider disabled:opacity-60"
        >
          {status === 'submitting' ? 'Submitting…' : 'Request a Match'}
        </button>

        <p role="status" aria-live="polite" className="text-[11px] font-bold min-h-4">
          {status === 'success' && (
            <span className="inline-flex items-center gap-1 text-green-600">
              <CheckCircle2 className="w-3.5 h-3.5" /> Thank you — we'll be in touch about your match.
            </span>
          )}
          {status === 'error' && <span className="text-red-600">{errorMessage}</span>}
        </p>
      </form>
    </div>
  );
}
