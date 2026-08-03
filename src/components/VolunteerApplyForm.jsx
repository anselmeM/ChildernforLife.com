import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EXPERTISE_OPTIONS = [
  'Education & Literacy',
  'Healthcare & Sanitation (WASH)',
  'Renewable Energy & Technology',
  'Sustainable Agriculture',
  'Other / Administration',
];

export default function VolunteerApplyForm() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', expertise: EXPERTISE_OPTIONS[0], reason: '' });
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
      const res = await fetch('/api/volunteer-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setForm({ firstName: '', lastName: '', email: '', expertise: EXPERTISE_OPTIONS[0], reason: '' });
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
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 border border-gray-200 p-8 rounded-3xl shadow-sm" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="vol-firstname" className="block text-xs font-bold text-gray-500 uppercase mb-2">First Name *</label>
          <input id="vol-firstname" name="firstName" type="text" autoComplete="given-name" value={form.firstName} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
        </div>
        <div>
          <label htmlFor="vol-lastname" className="block text-xs font-bold text-gray-500 uppercase mb-2">Last Name *</label>
          <input id="vol-lastname" name="lastName" type="text" autoComplete="family-name" value={form.lastName} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="vol-email" className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address *</label>
        <input id="vol-email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
      </div>
      <div>
        <label htmlFor="vol-expertise" className="block text-xs font-bold text-gray-500 uppercase mb-2">Area of Expertise *</label>
        <select id="vol-expertise" name="expertise" value={form.expertise} onChange={handleChange} disabled={status === 'submitting'} className={`${inputClass} bg-white`}>
          {EXPERTISE_OPTIONS.map((option) => <option key={option}>{option}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="vol-reason" className="block text-xs font-bold text-gray-500 uppercase mb-2">Briefly describe why you want to volunteer</label>
        <textarea id="vol-reason" name="reason" rows={4} value={form.reason} onChange={handleChange} disabled={status === 'submitting'} className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#f37021] text-white font-extrabold py-4 rounded-xl hover:bg-[#da621a] uppercase text-sm tracking-wider shadow-sm transition-colors disabled:opacity-60"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
      </button>

      <p role="status" aria-live="polite" className="text-sm font-bold min-h-5">
        {status === 'success' && (
          <span className="inline-flex items-center gap-1.5 text-green-600">
            <CheckCircle2 className="w-4 h-4" /> Application submitted — our recruitment team will be in touch!
          </span>
        )}
        {status === 'error' && <span className="text-red-600">{errorMessage}</span>}
      </p>
    </form>
  );
}
