import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart, BookOpen, Users, ShieldAlert, Sparkles } from 'lucide-react';
import cleanWater from '../../assets/clean_water.png';

export default function Competencies() {
  const navigate = useNavigate();

  const goals = [
    { num: "01", title: "Good Health", desc: "Children regardless of gender enjoy good health. CFL aims to ensure that children are well nourished; they are protected from infection, diseases & injury; and children and their caregivers access essential health services.", icon: <Heart className="w-6 h-6 text-[#f37021]" />, bg: "bg-red-50/50 border-red-100" },
    { num: "02", title: "Educated for Life", desc: "Children regardless of gender are educated for life. CFL seeks to ensure that children can read, write and use numeracy skills; children make good judgments, manage emotions and communicate ideas. Adolescents are ready to embrace innovation and exploit economic opportunities; and children can access and complete basic education.", icon: <BookOpen className="w-6 h-6 text-[#005c7a]" />, bg: "bg-blue-50/50 border-blue-100" },
    { num: "03", title: "Positive Societal Development", desc: "Children regardless of gender enjoy positive societal development. CFL strives to ensure that children enjoy positive relationships with peers, family, and community members; children value and care for others and their environment; and children have hope and vision for the future.", icon: <Users className="w-6 h-6 text-green-600" />, bg: "bg-green-50/50 border-green-100" },
    { num: "04", title: "Protected from Abuse", desc: "Children regardless of gender are cared for, protected from abuse. CFL seeks to ensure that children are cared for in a loving, safe family and community environment, protected from abuse, exploitation, and violence.", icon: <ShieldAlert className="w-6 h-6 text-amber-600" />, bg: "bg-amber-50/50 border-amber-100" },
    { num: "05", title: "Celebrated & Supported", desc: "Children regardless of gender are celebrated. Children are celebrated and registered at birth so that they are not invisible in the society; that they may participate and are respected in decisions that affect their lives, and are involved in resilience-related interventions in order to prevent and manage shocks.", icon: <Sparkles className="w-6 h-6 text-purple-600" />, bg: "bg-purple-50/50 border-purple-100" }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${cleanWater})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">About Us</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Core Competencies</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Five strategic development areas where Children for Life makes a measurable impact.</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <p className="text-gray-600 font-bold text-lg leading-relaxed max-w-3xl">Children for Life is committed to ensuring every child has the support they need to thrive. Through our structured, child-focused interventions, we work towards five core development goals:</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {goals.map((goal, idx) => (
              <div key={idx} className={`border rounded-3xl p-8 flex items-start space-x-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-white ${goal.num === '05' ? 'lg:col-span-2' : ''}`}>
                <div className="absolute right-4 bottom-[-10px] text-8xl font-black text-gray-100/50 select-none z-0">{goal.num}</div>
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:space-x-6 w-full">
                  <div className={`p-4 rounded-2xl ${goal.bg.split(' ')[0]} border ${goal.bg.split(' ')[1]} mb-4 sm:mb-0 flex-shrink-0`}>{goal.icon}</div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3.5">
                      <span className="text-[#f37021] text-[11px] font-black tracking-widest uppercase bg-[#f37021]/15 px-3 py-1 rounded-full">Goal {goal.num}</span>
                      <h3 className="text-lg font-black text-gray-900">{goal.title}</h3>
                    </div>
                    <p className="text-gray-500 font-bold text-xs leading-relaxed max-w-xl">{goal.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
