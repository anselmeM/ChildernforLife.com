import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import cleanEnergy from '../../assets/clean_energy.png';

export default function VolunteerFAQ() {
  const navigate = useNavigate();

  const faqs = [
    { q: "What qualifications do I need to volunteer?", a: "Most of our placements require a university degree or equivalent professional trade certification, alongside 2+ years of relevant working experience in your field of expertise." },
    { q: "Are placements paid?", a: "Our volunteer placements are fully funded. Children for Life covers round-trip airfare, housing, medical insurance, visas, and provides a monthly living stipend adapted to local costs." },
    { q: "How long are the placements?", a: "Placements range from short-term (3 to 6 months) to long-term (12 to 24 months). Long-term placements are highly recommended for sustainable skills-sharing impact." },
    { q: "Is it safe to volunteer abroad?", a: "We prioritize safety. We perform comprehensive security audits in all communities we serve, provide pre-departure briefing, and have dedicated local support staff in every country." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${cleanEnergy})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Take Action</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Volunteer FAQ</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Frequently asked questions about placements</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-black text-gray-900 mb-3 flex items-center">
                <span className="text-[#005c7a] mr-2">Q:</span> {faq.q}
              </h3>
              <p className="text-gray-500 font-semibold text-[14.5px] leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
