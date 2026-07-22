import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import sallyStory from '../../assets/sally_story.png';

export default function StrategicPlan() {
  const navigate = useNavigate();

  const pillars = [
    { title: "Pillar 1: Empowering Young Girls through Education", desc: "Expand U-GIRLS 2 programs into secondary schools in three new regions, providing mentorship, sanitation safety, and scholarship pipelines." },
    { title: "Pillar 2: Building Clean & Safe School Infrastructure", desc: "Construct solar energy microgrids and eco-sanitation toilets in 150 rural schools, reinforcing safety and attendance." },
    { title: "Pillar 3: Boosting Women-Led Agricultural Collectives", desc: "Provide business training and grants to support women farmers in establishing local irrigation systems and food processing networks." }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${sallyStory})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">What We Do</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Our Strategic Plan</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Pillars of impact for 2024-2028</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">Our 2024–2028 Strategic Plan lays out our vision for children and families. Over the next five years, Children for Life is focusing resources on three core pillars:</p>
          <div className="space-y-6">
            {pillars.map((p, i) => (
              <div key={i} className="border-b border-gray-150 pb-6">
                <h3 className="text-xl font-black text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-500 font-semibold text-[14.5px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
