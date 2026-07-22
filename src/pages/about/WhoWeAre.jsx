import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import aboutHero from '../../assets/about_hero.png';
import aboutWomenHand from '../../assets/about_women_hand.png';
import heroStudents from '../../assets/hero_students.png';

export default function WhoWeAre() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[480px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${aboutHero})` }}>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-white/80 hover:text-white font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Who We Are</h1>
          <p className="text-sm md:text-base text-gray-200 font-bold max-w-3xl leading-relaxed mb-8">Helping disadvantaged children access good health, nutrition, education, protection, and safe water; so every child can learn, thrive, and shape a stronger future.</p>
        </div>
      </div>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img loading="lazy" src={aboutWomenHand} className="rounded-3xl shadow-lg w-full h-[400px] object-cover" alt="Who We Are" />
          </div>
          <div className="lg:pl-6">
            <h2 className="text-2xl sm:text-3xl font-black text-[#005c7a] mb-6">Who We Are</h2>
            <div className="text-gray-600 text-sm leading-relaxed font-semibold space-y-6">
              <p>At Children for Life, we believe every child, no matter their gender, religion, race, or background, deserves the opportunity to grow, learn, and reach their full potential.</p>
              <p>Children for Life is an international NGO whose mission is to provide children in need with adequate health, nutrition, protection, education, water, and sanitation services, and help them achieve their full potential in life.</p>
              <p>We strengthen the resilience of communities, families, and children by working with partners to deliver humanitarian assistance and development services, and to address immediate needs and provide long-term solutions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50 border-t border-gray-150">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#005c7a] mb-6">Our Mission, Vision & Values</h2>
            <ul className="space-y-6 text-gray-600 text-sm font-semibold">
              <li className="flex items-start">
                <span className="text-[#f37021] mr-2.5 mt-1">•</span>
                <span><strong>Our Vision:</strong> For every child to achieve his/her full potential in life regardless of religion, race, ethnicity or gender.</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#f37021] mr-2.5 mt-1">•</span>
                <span><strong>Our Mission:</strong> To provide children in need with adequate health, nutrition, protection, education, water, and sanitation services, and help them achieve their full potential in life.</span>
              </li>
              <li className="flex flex-col space-y-3 pt-2">
                <div className="flex items-start">
                  <span className="text-[#f37021] mr-2.5 mt-1">•</span>
                  <span><strong>Our Core Values:</strong></span>
                </div>
                <div className="pl-6 space-y-4">
                  <div>
                    <h4 className="text-[12.5px] uppercase font-black text-gray-900 tracking-wider mb-1">Diversity and Inclusion</h4>
                    <p className="text-[12.5px] text-gray-500 font-semibold leading-relaxed">Treats all people with dignity and respect; shows respect and sensitivity towards gender, cultural and religious differences; challenges prejudice, biases and intolerance in the society; encourages diversity.</p>
                  </div>
                  <div>
                    <h4 className="text-[12.5px] uppercase font-black text-gray-900 tracking-wider mb-1">Integrity</h4>
                    <p className="text-[12.5px] text-gray-500 font-semibold leading-relaxed">Maintains high ethical standards; takes clear ethical stands; keeps promises; immediately addresses untrustworthy or dishonest behavior; resists pressure in decision-making from internal and external sources; does not abuse power or authority.</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <img loading="lazy" src={heroStudents} className="rounded-3xl shadow-lg w-full h-[400px] object-cover" alt="Our Vision" />
          </div>
        </div>
      </section>
    </div>
  );
}
