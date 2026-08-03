import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import cleanWater from '../../assets/clean_water.jpg';
import PageSEO from '../../components/PageSEO';
import VolunteerApplyForm from '../../components/VolunteerApplyForm';

export default function Volunteer() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <PageSEO title="Become a Volunteer" description="Join a global network of skills-sharing and action. Volunteer with Children for Life." path="/volunteer" />
      <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] bg-cover bg-center bg-local md:bg-fixed flex items-center" style={{ backgroundImage: `url(${cleanWater})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Take Action</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Become A Volunteer</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Join a global network of skills-sharing and action</p>
        </div>
      </div>
      <section className="py-12 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10 text-center">Ready to make a difference? Fill out the inquiry form below, and our recruitment team will get in touch with you about matching placements.</p>
          <VolunteerApplyForm />
        </div>
      </section>
    </div>
  );
}
