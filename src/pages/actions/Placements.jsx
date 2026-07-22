import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import heroStudents from '../../assets/hero_students.png';

export default function Placements() {
  const navigate = useNavigate();

  const placements = [
    { title: "Health Education Advisor", loc: "Dar es Salaam, Tanzania", dur: "12 Months", desc: "Work with local clinics to design and deliver youth hygiene and sanitation workshops, reinforcing WASH training." },
    { title: "Primary School Teacher Trainer", loc: "Addis Ababa, Ethiopia", dur: "24 Months", desc: "Collaborate with primary schools to introduce modern teaching methodologies, parent engagement strategies, and girls' mentorship." },
    { title: "Solar Systems Technical Advisor", loc: "Mbeya, Tanzania", dur: "18 Months", desc: "Assist local technical teams in deploying solar micro-grids for remote health clinics, supporting vaccine refrigeration systems." },
    { title: "Community Farming Coordinator", loc: "Morogoro, Tanzania", dur: "12 Months", desc: "Partner with women's agricultural collectives to introduce sustainable irrigation systems, crop rotation, and market access." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${heroStudents})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Take Action</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Current Placements</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Apply your skills where they are needed most</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">Children for Life places skilled professionals in communities around the world to support local health, education, and livelihood projects. Browse our current open placements below and begin your journey.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {placements.map((p, i) => (
              <div key={i} className="bg-gray-50 border border-gray-150 rounded-2xl p-8 hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black text-gray-900">{p.title}</h3>
                    <span className="bg-[#e1f3f8] text-[#005a74] text-[11px] font-black px-2.5 py-1 rounded uppercase tracking-wider">{p.dur}</span>
                  </div>
                  <p className="text-[#005c7a] font-bold text-sm mb-4">{p.loc}</p>
                  <p className="text-gray-500 font-semibold text-sm leading-relaxed mb-6">{p.desc}</p>
                </div>
                <button onClick={() => navigate('/volunteer')} className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider w-max">Apply for Placement</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
