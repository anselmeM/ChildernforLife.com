import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import ugirlsGraduation from '../../assets/ugirls_graduation.png';

export default function GenderEquality() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${ugirlsGraduation})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">What We Do</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Gender Equality & Social Inclusion</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Creating inclusive environments so everyone can thrive</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">Gender equality is not just a goal, it is a prerequisite for ending poverty. Children for Life works to remove social and economic barriers facing marginalized girls and women, ensuring equal access to education, health, and economic assets.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900">U-GIRLS 2 & Beyond</h3>
              <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">Our U-GIRLS 2 program provides scholarships, learning materials, and mentorship to girls in secondary schools, preparing them for university admission and careers in STEM and leadership roles.</p>
              <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">We also train teachers on gender-responsive pedagogy and work with community leaders to raise awareness against early marriages and gender-based discrimination.</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#ffc72c] rounded-2xl translate-x-2 translate-y-2 -z-10"></div>
              <img loading="lazy" src={ugirlsGraduation} alt="U-Girls Graduation" className="rounded-2xl shadow-md w-full h-auto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
