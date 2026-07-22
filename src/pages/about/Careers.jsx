import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import sallyStory from '../../assets/sally_story.png';

export default function Careers() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${sallyStory})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">About Us</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Careers</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Build your career while building better futures</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">Looking for a career with purpose? Join our global team of project managers, logisticians, educators, and engineers working together to support children and families.</p>
          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-black text-gray-900 mb-2">Current Open Staff Positions</h3>
            <div className="divide-y divide-gray-200">
              {[
                { title: "Senior Program Manager (WASH)", loc: "Dar es Salaam, Tanzania", type: "Full-Time" },
                { title: "Monitoring & Evaluation (M&E) Specialist", loc: "Addis Ababa, Ethiopia", type: "Full-Time" },
                { title: "Communications & Media Relations Officer", loc: "Remote", type: "Contract" }
              ].map((job, i) => (
                <div key={i} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{job.title}</h4>
                    <p className="text-gray-500 font-semibold text-xs mt-1">{job.loc} • {job.type}</p>
                  </div>
                  <a href="mailto:careers@childrenforlife.org" className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider">Apply Now</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
