import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import monthlyGiving from '../../assets/monthly_giving.png';
import ugirlsGraduation from '../../assets/ugirls_graduation.png';
import sallyStory from '../../assets/sally_story.png';
import heroStudents from '../../assets/hero_students.png';
import cleanWater from '../../assets/clean_water.png';
import cleanEnergy from '../../assets/clean_energy.png';

export default function Publications() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#fcfcfa] min-h-screen">
      <div className="relative h-[320px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${monthlyGiving})` }}>
        <div className="absolute inset-0 bg-[#8bb43d]/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight drop-shadow-md">PUBLICATIONS</h1>
          <p className="text-base text-gray-200 font-bold mt-2">Annual reports, newsletters, magazines, and strategic evaluations</p>
        </div>
      </div>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-150">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-950 mb-6 lg:mb-8 border-l-4 border-[#8bb43d] pl-4">Solstice Magazine</h2>
        <div className="bg-white border border-gray-150 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center max-w-4xl">
          <div className="w-48 h-64 bg-gray-200 rounded-xl overflow-hidden shrink-0 shadow-md border-4 border-[#8bb43d]">
            <img loading="lazy" src={ugirlsGraduation} className="w-full h-full object-cover" alt="Magazine" />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-gray-900">Solstice Magazine — Summer 2026</h3>
            <p className="text-gray-500 font-semibold text-sm leading-relaxed">Our flagship biannual publication covering international skills-sharing advancements, community solar microgrids, and inclusive WASH structures.</p>
            <button className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider">Download PDF</button>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-150">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-950 mb-6 lg:mb-8 border-l-4 border-[#f37021] pl-4">Annual Reports</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {[
            { yr: "2024–25", img: sallyStory },
            { yr: "2023–24", img: heroStudents },
            { yr: "2022–23", img: cleanWater },
            { yr: "2021–22", img: cleanEnergy },
            { yr: "2020–21", img: monthlyGiving },
            { yr: "2019–20", img: ugirlsGraduation }
          ].map((rep, i) => (
            <div key={i} className="text-center group cursor-pointer">
              <div className="aspect-[3/4] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow relative mb-3">
                <img loading="lazy" src={rep.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={`Report ${rep.yr}`} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              <h4 className="font-black text-gray-800 text-xs uppercase leading-snug">Annual Report</h4>
              <p className="text-[#f37021] font-bold text-xs">{rep.yr}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-950 mb-6 lg:mb-8 border-l-4 border-[#005c7a] pl-4">Impact Newsletters</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { issue: "Spring 2026", desc: "Focus: Solar lighting installations for health clinics", img: cleanEnergy },
            { issue: "Winter 2025", desc: "Focus: Primary school sanitation (WASH)", img: cleanWater },
            { issue: "Autumn 2025", desc: "Focus: Girls' secondary scholarships", img: ugirlsGraduation },
            { issue: "Summer 2025", desc: "Focus: Climate resilient farming yields", img: sallyStory }
          ].map((news, i) => (
            <div key={i} className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-gray-100">
                <img loading="lazy" src={news.img} className="w-full h-full object-cover" alt={news.issue} />
              </div>
              <h4 className="font-black text-gray-900 text-sm">{news.issue}</h4>
              <p className="text-gray-500 font-bold text-xs leading-normal mt-1 mb-4">{news.desc}</p>
              <button className="text-[#005c7a] hover:underline font-black text-xs uppercase">Download Issue</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
