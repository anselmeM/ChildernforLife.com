import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import cleanEnergy from '../../assets/clean_energy.png';

export default function Board() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${cleanEnergy})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">About Us</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Our Board</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Governance, oversight, and strategic guidance</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">Our Board of Trustees provides governance, oversight, and strategic guidance to ensure that Children for Life remains dedicated to its mission, operates ethically, and maintains the highest standards of accountability.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Hon. Arthur Pendelton", role: "Board Chair", desc: "Former diplomat with extensive experience in international cooperation policies." },
              { name: "Elena Rostova", role: "Treasurer", desc: "Financial consultant specializing in global charity audits and risk management." },
              { name: "Samuel Wambua", role: "Director", desc: "Community leader and agricultural specialist advocate based in Tanzania." },
              { name: "Claire Dupont", role: "Director", desc: "Human rights lawyer specializing in children's education rights and social inclusion." }
            ].map((b, i) => (
              <div key={i} className="bg-gray-50 border border-gray-150 rounded-2xl p-8 shadow-sm">
                <h4 className="font-black text-gray-900 text-lg mb-1">{b.name}</h4>
                <p className="text-[#005c7a] font-bold text-xs uppercase mb-3">{b.role}</p>
                <p className="text-gray-500 font-semibold text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
