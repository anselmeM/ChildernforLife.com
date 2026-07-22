import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import sallyStory from '../../assets/sally_story.png';

export default function LeaveLegacy() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${sallyStory})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Planned Giving</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Leave A Legacy</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Make a lasting impact through planned giving</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">By leaving a bequest in your will to Children for Life, you ensure that future generations of children will continue to benefit from clean water, safe schooling, and skills training.</p>
          <div className="border border-gray-150 bg-gray-50 p-8 rounded-3xl">
            <h3 className="text-xl font-black text-gray-900 mb-4">Why Planned Giving Matters</h3>
            <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed mb-4">A legacy gift allows you to make a larger, more significant donation than might be possible during your lifetime, leaving a legacy of hope, opportunity, and safety.</p>
            <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">We offer several formats including specific bequests, residual bequests, and life insurance policies. Consult your estate planner for guidance.</p>
            <div className="pt-6">
              <a href="mailto:legacy@childrenforlife.org" className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-block">Contact Legacy Team</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
