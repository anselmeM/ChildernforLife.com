import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import heroStudents from '../../assets/hero_students.png';

export default function Fundraise() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${heroStudents})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Fundraise</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Fundraise With Us</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Turn your creativity and networks into action</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed text-center max-w-2xl mx-auto">You don't have to be a direct donor to make an impact. Launch a fundraiser in your community, school, or workplace and rally support for better futures.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Athletic Events", desc: "Run a marathon, bike, or swim, and ask friends to pledge donations per kilometer completed." },
              { title: "Celebration Giving", desc: "Ask for donations to Children for Life in lieu of gifts for your birthday, wedding, or anniversary." },
              { title: "Community Bakesale", desc: "Organize a local bake sale, concert, or sports tournament with all proceeds donated to our projects." }
            ].map((f, i) => (
              <div key={i} className="border border-gray-150 bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-black text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 font-bold text-xs leading-relaxed mb-6">{f.desc}</p>
                <a href="mailto:fundraising@childrenforlife.org" className="text-[#005c7a] font-black text-xs uppercase hover:underline">Start Campaign →</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
