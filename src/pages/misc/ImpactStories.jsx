import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import heroStudents from '../../assets/hero_students.png';
import { impactStories } from '../../data/impactStories';
import PageSEO from '../../components/PageSEO';

export default function ImpactStories() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <PageSEO title="Impact Stories" description="Real stories of how Children for Life is transforming lives across Africa." path="/impact-stories" />
      <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] bg-cover bg-center bg-local md:bg-fixed flex items-center" style={{ backgroundImage: `url(${heroStudents})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Impact</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Impact Stories</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Voices of hope, transformation, and resilience from our projects.</p>
        </div>
      </div>
      <section className="py-12 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {impactStories.map((story) => (
            <Link key={story.slug} to={`/stories/${story.slug}`} className="bg-white border border-gray-150 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between group">
              <div>
                <img loading="lazy" src={story.img} className="w-full h-52 object-cover" alt={story.title} />
                <div className="p-6">
                  <span className="text-[11px] font-black text-[#005c7a] uppercase tracking-widest bg-[#e1f3f8] px-2.5 py-1 rounded">{story.tag}</span>
                  <h3 className="text-xl font-black text-gray-900 mt-4 mb-2 group-hover:text-[#005c7a] transition-colors">{story.title}</h3>
                  <p className="text-gray-500 font-semibold text-xs leading-relaxed">{story.excerpt}</p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <span className="text-[#005c7a] font-black text-xs uppercase tracking-wider group-hover:underline">Read Story →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
