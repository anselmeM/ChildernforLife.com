import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import heroStudents from '../../assets/hero_students.png';

export default function Volunteering() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${heroStudents})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">What We Do</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Volunteering</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Sharing skills, elevating communities</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">Volunteering is at the core of Children for Life's development model. By matching highly skilled professionals with local partner organizations, we foster sustainable skills transfer that strengthens local leadership and institutions.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Skills-Sharing Model", desc: "Rather than doing the work for communities, our volunteers collaborate with local counterparts to transfer knowledge and build capacity." },
              { title: "Sustainable Growth", desc: "Placements are designed in alignment with local municipal plans to guarantee long-term operational continuity after the placement ends." },
              { title: "Global Network", desc: "Join over 15,000 alumni who continue to advocate for global solidarity, inclusion, and equity." }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-150 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 font-bold text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="pt-6 text-center">
            <button onClick={() => navigate('/placements')} className="bg-[#f37021] hover:bg-[#da621a] text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md">See Current Placements</button>
          </div>
        </div>
      </section>
    </div>
  );
}
