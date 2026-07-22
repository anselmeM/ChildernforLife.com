import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import monthlyGiving from '../../assets/monthly_giving.png';

export default function BecomePartner() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${monthlyGiving})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Partnership</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Become A Partner</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Align your organization with sustainable change</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed text-center max-w-2xl mx-auto">Children for Life partners with corporations, foundations, and community alliances to deliver large-scale education, energy, and WASH projects.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900">Why Partner With Us?</h3>
              <ul className="space-y-4 text-gray-500 font-bold text-[14.5px] leading-relaxed">
                <li className="flex items-start"><span className="text-[#005c7a] mr-2">✔</span><span>Measurable global ESG and community development impacts.</span></li>
                <li className="flex items-start"><span className="text-[#005c7a] mr-2">✔</span><span>Transparent tracking and accountability of all program expenditures.</span></li>
                <li className="flex items-start"><span className="text-[#005c7a] mr-2">✔</span><span>Direct alignment with United Nations Sustainable Development Goals.</span></li>
              </ul>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert("Partnership Inquiry Received!"); navigate('/'); }} className="space-y-4 bg-gray-50 border border-gray-150 p-8 rounded-3xl">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Company / Organization</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 font-semibold focus:outline-none focus:border-[#005c7a]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Name</label>
                <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 font-semibold focus:outline-none focus:border-[#005c7a]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Email</label>
                <input required type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 font-semibold focus:outline-none focus:border-[#005c7a]" />
              </div>
              <button type="submit" className="w-full bg-[#008cb3] text-white font-extrabold py-3.5 rounded-xl hover:bg-[#005c7a] uppercase text-xs tracking-wider transition-colors shadow-sm mt-4">Inquire About Partnership</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
