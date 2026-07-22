import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Mail, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';

import heroStudents from '../assets/hero_students.png';
import ugirlsGraduation from '../assets/ugirls_graduation.png';
import sallyStory from '../assets/sally_story.png';
import monthlyGiving from '../assets/monthly_giving.png';
import cleanWater from '../assets/clean_water.png';
import cleanEnergy from '../assets/clean_energy.png';

export default function Home() {
  const navigate = useNavigate();
  const pageRef = useScrollReveal();
  const [activeStory, setActiveStory] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const stories = [
    {
      type: "Program In-Focus",
      title: "Celebrating U-GIRLS 2",
      desc: "Today, we celebrate the incredible impact of U-GIRLS 2 a program that has provided young girls support to complete their secondary education.",
      bg: ugirlsGraduation
    },
    {
      type: "Momentum",
      title: "Discover our brand-new monthly giving program",
      desc: "Welcome to a community of heart and mind, united by a belief in the power of global solidarity. Every month, we invite you to chip in to power skills, opportunities, and change in communities around the world.",
      bg: monthlyGiving
    },
    {
      type: "WASH Programme",
      title: "Safe Sanitation in Local Schools",
      desc: "Through our clean water initiatives, we install water filtration stations and toilets, giving children the hygiene support they need to learn and thrive.",
      bg: cleanWater
    },
    {
      type: "Sally's Story",
      title: "Renewed Hope for Sally's Family",
      desc: "After losing her husband, Sally struggled to raise three children without electricity or safe sanitation. We provided solar lights and a proper latrine to restore dignity.",
      bg: sallyStory
    },
    {
      type: "Clean Energy",
      title: "Solar Grids for Health Centers",
      desc: "By installing clean solar energy grids in remote medical clinics, we are ensuring constant refrigeration for vital vaccines and electricity for maternal health procedures.",
      bg: cleanEnergy
    }
  ];

  const handleNextStory = () => {
    if (activeStory < stories.length - 1) {
      setActiveStory(activeStory + 1);
    }
  };

  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handlePrevStory = () => {
    if (activeStory > 0) {
      setActiveStory(activeStory - 1);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: formFirstName, lastName: formLastName, email: formEmail }),
      });
      if (res.ok) {
        setFormStatus('sent');
        setFormFirstName('');
        setFormLastName('');
        setFormEmail('');
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div ref={pageRef} className="flex flex-col min-h-screen">

      {/* Primary Hero Section */}
      <section className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
          style={{ backgroundImage: `url(${heroStudents})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 sm:mb-8 leading-tight drop-shadow-md tracking-tight hero-animate">
              So Every Child Can Learn, <br /> Thrive, and Shape a <br /> Stronger Future
            </h1>
            
            <div className="space-y-4 hero-animate">
              <div className="flex items-center space-x-3">
                <button className="bg-[#ffc72c] hover:bg-[#eebb22] text-black font-extrabold py-3 px-8 rounded flex items-center justify-center shadow-lg transition-colors text-xs uppercase tracking-wider">
                  <Mail className="w-4 h-4 mr-2" />
                  SUBSCRIBE TO OUR NEWSLETTER
                </button>
                <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full border border-white/30 backdrop-blur-sm float-item">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
              </div>
              <button 
                onClick={() => navigate('/donate')}
                className="w-full sm:w-auto bg-[#f37021] hover:bg-[#da621a] text-white font-extrabold py-3 px-8 rounded flex items-center justify-center sm:justify-start shadow-lg transition-colors text-xs uppercase tracking-wider"
              >
                <ChevronRight className="w-4 h-4 mr-2" />
                APPLY FOR THE INDIGENOUS CANADA MICRO-GRANT PROGRAM
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-4xl mx-auto text-center scroll-animate">
          <h2 className="text-2xl sm:text-3xl lg:text-[44px] font-bold text-[#005c7a] mb-4 leading-tight">
            Every Child Deserves a Chance to Shine
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed font-semibold max-w-3xl mx-auto">
            At Children for Life, we believe every child, no matter their gender, religion, race, or background, deserves the opportunity to grow, learn, and reach their full potential.
          </p>
        </div>
      </section>

      {/* Global Impact Stats */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 scroll-animate">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#005c7a] mb-3">Our Global Impact</h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-base font-semibold leading-relaxed">
              We work in partnership with governments, non-profits, and local organizations all over the globe to end extreme poverty and inequality and empower previously excluded groups, building up human and financial capital and strengthening livelihoods to leave no one behind.
            </p>
            <h3 className="text-xl font-bold text-gray-800 mt-8 uppercase tracking-wider">Children for Life Impact 2025</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 scroll-animate">
            <div className="pt-4 md:pt-0">
              <div className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#f37021] mb-3">3.2M</div>
              <div className="text-[12px] text-gray-500 font-bold uppercase tracking-wider px-4">Lives Reached Worldwide since inception</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#f37021] mb-3">124K</div>
              <div className="text-[12px] text-gray-500 font-bold uppercase tracking-wider px-4">Direct Beneficiaries Reached</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#f37021] mb-3">35</div>
              <div className="text-[12px] text-gray-500 font-bold uppercase tracking-wider px-4">Countries</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#f37021] mb-3">15K+</div>
              <div className="text-[12px] text-gray-500 font-bold uppercase tracking-wider px-4">Volunteers</div>
            </div>
          </div>
        </div>
      </section>

      {/* What's New Section with card slider matching screenshot */}
      <section id="what-we-do" className="py-32 bg-[#eef8fc] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-animate">
          
          {/* Header Row */}
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-[#005c7a] tracking-tight">What's New</h2>
            
            <div className="flex items-center space-x-4">
              <span className="text-[14px] font-black text-gray-500">{activeStory + 1} of {stories.length}</span>
              <div className="flex space-x-3">
                <button 
                  onClick={handlePrevStory} 
                  disabled={activeStory === 0}
                  className={`w-12 h-12 rounded-full text-white flex items-center justify-center shadow-md transition-all duration-300 ${
                    activeStory === 0 ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-[#f37021] hover:bg-[#da621a]'
                  }`}
                >
                  <ChevronLeft size={22} className="stroke-[3]" />
                </button>
                <button 
                  onClick={handleNextStory} 
                  disabled={activeStory === stories.length - 1}
                  className={`w-12 h-12 rounded-full text-white flex items-center justify-center shadow-md transition-all duration-300 ${
                    activeStory === stories.length - 1 ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-[#f37021] hover:bg-[#da621a]'
                  }`}
                >
                  <ChevronRight size={22} className="stroke-[3]" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards Slider Track */}
          <div className="relative w-full overflow-hidden py-6 -my-6">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-8"
              style={{ transform: isMobile ? `translateX(-${activeStory * 88}%)` : `translateX(-${activeStory * 892}px)` }}
            >
              {stories.map((story, index) => (
                <div 
                  key={index}
                  className={`w-[85%] md:w-[860px] shrink-0 bg-white rounded-[32px] p-10 border border-gray-100 flex md:flex-row flex-col justify-between items-stretch gap-8 min-h-[420px] transition-all duration-500 ease-in-out ${
                    index === activeStory ? 'opacity-100 scale-100 shadow-md' : 'opacity-40 scale-[0.97]'
                  }`}
                >
                  {/* Left Side: Content */}
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="bg-[#e1f3f8] text-[#005a74] text-[12px] font-black px-4 py-2 rounded-md w-max uppercase tracking-wider mb-5">
                        {story.type}
                      </div>
                      <h3 className="text-3xl md:text-[32px] font-black text-gray-900 leading-tight mb-5 tracking-tight">
                        {story.title}
                      </h3>
                      <p className="text-gray-500 text-[15px] leading-relaxed mb-8 font-semibold">
                        {story.desc}
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        if (story.type === "Sally's Story") {
                          navigate('/stories/sally');
                        } else {
                          navigate('/donate');
                        }
                      }}
                      className="bg-[#008cb3] text-white px-9 py-3.5 rounded-full text-[13px] font-black hover:bg-[#005c7a] transition-all uppercase tracking-wider shadow-sm w-max"
                    >
                      LEARN MORE
                    </button>
                  </div>
                  
                  {/* Right Side: Image */}
                  <div 
                    className="w-full md:w-[46%] h-72 md:h-auto rounded-[24px] bg-cover bg-center shadow-inner min-h-[260px]"
                    style={{ backgroundImage: `url(${story.bg})` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Secondary Hero Image with text overlay matching second screenshot */}
      <section 
        id="regions"
        className="w-full h-[350px] sm:h-[450px] lg:h-[550px] bg-cover bg-center bg-fixed relative flex items-center"
        style={{ backgroundImage: `url(${sallyStory})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-animate">
          <div className="max-w-2xl text-white">
            <h2 className="text-2xl sm:text-3xl lg:text-[44px] font-black mb-4 leading-tight drop-shadow-sm tracking-tight">
              A Story of Hope
            </h2>
            <p className="text-gray-200 text-[16px] md:text-[17px] font-bold mb-8 leading-relaxed max-w-2xl">
              After losing her husband, Sally struggled to raise her three children in a home without electricity or safe sanitation. Children for Life assessed her family's needs and provided solar lighting and a proper toilet: restoring safety, dignity, and the opportunity for her children to study and thrive.
            </p>
            <button 
              onClick={() => navigate('/stories/sally')}
              className="bg-[#ffc72c] hover:bg-[#eebb22] text-black font-black px-8 py-3.5 rounded-full flex items-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md uppercase text-xs tracking-wider"
            >
              <span>READ SALLY'S STORY</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Protect Their Start. Power Their Future. CTA Banner */}
      <section className="py-12 bg-white px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#005c7a] to-[#082e3c] rounded-[36px] p-10 md:p-14 text-white text-center shadow-xl relative overflow-hidden border border-[#005c7a]/20 scroll-animate">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffc72c]/10 rounded-full blur-2xl"></div>
          <div className="relative z-10 space-y-6">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-black tracking-tight">Protect Their Start. Power Their Future.</h2>
            <p className="text-lg font-bold text-[#ffc72c]">From birth, to home, to school — CFL protects children at every stage.</p>
            <p className="text-gray-200 font-semibold text-xs leading-relaxed max-w-2xl mx-auto">
              Be the reason a child is safe, seen, and supported. Invest in a child's full journey — not just one moment.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => navigate('/donate')}
                className="bg-[#ffc72c] hover:bg-[#eebb22] text-gray-900 font-black py-3.5 px-10 rounded-full uppercase text-xs tracking-widest shadow-md transition-colors inline-block"
              >
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Delivered (Newsletter form matching screenshot layout) */}
      <section id="action" className="py-20 bg-[#e1f3f8]">
        <div className="max-w-4xl mx-auto px-4 scroll-animate">
          <div className="bg-white p-10 md:p-14 rounded-xl shadow-md border border-gray-100">
            
            <h3 className="text-2xl font-extrabold text-[#005c7a] mb-3 flex items-center">
              <Mail className="mr-3 text-[#005c7a] w-6 h-6" /> Impact Delivered
            </h3>
            <p className="text-gray-500 mb-10 font-bold text-sm">
              See how your support is helping — get monthly stories, impact updates, and educational news about our fundraising campaigns.
            </p>
            
            <form className="space-y-6" onSubmit={handleSubscribe}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">First Name (required)</label>
                  <input type="text" required value={formFirstName} onChange={(e) => setFormFirstName(e.target.value)} className="w-full border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#005c7a] bg-transparent text-gray-800 font-semibold" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Last Name (required)</label>
                  <input type="text" required value={formLastName} onChange={(e) => setFormLastName(e.target.value)} className="w-full border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#005c7a] bg-transparent text-gray-800 font-semibold" />
                </div>
              </div>
              <div className="pt-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email (required)</label>
                <input type="email" required value={formEmail} onChange={(e) => setFormEmail(e.target.value)} className="w-full border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#005c7a] bg-transparent text-gray-800 font-semibold" />
              </div>
              {formStatus === 'sent' && <p className="text-green-600 font-bold text-sm">Thank you! You're subscribed.</p>}
              {formStatus === 'error' && <p className="text-red-600 font-bold text-sm">Something went wrong. Please try again.</p>}
              <div className="pt-6">
                <button type="submit" disabled={formStatus === 'sending'} className="border-2 border-[#005c7a] text-[#005c7a] font-extrabold py-2.5 px-10 rounded hover:bg-[#005c7a] hover:text-white transition-colors text-xs tracking-wider uppercase disabled:opacity-50">
                  {formStatus === 'sending' ? 'SENDING...' : 'SUBMIT'}
                </button>
              </div>
            </form>

          </div>
        </div>
      </section>
    </div>
  );
}
