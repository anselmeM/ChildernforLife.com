import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import cleanEnergy from '../../assets/clean_energy.png';

export default function ClimateAction() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${cleanEnergy})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">What We Do</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Advancing Climate Action</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Strengthening environmental resilience and clean energy</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">Climate change impacts vulnerable families first. Children for Life integrates environmental action across all initiatives. We install clean solar energy grids for healthcare services, build water filtration facilities (WASH) for schools, and promote sustainable reforestation.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#ffc72c] rounded-2xl translate-x-2 translate-y-2 -z-10"></div>
              <img loading="lazy" src={cleanEnergy} alt="Clean Energy Clinic" className="rounded-2xl shadow-md w-full h-auto" />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900">Green Health & Clean Water</h3>
              <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">By powering rural health centers with solar microgrids, we prevent vaccine wastage and guarantee constant power for child deliveries.</p>
              <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">In addition, our school sanitation projects construct safe latrines and install solar-powered water filtration pumps, giving children constant access to safe, clean drinking water.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
