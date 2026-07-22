import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import monthlyGiving from '../../assets/monthly_giving.png';

export default function EconomicResilience() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${monthlyGiving})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">What We Do</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Improving Economic Resilience</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Unlocking opportunities for sustainable livelihoods</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">We partner with local agricultural cooperatives and small business owners to build economic independence. By training farmers in climate-smart agriculture and business owners in digital financial tools, we help families increase their incomes and withstand economic shocks.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Agricultural Cooperatives", desc: "Helping local farming collectives improve harvest yields, establish post-harvest storage, and secure fair market access." },
              { title: "Financial Literacy", desc: "Training rural women's groups in budgeting, saving models, and using micro-finance accounts to launch home businesses." },
              { title: "Vocational Skills", desc: "Supporting youth with technical training in clean energy installation, sustainable building, and information technology." }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-150 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 font-bold text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
