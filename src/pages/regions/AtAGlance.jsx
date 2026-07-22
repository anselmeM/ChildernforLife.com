import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import heroStudents from '../../assets/hero_students.png';

export default function AtAGlance() {
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Our Work At A Glance</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Strengthening education, hygiene, and livelihoods worldwide</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">Children for Life is active across Africa, placing skilled volunteers, building infrastructure, and transferring technical expertise.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { region: "East Africa", countries: "Tanzania, Ethiopia", desc: "Promoting girls' secondary education scholarships, school solar microgrids, eco-friendly sanitation, and dry-season rainwater harvesting." },
              { region: "West Africa", countries: "Benin, Nigeria, Cameroon", desc: "Supporting digital vocational workshops, microgrid installer training, gender inclusion pedagogy, and women-led Cassava milling." },
              { region: "Central Africa", countries: "Democratic Republic of the Congo", desc: "Providing emergency clean water filtration grids and solar power generators for remote maternity clinics." }
            ].map((r, i) => (
              <div key={i} className="bg-gray-50 border border-gray-150 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">{r.region}</h3>
                  <p className="text-[#005c7a] font-bold text-xs mb-4">{r.countries}</p>
                  <p className="text-gray-500 font-bold text-xs leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
