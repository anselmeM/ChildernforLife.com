import { useState } from 'react';
import { CheckCircle2, Receipt } from 'lucide-react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function GiftAidForm() {
  const [form, setForm] = useState({ fullName: '', email: '', amount: '', consent: false });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim()) {
      setErrorMessage('Please enter your name.');
      setStatus('error');
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }
    if (!form.consent) {
      setErrorMessage('Please confirm the declaration to continue.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/gift-aid', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, consent: form.consent }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setForm({ fullName: '', email: '', amount: '', consent: false });
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
        <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center shrink-0">
          <Receipt className="w-4 h-4" />
        </span>
        <div>
          <h4 className="text-[12.5px] uppercase font-black text-[#005c7a] tracking-wider">Tax Receipt / Gift Aid</h4>
          <p className="text-gray-500 font-medium text-[11px] leading-relaxed mt-1">
            Many donors can increase the value of their gift through tax relief. Submit a declaration and we'll help you claim a receipt or Gift Aid where eligible.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label htmlFor="gift-name" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Full name *</label>
          <input id="gift-name" name="fullName" type="text" autoComplete="name" value={form.fullName} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
        </div>
        <div>
          <label htmlFor="gift-email" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email *</label>
          <input id="gift-email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
        </div>
        <div>
          <label htmlFor="gift-amount" className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Donation amount (optional)</label>
          <input id="gift-amount" name="amount" type="text" placeholder="e.g. US$200" value={form.amount} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
        </div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input id="gift-consent" name="consent" type="checkbox" checked={form.consent} onChange={handleChange} disabled={status === 'submitting'} className="mt-0.5" />
          <span className="text-[11px] text-gray-500 font-medium leading-relaxed">
            I confirm I pay enough tax and would like Children for Life to claim tax relief on my donation.
          </span>
        </label>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full border border-[#005c7a] text-[#005c7a] font-extrabold text-xs py-3 rounded-xl hover:bg-[#005c7a] hover:text-white transition-colors uppercase tracking-wider disabled:opacity-60"
        >
          {status === 'submitting' ? 'Submitting…' : 'Submit Declaration'}
        </button>

        <p role="status" aria-live="polite" className="text-[11px] font-bold min-h-4">
          {status === 'success' && (
            <span className="inline-flex items-center gap-1 text-green-600">
              <CheckCircle2 className="w-3.5 h-3.5" /> Thank you — your declaration has been received.
            </span>
          )}
          {status === 'error' && <span className="text-red-600">{errorMessage}</span>}
        </p>
      </form>
    </div>
  );
}
