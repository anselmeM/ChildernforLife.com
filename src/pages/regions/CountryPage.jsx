import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, Leaf, ShieldCheck } from 'lucide-react';
import AfricaMap from '../../AfricaMap';
import { getCountry } from '../../data/countries';

export default function CountryPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const data = getCountry(slug);
  const activeSolution = data.solutions[activeTabIdx] || data.solutions[0];

  return (
    <div className="bg-white min-h-screen relative overflow-hidden">
      {/* Parallax Hero */}
      <div className="relative h-[300px] sm:h-[400px] lg:h-[550px] bg-cover bg-center bg-fixed flex items-end pb-12 sm:pb-16 lg:pb-24" style={{ backgroundImage: `url(${data.bg})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white flex justify-between items-end">
          <div className="max-w-xl">
            <button onClick={() => navigate('/regions/where')} className="inline-flex items-center text-white/80 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] mb-4 transition-colors">
              <ChevronLeft size={14} className="mr-1" /> Where We Work
            </button>
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight mb-4 drop-shadow-lg">{data.name}</h1>
            <p className="text-sm md:text-base text-gray-200 font-bold leading-relaxed max-w-md drop-shadow-md">{data.subtitle}</p>
            <div className="w-1 h-8 bg-[#f37021] mt-8 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Map & Overlapping Impact Card Section */}
      <div className="relative bg-white pb-24 pt-32 lg:pt-0">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-60 flex items-center justify-center scale-[2.2] transform translate-y-24 -translate-x-24">
             <AfricaMap activeCountry={slug} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7"></div>
          <div className="lg:col-span-5 flex justify-center lg:justify-end lg:-mt-72">
            <div className="bg-[#f2fafd] rounded-[32px] lg:rounded-[40px] shadow-2xl pt-8 lg:pt-12 px-6 lg:px-10 pb-8 lg:pb-10 w-full max-w-[420px] min-h-0 lg:min-h-[780px] relative border border-white overflow-hidden flex flex-col justify-between">
              <div>
                <div className="absolute top-8 left-8">
                  <div className="w-6 h-6 rounded-full bg-[#ffc72c]/30 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#ffc72c]"></div>
                  </div>
                </div>
                <h3 className="text-center text-xl sm:text-2xl lg:text-3xl font-black text-[#1a365d] mb-6 lg:mb-8 mt-2">The {data.name} Effect</h3>
                <div className="flex justify-center mb-8 relative z-10">
                  <div className="w-44 h-44 rounded-full overflow-hidden shadow-md border-4 border-white">
                    <img loading="lazy" src={cusoEffectSoap} className="w-full h-full object-cover" alt="Impact" />
                  </div>
                </div>
              </div>

              <div className="relative pt-2 pb-4">
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#f37021]/30 transform -translate-x-1/2"></div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-8 relative z-10">
                  <div className="text-left pr-2">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#f37021] mb-2 tracking-tighter">{data.stats.partners}</div>
                    <p className="text-[#1a202c] text-[10.5px] leading-relaxed font-bold">
                      Local partners supported in {data.name} to drive sustainable change.
                    </p>
                  </div>
                  <div className="text-left pl-2">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#f37021] mb-2 tracking-tighter">{data.stats.volunteers}</div>
                    <p className="text-[#1a202c] text-[10.5px] leading-relaxed font-bold">
                      Skilled volunteers placed to share professional expertise.
                    </p>
                  </div>
                  <div className="text-left pr-2">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#f37021] mb-2 tracking-tighter">{data.stats.trained}</div>
                    <p className="text-[#1a202c] text-[10.5px] leading-relaxed font-bold">
                      Programs implemented and supported to build resilience.
                    </p>
                  </div>
                  <div className="text-left pl-2">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#f37021] mb-2 tracking-tighter">{data.stats.lives}</div>
                    <p className="text-[#1a202c] text-[10.5px] leading-relaxed font-bold">
                      Direct beneficiaries reached through local solutions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => navigate('/donate')}
                  className="bg-[#ffc72c] hover:bg-[#eebb22] text-gray-900 font-black py-3.5 px-12 rounded-full uppercase text-xs tracking-widest shadow-md transition-colors w-full text-center"
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Locally-Led Solutions */}
      <div className="bg-[#f0f9fc] py-24 relative z-20 border-t border-b border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-4">Locally-Led Solutions</h2>
            <p className="text-gray-500 font-semibold text-sm leading-relaxed max-w-3xl mx-auto">
              We know that one-size-fits-all solutions are yesterday's thinking, that's why we support hyper-localized solutions designed for and by the people, place and economy of {data.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 flex flex-col space-y-4">
              {data.solutions.map((sol, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`text-left p-6 rounded-2xl transition-all font-bold text-sm flex items-center justify-between border ${
                    activeTabIdx === idx
                      ? 'bg-[#0e7090] text-white border-transparent shadow-lg'
                      : 'bg-white text-[#0e7090] border-[#0e7090]/20 hover:bg-[#e6f4f8] hover:border-[#0e7090]/40'
                  }`}
                >
                  <span className="pr-4 leading-relaxed">{sol.tab}</span>
                  {activeTabIdx === idx && (
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 ml-2">
                      <ChevronRight size={16} className="text-[#0e7090] stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 flex flex-col">
              <div className="rounded-3xl overflow-hidden shadow-lg mb-8">
                <img
                  src={activeSolution.img || data.bg}
                  className="w-full h-[360px] object-cover"
                  alt="Solution"
                />
              </div>
              <div className="pl-2">
                <h3 className="text-2xl font-black text-gray-900 leading-snug mb-4">{activeSolution.title}</h3>
                <p className="text-gray-500 font-semibold text-sm leading-relaxed mb-6">{activeSolution.desc}</p>
                <button className="bg-[#f37021] hover:bg-[#da621a] text-white font-black py-3.5 px-8 rounded-full uppercase text-xs tracking-widest shadow-md transition-all hover:translate-y-[-1px] active:translate-y-0">
                  See More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Grid */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-black text-gray-900 mb-2">Partnership for a Sustainable and<br/>Inclusive World</h3>
          <p className="text-gray-500 font-semibold text-xs mb-12">Together we share skills, build resilience and foster long-term positive change.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div key={idx} className="bg-white border border-gray-150 rounded-2xl aspect-[3/2] flex items-center justify-center p-6 shadow-sm hover:shadow-md transition-all relative group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:border-[#005c7a]/30 transition-colors">
                  <ShieldCheck size={24} className="text-gray-300 group-hover:text-[#005c7a] transition-colors" />
                </div>
                <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[#f37021]"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices of Change */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute right-0 top-10 w-4 h-12 bg-gray-200 rounded-l-md"></div>
        <div className="absolute right-0 top-1/2 w-4 h-12 bg-gray-200 rounded-l-md"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-3">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 leading-tight mb-4">{data.name}'s Voices of<br/>Change</h2>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-8">Stories from the field</p>
              <div className="flex space-x-3">
                <button className="w-10 h-10 rounded-full bg-[#f37021] text-white flex items-center justify-center hover:bg-[#da621a] transition-colors shadow-md">
                  <ChevronLeft size={16} className="stroke-[3]" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#f37021] text-white flex items-center justify-center hover:bg-[#da621a] transition-colors shadow-md">
                  <ChevronRight size={16} className="stroke-[3]" />
                </button>
              </div>
              <div className="mt-8 text-[#005c7a] font-black text-[10px] uppercase tracking-widest hover:underline cursor-pointer">
                See All Stories →
              </div>
            </div>

            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#e1f3f8] rounded-3xl p-10 relative">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                     <img loading="lazy" src={data.bg} className="w-full h-full object-cover" />
                  </div>
                </div>
                <p className="font-bold text-gray-900 text-xs leading-relaxed mb-8">
                  "This project provided me with the tools I needed to launch my own agricultural business. Now I can support my family and hire two people from my village. The training completely changed my life."
                </p>
                <p className="font-black text-[9px] text-[#005c7a] uppercase tracking-widest">Amina, Participant</p>
              </div>

              <div className="bg-[#ffc72c] rounded-3xl p-10 relative">
                 <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                     <img loading="lazy" src={heroStudents} className="w-full h-full object-cover" />
                  </div>
                </div>
                <p className="font-bold text-gray-900 text-[11px] leading-relaxed mb-8">
                  "As a volunteer, I came here thinking I was going to teach, but I ended up learning so much more. The resilience of the women here is incredible. It has been a deeply humbling and rewarding experience that I'll carry with me forever."
                </p>
                <p className="font-black text-[9px] text-gray-900 uppercase tracking-widest">David, Technical Advisor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Force For Good Banner */}
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0 w-full h-full">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${ugirlsGraduation})` }}></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white rounded-3xl p-10 max-w-sm shadow-2xl text-center">
            <h3 className="text-2xl font-black text-gray-900 mb-3">Be A Force For<br/>Good!</h3>
            <p className="text-gray-500 font-semibold text-[11px] leading-relaxed mb-8 px-4">
              Your support fuels local solutions, providing essential skills, resources, and opportunities for growth.
            </p>
            <button onClick={() => navigate('/donate')} className="bg-[#ffc72c] hover:bg-[#eebb22] text-gray-900 font-black py-3 px-8 rounded-full uppercase text-[10px] tracking-widest shadow-md transition-colors">
              Donate
            </button>
            <p className="text-gray-400 font-bold text-[9px] uppercase tracking-widest mt-6">Make a difference today</p>
          </div>
        </div>
      </section>

      {/* Take The Next Step */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-black text-gray-900 mb-12">Take The Next Step</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#f0f9fc] rounded-3xl p-10 flex flex-col items-center justify-between text-center hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#f37021]">
                <Heart size={24} />
              </div>
              <h4 className="font-black text-gray-900 text-base mb-3">Donate Stocks<br/>&amp; Securities</h4>
              <p className="text-gray-500 font-semibold text-[11px] leading-relaxed mb-8">Make a tax-efficient gift that supports our long-term mission and growth.</p>
              <button onClick={() => navigate('/donate/stocks')} className="text-[#f37021] font-black uppercase text-[10px] tracking-widest hover:underline">Learn More →</button>
            </div>
            <div className="bg-[#f0f9fc] rounded-3xl p-10 flex flex-col items-center justify-between text-center hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#9dc84a]">
                <Leaf size={24} />
              </div>
              <h4 className="font-black text-gray-900 text-base mb-3">Fundraise<br/>With Us</h4>
              <p className="text-gray-500 font-semibold text-[11px] leading-relaxed mb-8">Create your own campaign and mobilize your community for change.</p>
              <button onClick={() => navigate('/fundraise')} className="text-[#f37021] font-black uppercase text-[10px] tracking-widest hover:underline">Start A Campaign →</button>
            </div>
            <div className="bg-[#f0f9fc] rounded-3xl p-10 flex flex-col items-center justify-between text-center hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#005c7a]">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-black text-gray-900 text-base mb-3">Leave A Legacy<br/>Of Work</h4>
              <p className="text-gray-500 font-semibold text-[11px] leading-relaxed mb-8">Plan a legacy gift to ensure impact for future generations.</p>
              <button onClick={() => navigate('/leave-legacy')} className="text-[#f37021] font-black uppercase text-[10px] tracking-widest hover:underline">Learn More →</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}