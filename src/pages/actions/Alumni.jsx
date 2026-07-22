import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ugirlsGraduation from '../../assets/ugirls_graduation.png';
import cleanEnergy from '../../assets/clean_energy.png';

export default function Alumni() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${ugirlsGraduation})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Take Action</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Volunteer Alumni</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Voices of experience from the field</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <p className="text-gray-600 text-lg font-medium leading-relaxed text-center max-w-2xl mx-auto">Our volunteers remain part of the Children for Life family long after returning home. Read how their placements shaped their lives and careers.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: "Sarah Jenkins", role: "WASH Educator (Tanzania, 2023)", text: "Teaching clean water hygiene in local schools was one of the most challenging and rewarding years of my life. It gave me a new perspective on global health and led to my career in NGO administration.", img: ugirlsGraduation },
              { name: "David Chen", role: "Solar Microgrid Engineer (Ethiopia, 2024)", text: "Installing solar grids for clinics meant electricity for vaccine fridges and maternal care. Seeing the immediate change when the lights came on is a memory I will cherish forever.", img: cleanEnergy }
            ].map((al, i) => (
              <div key={i} className="bg-gray-50 border border-gray-150 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 shadow-md">
                  <img loading="lazy" src={al.img} className="w-full h-full object-cover" alt={al.name} />
                </div>
                <div>
                  <p className="italic text-gray-500 font-semibold text-[14px] leading-relaxed mb-4">"{al.text}"</p>
                  <h4 className="font-black text-gray-900 text-base">{al.name}</h4>
                  <p className="text-[#005c7a] font-bold text-xs">{al.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
