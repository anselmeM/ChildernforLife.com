import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Heart } from 'lucide-react';
import sallyStory from '../../assets/sally_story.png';
import cleanWater from '../../assets/clean_water.png';
import cleanEnergy from '../../assets/clean_energy.png';
import monthlyGiving from '../../assets/monthly_giving.png';

export default function SallyStory() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[300px] sm:h-[400px] lg:h-[550px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${sallyStory})` }}>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <div className="max-w-3xl">
            <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Sally's Story</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl lg:text-6xl font-black leading-tight mb-4 tracking-tight drop-shadow-md">Lighting Futures: <br /> Sally's Story</h1>
            <p className="text-lg md:text-xl text-gray-200 font-bold max-w-2xl leading-relaxed">How Practical Solutions Changed One Family's Future</p>
          </div>
        </div>
      </div>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="rounded-[24px] overflow-hidden shadow-md">
            <img loading="lazy" src={cleanWater} alt="Children in classroom" className="w-full h-auto object-cover aspect-[4/3]" />
          </div>
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3 text-[14.5px] font-extrabold text-[#005c7a]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#005c7a]" />
                  <span>Location: Mbweni JKT, Tanzania</span>
                </div>
                <div className="flex items-center space-x-3 text-[14.5px] font-extrabold text-[#005c7a]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#005c7a]" />
                  <span>Needs Addressed: Solar Electricity & Safe Sanitation</span>
                </div>
              </div>
              <div className="text-gray-600 font-semibold text-[15px] leading-relaxed space-y-6">
                <p>Sally sat quietly on the edge of her bed, the soft sound of her children playing outside barely audible through the thin walls of their small home. It had been nearly a year since her husband passed away, leaving her alone to raise their three children. The days had blurred together, each filled with the same struggles: fetching water, preparing meals over a small fire, and doing her best to ensure her children stayed in school.</p>
                <p>But as the sun set each evening, a wave of helplessness washed over her. Without electricity, their home was plunged into darkness. The children, eager to learn, couldn't study once the sun went down. Amara, 12, and Tunde, 10, would sit by the fading light of a candle, trying to make out the words in their textbooks, while little Aisha, just 6, would curl up beside her mother, too young to understand why life had become so difficult.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-gray-600 font-semibold text-[15px] leading-relaxed space-y-6">
            <p>Adding to their struggle, the house didn't have a proper toilet. The lack of sanitation wasn't just uncomfortable, it was dangerous, especially for the children. Every time they had to relieve themselves, they'd have to go outside, often in the middle of the night, to find a secluded spot. Sally worried constantly about their safety.</p>
            <p>One evening, as the candle's flame flickered and dimmed, Amara set her book aside and sighed. "Mama," she said, her voice full of frustration, "how can I study if I can't even see?" Sally's heart sank. She wanted to give her children everything, a better life, a brighter future, but she didn't have the means. She had heard about an organization called Children for Life, known for helping families in need. With a spark of hope, Sally decided to approach them.</p>
            <div className="pt-4">
              <button onClick={() => navigate('/volunteer')} className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md inline-flex items-center space-x-2">
                <Heart className="w-4 h-4 fill-white" />
                <span>BECOME A VOLUNTEER</span>
              </button>
            </div>
          </div>
          <div className="rounded-[24px] overflow-hidden shadow-md">
            <img loading="lazy" src={cleanEnergy} alt="Solar clinic panels" className="w-full h-auto object-cover aspect-[4/3]" />
          </div>
        </div>
      </section>

      <section className="bg-[#eef8fc] py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 mb-8 lg:mb-16 tracking-tight uppercase">Sally's Story Updates</h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-16">
            <div className="lg:col-span-2 relative">
              <div className="absolute inset-0 bg-[#ffc72c] rounded-2xl translate-x-2.5 translate-y-2.5 -z-10"></div>
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-white">
                <img loading="lazy" src={sallyStory} alt="Sally story" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-3">
              <h3 className="text-2xl md:text-[28px] font-black text-gray-900 leading-snug mb-4 hover:text-[#005c7a] transition-colors">How Children for Life stepped in to build a brighter future</h3>
              <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed mb-6">The local Children for Life team visited Sally's home, assessed their needs, and installed a solar power grid and a safe toilet. Amara can now study late into the evening, and the family has safe, private sanitation.</p>
              <button onClick={() => navigate('/donate')} className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-7 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-sm">READ THIS STORY</button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 relative">
              <div className="absolute inset-0 bg-[#ffc72c] rounded-2xl translate-x-2.5 translate-y-2.5 -z-10"></div>
              <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-white">
                <img loading="lazy" src={monthlyGiving} alt="Community farm collective" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="lg:col-span-3">
              <h3 className="text-2xl md:text-[28px] font-black text-gray-900 leading-snug mb-4 hover:text-[#005c7a] transition-colors">A new sense of dignity and security for Sally's children</h3>
              <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed mb-6">With a private sanitation facility and solar lights, Sally no longer fears for her children's safety in the dark. The family is healthy, comfortable, and thriving in their own community.</p>
              <button onClick={() => navigate('/donate')} className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-7 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-sm">DONATE TODAY</button>
            </div>
          </div>
          <div className="mt-20 border-t border-gray-200/50 pt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Families like Sally's need your support today.</h3>
            <p className="text-gray-500 font-bold max-w-lg mx-auto mb-8 text-[15px]">Your donation helps Children for Life provide immediate, practical resources like solar power, sanitation facilities, and learning tools to children and mothers.</p>
            <button onClick={() => navigate('/donate')} className="bg-[#f37021] hover:bg-[#da621a] text-white px-10 py-4 rounded-full text-xs font-black uppercase tracking-wider shadow-md transition-colors">DONATE NOW</button>
          </div>
        </div>
      </section>
    </div>
  );
}
