import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import monthlyGiving from '../../assets/monthly_giving.jpg';
import PageSEO from '../../components/PageSEO';
import { leadershipStructure, executiveDirector } from '../../data/team';

// Single page for both "Our Team" and "Our Leadership" — they previously
// rendered identical content under two routes. /about/leadership still
// resolves here (kept for old links) but only /about/team is advertised
// and listed in the sitemap.
export default function Team() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <PageSEO title="Our Team & Leadership" description="Meet the dedicated team and leadership behind Children for Life." path="/about/team" />
      <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] bg-cover bg-center bg-local md:bg-fixed flex items-center" style={{ backgroundImage: `url(${monthlyGiving})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">About Us</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Our Team & Leadership</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Governance and management structure ensuring accountability, transparency, and effective program delivery.</p>
        </div>
      </div>
      <section className="py-12 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-gray-900 border-b border-gray-100 pb-4">Our Leadership Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadershipStructure.map((item, idx) => (
                <div key={idx} className={`border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all ${item.color}`}>
                  <h3 className="font-extrabold text-gray-900 text-[14.5px] uppercase tracking-wider mb-3">{item.role}</h3>
                  <p className="text-gray-500 font-bold text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-gray-900 border-b border-gray-100 pb-4">Meet Our Executive Director</h2>
            <div className="bg-[#f0f9fc] rounded-[36px] p-8 md:p-12 border border-gray-100 flex flex-col lg:flex-row items-center lg:items-start gap-10">
              <div className="w-40 h-40 bg-[#005c7a] text-white rounded-full flex flex-col items-center justify-center shadow-lg flex-shrink-0 text-center border-4 border-white select-none">
                <span className="text-2xl sm:text-4xl font-black tracking-widest">{executiveDirector.initials}</span>
                <span className="text-[10px] uppercase font-black tracking-widest text-[#ffc72c] mt-1.5">{executiveDirector.yearsExp}</span>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-[#005c7a]">{executiveDirector.name}</h3>
                  <p className="text-[#f37021] font-black uppercase text-xs tracking-widest mt-1">{executiveDirector.title}</p>
                </div>
                <div className="bg-white/65 border border-white/60 p-6 rounded-2xl">
                  <h4 className="text-[12px] uppercase font-black text-gray-900 tracking-wider mb-2">Bio Profile</h4>
                  <p className="text-gray-600 font-bold text-xs leading-relaxed">{executiveDirector.bioShort}</p>
                </div>
                <p className="text-gray-600 font-bold text-xs leading-relaxed">{executiveDirector.bioLong}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
