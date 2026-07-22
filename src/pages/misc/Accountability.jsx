import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import heroStudents from '../../assets/hero_students.png';

export default function Accountability() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${heroStudents})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Governance</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Accountability</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Our commitment to fiscal transparency, ethical management, and donor trust.</p>
        </div>
      </div>
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <p className="text-gray-600 text-lg font-medium leading-relaxed">Children for Life is committed to the highest standards of transparency and integrity. Over 85% of all donor contributions go directly to funding our volunteer placements and community infrastructure programs.</p>
        <div className="bg-gray-50 border border-gray-150 p-8 rounded-3xl space-y-4">
          <h3 className="text-xl font-black text-gray-900 mb-2">Accreditation & Standards</h3>
          <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">We are a fully accredited organization in accordance with international charity standards, guaranteeing strict governance, transparent fundraising, and direct oversight on all program activities.</p>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-gray-900">Financial Reports</h3>
          <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">View or download our audited financial statements and annual statements below:</p>
          <div className="divide-y divide-gray-200">
            {[
              "Audited Financial Statement — 2025 (PDF)",
              "Annual Statement of Revenue and Expenditure — 2025 (PDF)",
              "Donor Privacy Code & Ethical Fundraising Policy (PDF)"
            ].map((doc, idx) => (
              <div key={idx} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                <span className="font-bold text-gray-900">{doc}</span>
                <button className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider">Download</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
