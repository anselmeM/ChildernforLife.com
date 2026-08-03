import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ugirlsGraduation from '../../assets/ugirls_graduation.jpg';
import PageSEO from '../../components/PageSEO';

export default function TributeGifts() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ honoree: '', recipientName: '', recipientEmail: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Carry the tribute details into the donation so the gift isn't lost.
    navigate('/donate', { state: { tribute: form } });
  };

  return (
    <div className="bg-white min-h-screen">
      <PageSEO title="Tribute Gifts" description="Honor someone special with a tribute gift to Children for Life." path="/tribute-gifts" />
      <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] bg-cover bg-center bg-local md:bg-fixed flex items-center" style={{ backgroundImage: `url(${ugirlsGraduation})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Tribute Giving</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Tribute Gifts</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Celebrate a life or honor a memory</p>
        </div>
      </div>
      <section className="py-12 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <p className="text-gray-600 text-lg font-medium leading-relaxed text-center">A tribute donation is a meaningful way to celebrate a special occasion or honor the memory of a loved one who cared about children's safety and education.</p>
          <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 border border-gray-200 p-8 rounded-3xl">
            <div>
              <label htmlFor="tribute-honoree" className="block text-xs font-bold text-gray-500 uppercase mb-2">This Gift is in Honor/Memory of:</label>
              <input id="tribute-honoree" name="honoree" required type="text" placeholder="Honoree Name" value={form.honoree} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]" />
            </div>
            <div>
              <label htmlFor="tribute-recipient-name" className="block text-xs font-bold text-gray-500 uppercase mb-2">Send a Notification card to:</label>
              <input id="tribute-recipient-name" name="recipientName" required type="text" placeholder="Recipient Name" value={form.recipientName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a] mb-3" />
              <input id="tribute-recipient-email" name="recipientEmail" required type="email" placeholder="Recipient Email" aria-label="Recipient Email" value={form.recipientEmail} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]" />
            </div>
            <button type="submit" className="w-full bg-[#f37021] text-white font-extrabold py-4 rounded-xl hover:bg-[#da621a] uppercase text-sm tracking-wider transition-colors shadow-sm">Proceed to Donation</button>
          </form>
        </div>
      </section>
    </div>
  );
}
