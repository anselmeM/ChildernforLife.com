import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import heroStudents from '../../assets/hero_students.png';

export default function WhereWeWork() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${heroStudents})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Regions We Serve</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Where We Work</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Strengthening education, hygiene, and livelihoods worldwide</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">Children for Life works in partnership with communities across Africa. We collaborate with local governments, NGOs, and community-based organizations to design and implement programs that address the unique needs of each region.</p>
          <p className="text-gray-600 text-lg font-medium leading-relaxed">Our work spans East Africa (Tanzania, Ethiopia), West Africa (Benin, Nigeria, Cameroon), and Central Africa (Democratic Republic of the Congo). In each country, we focus on locally-led solutions in education, health, clean energy, WASH, and sustainable livelihoods.</p>
          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-black text-gray-900">Our Presence Across Africa</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-black text-[#005c7a] text-base mb-2">East Africa</h4>
                <p className="text-gray-500 font-bold text-xs leading-relaxed">Tanzania • Ethiopia</p>
                <p className="text-gray-500 font-semibold text-xs mt-2">Focus: Girls' education, solar microgrids, WASH infrastructure, agricultural resilience.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-black text-[#005c7a] text-base mb-2">West Africa</h4>
                <p className="text-gray-500 font-bold text-xs leading-relaxed">Benin • Nigeria • Cameroon</p>
                <p className="text-gray-500 font-semibold text-xs mt-2">Focus: Digital vocational training, gender-responsive pedagogy, women's cooperatives.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h4 className="font-black text-[#005c7a] text-base mb-2">Central Africa</h4>
                <p className="text-gray-500 font-bold text-xs leading-relaxed">Democratic Republic of the Congo</p>
                <p className="text-gray-500 font-semibold text-xs mt-2">Focus: Emergency WASH, solar-powered maternity clinics, community water committees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
