import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import cleanEnergy from '../../assets/clean_energy.png';
import heroStudents from '../../assets/hero_students.png';
import sallyStory from '../../assets/sally_story.png';
import monthlyGiving from '../../assets/monthly_giving.png';
import ugirlsGraduation from '../../assets/ugirls_graduation.png';
import cleanWater from '../../assets/clean_water.png';

export default function News() {
  const navigate = useNavigate();
  const [isRefinerOpen, setIsRefinerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');

  const allNews = [
    { title: "Communiqué: Update on Tanzania Programs", tag: "Policy", date: "June 22, 2026", img: sallyStory },
    { title: "Supporters Reaffirm Commitment to Clean Development", tag: "Fundraising", date: "June 10, 2026", img: monthlyGiving },
    { title: "Civil Society Rallies Ahead of Global Justice Forums", tag: "Advocacy", date: "June 3, 2026", img: heroStudents },
    { title: "What Our Supporters Want the Executive Board to Know", tag: "Opinion", date: "May 25, 2026", img: ugirlsGraduation },
    { title: "From Communities to the Stage: Leadership Reflects", tag: "Profile", date: "May 14, 2026", img: cleanEnergy },
    { title: "Ensuring Long-Term Assistance for Remote Clinics", tag: "WASH", date: "May 2, 2026", img: cleanWater },
    { title: "Listening and Learning: Sustainable Development Journeys", tag: "Partnership", date: "April 28, 2026", img: heroStudents },
    { title: "Mission Over Politics: Why Capacity Building Matters", tag: "Insight", date: "April 15, 2026", img: sallyStory },
    { title: "Strategic Plan Launch Approaching: Highlights", tag: "Strategy", date: "March 30, 2026", img: ugirlsGraduation }
  ];

  const filteredNews = allNews.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || news.tag === selectedTag;
    return matchesSearch && matchesTag;
  });

  const handleClearAll = () => {
    setSearchQuery('');
    setSelectedTag('All');
  };

  return (
    <div className="bg-[#f0f9fc] min-h-screen">
      <div className="relative h-[320px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${cleanEnergy})` }}>
        <div className="absolute inset-0 bg-[#005c7a]/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-white/80 hover:text-white font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight drop-shadow-md">LATEST NEWS</h1>
          <p className="text-base text-gray-200 font-bold mt-2">Updates on our work and impact from the field</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex justify-between items-center text-sm font-bold text-[#005c7a] shadow-sm">
          <button onClick={() => setIsRefinerOpen(!isRefinerOpen)} className="hover:underline flex items-center space-x-1.5 focus:outline-none uppercase tracking-wider text-xs font-black">
            <span>{isRefinerOpen ? '− Hide Search Options' : '+ Refine Search'}</span>
            {(searchQuery !== '' || selectedTag !== 'All') && (
              <span className="w-2.5 h-2.5 rounded-full bg-[#f37021]"></span>
            )}
          </button>
          <button onClick={handleClearAll} className="hover:underline text-gray-400 focus:outline-none uppercase tracking-wider text-xs font-black">CLEAR ALL</button>
        </div>

        {isRefinerOpen && (
          <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
              <div className="lg:col-span-1">
                <label className="block text-[10.5px] font-black text-gray-500 uppercase tracking-widest mb-2">Search Keywords</label>
                <input type="text" placeholder="Type to filter articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#005c7a] bg-gray-50/50" />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-[10.5px] font-black text-gray-500 uppercase tracking-widest mb-2">Filter by Category</label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Policy', 'Fundraising', 'Advocacy', 'Opinion', 'Profile', 'WASH', 'Partnership', 'Insight', 'Strategy'].map(tag => (
                    <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${selectedTag === tag ? 'bg-[#005c7a] border-[#005c7a] text-white shadow-sm' : 'bg-white border-gray-200 text-gray-400 hover:border-[#005c7a] hover:text-[#005c7a]'}`}>{tag}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredNews.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center text-gray-500 font-semibold shadow-sm max-w-md mx-auto">No articles found matching your search.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredNews.map((news, i) => (
              <div key={i} className="bg-white border border-gray-150 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <img loading="lazy" src={news.img} className="w-full h-48 object-cover" alt={news.title} />
                  <div className="p-6">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-gray-400">
                      <span className="text-[#005c7a] bg-[#e1f3f8] px-2 py-0.5 rounded">{news.tag}</span>
                      <span>{news.date}</span>
                    </div>
                    <h3 className="text-base font-black text-gray-900 mt-3 leading-snug hover:text-[#005c7a] transition-colors cursor-pointer">{news.title}</h3>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <span className="text-xs font-bold text-gray-400">Read Article →</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-center space-x-6 mt-12 text-sm font-black text-[#005c7a]">
          <button className="bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"><ChevronLeft size={16} /></button>
          <span>1 of {Math.max(1, Math.ceil(filteredNews.length / 9))}</span>
          <button className="bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"><ChevronRight size={16} /></button>
        </div>
      </section>

      <section className="bg-white border-t border-gray-150 py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <div className="w-16 h-16 bg-[#e1f3f8] rounded-full flex items-center justify-center mx-auto mb-4 text-[#005c7a]">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Share your story with us!</h2>
          <p className="text-gray-500 font-semibold text-xs leading-relaxed mb-6">Have you volunteered or benefited from a Children for Life program? We'd love to hear your experiences and share them with our community.</p>
          <a href="mailto:stories@childrenforlife.org" className="bg-[#f37021] text-white font-extrabold px-8 py-3 rounded-full hover:bg-[#da621a] uppercase text-xs tracking-wider shadow-sm transition-colors inline-block">Submit Story</a>
        </div>
      </section>
    </div>
  );
}
