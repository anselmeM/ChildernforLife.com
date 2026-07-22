import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import monthlyGiving from '../../assets/monthly_giving.png';

export default function DonateMonthly() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${monthlyGiving})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Donate</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Donate Monthly</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Provide consistent, sustainable support to children</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">Monthly giving provides Children for Life with stable, predictable funding to planning infrastructure developments like water systems, school expansions, and clinics.</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { amt: "$15", text: "Supplies school books for one child monthly" },
              { amt: "$35", text: "Provides solar lights for one household monthly" },
              { amt: "$75", text: "Powers clean water purification monthly" }
            ].map((m, i) => (
              <div key={i} className="border-2 border-gray-150 rounded-2xl p-6 bg-gray-50 flex flex-col justify-between hover:border-[#005c7a] transition-all cursor-pointer" onClick={() => navigate('/donate')}>
                <div className="text-2xl font-black text-[#005c7a] mb-2">{m.amt}</div>
                <div className="text-gray-500 font-bold text-xs leading-relaxed">{m.text}</div>
              </div>
            ))}
          </div>
          <div className="pt-6">
            <button onClick={() => navigate('/donate')} className="bg-[#f37021] text-white font-extrabold px-10 py-4 rounded-full hover:bg-[#da621a] uppercase text-xs tracking-wider shadow-md">Start Monthly Giving</button>
          </div>
        </div>
      </section>
    </div>
  );
}
