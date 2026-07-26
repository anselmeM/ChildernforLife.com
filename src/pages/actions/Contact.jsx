import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mail, Send } from 'lucide-react';
import PageSEO from '../../components/PageSEO';

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <PageSEO title="Contact Us" description="Get in touch with Children for Life. We'd love to hear from you." path="/contact" />
      <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] bg-[#005c7a] flex items-center">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Get in Touch</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Contact Us</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">We would love to hear from you</p>
        </div>
      </div>

      <section className="py-12 sm:py-20 lg:py-24 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {status === 'sent' ? (
          <div className="bg-green-50 border border-green-200 rounded-3xl p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Send size={28} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">Message Sent</h2>
            <p className="text-gray-600 font-semibold">Thank you for reaching out. We'll get back to you within 48 hours.</p>
            <button onClick={() => navigate('/')} className="bg-[#005c7a] text-white font-extrabold py-4 px-8 rounded-full hover:bg-[#004a63] uppercase text-xs tracking-wider mt-4">
              Back to Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 border border-gray-150 p-8 rounded-3xl shadow-sm">
            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                <p className="text-red-600 font-bold text-sm">Failed to send. Please try again or email us directly.</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-firstname" className="block text-xs font-bold text-gray-500 uppercase mb-2">First Name *</label>
                <input id="contact-firstname" required type="text" name="firstName" value={form.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]" />
              </div>
              <div>
                <label htmlFor="contact-lastname" className="block text-xs font-bold text-gray-500 uppercase mb-2">Last Name *</label>
                <input id="contact-lastname" required type="text" name="lastName" value={form.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]" />
              </div>
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-xs font-bold text-gray-500 uppercase mb-2">Email *</label>
              <input id="contact-email" required type="email" name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]" />
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-xs font-bold text-gray-500 uppercase mb-2">Subject</label>
              <input id="contact-subject" type="text" name="subject" value={form.subject} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]" />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold text-gray-500 uppercase mb-2">Message</label>
              <textarea id="contact-message" rows="5" name="message" value={form.message} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]"></textarea>
            </div>
            <button type="submit" disabled={status === 'sending'} className="w-full bg-[#f37021] text-white font-extrabold py-4 rounded-xl hover:bg-[#da621a] uppercase text-sm tracking-wider shadow-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
              <Mail size={18} />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
