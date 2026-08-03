import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { POSITION_OPTIONS } from '../data/openings';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function CareerApplyForm({ initialPosition = POSITION_OPTIONS[POSITION_OPTIONS.length - 1] }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', position: initialPosition, note: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email } = form;

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage('Please enter your full name.');
      setStatus('error');
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/career-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setForm({ firstName: '', lastName: '', email: '', position: form.position, note: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Could not submit. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Could not submit. Please try again later.');
    }
  };

  const inputClass = 'w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-sm" noValidate>
      <h3 className="text-xl font-black text-gray-900">Apply for a Position</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="career-firstname" className="block text-xs font-bold text-gray-500 uppercase mb-2">First Name *</label>
          <input id="career-firstname" name="firstName" type="text" autoComplete="given-name" value={form.firstName} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
        </div>
        <div>
          <label htmlFor="career-lastname" className="block text-xs font-bold text-gray-500 uppercase mb-2">Last Name *</label>
          <input id="career-lastname" name="lastName" type="text" autoComplete="family-name" value={form.lastName} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="career-email" className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address *</label>
        <input id="career-email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
      </div>
      <div>
        <label htmlFor="career-position" className="block text-xs font-bold text-gray-500 uppercase mb-2">Position *</label>
        <select id="career-position" name="position" value={form.position} onChange={handleChange} disabled={status === 'submitting'} className={`${inputClass} bg-white`}>
          {POSITION_OPTIONS.map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="career-note" className="block text-xs font-bold text-gray-500 uppercase mb-2">Cover note</label>
        <textarea id="career-note" name="note" rows={4} value={form.note} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#008cb3] hover:bg-[#005c7a] text-white font-extrabold py-4 rounded-xl uppercase text-sm tracking-wider shadow-sm transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
      </button>

      <p role="status" aria-live="polite" className="text-sm font-bold min-h-5">
        {status === 'success' && (
          <span className="inline-flex items-center gap-1.5 text-green-600">
            <CheckCircle2 className="w-4 h-4" /> Application submitted — we'll be in touch!
          </span>
        )}
        {status === 'error' && <span className="text-red-600">{errorMessage}</span>}
      </p>
    </form>
  );
}
