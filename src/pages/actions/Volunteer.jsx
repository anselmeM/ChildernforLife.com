import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import cleanWater from '../../assets/clean_water.png';

export default function Volunteer() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${cleanWater})` }}>
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
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10 text-center">Ready to make a difference? Fill out the inquiry form below, and our recruitment team will get in touch with you about matching placements.</p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Application Submitted Successfully!"); navigate('/'); }} className="space-y-6 bg-gray-50 border border-gray-150 p-8 rounded-3xl shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">First Name</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Last Name</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
              <input required type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Area of Expertise</label>
              <select className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]">
                <option>Education & Literacy</option>
                <option>Healthcare & Sanitation (WASH)</option>
                <option>Renewable Energy & Technology</option>
                <option>Sustainable Agriculture</option>
                <option>Other / Administration</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Briefly describe why you want to volunteer</label>
              <textarea rows="4" className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]"></textarea>
            </div>
            <button type="submit" className="w-full bg-[#f37021] text-white font-extrabold py-4 rounded-xl hover:bg-[#da621a] uppercase text-sm tracking-wider shadow-sm transition-colors">Submit Application</button>
          </form>
        </div>
      </section>
    </div>
  );
}
