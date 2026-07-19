import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { 
  Menu, X, ChevronRight, ChevronLeft, 
  Leaf, Heart, ShieldCheck, Mail, Compass,
  BookOpen, Sparkles, Users, ShieldAlert, Award
} from 'lucide-react';

import heroStudents from './assets/hero_students.png';
import ugirlsGraduation from './assets/ugirls_graduation.png';
import sallyStory from './assets/sally_story.png';
import monthlyGiving from './assets/monthly_giving.png';
import cleanWater from './assets/clean_water.png';
import cleanEnergy from './assets/clean_energy.png';
import cusoEffectSoap from './assets/cuso_effect_soap.png';
import tanzaniaTLed from './assets/tanzania_t_led.png';
import aboutHero from './assets/about_hero.png';
import aboutBottom from './assets/about_bottom.png';
import aboutWomenHand from './assets/about_women_hand.png';
import aboutTeamPhoto from './assets/about_team_photo.png';
import aboutWorldMap from './assets/about_world_map.png';
import AfricaMap from './AfricaMap';
import WorldMap from './WorldMap';

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.52 3.545 12 3.545 12 3.545s-7.52 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.868.508 9.388.508 9.388.508s7.52 0 9.388-.508a3.002 3.002 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeStory, setActiveStory] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigate = (screen) => {
    setCurrentScreen(screen);
    setIsMobileMenuOpen(false);
    setActiveTabIdx(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const handlePrevStory = () => {
    if (activeStory > 0) {
      setActiveStory(activeStory - 1);
    }
  };

  const Navigation = () => {
    const whatWeDoDropdownRef = useRef(null);
    const regionsDropdownRef = useRef(null);
    const takeActionDropdownRef = useRef(null);

    const handleMouseEnter = (ref, displayType = 'flex') => {
      if (ref.current) {
        gsap.killTweensOf(ref.current);
        gsap.fromTo(ref.current,
          { opacity: 0, y: 15, display: displayType },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      }
    };

    const handleMouseLeave = (ref) => {
      if (ref.current) {
        gsap.killTweensOf(ref.current);
        gsap.to(ref.current, {
          opacity: 0,
          y: 15,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            if (ref.current) gsap.set(ref.current, { display: 'none' });
          }
        });
      }
    };

    return (
      <nav className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm h-32 lg:h-36 flex flex-col justify-end relative">
      
      {/* Desktop Utility Bar (Right 50% of screen, left-aligned text starts above Regions We Serve) */}
      <div className="absolute top-0 right-0 left-1/2 h-12 bg-[#e1f3f8] rounded-l-full hidden lg:flex items-center pl-8 pr-12 text-[13.5px] font-extrabold text-[#005a74] tracking-wide shadow-sm z-10">
        <div className="relative group/about py-1">
          <button className="hover:text-[#008cb3] transition-colors flex items-center cursor-pointer">
            About Us <span className="text-[11px] ml-1.5 text-[#005a74]">▼</span>
          </button>
          <div className="absolute left-0 mt-2 w-[240px] bg-white border border-[#005c7a] rounded-xl shadow-xl p-4 hidden group-hover/about:flex flex-col space-y-2.5 z-50 normal-case text-left text-[16.94px] text-[#005c7a] font-bold">
            {/* Hover Bridge to prevent menu close when mouse crosses the mt-2 gap */}
            <div className="absolute top-[-12px] left-0 right-0 h-3 bg-transparent"></div>
            <button onClick={() => navigate('about-who')} className="text-left hover:underline transition-all">Who We Are</button>
            <button onClick={() => navigate('what-volunteering')} className="text-left hover:underline transition-all">What We Do</button>
            <button onClick={() => navigate('about-competencies')} className="text-left hover:underline transition-all">Core Competencies</button>
            <button onClick={() => navigate('about-team')} className="text-left hover:underline transition-all">Meet our team</button>
            <button onClick={() => navigate('about-board')} className="text-left hover:underline transition-all">Our Board</button>
            <button onClick={() => navigate('about-leadership')} className="text-left hover:underline transition-all">Our Leadership</button>
            <button onClick={() => navigate('about-careers')} className="text-left hover:underline transition-all">Careers</button>
          </div>
        </div>
        <span className="text-gray-300 px-3.5">|</span>
        <button onClick={() => navigate('impact-stories')} className="hover:text-[#008cb3] transition-colors">Impact Stories</button>
        <span className="text-gray-300 px-3.5">|</span>
        <button onClick={() => navigate('news')} className="hover:text-[#008cb3] transition-colors">News</button>
        <span className="text-gray-300 px-3.5">|</span>
        <button onClick={() => navigate('publications')} className="hover:text-[#008cb3] transition-colors">Publications</button>
        <span className="text-gray-300 px-3.5">|</span>
        <button onClick={() => navigate('accountability')} className="hover:text-[#008cb3] transition-colors">Accountability</button>
        <span className="text-gray-300 px-3.5">|</span>
        <a href="#" className="hover:text-[#008cb3] transition-colors flex items-center">
          <span className="mr-1">🌐</span> English <span className="text-[11px] ml-1.5 text-[#005a74]">▼</span>
        </a>
        <span className="text-gray-300 px-3.5">|</span>
        <button className="hover:text-[#008cb3] transition-colors flex items-center">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>

      {/* Main Nav Bar Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-3 lg:pb-4">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo (left side) */}
          <div 
            className="flex items-center cursor-pointer group" 
            onClick={() => navigate('home')}
          >
            <div className="flex items-center space-x-2">
              <span className="text-4xl font-black text-[#005c7a] tracking-tight">Children</span>
              <span className="text-2xl font-light text-gray-500 mt-1.5">for Life</span>
            </div>
          </div>

          {/* Desktop Navigation Links & Action Buttons on the same row */}
          <div className="hidden lg:flex items-center space-x-10">
            <div className="flex space-x-8 text-[15.5px] font-black text-gray-800 tracking-wide uppercase">
              {/* What We Do Dropdown */}
              <div 
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter(whatWeDoDropdownRef, 'flex')}
                onMouseLeave={() => handleMouseLeave(whatWeDoDropdownRef)}
              >
                <a href="#programmes" className="hover:text-[#005c7a] transition-colors flex items-center cursor-pointer">
                  What We Do <span className="text-[11px] ml-1.5 text-gray-400">▼</span>
                </a>
                
                <div 
                  ref={whatWeDoDropdownRef}
                  style={{ display: 'none' }}
                  className="absolute left-0 mt-3 w-[300px] bg-white border-2 border-[#005c7a] rounded-2xl shadow-xl p-6 flex flex-col space-y-3.5 z-50 normal-case text-left text-[16.94px] text-[#005c7a] font-bold"
                >
                  {/* Hover Bridge to prevent menu close when mouse crosses the mt-3 gap */}
                  <div className="absolute top-[-16px] left-0 right-0 h-4 bg-transparent"></div>
                  <button onClick={() => navigate('become-volunteer')} className="text-left hover:underline transition-all">Volunteering</button>
                  <button onClick={() => navigate('what-gender')} className="text-left hover:underline transition-all">Gender Equality & Social Inclusion</button>
                  <button onClick={() => navigate('what-economic')} className="text-left hover:underline transition-all">Improving Economic Resilience</button>
                  <button onClick={() => navigate('what-climate')} className="text-left hover:underline transition-all">Advancing Climate Action</button>
                  <button onClick={() => navigate('what-strategic')} className="text-left hover:underline transition-all">Our Strategic Plan</button>
                </div>
              </div>

              {/* Regions We Serve Dropdown */}
              <div 
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter(regionsDropdownRef, 'flex')}
                onMouseLeave={() => handleMouseLeave(regionsDropdownRef)}
              >
                <a href="#regions" className="hover:text-[#005c7a] transition-colors flex items-center cursor-pointer">
                  Regions We Serve <span className="text-[11px] ml-1.5 text-gray-400">▼</span>
                </a>
                
                <div 
                  ref={regionsDropdownRef}
                  style={{ display: 'none' }}
                  className="absolute left-0 mt-3 w-[280px] bg-white border-2 border-[#005c7a] rounded-2xl shadow-xl p-6 flex flex-col space-y-4 z-50 normal-case text-left"
                >
                  {/* Hover Bridge to prevent menu close when mouse crosses the mt-3 gap */}
                  <div className="absolute top-[-16px] left-0 right-0 h-4 bg-transparent"></div>
                  {/* Top Block */}
                  <div className="flex flex-col space-y-2.5 text-[16.94px] text-[#005c7a] font-bold border-b border-[#005c7a]/25 pb-3">
                    <button onClick={() => navigate('regions-glance')} className="text-left hover:underline transition-all">Our Work At A Glance</button>
                    <button onClick={() => navigate('regions-where')} className="text-left hover:underline transition-all">Where We Work</button>
                  </div>
                  
                  {/* Africa Section */}
                  <div className="text-[16.94px] text-[#005c7a] font-bold">
                    <div className="text-[16.94px] font-black text-gray-400 uppercase tracking-widest mb-2">Africa</div>
                    <div className="flex flex-col space-y-2.5">
                      <button onClick={() => navigate('regions-benin')} className="text-left hover:underline transition-all">Benin</button>
                      <button onClick={() => navigate('regions-cameroon')} className="text-left hover:underline transition-all">Cameroon</button>
                      <button onClick={() => navigate('regions-congo')} className="text-left hover:underline transition-all">DR Congo</button>
                      <button onClick={() => navigate('regions-ethiopia')} className="text-left hover:underline transition-all">Ethiopia</button>
                      <button onClick={() => navigate('regions-nigeria')} className="text-left hover:underline transition-all">Nigeria</button>
                      <button onClick={() => navigate('regions-tanzania')} className="text-left hover:underline transition-all">Tanzania</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Take Action Dropdown */}
              <div 
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter(takeActionDropdownRef, 'grid')}
                onMouseLeave={() => handleMouseLeave(takeActionDropdownRef)}
              >
                <a href="#difference" className="hover:text-[#005c7a] transition-colors flex items-center cursor-pointer">
                  Take Action <span className="text-[11px] ml-1.5 text-gray-400">▼</span>
                </a>
                
                <div 
                  ref={takeActionDropdownRef}
                  style={{ display: 'none' }}
                  className="absolute left-0 mt-3 w-[460px] bg-white border-2 border-[#005c7a] rounded-2xl shadow-xl p-7 grid grid-cols-2 z-50 normal-case text-left"
                >
                  {/* Hover Bridge to prevent menu close when mouse crosses the mt-3 gap */}
                  <div className="absolute top-[-16px] left-0 right-0 h-4 bg-transparent"></div>
                  {/* Column 1: Volunteer */}
                  <div className="border-r border-[#005c7a]/30 pr-6">
                    <div className="text-[16.94px] font-black text-[#005c7a] uppercase tracking-wider mb-4">Volunteer</div>
                    <div className="flex flex-col space-y-3.5 text-[16.94px] text-[#005c7a] font-bold">
                      <button onClick={() => navigate('see-placements')} className="text-left hover:underline transition-all">See Current Placements</button>
                      <button onClick={() => navigate('become-volunteer')} className="text-left hover:underline transition-all">Become A Volunteer</button>
                      <button onClick={() => navigate('volunteer-faq')} className="text-left hover:underline transition-all">Volunteer FAQ</button>
                      <button onClick={() => navigate('alumni')} className="text-left hover:underline transition-all">Alumni</button>
                    </div>
                  </div>
                  
                  {/* Column 2: Donate & Partner */}
                  <div className="pl-6">
                    <div className="text-[16.94px] font-black text-[#005c7a] uppercase tracking-wider mb-4">Donate</div>
                    <div className="flex flex-col space-y-3.5 text-[16.94px] text-[#005c7a] font-bold">
                      <button onClick={() => navigate('donate')} className="text-left hover:underline transition-all">Make A One-Time Gift</button>
                      <button onClick={() => navigate('donate-monthly')} className="text-left hover:underline transition-all">Donate Monthly</button>
                      <button onClick={() => navigate('donate-stocks')} className="text-left hover:underline transition-all">Donate Stocks Or Securities</button>
                      <button onClick={() => navigate('fundraise')} className="text-left hover:underline transition-all">Fundraise With Us</button>
                      <button onClick={() => navigate('leave-legacy')} className="text-left hover:underline transition-all">Leave A Legacy</button>
                      <button onClick={() => navigate('tribute-gifts')} className="text-left hover:underline transition-all">Tribute Gifts</button>
                      <button onClick={() => navigate('become-partner')} className="text-left hover:underline transition-all">Become A Partner</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pill Action Buttons (VOLUNTEER & DONATE) */}
            <div className="flex items-center space-x-4 text-[14px] font-black tracking-wider uppercase">
              {/* Volunteer Button */}
              <button className="bg-[#9dc84a] hover:bg-[#8bb43d] text-gray-900 px-8 py-3.5 rounded-full flex items-center space-x-2 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-0.5">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3l.7.8M22 12.5a10 10 0 0 1-18.8 4.2l-.7-.8" />
                </svg>
                <span>Volunteer</span>
              </button>
              
              {/* Donate Button */}
              <button 
                onClick={() => navigate('donate')}
                className="bg-[#ffc72c] hover:bg-[#eebb22] text-gray-900 px-8 py-3.5 rounded-full flex items-center space-x-2 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <Heart className="w-5 h-5 mr-0.5 fill-gray-900 stroke-gray-900" />
                <span>Donate</span>
              </button>
            </div>

          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 p-2">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t px-4 pt-2 pb-6 space-y-2 shadow-lg absolute w-full left-0 z-50 max-h-[80vh] overflow-y-auto">
          {/* Mobile Nested What We Do Links */}
          <div className="pt-2 px-3">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">What We Do</span>
            <div className="flex flex-col space-y-2 text-base text-gray-600 font-semibold pl-3 mb-4">
              <button onClick={() => { navigate('become-volunteer'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Volunteering</button>
              <button onClick={() => { navigate('what-gender'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Gender Equality & Social Inclusion</button>
              <button onClick={() => { navigate('what-economic'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Improving Economic Resilience</button>
              <button onClick={() => { navigate('what-climate'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Advancing Climate Action</button>
              <button onClick={() => { navigate('what-strategic'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Our Strategic Plan</button>
            </div>
          </div>
          {/* Mobile Nested About Us Links */}
          <div className="pt-2 px-3">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">About Us</span>
            <div className="flex flex-col space-y-2 text-sm text-gray-600 font-semibold pl-3 mb-4">
              <button onClick={() => { navigate('about-who'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Who We Are</button>
              <button onClick={() => { navigate('what-volunteering'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">What We Do</button>
              <button onClick={() => { navigate('about-competencies'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Core Competencies</button>
              <button onClick={() => { navigate('about-team'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Meet our team</button>
              <button onClick={() => { navigate('about-board'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Our Board</button>
              <button onClick={() => { navigate('about-leadership'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Our Leadership</button>
              <button onClick={() => { navigate('about-careers'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Careers</button>
            </div>
          </div>
          {/* Mobile Nested Regions We Serve Links */}
          <div className="pt-2 px-3">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Regions We Serve</span>
            <div className="flex flex-col space-y-2 text-sm text-gray-600 font-semibold pl-3 mb-4">
              <button onClick={() => { navigate('regions-glance'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Our Work At A Glance</button>
              <button onClick={() => { navigate('regions-where'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Where We Work</button>
              <button onClick={() => { navigate('regions-tanzania'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Africa (Tanzania, Benin, etc.)</button>
            </div>
          </div>
          
          {/* Mobile Utility Links */}
          <div className="pt-2 px-3 border-t border-gray-100 flex flex-col space-y-2 text-sm text-gray-600 font-semibold mb-4">
            <button onClick={() => { navigate('impact-stories'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Impact Stories</button>
            <button onClick={() => { navigate('news'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">News</button>
            <button onClick={() => { navigate('publications'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Publications</button>
            <button onClick={() => { navigate('accountability'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Accountability</button>
          </div>
          
          {/* Mobile Nested Take Action Links */}
          <div className="border-t border-gray-100 pt-2 px-3">
            <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Take Action</span>
            
            <div className="space-y-4 pl-3">
              <div>
                <span className="block text-xs font-black text-[#8bb43d] uppercase tracking-wider mb-1.5">Volunteer</span>
                <div className="flex flex-col space-y-2 text-sm text-gray-600 font-semibold pl-2">
                  <button onClick={() => { navigate('see-placements'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">See Current Placements</button>
                  <button onClick={() => { navigate('become-volunteer'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Become A Volunteer</button>
                  <button onClick={() => { navigate('volunteer-faq'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Volunteer FAQ</button>
                  <button onClick={() => { navigate('alumni'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Alumni</button>
                </div>
              </div>
              
              <div>
                <span className="block text-xs font-black text-[#f37021] uppercase tracking-wider mb-1.5">Donate</span>
                <div className="flex flex-col space-y-2 text-sm text-gray-600 font-semibold pl-2">
                  <button onClick={() => { navigate('donate'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Make A One-Time Gift</button>
                  <button onClick={() => { navigate('donate-monthly'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Donate Monthly</button>
                  <button onClick={() => { navigate('donate-stocks'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Donate Stocks Or Securities</button>
                  <button onClick={() => { navigate('fundraise'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Fundraise With Us</button>
                  <button onClick={() => { navigate('leave-legacy'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Leave A Legacy</button>
                  <button onClick={() => { navigate('tribute-gifts'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Tribute Gifts</button>
                </div>
              </div>

              <div>
                <span className="block text-xs font-black text-[#005c7a] uppercase tracking-wider mb-1.5">Partnership</span>
                <div className="flex flex-col space-y-2 text-sm text-gray-600 font-semibold pl-2">
                  <button onClick={() => { navigate('become-partner'); setIsMobileMenuOpen(false); }} className="text-left hover:text-[#005c7a]">Become A Partner</button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-150 flex flex-col space-y-3">
            {user ? (
              <button onClick={() => setUser(null)} className="w-full text-left px-3 py-2 text-base font-medium text-[#005c7a]">Log out</button>
            ) : (
              <button onClick={() => navigate('login')} className="w-full text-left px-3 py-2 text-base font-medium text-[#005c7a]">Log in</button>
            )}
            <button className="w-full bg-[#9dc84a] text-gray-900 py-2.5 rounded-full font-bold">Become a Volunteer</button>
            <button onClick={() => navigate('donate')} className="w-full bg-[#ffc72c] text-gray-900 py-2.5 rounded-full font-bold">Donate</button>
          </div>
        </div>
      )}
    </nav>
  );
};

  const HomeScreen = () => {
    const heroRef = useRef(null);

    useEffect(() => {
      let ctx = gsap.context(() => {
        gsap.from(".hero-animate", {
          opacity: 0,
          y: 28,
          stagger: 0.12,
          duration: 0.75,
          ease: "power2.out"
        });

        gsap.to(".float-item", {
          y: -6,
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "power1.inOut"
        });

        gsap.utils.toArray('.scroll-animate').forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none none"
            },
            opacity: 0,
            y: 35,
            duration: 0.8,
            ease: "power2.out"
          });
        });
      }, heroRef);
      return () => ctx.revert();
    }, []);

    return (
      <div ref={heroRef} className="flex flex-col min-h-screen">
        
        {/* Primary Hero Section */}
        <section className="relative w-full h-[600px] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
            style={{ backgroundImage: `url(${heroStudents})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight drop-shadow-md tracking-tight hero-animate">
                so every child can learn, <br /> thrive, and shape a <br /> stronger future
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
                onClick={() => navigate('donate')}
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
          <h2 className="text-4xl md:text-[44px] font-bold text-[#005c7a] mb-4 leading-tight">
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
            <h2 className="text-[40px] font-bold text-[#005c7a] mb-3">Our Global Impact</h2>
            <p className="text-gray-500 max-w-3xl mx-auto text-base font-semibold leading-relaxed">
              We work in partnership with governments, non-profits, and local organizations all over the globe to end extreme poverty and inequality and empower previously excluded groups, building up human and financial capital and strengthening livelihoods to leave no one behind.
            </p>
            <h3 className="text-xl font-bold text-gray-800 mt-8 uppercase tracking-wider">Children for Life Impact 2025</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 scroll-animate">
            <div className="pt-4 md:pt-0">
              <div className="text-7xl font-extrabold text-[#f37021] mb-3">3.2M</div>
              <div className="text-[12px] text-gray-500 font-bold uppercase tracking-wider px-4">Lives Reached Worldwide since inception</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-7xl font-extrabold text-[#f37021] mb-3">124K</div>
              <div className="text-[12px] text-gray-500 font-bold uppercase tracking-wider px-4">Direct Beneficiaries Reached</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-7xl font-extrabold text-[#f37021] mb-3">35</div>
              <div className="text-[12px] text-gray-500 font-bold uppercase tracking-wider px-4">Countries</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-7xl font-extrabold text-[#f37021] mb-3">15K+</div>
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
            <h2 className="text-5xl font-black text-[#005c7a] tracking-tight">What's New</h2>
            
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
                          navigate('sally-story');
                        } else {
                          navigate('donate');
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
        className="w-full h-[550px] bg-cover bg-center bg-fixed relative flex items-center"
        style={{ backgroundImage: `url(${sallyStory})` }}
      >
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-0"></div>
        
        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-animate">
          <div className="max-w-2xl text-white">
            <h2 className="text-4xl md:text-[44px] font-black mb-4 leading-tight drop-shadow-sm tracking-tight">
              A Story of Hope
            </h2>
            <p className="text-gray-200 text-[16px] md:text-[17px] font-bold mb-8 leading-relaxed max-w-2xl">
              After losing her husband, Sally struggled to raise her three children in a home without electricity or safe sanitation. Children for Life assessed her family’s needs and provided solar lighting and a proper toilet: restoring safety, dignity, and the opportunity for her children to study and thrive.
            </p>
            <button 
              onClick={() => navigate('sally-story')}
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
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Protect Their Start. Power Their Future.</h2>
            <p className="text-lg font-bold text-[#ffc72c]">From birth, to home, to school — CFL protects children at every stage.</p>
            <p className="text-gray-200 font-semibold text-xs leading-relaxed max-w-2xl mx-auto">
              Be the reason a child is safe, seen, and supported. Invest in a child’s full journey — not just one moment.
            </p>
            <div className="pt-4">
              <button 
                onClick={() => navigate('donate')}
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
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">First Name (required)</label>
                  <input type="text" required className="w-full border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#005c7a] bg-transparent text-gray-800 font-semibold" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Last Name (required)</label>
                  <input type="text" required className="w-full border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#005c7a] bg-transparent text-gray-800 font-semibold" />
                </div>
              </div>
              <div className="pt-2">
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email (required)</label>
                <input type="email" required className="w-full border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#005c7a] bg-transparent text-gray-800 font-semibold" />
              </div>
              <div className="pt-6">
                <button className="border-2 border-[#005c7a] text-[#005c7a] font-extrabold py-2.5 px-10 rounded hover:bg-[#005c7a] hover:text-white transition-colors text-xs tracking-wider uppercase">
                  SUBMIT
                </button>
              </div>
            </form>

          </div>
        </div>
      </section>
      </div>
    );
  };

  const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (e) => {
      e.preventDefault();
      if(email && password) {
        setUser({ name: email.split('@')[0], email });
        navigate('home');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="flex justify-center text-[#005c7a] mb-4">
            <Heart size={56} className="fill-[#005c7a]" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or <a href="#" className="font-semibold text-[#f37021] hover:underline">create a new donor profile</a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-10 px-8 shadow-sm rounded-xl border border-gray-150">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Email address</label>
                <div className="mt-1">
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#005c7a] focus:border-[#005c7a] sm:text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                <div className="mt-1">
                  <input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#005c7a] focus:border-[#005c7a] sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-[#005c7a] focus:ring-[#005c7a] border-gray-300 rounded" />
                  <label className="ml-2 block text-sm text-gray-900 font-medium">Remember me</label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-[#005c7a] hover:underline">Forgot your password?</a>
                </div>
              </div>

              <div>
                <button type="submit" className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#005c7a] hover:bg-[#004a63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005c7a] transition-colors uppercase tracking-wider">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const DonateScreen = () => {
    const [selectedTier, setSelectedTier] = useState('core');
    const [customAmount, setCustomAmount] = useState('');
    const [frequency, setFrequency] = useState('monthly');
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const tiers = [
      {
        id: 'starter',
        name: 'Starter Support',
        tzs: 'TZS 250,000',
        usd: 'US$100 approx.',
        value: 250000,
        focus: 'Hygiene & basic learning needs',
        desc: 'Hygiene supplies (soap, detergents, sanitary pads), safe water refills/filters (where needed), and basic learning materials (exercise books, pens).'
      },
      {
        id: 'core',
        name: 'Core Care',
        tzs: 'TZS 500,000',
        usd: 'US$200 approx.',
        value: 500000,
        focus: 'Food top-up & hygiene & minor fixes',
        desc: 'Food top-up (staples/proteins), hygiene & cleaning supplies, and minor facility maintenance (locks, lighting, small repairs).'
      },
      {
        id: 'foundation',
        name: 'Strong Foundation',
        tzs: 'TZS 1,000,000',
        usd: 'US$400 approx.',
        value: 1000000,
        focus: 'Integrated child wellbeing support',
        desc: 'Food & hygiene, basic health support (clinic visits/essential items where appropriate), and education support (uniforms, supplies, transport/fees where applicable).'
      },
      {
        id: 'whole',
        name: 'Whole Home Sponsor',
        tzs: 'TZS 2,500,000',
        usd: 'US$600 approx.',
        value: 2500000,
        focus: 'Full, tailored home plan',
        desc: 'A tailored package based on a joint plan across nutrition, health, education, protection & dignity, and basic improvements (water access, sleeping materials, safe spaces).'
      }
    ];

    const currentTierObj = tiers.find(t => t.id === selectedTier);
    const displayAmountText = customAmount 
      ? `TZS ${Number(customAmount).toLocaleString()}` 
      : (currentTierObj ? `${currentTierObj.tzs} (${currentTierObj.usd})` : 'TZS 0');

    const handleDonation = (e) => {
      e.preventDefault();
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setSuccess(true);
      }, 2000);
    };

    if (success) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 animate-fadeIn">
          <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-lg text-center border border-gray-100">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
              <ShieldCheck className="text-green-600 w-10 h-10" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed font-bold">
              Your {frequency} sponsorship of <span className="text-green-600">{displayAmountText}</span> has been processed successfully. A tax-deductible receipt has been sent to your email.
            </p>
            <button 
              onClick={() => navigate('home')}
              className="bg-[#005c7a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#004a63] transition-colors shadow-sm text-xs uppercase tracking-widest"
            >
              Return to Home
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header Description */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm space-y-6">
            <div className="inline-flex items-center space-x-2 text-[#f37021] text-[11px] font-black tracking-widest uppercase bg-[#f37021]/15 px-3 py-1.5 rounded-full">
              <Heart className="w-3.5 h-3.5 fill-[#f37021]" />
              <span>SUPPORT A HOME</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              Listen First, Act Next
            </h1>
            <p className="text-gray-600 font-bold text-[14.5px] leading-relaxed max-w-4xl">
              “Listening First, Acting Next” is CFL’s donation programme that supports children’s homes (orphanages and safe shelters) with what they need most based on their own priorities. We work with each home to agree on a practical support plan and then fund (or procure) essentials that keep children safe, healthy, learning, and thriving.
            </p>
            <p className="text-gray-500 font-semibold text-xs leading-relaxed max-w-3xl">
              You can support a home through one-off giving or monthly sponsorship. Monthly giving creates stability and allows homes to plan; one-off gifts help respond to urgent gaps (food stock-outs, repairs, back-to-school needs). Final allocations depend on each home's priorities (nutrition, health, education, protection).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Tiers List (Left 2 Columns) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-lg font-black text-gray-900">Choose Your Impact Path</h3>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Select one tier below</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tiers.map(tier => (
                  <div
                    key={tier.id}
                    onClick={() => {
                      setSelectedTier(tier.id);
                      setCustomAmount('');
                    }}
                    className={`bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-[210px] ${
                      selectedTier === tier.id && !customAmount
                        ? 'border-2 border-[#f37021] ring-4 ring-[#f37021]/10 bg-orange-50/5'
                        : 'border-gray-200 hover:border-[#005c7a]'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-black text-gray-900 text-sm">{tier.name}</h4>
                        {selectedTier === tier.id && !customAmount && (
                          <span className="w-5 h-5 rounded-full bg-[#f37021] flex items-center justify-center text-white text-[10px]">✓</span>
                        )}
                      </div>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="text-[#005c7a] font-black text-base">{tier.tzs}</span>
                        <span className="text-gray-400 font-bold text-[10.5px]">({tier.usd})</span>
                      </div>
                      <p className="text-[#f37021] font-extrabold text-[11px] uppercase tracking-wider">{tier.focus}</p>
                    </div>
                    <p className="text-gray-500 font-medium text-[11px] leading-relaxed border-t border-gray-100 pt-3 mt-3">
                      {tier.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* What your support funds description */}
              <div className="bg-[#f0f9fc]/85 border border-[#005c7a]/15 rounded-3xl p-6 space-y-3.5">
                <h4 className="text-[12.5px] uppercase font-black text-[#005c7a] tracking-wider">What your support funds:</h4>
                <p className="text-gray-650 font-semibold text-xs leading-relaxed">
                  Final allocations depend on each home’s priorities. Donations typically support: nutrition, health & wellbeing, education, protection & dignity (including menstrual health), and home readiness (small repairs, lighting, locks, water access). Costs vary by home size and location. CFL confirms needs through a short assessment and agrees on a budget with the home’s leadership before support is delivered.
                </p>
              </div>
            </div>

            {/* Payment & Sponsorship Details (Right Column) */}
            <div className="space-y-6">
              
              {/* Sponsorship Form */}
              <form onSubmit={handleDonation} className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-black text-gray-900 mb-1">Donation Details</h3>
                  <p className="text-gray-400 font-semibold text-[11px]">Secure Checkout powered by Stripe</p>
                </div>

                {/* Frequency selector */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Sponsorship Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        frequency === 'monthly'
                          ? 'bg-[#005c7a] text-white shadow-sm'
                          : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('one-off')}
                      className={`py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        frequency === 'one-off'
                          ? 'bg-[#005c7a] text-white shadow-sm'
                          : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      One-off
                    </button>
                  </div>
                </div>

                {/* Selected tier / custom amount display */}
                <div className="space-y-3.5 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-gray-400">Total Gift:</span>
                    <span className="text-[#005c7a] font-black">{displayAmountText}</span>
                  </div>
                  
                  {/* Custom Amount input */}
                  <div>
                    <label className="block text-[9.5px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Or enter custom TZS amount</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-gray-400 font-bold text-xs">TZS</span>
                      <input 
                        type="number" 
                        placeholder="e.g. 150000"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl pl-11 pr-2 py-2 text-xs font-bold focus:outline-none focus:border-[#005c7a]"
                      />
                    </div>
                  </div>
                </div>

                {/* Card Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Name on Card</label>
                    <input required type="text" placeholder="e.g. Jane Doe" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#005c7a]" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Card Number</label>
                    <input required type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#005c7a]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">MM/YY</label>
                      <input required type="text" placeholder="12/28" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#005c7a]" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">CVC</label>
                      <input required type="text" placeholder="123" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-[#005c7a]" />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#f37021] text-white font-extrabold text-sm py-4 rounded-xl hover:bg-[#da621a] transition-colors shadow-sm flex items-center justify-center disabled:opacity-70 uppercase tracking-wider"
                >
                  {isProcessing ? 'Processing Transaction...' : `Confirm Gift of ${displayAmountText}`}
                </button>
              </form>

              {/* Transparency & updates widget */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="text-[12.5px] uppercase font-black text-[#005c7a] tracking-wider border-b border-gray-100 pb-2">Transparency & Updates</h4>
                <p className="text-gray-500 font-medium text-[11px] leading-relaxed">
                  Every sponsor receives complete transparency regarding their donation's impact:
                </p>
                <ul className="space-y-2 text-[11px] font-bold text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#f37021] mr-1.5">•</span>
                    <span><strong>Support Summary:</strong> Details what was paid for, when, and why.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f37021] mr-1.5">•</span>
                    <span><strong>Consent-Based Photos:</strong> Where safeguarding is fully respected.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#f37021] mr-1.5">•</span>
                    <span><strong>Quarterly Impact Updates:</strong> Review progress against the home’s plan.</span>
                  </li>
                </ul>
              </div>

              {/* Other ways you can support widget */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
                <h4 className="text-[12.5px] uppercase font-black text-[#005c7a] tracking-wider border-b border-gray-100 pb-2">Other Ways You Can Support</h4>
                <div className="space-y-3.5 text-xs font-semibold text-gray-600">
                  <div className="flex items-start space-x-2">
                    <span className="text-[#f37021] mr-1 mt-0.5">•</span>
                    <div>
                      <h5 className="font-extrabold text-gray-900 mb-0.5">Partner With Us</h5>
                      <p className="text-gray-500 font-medium leading-relaxed">Collaborate with CFL to deliver specialized community programs or build local alliances.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-[#f37021] mr-1 mt-0.5">•</span>
                    <div>
                      <h5 className="font-extrabold text-gray-900 mb-0.5">Be a Community Champion</h5>
                      <p className="text-gray-500 font-medium leading-relaxed">Host a local fundraiser, volunteer, or advocate in your region to raise support.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    );
  };

  const Footer = () => (
    <footer className="bg-[#007b9e] text-white pt-24 pb-12 border-t-[12px] border-[#005c7a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          
          <div>
            <h4 className="font-extrabold mb-6 uppercase tracking-wider text-[13.5px] text-[#e0f2fe]">Take Action</h4>
            <ul className="space-y-4 text-[14.5px] font-bold text-blue-50/90">
              <li><button onClick={() => navigate('become-volunteer')} className="hover:underline hover:text-white transition-all text-left">Become a Volunteer</button></li>
              <li><button onClick={() => navigate('donate')} className="hover:underline hover:text-white transition-all text-left">Donate</button></li>
              <li><button onClick={() => navigate('about-careers')} className="hover:underline hover:text-white transition-all text-left">Careers at Children for Life</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold mb-6 uppercase tracking-wider text-[13.5px] text-[#e0f2fe]">Stay Informed</h4>
            <ul className="space-y-4 text-[14.5px] font-bold text-blue-50/90">
              <li><button onClick={() => navigate('what-strategic')} className="hover:underline hover:text-white transition-all text-left">Strategic Plan 2026</button></li>
              <li><button onClick={() => navigate('impact-stories')} className="hover:underline hover:text-white transition-all text-left">Stories</button></li>
              <li><button onClick={() => navigate('news')} className="hover:underline hover:text-white transition-all text-left">News</button></li>
              <li><button onClick={() => navigate('publications')} className="hover:underline hover:text-white transition-all text-left">Publications</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold mb-6 uppercase tracking-wider text-[13.5px] text-[#e0f2fe]">Connect</h4>
            <ul className="space-y-4 text-[14.5px] font-bold text-blue-50/90 mb-8">
              <li><a href="mailto:info@Childrenforlife.com" className="hover:underline hover:text-white transition-all">Contact Us</a></li>
              <li><button onClick={() => navigate('about-leadership')} className="hover:underline hover:text-white transition-all text-left">Meet our leadership</button></li>
              <li><a href="#" className="hover:underline hover:text-white transition-all">Media Room</a></li>
            </ul>
            <div className="text-[13px] text-blue-100/80 space-y-2 font-semibold">
              <p>9 Dagoni Street, Mbweni JKT</p>
              <p>Kinondoni District,</p>
              <p>Dar es Salaam, Tanzania</p>
              <p>Call us: +255-763-205-703</p>
              <p>Or: +255-752-699-815</p>
              <p>Email: info@Childrenforlife.com</p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end space-y-8">
            <div className="flex space-x-5 text-white/95">
              <a href="#" className="hover:text-[#ffc72c] transition-colors"><FacebookIcon className="w-6 h-6 hover:scale-110 transition-transform duration-200" /></a>
              <a href="#" className="hover:text-[#ffc72c] transition-colors"><TwitterIcon className="w-6 h-6 hover:scale-110 transition-transform duration-200" /></a>
              <a href="#" className="hover:text-[#ffc72c] transition-colors"><LinkedinIcon className="w-6 h-6 hover:scale-110 transition-transform duration-200" /></a>
              <a href="#" className="hover:text-[#ffc72c] transition-colors"><YoutubeIcon className="w-6 h-6 hover:scale-110 transition-transform duration-200" /></a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('donate')}
                className="bg-[#ffc72c] text-black font-extrabold px-8 py-3.5 rounded-full flex items-center hover:bg-[#eebb22] text-[13px] uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 shadow-md"
              >
                <Heart className="w-4.5 h-4.5 mr-2.5 fill-black stroke-black" /> DONATE NOW
              </button>
              <div className="w-11 h-11 flex items-center justify-center bg-white/20 rounded-full border border-white/30 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
                <Leaf className="w-5.5 h-5.5 text-white" />
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-2">
               <div className="px-4 py-2 bg-white/10 rounded-lg border border-white/20 flex items-center space-x-2 text.5-[11px] uppercase font-black tracking-widest text-blue-100 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-white" />
                  <span>Accredited Partner</span>
               </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright section */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-[13px] text-blue-100/70">
          <div className="flex items-center space-x-3.5 mb-4 md:mb-0">
             <Leaf className="w-7 h-7 text-white/95" />
             <div>
                <p className="font-bold text-white">Charitable registration:</p>
                <p className="font-medium">11883 4184 RR0001</p>
             </div>
          </div>
          <div className="text-center md:text-right space-y-2 font-bold text-blue-100/80">
            <p>© 2015-2026 by Children for Life. All rights reserved.</p>
            <p className="font-semibold text-blue-100/60">
              <a href="#" className="hover:underline hover:text-white transition-colors">Privacy policy</a> | <a href="#" className="hover:underline hover:text-white transition-colors">Legal notes</a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );

  const ActionDetailScreen = () => {
    // Switch content based on currentScreen state
    let title = "";
    let subtitle = "";
    let bgImage = heroStudents;
    let content = null;

    if (currentScreen === 'see-placements') {
      title = "Current Placements";
      subtitle = "Apply your skills where they are needed most";
      bgImage = heroStudents;
      content = (
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Children for Life places skilled professionals in communities around the world to support local health, education, and livelihood projects. Browse our current open placements below and begin your journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "Health Education Advisor", loc: "Dar es Salaam, Tanzania", dur: "12 Months", desc: "Work with local clinics to design and deliver youth hygiene and sanitation workshops, reinforcing WASH training." },
              { title: "Primary School Teacher Trainer", loc: "Addis Ababa, Ethiopia", dur: "24 Months", desc: "Collaborate with primary schools to introduce modern teaching methodologies, parent engagement strategies, and girls' mentorship." },
              { title: "Solar Systems Technical Advisor", loc: "Mbeya, Tanzania", dur: "18 Months", desc: "Assist local technical teams in deploying solar micro-grids for remote health clinics, supporting vaccine refrigeration systems." },
              { title: "Community Farming Coordinator", loc: "Morogoro, Tanzania", dur: "12 Months", desc: "Partner with women's agricultural collectives to introduce sustainable irrigation systems, crop rotation, and market access." }
            ].map((p, i) => (
              <div key={i} className="bg-gray-50 border border-gray-150 rounded-2xl p-8 hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black text-gray-900">{p.title}</h3>
                    <span className="bg-[#e1f3f8] text-[#005a74] text-[11px] font-black px-2.5 py-1 rounded uppercase tracking-wider">{p.dur}</span>
                  </div>
                  <p className="text-[#005c7a] font-bold text-sm mb-4">{p.loc}</p>
                  <p className="text-gray-500 font-semibold text-sm leading-relaxed mb-6">{p.desc}</p>
                </div>
                <button onClick={() => navigate('become-volunteer')} className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider w-max">Apply for Placement</button>
              </div>
            ))}
          </div>
        </div>
      );
    } 
    else if (currentScreen === 'become-volunteer') {
      title = "Become A Volunteer";
      subtitle = "Join a global network of skills-sharing and action";
      bgImage = cleanWater;
      content = (
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10 text-center">
            Ready to make a difference? Fill out the inquiry form below, and our recruitment team will get in touch with you about matching placements.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Application Submitted Successfully!"); navigate('home'); }} className="space-y-6 bg-gray-50 border border-gray-150 p-8 rounded-3xl shadow-sm">
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
              <input required type="email" className="w-full border border-gray-305 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Area of Expertise</label>
              <select className="w-full border border-gray-305 bg-white rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]">
                <option>Education & Literacy</option>
                <option>Healthcare & Sanitation (WASH)</option>
                <option>Renewable Energy & Technology</option>
                <option>Sustainable Agriculture</option>
                <option>Other / Administration</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Briefly describe why you want to volunteer</label>
              <textarea rows="4" className="w-full border border-gray-305 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]"></textarea>
            </div>
            <button type="submit" className="w-full bg-[#f37021] text-white font-extrabold py-4 rounded-xl hover:bg-[#da621a] uppercase text-sm tracking-wider shadow-sm transition-colors">Submit Application</button>
          </form>
        </div>
      );
    }
    else if (currentScreen === 'volunteer-faq') {
      title = "Volunteer FAQ";
      subtitle = "Frequently asked questions about placements";
      bgImage = cleanEnergy;
      content = (
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            { q: "What qualifications do I need to volunteer?", a: "Most of our placements require a university degree or equivalent professional trade certification, alongside 2+ years of relevant working experience in your field of expertise." },
            { q: "Are placements paid?", a: "Our volunteer placements are fully funded. Children for Life covers round-trip airfare, housing, medical insurance, visas, and provides a monthly living stipend adapted to local costs." },
            { q: "How long are the placements?", a: "Placements range from short-term (3 to 6 months) to long-term (12 to 24 months). Long-term placements are highly recommended for sustainable skills-sharing impact." },
            { q: "Is it safe to volunteer abroad?", a: "We prioritize safety. We perform comprehensive security audits in all communities we serve, provide pre-departure briefing, and have dedicated local support staff in every country." }
          ].map((faq, i) => (
            <div key={i} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-black text-gray-900 mb-3 flex items-center">
                <span className="text-[#005c7a] mr-2">Q:</span> {faq.q}
              </h3>
              <p className="text-gray-500 font-semibold text-[14.5px] leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      );
    }
    else if (currentScreen === 'alumni') {
      title = "Volunteer Alumni";
      subtitle = "Voices of experience from the field";
      bgImage = ugirlsGraduation;
      content = (
        <div className="space-y-16">
          <p className="text-gray-600 text-lg font-medium leading-relaxed text-center max-w-2xl mx-auto">
            Our volunteers remain part of the Children for Life family long after returning home. Read how their placements shaped their lives and careers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: "Sarah Jenkins", role: "WASH Educator (Tanzania, 2023)", text: "Teaching clean water hygiene in local schools was one of the most challenging and rewarding years of my life. It gave me a new perspective on global health and led to my career in NGO administration.", img: ugirlsGraduation },
              { name: "David Chen", role: "Solar Microgrid Engineer (Ethiopia, 2024)", text: "Installing solar grids for clinics meant electricity for vaccine fridges and maternal care. Seeing the immediate change when the lights came on is a memory I will cherish forever.", img: cleanEnergy }
            ].map((al, i) => (
              <div key={i} className="bg-gray-50 border border-gray-150 rounded-3xl p-8 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 shadow-md">
                  <img src={al.img} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="italic text-gray-500 font-semibold text-[14px] leading-relaxed mb-4">"{al.text}"</p>
                  <h4 className="font-black text-gray-900 text-base">{al.name}</h4>
                  <p className="text-[#005c7a] font-bold text-xs">{al.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    else if (currentScreen === 'donate-monthly') {
      title = "Donate Monthly";
      subtitle = "Provide consistent, sustainable support to children";
      bgImage = monthlyGiving;
      content = (
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Monthly giving provides Children for Life with stable, predictable funding to planning infrastructure developments like water systems, school expansions, and clinics.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { amt: "$15", text: "Supplies school books for one child monthly" },
              { amt: "$35", text: "Provides solar lights for one household monthly" },
              { amt: "$75", text: "Powers clean water purification monthly" }
            ].map((m, i) => (
              <div key={i} className="border-2 border-gray-150 rounded-2xl p-6 bg-gray-50 flex flex-col justify-between hover:border-[#005c7a] transition-all cursor-pointer" onClick={() => navigate('donate')}>
                <div className="text-2xl font-black text-[#005c7a] mb-2">{m.amt}</div>
                <div className="text-gray-500 font-bold text-xs leading-relaxed">{m.text}</div>
              </div>
            ))}
          </div>
          <div className="pt-6">
            <button onClick={() => navigate('donate')} className="bg-[#f37021] text-white font-extrabold px-10 py-4 rounded-full hover:bg-[#da621a] uppercase text-xs tracking-wider shadow-md">Start Monthly Giving</button>
          </div>
        </div>
      );
    }
    else if (currentScreen === 'donate-stocks') {
      title = "Donate Stocks & Securities";
      subtitle = "Maximize your charitable tax benefit";
      bgImage = sallyStory;
      content = (
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Donating appreciated securities (stocks, bonds, mutual funds) is one of the most tax-efficient ways to support Children for Life. You pay no capital gains tax on the transfer and receive a tax-deductible receipt for the full market value.
          </p>
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-150 space-y-4">
            <h3 className="text-xl font-black text-gray-900 mb-2">How to Complete a Transfer</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-500 font-bold text-[14.5px] leading-relaxed">
              <li>Download our Transfer Notification Form.</li>
              <li>Instruct your broker to transfer the shares to Children for Life’s brokerage account.</li>
              <li>Submit the notification form to our finance team to ensure your tax receipt is generated instantly.</li>
            </ol>
            <div className="pt-4">
              <a href="mailto:finance@childrenforlife.org" className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-block">Request Form Details</a>
            </div>
          </div>
        </div>
      );
    }
    else if (currentScreen === 'fundraise') {
      title = "Fundraise With Us";
      subtitle = "Turn your creativity and networks into action";
      bgImage = heroStudents;
      content = (
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed text-center max-w-2xl mx-auto">
            You don't have to be a direct donor to make an impact. Launch a fundraiser in your community, school, or workplace and rally support for better futures.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Athletic Events", desc: "Run a marathon, bike, or swim, and ask friends to pledge donations per kilometer completed." },
              { title: "Celebration Giving", desc: "Ask for donations to Children for Life in lieu of gifts for your birthday, wedding, or anniversary." },
              { title: "Community Bakesale", desc: "Organize a local bake sale, concert, or sports tournament with all proceeds donated to our projects." }
            ].map((f, i) => (
              <div key={i} className="border border-gray-150 bg-gray-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-black text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-500 font-bold text-xs leading-relaxed mb-6">{f.desc}</p>
                <a href="mailto:fundraising@childrenforlife.org" className="text-[#005c7a] font-black text-xs uppercase hover:underline">Start Campaign →</a>
              </div>
            ))}
          </div>
        </div>
      );
    }
    else if (currentScreen === 'leave-legacy') {
      title = "Leave A Legacy";
      subtitle = "Make a lasting impact through planned giving";
      bgImage = sallyStory;
      content = (
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            By leaving a bequest in your will to Children for Life, you ensure that future generations of children will continue to benefit from clean water, safe schooling, and skills training.
          </p>
          <div className="border border-gray-150 bg-gray-50 p-8 rounded-3xl">
            <h3 className="text-xl font-black text-gray-900 mb-4">Why Planned Giving Matters</h3>
            <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed mb-4">
              A legacy gift allows you to make a larger, more significant donation than might be possible during your lifetime, leaving a legacy of hope, opportunity, and safety.
            </p>
            <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">
              We offer several formats including specific bequests, residual bequests, and life insurance policies. Consult your estate planner for guidance.
            </p>
            <div className="pt-6">
              <a href="mailto:legacy@childrenforlife.org" className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-block">Contact Legacy Team</a>
            </div>
          </div>
        </div>
      );
    }
    else if (currentScreen === 'tribute-gifts') {
      title = "Tribute Gifts";
      subtitle = "Celebrate a life or honor a memory";
      bgImage = ugirlsGraduation;
      content = (
        <div className="max-w-2xl mx-auto space-y-8">
          <p className="text-gray-600 text-lg font-medium leading-relaxed text-center">
            A tribute donation is a meaningful way to celebrate a special occasion or honor the memory of a loved one who cared about children's safety and education.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); navigate('donate'); }} className="space-y-6 bg-gray-50 border border-gray-150 p-8 rounded-3xl">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">This Gift is in Honor/Memory of:</label>
              <input required type="text" placeholder="Honoree Name" className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Send a Notification card to:</label>
              <input required type="text" placeholder="Recipient Name" className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a] mb-3" />
              <input required type="email" placeholder="Recipient Email" className="w-full border border-gray-300 rounded-lg px-4 py-3 font-semibold focus:outline-none focus:border-[#005c7a]" />
            </div>
            <button type="submit" className="w-full bg-[#f37021] text-white font-extrabold py-4 rounded-xl hover:bg-[#da621a] uppercase text-sm tracking-wider transition-colors shadow-sm">Proceed to Donation</button>
          </form>
        </div>
      );
    }
    else if (currentScreen === 'become-partner') {
      title = "Become A Partner";
      subtitle = "Align your organization with sustainable change";
      bgImage = monthlyGiving;
      content = (
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed text-center max-w-2xl mx-auto">
            Children for Life partners with corporations, foundations, and community alliances to deliver large-scale education, energy, and WASH projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900">Why Partner With Us?</h3>
              <ul className="space-y-4 text-gray-500 font-bold text-[14.5px] leading-relaxed">
                <li className="flex items-start">
                  <span className="text-[#005c7a] mr-2">✔</span>
                  <span>Measurable global ESG and community development impacts.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#005c7a] mr-2">✔</span>
                  <span>Transparent tracking and accountability of all program expenditures.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#005c7a] mr-2">✔</span>
                  <span>Direct alignment with United Nations Sustainable Development Goals.</span>
                </li>
              </ul>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert("Partnership Inquiry Received!"); navigate('home'); }} className="space-y-4 bg-gray-50 border border-gray-150 p-8 rounded-3xl">
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
      );
    }

    return (
      <div className="bg-white min-h-screen">
        {/* Parallax Hero Header */}
        <div 
          className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
            <button 
              onClick={() => navigate('home')}
              className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors"
            >
              <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
            </button>
            <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Take Action</span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 drop-shadow-md">
              {title}
            </h1>
            <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {content}
        </section>
      </div>
    );
  };

  const ProgramDetailScreen = () => {
    let title = "";
    let subtitle = "";
    let bgImage = heroStudents;
    let content = null;

    if (currentScreen === 'what-volunteering') {
      title = "Volunteering";
      subtitle = "Sharing skills, elevating communities";
      bgImage = heroStudents;
      content = (
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Volunteering is at the core of Children for Life’s development model. By matching highly skilled professionals with local partner organizations, we foster sustainable skills transfer that strengthens local leadership and institutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Skills-Sharing Model", desc: "Rather than doing the work for communities, our volunteers collaborate with local counterparts to transfer knowledge and build capacity." },
              { title: "Sustainable Growth", desc: "Placements are designed in alignment with local municipal plans to guarantee long-term operational continuity after the placement ends." },
              { title: "Global Network", desc: "Join over 15,000 alumni who continue to advocate for global solidarity, inclusion, and equity." }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-150 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 font-bold text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="pt-6 text-center">
            <button onClick={() => navigate('see-placements')} className="bg-[#f37021] hover:bg-[#da621a] text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md">See Current Placements</button>
          </div>
        </div>
      );
    }
    else if (currentScreen === 'what-gender') {
      title = "Gender Equality & Social Inclusion";
      subtitle = "Creating inclusive environments so everyone can thrive";
      bgImage = ugirlsGraduation;
      content = (
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Gender equality is not just a goal, it is a prerequisite for ending poverty. Children for Life works to remove social and economic barriers facing marginalized girls and women, ensuring equal access to education, health, and economic assets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900">U-GIRLS 2 & Beyond</h3>
              <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">
                Our U-GIRLS 2 program provides scholarships, learning materials, and mentorship to girls in secondary schools, preparing them for university admission and careers in STEM and leadership roles.
              </p>
              <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">
                We also train teachers on gender-responsive pedagogy and work with community leaders to raise awareness against early marriages and gender-based discrimination.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#ffc72c] rounded-2xl translate-x-2 translate-y-2 -z-10"></div>
              <img src={ugirlsGraduation} alt="U-Girls Graduation" className="rounded-2xl shadow-md w-full h-auto" />
            </div>
          </div>
        </div>
      );
    }
    else if (currentScreen === 'what-economic') {
      title = "Improving Economic Resilience";
      subtitle = "Unlocking opportunities for sustainable livelihoods";
      bgImage = monthlyGiving;
      content = (
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            We partner with local agricultural cooperatives and small business owners to build economic independence. By training farmers in climate-smart agriculture and business owners in digital financial tools, we help families increase their incomes and withstand economic shocks.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Agricultural Cooperatives", desc: "Helping local farming collectives improve harvest yields, establish post-harvest storage, and secure fair market access." },
              { title: "Financial Literacy", desc: "Training rural women's groups in budgeting, saving models, and using micro-finance accounts to launch home businesses." },
              { title: "Vocational Skills", desc: "Supporting youth with technical training in clean energy installation, sustainable building, and information technology." }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 border border-gray-150 rounded-2xl p-8 shadow-sm">
                <h3 className="text-lg font-black text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 font-bold text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    else if (currentScreen === 'what-climate') {
      title = "Advancing Climate Action";
      subtitle = "Strengthening environmental resilience and clean energy";
      bgImage = cleanEnergy;
      content = (
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Climate change impacts vulnerable families first. Children for Life integrates environmental action across all initiatives. We install clean solar energy grids for healthcare services, build water filtration facilities (WASH) for schools, and promote sustainable reforestation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#ffc72c] rounded-2xl translate-x-2 translate-y-2 -z-10"></div>
              <img src={cleanEnergy} alt="Clean Energy Clinic" className="rounded-2xl shadow-md w-full h-auto" />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900">Green Health & Clean Water</h3>
              <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">
                By powering rural health centers with solar microgrids, we prevent vaccine wastage and guarantee constant power for child deliveries. 
              </p>
              <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">
                In addition, our school sanitation projects construct safe latrines and install solar-powered water filtration pumps, giving children constant access to safe, clean drinking water.
              </p>
            </div>
          </div>
        </div>
      );
    }
    else if (currentScreen === 'what-strategic') {
      title = "Our Strategic Plan";
      subtitle = "Pillars of impact for 2024-2028";
      bgImage = sallyStory;
      content = (
        <div className="max-w-3xl mx-auto space-y-10">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Our 2024–2028 Strategic Plan lays out our vision for children and families. Over the next five years, Children for Life is focusing resources on three core pillars:
          </p>
          <div className="space-y-6">
            {[
              { title: "Pillar 1: Empowering Young Girls through Education", desc: "Expand U-GIRLS 2 programs into secondary schools in three new regions, providing mentorship, sanitation safety, and scholarship pipelines." },
              { title: "Pillar 2: Building Clean & Safe School Infrastructure", desc: "Construct solar energy microgrids and eco-sanitation toilets in 150 rural schools, reinforcing safety and attendance." },
              { title: "Pillar 3: Boosting Women-Led Agricultural Collectives", desc: "Provide business training and grants to support women farmers in establishing local irrigation systems and food processing networks." }
            ].map((p, i) => (
              <div key={i} className="border-b border-gray-150 pb-6">
                <h3 className="text-xl font-black text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-500 font-semibold text-[14.5px] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white min-h-screen">
        {/* Parallax Hero Header */}
        <div 
          className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
            <button 
              onClick={() => navigate('home')}
              className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors"
            >
              <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
            </button>
            <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">What We Do</span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 drop-shadow-md">
              {title}
            </h1>
            <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {content}
        </section>
      </div>
    );
  };

  const RegionDetailScreen = () => {
    let screenKey = currentScreen.replace('regions-', '');
    
    // Check if it is a general screen or specific country
    const isGeneral = ['glance', 'where'].includes(screenKey);
    
    // Country data mapping
    const countryData = {
      benin: {
        name: "Benin",
        subtitle: "Advancing gender equality and social inclusion by strengthening the resilience of women, youth and local institutions.",
        stats: { partners: "15", volunteers: "35", trained: "18", lives: "11,820" },
        solutions: [
          { tab: "Strengthening Girls' Secondary Education", title: "Sharing Skills to Improve Girls' Education and Leadership", desc: "Our volunteers partner with local secondary schools to build teacher training workshops, introduce digital learning systems, and deliver girl-focused mentorship." },
          { tab: "Improving Maternal and Child Health", title: "Reinforcing Clinic Capacity and Solar Equipment", desc: "We deploy solar vaccine refrigeration systems and train clinic technicians on equipment upkeep, ensuring secure maternal care." },
          { tab: "Developing Sustainable Livelihoods", title: "Empowering Rural Women's Collectives", desc: "Providing vocational training, agricultural crop tools, and digital accounting systems to boost local farming incomes." }
        ],
        voices: [
          { text: "The solar lights and training helped our teachers prep classes at night, and girls are staying in school longer.", name: "Marie-Therese, School Director" },
          { text: "Through the sanitation program, we built secure toilets that restored safety and dignity for our girls.", name: "Aminata, Student Representative" }
        ],
        bg: cleanWater
      },
      cameroon: {
        name: "Cameroon",
        subtitle: "Empowering rural communities through sustainable agriculture, clean water access, and entrepreneurship.",
        stats: { partners: "22", volunteers: "48", trained: "32", lives: "24,500" },
        solutions: [
          { tab: "Sustainable Agriculture", title: "Climate-Smart Farming & Irrigation Systems", desc: "Training local farming groups on soil conservation, solar drip-irrigation, and secure packaging to protect yields." },
          { tab: "WASH Projects", title: "Delivering Safe Drinking Water", desc: "Constructing handwashing stations and piping clean spring water directly to primary schools and maternity wards." },
          { tab: "Micro-Business Grants", title: "Youth Livelihoods & Technical Workshops", desc: "Supporting youths with solar cell assembly courses, sewing equipment, and basic accounting software." }
        ],
        voices: [
          { text: "Clean spring water at school means our children no longer fall sick from typhoid. Class attendance has doubled.", name: "Principal Joseph, Primary School" },
          { text: "The drip-irrigation training let us harvest vegetables throughout the dry season, tripling our household revenue.", name: "Florence, Cooperative Member" }
        ],
        bg: cleanEnergy
      },
      congo: {
        name: "Democratic Republic of the Congo",
        subtitle: "Enhancing health clinic resilience, emergency WASH installations, and vocational opportunities.",
        stats: { partners: "18", volunteers: "29", trained: "12", lives: "38,900" },
        solutions: [
          { tab: "Emergency WASH Support", title: "Water Sanitation and Hygiene in Vulnerable Zones", desc: "Deploying rapid-response chlorine water filtration blocks and hygiene training in temporary settlements." },
          { tab: "Solar Medical Supplies", title: "Powering Maternity Wards and General Care", desc: "Installing durable solar panels on rural clinic roofs, guaranteeing 24/7 power for deliveries and diagnostics." },
          { tab: "Community Leadership", title: "Developing Local Committee Management", desc: "Training clean water committees to collect utility fees and perform technical pump repairs independently." }
        ],
        voices: [
          { text: "We used to deliver babies under candlelight. Now, the solar lighting gives us constant visibility and safety.", name: "Midwife Beatrice, Clinic Supervisor" },
          { text: "Having a clean water tap in our sector has freed up three hours daily for our children to study.", name: "Alphonse, Community Leader" }
        ],
        bg: ugirlsGraduation
      },
      ethiopia: {
        name: "Ethiopia",
        subtitle: "Improving secondary education access, girls' mentorship, and clean water security in rural highlands.",
        stats: { partners: "26", volunteers: "52", trained: "41", lives: "43,100" },
        solutions: [
          { tab: "Girls' STEM Development", title: "U-GIRLS 2 Science and Mathematics Pipelines", desc: "Providing tablets, libraries, textbooks, and mentoring to help young high-school girls prepare for university entry." },
          { tab: "Water System Repairs", title: "Highland Gravity-Fed Water Pipelines", desc: "Collaborating with local engineers to lay down pipelines sourcing pure water from highland springs down to schools." },
          { tab: "Teacher Development", title: "Gender-Responsive Pedagogy Training", desc: "Training teachers to foster inclusive class environments where girls are encouraged to participate and lead." }
        ],
        voices: [
          { text: "The U-GIRLS 2 program gave me the textbooks and solar study lights I needed. Now, I have been accepted to study Engineering.", name: "Selam, Scholarship Graduate" },
          { text: "Our teachers now encourage girls to sit in front and lead class discussions, boosting self-confidence.", name: "Abebe, Secondary School Principal" }
        ],
        bg: heroStudents
      },
      nigeria: {
        name: "Nigeria",
        subtitle: "Boosting youth vocational employment, digital literacy, and women-led cooperative enterprises.",
        stats: { partners: "31", volunteers: "64", trained: "55", lives: "62,400" },
        solutions: [
          { tab: "Digital Trade Skills", title: "Vocational Mobile App & Technical Training", desc: "Training youth in basic programming, computer repair, and solar microgrid installations to address unemployment." },
          { tab: "Women-Led Agro-Allied", title: "Cassava Processing & Business Consulting", desc: "Providing cooperative food mills and business training to help women farmers process and market agricultural products." },
          { tab: "Sanitation Safety", title: "School Latrines & Sanitation Workshops", desc: "Rebuilding modern latrines with handwashing pods and introducing health monitors inside schools." }
        ],
        voices: [
          { text: "The solar installation course helped me secure an apprenticeship in my home city. I can now support my family.", name: "Tunde, Vocational Graduate" },
          { text: "Our agricultural mill lets us grind cassava in minutes instead of hours, saving time and doubling profits.", name: "Funmi, Cooperative President" }
        ],
        bg: monthlyGiving
      },
      tanzania: {
        name: "Tanzania",
        subtitle: "Advancing educational mentorship, solar power solutions for remote wards, and agricultural resilience.",
        stats: { partners: "35", volunteers: "78", trained: "62", lives: "74,200" },
        solutions: [
          { tab: "Boosting Inclusive Growth for SMEs", title: "Tanzania Local Enterprise Development (T-LED) project", desc: "The T-LED initiative sought to increase sustainable employment for women and men working in small and medium-sized enterprises (SMEs) and improve the delivery of market-driven and gender responsive business development and financial services to SMEs.", img: tanzaniaTLed },
          { tab: "Advancing Gender Equity and Economic Access", title: "Advancing Gender Equity and Economic Access", desc: "Supporting women and youth to gain equal access to employment, entrepreneurship opportunities, and financial resources across various regions in Tanzania.", img: ugirlsGraduation },
          { tab: "Improving Maternal and Child Health Services", title: "Improving Maternal and Child Health Services", desc: "Strengthening rural health systems, training midwives, and deploying solar energy setups to guarantee secure, constant maternity clinic services.", img: cleanEnergy },
          { tab: "Strengthening Gender-Responsive RMNCH and SRHR Services", title: "Strengthening Gender-Responsive RMNCH and SRHR Services", desc: "Improving sexual and reproductive health rights and services through local partnership and community advocacy programs.", img: monthlyGiving },
          { tab: "Fostering inclusive community engagement", title: "Fostering inclusive community engagement", desc: "Mobilizing local leadership, promoting youth-led advocacy, and ensuring that community growth benefits all groups.", img: sallyStory }
        ],
        voices: [
          { text: "The solar microgrid gives our children light to read at night. Their national exam scores have risen dramatically.", name: "Mwalimu Juma, Head Teacher" },
          { text: "Before, we had to travel miles for water. The school rainwater tank has given us water security next door.", name: "Sally, Resident Beneficiary" }
        ],
        bg: sallyStory
      }
    };

    if (isGeneral) {
      const title = screenKey === 'glance' ? "Our Work At A Glance" : "Where We Work";
      const subtitle = "Strengthening education, hygiene, and livelihoods worldwide";
      const bgImage = heroStudents;
      return (
        <div className="bg-white min-h-screen">
          <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
              <button onClick={() => navigate('home')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
                <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
              </button>
              <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Regions We Serve</span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 drop-shadow-md">{title}</h1>
              <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">{subtitle}</p>
            </div>
          </div>
          <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              <p className="text-gray-600 text-lg font-medium leading-relaxed">
                Children for Life is active across Africa, placing skilled volunteers, building infrastructure, and transferring technical expertise.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { region: "East Africa", countries: "Tanzania, Ethiopia", desc: "Promoting girls' secondary education scholarships, school solar microgrids, eco-friendly sanitation, and dry-season rainwater harvesting." },
                  { region: "West Africa", countries: "Benin, Nigeria, Cameroon", desc: "Supporting digital vocational workshops, microgrid installer training, gender inclusion pedagogy, and women-led Cassava milling." },
                  { region: "Central Africa", countries: "Democratic Republic of the Congo", desc: "Providing emergency clean water filtration grids and solar power generators for remote maternity clinics." }
                ].map((r, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-150 rounded-2xl p-8 shadow-sm flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-black text-gray-900 mb-2">{r.region}</h3>
                      <p className="text-[#005c7a] font-bold text-xs mb-4">{r.countries}</p>
                      <p className="text-gray-500 font-bold text-xs leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
        </div>
      );
    }

    const data = countryData[screenKey] || countryData.benin;
    const activeSolution = data.solutions[activeTabIdx] || data.solutions[0];

    return (
      <div className="bg-white min-h-screen relative overflow-hidden">
        {/* Parallax Hero */}
        <div className="relative h-[550px] bg-cover bg-center bg-fixed flex items-end pb-24" style={{ backgroundImage: `url(${data.bg})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white flex justify-between items-end">
            <div className="max-w-xl">
              <button onClick={() => navigate('home')} className="inline-flex items-center text-white/80 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] mb-4 transition-colors">
                <ChevronLeft size={14} className="mr-1" /> Where We Work
              </button>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4 drop-shadow-lg">{data.name}</h1>
              <p className="text-sm md:text-base text-gray-200 font-bold leading-relaxed max-w-md drop-shadow-md">{data.subtitle}</p>
              
              <div className="w-1 h-8 bg-[#f37021] mt-8 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Map & Overlapping Impact Card Section */}
        <div className="relative bg-white pb-24 pt-32 lg:pt-0">
          {/* Massive Background Map (clipped locally) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-60 flex items-center justify-center scale-[2.2] transform translate-y-24 -translate-x-24">
               <AfricaMap activeCountry={screenKey} />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left side empty space to let map show, right side stats card */}
            <div className="lg:col-span-7"></div>
            
            <div className="lg:col-span-5 flex justify-center lg:justify-end lg:-mt-72">
              <div className="bg-[#f2fafd] rounded-[40px] shadow-2xl pt-12 px-10 pb-10 w-full max-w-[420px] min-h-[780px] relative border border-white overflow-hidden flex flex-col justify-between">
                <div>
                  {/* Yellow dot with halo top left */}
                  <div className="absolute top-8 left-8">
                    <div className="w-6 h-6 rounded-full bg-[#ffc72c]/30 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-[#ffc72c]"></div>
                    </div>
                  </div>
                  
                  <h3 className="text-center text-3xl font-black text-[#1a365d] mb-8 mt-2">The {data.name} Effect</h3>
                  
                  <div className="flex justify-center mb-8 relative z-10">
                    <div className="w-44 h-44 rounded-full overflow-hidden shadow-md border-4 border-white">
                      <img src={cusoEffectSoap} className="w-full h-full object-cover" alt="Impact" />
                    </div>
                  </div>
                </div>

                <div className="relative pt-2 pb-4">
                  {/* Vertical Orange Line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#f37021]/30 transform -translate-x-1/2"></div>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-8 relative z-10">
                    <div className="text-left pr-2">
                      <div className="text-4xl font-black text-[#f37021] mb-2 tracking-tighter">{data.stats.partners}</div>
                      <p className="text-[#1a202c] text-[10.5px] leading-relaxed font-bold">
                        Local partners supported in {data.name} to drive sustainable change.
                      </p>
                    </div>
                    <div className="text-left pl-2">
                      <div className="text-4xl font-black text-[#f37021] mb-2 tracking-tighter">{data.stats.volunteers}</div>
                      <p className="text-[#1a202c] text-[10.5px] leading-relaxed font-bold">
                        Skilled volunteers placed to share professional expertise.
                      </p>
                    </div>
                    <div className="text-left pr-2">
                      <div className="text-4xl font-black text-[#f37021] mb-2 tracking-tighter">{data.stats.trained}</div>
                      <p className="text-[#1a202c] text-[10.5px] leading-relaxed font-bold">
                        Programs implemented and supported to build resilience.
                      </p>
                    </div>
                    <div className="text-left pl-2">
                      <div className="text-4xl font-black text-[#f37021] mb-2 tracking-tighter">{data.stats.lives}</div>
                      <p className="text-[#1a202c] text-[10.5px] leading-relaxed font-bold">
                        Direct beneficiaries reached through local solutions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button 
                    onClick={() => navigate('donate')} 
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
              <h2 className="text-3xl font-black text-gray-900 mb-4">Locally-Led Solutions</h2>
              <p className="text-gray-500 font-semibold text-sm leading-relaxed max-w-3xl mx-auto">
                We know that one-size-fits-all solutions are yesterday's thinking, that's why we support hyper-localized solutions designed for and by the people, place and economy of {data.name}.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Tabs */}
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

              {/* Tab Content */}
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
                  {/* Small red dot on bottom right of the box like the screenshot */}
                  <div className="absolute bottom-3 right-3 w-1.5 h-1.5 rounded-full bg-[#f37021]"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voices of Change */}
        <section className="py-24 bg-gray-50 relative overflow-hidden">
          {/* Top right decorative rectangle from screenshot */}
          <div className="absolute right-0 top-10 w-4 h-12 bg-gray-200 rounded-l-md"></div>
          <div className="absolute right-0 top-1/2 w-4 h-12 bg-gray-200 rounded-l-md"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-black text-gray-900 leading-tight mb-4">{data.name}'s Voices of<br/>Change</h2>
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
                {/* Light Blue Card */}
                <div className="bg-[#e1f3f8] rounded-3xl p-10 relative">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                       <img src={data.bg} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <p className="font-bold text-gray-900 text-xs leading-relaxed mb-8">
                    "This project provided me with the tools I needed to launch my own agricultural business. Now I can support my family and hire two people from my village. The training completely changed my life."
                  </p>
                  <p className="font-black text-[9px] text-[#005c7a] uppercase tracking-widest">Amina, Participant</p>
                </div>

                {/* Yellow Card */}
                <div className="bg-[#ffc72c] rounded-3xl p-10 relative">
                   <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                       <img src={heroStudents} className="w-full h-full object-cover" />
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
          {/* Background image split */}
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
              <button onClick={() => navigate('donate')} className="bg-[#ffc72c] hover:bg-[#eebb22] text-gray-900 font-black py-3 px-8 rounded-full uppercase text-[10px] tracking-widest shadow-md transition-colors">
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
                <button onClick={() => navigate('donate')} className="text-[#f37021] font-black uppercase text-[10px] tracking-widest hover:underline">Learn More →</button>
              </div>
              <div className="bg-[#f0f9fc] rounded-3xl p-10 flex flex-col items-center justify-between text-center hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#9dc84a]">
                  <Leaf size={24} />
                </div>
                <h4 className="font-black text-gray-900 text-base mb-3">Fundraise<br/>With Us</h4>
                <p className="text-gray-500 font-semibold text-[11px] leading-relaxed mb-8">Create your own campaign and mobilize your community for change.</p>
                <button onClick={() => navigate('fundraise')} className="text-[#f37021] font-black uppercase text-[10px] tracking-widest hover:underline">Start A Campaign →</button>
              </div>
              <div className="bg-[#f0f9fc] rounded-3xl p-10 flex flex-col items-center justify-between text-center hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#005c7a]">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="font-black text-gray-900 text-base mb-3">Leave A Legacy<br/>Of Work</h4>
                <p className="text-gray-500 font-semibold text-[11px] leading-relaxed mb-8">Plan a legacy gift to ensure impact for future generations.</p>
                <button onClick={() => navigate('leave-legacy')} className="text-[#f37021] font-black uppercase text-[10px] tracking-widest hover:underline">Learn More →</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const ImpactStoriesScreen = () => {
    return (
      <div className="bg-white min-h-screen">
        {/* Parallax Header */}
        <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${heroStudents})` }}>
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
            <button onClick={() => navigate('home')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
              <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
            </button>
            <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Impact</span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Impact Stories</h1>
            <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Voices of hope, transformation, and resilience from our projects.</p>
          </div>
        </div>

        {/* Stories Grid */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { title: "Sally's Story: Lighting Futures", tag: "Solar Energy", desc: "How a solar lighting installation and safe latrine restored safety, dignity, and study opportunities for Sally's family.", img: sallyStory, screen: "sally-story" },
              { title: "Empowering Girls Through STEM", tag: "Education", desc: "Read how secondary scholarships under U-GIRLS 2 are helping girls transition to science and technology careers.", img: ugirlsGraduation, screen: "what-gender" },
              { title: "Clean Water for Morogoro Schools", tag: "WASH", desc: "Installing solar-powered water filtration pumps reduced absenteeism and waterborne diseases by 90%.", img: cleanWater, screen: "what-climate" }
            ].map((story, i) => (
              <div key={i} className="bg-white border border-gray-150 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between">
                <div>
                  <img src={story.img} className="w-full h-52 object-cover" />
                  <div className="p-6">
                    <span className="text-[11px] font-black text-[#005c7a] uppercase tracking-widest bg-[#e1f3f8] px-2.5 py-1 rounded">{story.tag}</span>
                    <h3 className="text-xl font-black text-gray-900 mt-4 mb-2">{story.title}</h3>
                    <p className="text-gray-500 font-semibold text-xs leading-relaxed">{story.desc}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button onClick={() => navigate(story.screen)} className="text-[#005c7a] font-black text-xs uppercase tracking-wider hover:underline">Read Story →</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  const NewsScreen = () => {
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
        {/* Parallax Header */}
        <div className="relative h-[320px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${cleanEnergy})` }}>
          <div className="absolute inset-0 bg-[#005c7a]/60 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
            <button onClick={() => navigate('home')} className="inline-flex items-center text-white/80 hover:text-white font-black text-xs uppercase tracking-widest mb-6 transition-colors">
              <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">LATEST NEWS</h1>
            <p className="text-base text-gray-200 font-bold mt-2">Updates on our work and impact from the field</p>
          </div>
        </div>

        {/* Search Refiner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 flex justify-between items-center text-sm font-bold text-[#005c7a] shadow-sm">
            <button 
              onClick={() => setIsRefinerOpen(!isRefinerOpen)}
              className="hover:underline flex items-center space-x-1.5 focus:outline-none uppercase tracking-wider text-xs font-black"
            >
              <span>{isRefinerOpen ? '− Hide Search Options' : '+ Refine Search'}</span>
              {(searchQuery !== '' || selectedTag !== 'All') && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#f37021]"></span>
              )}
            </button>
            <button 
              onClick={handleClearAll}
              className="hover:underline text-gray-400 focus:outline-none uppercase tracking-wider text-xs font-black"
            >
              CLEAR ALL
            </button>
          </div>

          {/* Filter Panel */}
          {isRefinerOpen && (
            <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
                <div className="lg:col-span-1">
                  <label className="block text-[10.5px] font-black text-gray-500 uppercase tracking-widest mb-2">Search Keywords</label>
                  <input 
                    type="text" 
                    placeholder="Type to filter articles..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#005c7a] bg-gray-50/50"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-[10.5px] font-black text-gray-500 uppercase tracking-widest mb-2">Filter by Category</label>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Policy', 'Fundraising', 'Advocacy', 'Opinion', 'Profile', 'WASH', 'Partnership', 'Insight', 'Strategy'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                          selectedTag === tag 
                            ? 'bg-[#005c7a] border-[#005c7a] text-white shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-400 hover:border-[#005c7a] hover:text-[#005c7a]'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* News Grid */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center text-gray-500 font-semibold shadow-sm max-w-md mx-auto">
              No articles found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn">
              {filteredNews.map((news, i) => (
                <div key={i} className="bg-white border border-gray-150 rounded-2xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between">
                  <div>
                    <img src={news.img} className="w-full h-48 object-cover" />
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

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-6 mt-12 text-sm font-black text-[#005c7a]">
            <button className="bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"><ChevronLeft size={16} /></button>
            <span>1 of {Math.max(1, Math.ceil(filteredNews.length / 9))}</span>
            <button className="bg-white border border-gray-200 w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"><ChevronRight size={16} /></button>
          </div>
        </section>

        {/* Share your story */}
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
  };

  const PublicationsScreen = () => {
    return (
      <div className="bg-[#fcfcfa] min-h-screen">
        {/* Parallax Header */}
        <div className="relative h-[320px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${monthlyGiving})` }}>
          <div className="absolute inset-0 bg-[#8bb43d]/60 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
            <button onClick={() => navigate('home')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
              <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-md">PUBLICATIONS</h1>
            <p className="text-base text-gray-200 font-bold mt-2">Annual reports, newsletters, magazines, and strategic evaluations</p>
          </div>
        </div>

        {/* Solstice Magazine */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-150">
          <h2 className="text-3xl font-black text-gray-950 mb-8 border-l-4 border-[#8bb43d] pl-4">Solstice Magazine</h2>
          <div className="bg-white border border-gray-150 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center max-w-4xl">
            <div className="w-48 h-64 bg-gray-200 rounded-xl overflow-hidden shrink-0 shadow-md border-4 border-[#8bb43d]">
              <img src={ugirlsGraduation} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-gray-900">Solstice Magazine — Summer 2026</h3>
              <p className="text-gray-500 font-semibold text-sm leading-relaxed">Our flagship biannual publication covering international skills-sharing advancements, community solar microgrids, and inclusive WASH structures.</p>
              <button className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider">Download PDF</button>
            </div>
          </div>
        </section>

        {/* Annual Reports */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-150">
          <h2 className="text-3xl font-black text-gray-950 mb-8 border-l-4 border-[#f37021] pl-4">Annual Reports</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {[
              { yr: "2024–25", img: sallyStory },
              { yr: "2023–24", img: heroStudents },
              { yr: "2022–23", img: cleanWater },
              { yr: "2021–22", img: cleanEnergy },
              { yr: "2020–21", img: monthlyGiving },
              { yr: "2019–20", img: ugirlsGraduation }
            ].map((rep, i) => (
              <div key={i} className="text-center group cursor-pointer">
                <div className="aspect-[3/4] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow relative mb-3">
                  <img src={rep.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                </div>
                <h4 className="font-black text-gray-800 text-xs uppercase leading-snug">Annual Report</h4>
                <p className="text-[#f37021] font-bold text-xs">{rep.yr}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletters */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-gray-950 mb-8 border-l-4 border-[#005c7a] pl-4">Impact Newsletters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { issue: "Spring 2026", desc: "Focus: Solar lighting installations for health clinics", img: cleanEnergy },
              { issue: "Winter 2025", desc: "Focus: Primary school sanitation (WASH)", img: cleanWater },
              { issue: "Autumn 2025", desc: "Focus: Girls' secondary scholarships", img: ugirlsGraduation },
              { issue: "Summer 2025", desc: "Focus: Climate resilient farming yields", img: sallyStory }
            ].map((news, i) => (
              <div key={i} className="bg-white border border-gray-150 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 border border-gray-100">
                  <img src={news.img} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-black text-gray-900 text-sm">{news.issue}</h4>
                <p className="text-gray-500 font-bold text-xs leading-normal mt-1 mb-4">{news.desc}</p>
                <button className="text-[#005c7a] hover:underline font-black text-xs uppercase">Download Issue</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  const AccountabilityScreen = () => {
    return (
      <div className="bg-white min-h-screen">
        {/* Parallax Header */}
        <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${heroStudents})` }}>
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
            <button onClick={() => navigate('home')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
              <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
            </button>
            <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Governance</span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Accountability</h1>
            <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Our commitment to fiscal transparency, ethical management, and donor trust.</p>
          </div>
        </div>

        {/* Content */}
        <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Children for Life is committed to the highest standards of transparency and integrity. Over 85% of all donor contributions go directly to funding our volunteer placements and community infrastructure programs.
          </p>

          <div className="bg-gray-50 border border-gray-150 p-8 rounded-3xl space-y-4">
            <h3 className="text-xl font-black text-gray-900 mb-2">Accreditation & Standards</h3>
            <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">
              We are a fully accredited organization in accordance with international charity standards, guaranteeing strict governance, transparent fundraising, and direct oversight on all program activities.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-black text-gray-900">Financial Reports</h3>
            <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">
              View or download our audited financial statements and annual statements below:
            </p>
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
  };

  const AboutWhoScreen = () => {
    return (
      <div className="bg-white min-h-screen">
        {/* Parallax Hero Header */}
        <div 
          className="relative h-[480px] bg-cover bg-center bg-fixed flex items-center"
          style={{ backgroundImage: `url(${aboutHero})` }}
        >
          <div className="absolute inset-0 bg-black/50 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
            <button 
              onClick={() => navigate('home')}
              className="inline-flex items-center text-white/80 hover:text-white font-black text-xs uppercase tracking-widest mb-6 transition-colors"
            >
              <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
            </button>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 drop-shadow-md">
              Who We Are
            </h1>
            <p className="text-sm md:text-base text-gray-200 font-bold max-w-3xl leading-relaxed mb-8">
              Helping disadvantaged children access good health, nutrition, education, protection, and safe water; so every child can learn, thrive, and shape a stronger future.
            </p>
            <button 
              onClick={() => navigate('what-volunteering')}
              className="bg-[#ffc72c] hover:bg-[#eebb22] text-gray-900 font-black py-3.5 px-8 rounded-full uppercase text-xs tracking-widest shadow-md transition-colors flex items-center space-x-2"
            >
              <span>What volunteering is</span>
              <ChevronRight size={16} className="stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Who We Are Split Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={aboutWomenHand} 
                className="rounded-3xl shadow-lg w-full h-[400px] object-cover" 
                alt="Who We Are" 
              />
            </div>
            <div className="lg:pl-6">
              <h2 className="text-3xl font-black text-[#005c7a] mb-6">Who We Are</h2>
              <div className="text-gray-600 text-sm leading-relaxed font-semibold space-y-6">
                <p>
                  At Children for Life, we believe every child, no matter their gender, religion, race, or background, deserves the opportunity to grow, learn, and reach their full potential.
                </p>
                <p>
                  Children for Life is an international NGO whose mission is to provide children in need with adequate health, nutrition, protection, education, water, and sanitation services, and help them achieve their full potential in life.
                </p>
                <p>
                  We strengthen the resilience of communities, families, and children by working with partners to deliver humanitarian assistance and development services, and to address immediate needs and provide long-term solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Together, We Can Make a Difference Section */}
        <section className="py-24 bg-[#e1f3f8] border-t border-b border-gray-150">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-[#005c7a] mb-6">Together, We Can Make a Difference</h2>
            <div className="text-gray-650 text-sm leading-relaxed font-semibold space-y-6 max-w-3xl mx-auto text-left md:text-center">
              <p>
                Rather than arriving with assumptions, we chose to begin by listening — learning directly from caregivers, staff, and children about their daily realities, urgent needs, hopes, and long-term challenges.
              </p>
              <p>
                These visits marked the beginning of CFL’s commitment to building meaningful, community-informed support for vulnerable children and families. Through conversation, observation, and connection, we are laying the foundation for future partnerships, responsive giving, and sustainable impact rooted in dignity and understanding.
              </p>
            </div>
            <button 
              onClick={() => navigate('regions-tanzania')}
              className="bg-[#f37021] hover:bg-[#da621a] text-white font-black py-3.5 px-8 rounded-full uppercase text-xs tracking-widest shadow-md mt-8 inline-block"
            >
              Read More
            </button>
          </div>
        </section>

        {/* Our Mission, Vision, and Strategic Goal Split Section */}
        <section className="py-24 bg-gray-50 border-t border-gray-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-[#005c7a] mb-6">Our Mission, Vision & Values</h2>
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
                      <p className="text-[12.5px] text-gray-500 font-semibold leading-relaxed">
                        Treats all people with dignity and respect; shows respect and sensitivity towards gender, cultural and religious differences; challenges prejudice, biases and intolerance in the society; encourages diversity.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[12.5px] uppercase font-black text-gray-900 tracking-wider mb-1">Integrity</h4>
                      <p className="text-[12.5px] text-gray-500 font-semibold leading-relaxed">
                        Maintains high ethical standards; takes clear ethical stands; keeps promises; immediately addresses untrustworthy or dishonest behavior; resists pressure in decision-making from internal and external sources; does not abuse power or authority.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src={heroStudents} 
                className="rounded-3xl shadow-lg w-full h-[400px] object-cover" 
                alt="Our Vision" 
              />
            </div>
          </div>
        </section>

        {/* What we do Section */}
        <section className="py-24 bg-[#f0f9fc]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black text-[#005c7a] mb-8">What we do</h2>
            <div className="text-gray-600 text-sm leading-relaxed font-semibold space-y-6 max-w-3xl mx-auto text-left lg:text-center">
              <p className="text-center font-bold text-base text-gray-700">
                We work in partnership with local organizations, sharing technical and professional skills to empower communities.
              </p>
              <div className="space-y-3 pl-4 lg:pl-0 inline-block text-left">
                <p>• We place highly skilled volunteers to build capacity and share professional skills.</p>
                <p>• We support sustainable livelihood development, women's empowerment, and climate action.</p>
                <p>• We advocate for gender equality and social inclusion in everything we do.</p>
              </div>
              <p>
                Sharing skills and building capacity is at the heart of Cuso International's work. By placing highly skilled volunteers, we support local partners to develop their organizations, scale their impact, and create lasting, positive change in communities around the world.
              </p>
            </div>
            <button 
              onClick={() => navigate('what-volunteering')}
              className="bg-[#f37021] hover:bg-[#da621a] text-white font-black py-3.5 px-8 rounded-full uppercase text-xs tracking-widest shadow-md mt-10"
            >
              See how we work
            </button>
          </div>
        </section>

        {/* Local Partnerships — Global Reach */}
        <section className="py-24 bg-[#0b1a30] text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-black mb-6">Local Partnerships — Global Reach</h2>
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-black uppercase tracking-wider text-gray-300 mb-12">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffc72c]"></span>
                <span>Projects and partnerships in Africa, Latin America, and the Caribbean</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f37021]"></span>
                <span>Cuso International office locations</span>
              </div>
            </div>
            <div className="w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <WorldMap onCountryClick={(key) => navigate(`regions-${key}`)} />
            </div>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-gray-900 text-center mb-16">Core Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-[#f0f9fc] rounded-3xl p-10 flex flex-col items-center justify-between text-center hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#f37021]">
                  <Leaf size={24} />
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-3">Improving economic resilience</h3>
                <p className="text-gray-500 font-semibold text-xs leading-relaxed mb-6">
                  Creating sustainable livelihood opportunities by supporting small and medium-sized enterprises, boosting local agriculture, and providing vocational and entrepreneurship training.
                </p>
                <button onClick={() => navigate('what-economic')} className="text-[#f37021] font-black uppercase text-[10px] tracking-widest hover:underline">Learn More →</button>
              </div>
              <div className="bg-[#f0f9fc] rounded-3xl p-10 flex flex-col items-center justify-between text-center hover:shadow-lg transition-shadow border border-gray-100">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#0e7090]">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-3">Fostering inclusive community engagement</h3>
                <p className="text-gray-500 font-semibold text-xs leading-relaxed mb-6">
                  Strengthening local leadership, promoting gender equality, and ensuring youth and women play a central role in driving community development.
                </p>
                <button onClick={() => navigate('what-gender')} className="text-[#f37021] font-black uppercase text-[10px] tracking-widest hover:underline">Learn More →</button>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="py-24 bg-gray-50 border-t border-gray-150">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-[#005c7a] mb-6">Meet Our Team</h2>
              <p className="text-gray-500 font-semibold text-sm leading-relaxed mb-8">
                Meet the dedicated staff members and directors who guide Cuso International's mission, manage our global programs, and support our volunteers on the ground.
              </p>
              <button 
                onClick={() => navigate('about-team')}
                className="bg-[#f37021] hover:bg-[#da621a] text-white font-black py-3.5 px-8 rounded-full uppercase text-xs tracking-widest shadow-md"
              >
                Meet Them
              </button>
            </div>
            <div>
              <img 
                src={aboutTeamPhoto} 
                className="rounded-3xl shadow-lg w-full h-[320px] object-cover" 
                alt="Cuso Team" 
              />
            </div>
          </div>
        </section>

        {/* Keep exploring Section */}
        <section className="py-16 bg-[#f0f9fc] border-t border-b border-gray-150">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-sm">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-[#005c7a]/10 flex items-center justify-center text-[#005c7a]">
                <Compass size={20} className="stroke-[2.5]" />
              </div>
              <span className="text-xl font-black text-[#005c7a] ml-4">Keep exploring</span>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-8 space-y-3 md:space-y-0 text-xs font-black text-[#005c7a] uppercase tracking-wider">
              <button onClick={() => navigate('regions-where')} className="hover:underline text-left">Who we serve →</button>
              <button onClick={() => navigate('what-strategic')} className="hover:underline text-left">Strategic plan →</button>
              <button onClick={() => navigate('about-careers')} className="hover:underline text-left">Careers →</button>
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <div className="w-full h-[450px]">
          <img src={aboutBottom} className="w-full h-full object-cover" alt="Community support" />
        </div>
      </div>
    );
  };

  const AboutDetailScreen = () => {
    let title = "";
    let subtitle = "";
    let bgImage = heroStudents;
    let content = null;

    if (currentScreen === 'about-who') {
      title = "Who We Are";
      subtitle = "Over six decades of partnering for better futures";
      bgImage = heroStudents;
      content = (
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Children for Life is an international cooperation organization. For over 60 years, we have worked with communities, governments, and local partners to share skills, build capacity, and establish inclusive, sustainable opportunities for children and families.
          </p>
          <div className="bg-gray-50 border border-gray-150 p-8 rounded-3xl space-y-6">
            <h3 className="text-2xl font-black text-gray-900">Our Mission & Vision</h3>
            <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">
              **Mission**: To share skills and build capacity in partnership with communities, creating more integrated, accessible, and inclusive environments for children.
            </p>
            <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed">
              **Vision**: A world where every child enjoys the right to safe sanitation, high-quality learning, clean energy, and a prosperous future free from poverty.
            </p>
          </div>
        </div>
      );
    }
    else if (currentScreen === 'about-competencies') {
      title = "Our Goals";
      subtitle = "Five strategic development areas where Children for Life makes a measurable impact.";
      bgImage = cleanWater;
      content = (
        <div className="space-y-16">
          <p className="text-gray-600 font-bold text-lg leading-relaxed max-w-3xl">
            Children for Life is committed to ensuring every child has the support they need to thrive. Through our structured, child-focused interventions, we work towards five core development goals:
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                num: "01",
                title: "Good Health",
                desc: "Children regardless of gender enjoy good health. CFL aims to ensure that children are well nourished; they are protected from infection, diseases & injury; and children and their caregivers access essential health services.",
                icon: <Heart className="w-6 h-6 text-[#f37021]" />,
                bg: "bg-red-50/50 border-red-100"
              },
              {
                num: "02",
                title: "Educated for Life",
                desc: "Children regardless of gender are educated for life. CFL seeks to ensure that children can read, write and use numeracy skills; children make good judgments, manage emotions and communicate ideas. Adolescents are ready to embrace innovation and exploit economic opportunities; and children can access and complete basic education.",
                icon: <BookOpen className="w-6 h-6 text-[#005c7a]" />,
                bg: "bg-blue-50/50 border-blue-100"
              },
              {
                num: "03",
                title: "Positive Societal Development",
                desc: "Children regardless of gender enjoy positive societal development. CFL strives to ensure that children enjoy positive relationships with peers, family, and community members; children value and care for others and their environment; and children have hope and vision for the future.",
                icon: <Users className="w-6 h-6 text-green-600" />,
                bg: "bg-green-50/50 border-green-100"
              },
              {
                num: "04",
                title: "Protected from Abuse",
                desc: "Children regardless of gender are cared for, protected from abuse. CFL seeks to ensure that children are cared for in a loving, safe family and community environment, protected from abuse, exploitation, and violence.",
                icon: <ShieldAlert className="w-6 h-6 text-amber-600" />,
                bg: "bg-amber-50/50 border-amber-100"
              },
              {
                num: "05",
                title: "Celebrated & Supported",
                desc: "Children regardless of gender are celebrated. Children are celebrated and registered at birth so that they are not invisible in the society; that they may participate and are respected in decisions that affect their lives, and are involved in resilience-related interventions in order to prevent and manage shocks.",
                icon: <Sparkles className="w-6 h-6 text-purple-600" />,
                bg: "bg-purple-50/50 border-purple-100"
              }
            ].map((goal, idx) => (
              <div 
                key={idx} 
                className={`border rounded-3xl p-8 flex items-start space-x-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-white ${goal.num === '05' ? 'lg:col-span-2' : ''}`}
              >
                {/* Large Background Number */}
                <div className="absolute right-4 bottom-[-10px] text-8xl font-black text-gray-100/50 select-none z-0">
                  {goal.num}
                </div>

                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:space-x-6 w-full">
                  <div className={`p-4 rounded-2xl ${goal.bg.split(' ')[0]} border ${goal.bg.split(' ')[1]} mb-4 sm:mb-0 flex-shrink-0`}>
                    {goal.icon}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3.5">
                      <span className="text-[#f37021] text-[11px] font-black tracking-widest uppercase bg-[#f37021]/15 px-3 py-1 rounded-full">
                        Goal {goal.num}
                      </span>
                      <h3 className="text-lg font-black text-gray-900">{goal.title}</h3>
                    </div>
                    <p className="text-gray-500 font-bold text-xs leading-relaxed max-w-xl">
                      {goal.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    else if (currentScreen === 'about-team' || currentScreen === 'about-leadership') {
      title = currentScreen === 'about-team' ? "How We Are Led" : "Our Leadership";
      subtitle = "Governance and management structure ensuring accountability, transparency, and effective program delivery.";
      bgImage = monthlyGiving;
      content = (
        <div className="space-y-20">
          {/* Top Section: Our Leadership Structure */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-gray-900 border-b border-gray-100 pb-4">Our Leadership Structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  role: "Executive Director",
                  desc: "Leads Children for Life’s strategic direction, partnerships, and organizational growth, ensuring programs align with our vision and impact goals.",
                  color: "border-[#f37021] bg-orange-50/10"
                },
                {
                  role: "Board of Trustees",
                  desc: "Provides governance, oversight, and strategic guidance to ensure CFL remains mission-driven, ethical, and accountable.",
                  color: "border-[#005c7a] bg-blue-50/10"
                },
                {
                  role: "Programs & Operations Teams",
                  desc: "Design and implement field programs, manage daily operations, and monitor impact across communities.",
                  color: "border-green-600 bg-green-50/10"
                },
                {
                  role: "Implementation Partners & Specialists",
                  desc: "Work alongside Children for Life to deliver technical expertise, community engagement, and scalable solutions.",
                  color: "border-purple-600 bg-purple-50/10"
                }
              ].map((item, idx) => (
                <div key={idx} className={`border rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all ${item.color}`}>
                  <h3 className="font-extrabold text-gray-900 text-[14.5px] uppercase tracking-wider mb-3">{item.role}</h3>
                  <p className="text-gray-500 font-bold text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section: Meet Our Executive Director */}
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-gray-900 border-b border-gray-100 pb-4">Meet Our Executive Director</h2>
            <div className="bg-[#f0f9fc] rounded-[36px] p-8 md:p-12 border border-gray-100 flex flex-col lg:flex-row items-center lg:items-start gap-10">
              <div className="w-40 h-40 bg-[#005c7a] text-white rounded-full flex flex-col items-center justify-center shadow-lg flex-shrink-0 text-center border-4 border-white select-none">
                <span className="text-4xl font-black tracking-widest">ACM</span>
                <span className="text-[10px] uppercase font-black tracking-widest text-[#ffc72c] mt-1.5">35 Yrs Exp</span>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-[#005c7a]">Anselme Cobna Motcho</h3>
                  <p className="text-[#f37021] font-black uppercase text-xs tracking-widest mt-1">Executive Director — Children for Life</p>
                </div>

                <div className="bg-white/65 border border-white/60 p-6 rounded-2xl">
                  <h4 className="text-[12px] uppercase font-black text-gray-900 tracking-wider mb-2">Bio Profile</h4>
                  <p className="text-gray-600 font-bold text-xs leading-relaxed">
                    With expertise backed by 35 years of experience in multilateral development and humanitarian sectors, providing technical assistance, policy support, and programme implementation in support of children’s rights and social-sector systems.
                  </p>
                </div>

                <p className="text-gray-600 font-bold text-xs leading-relaxed">
                  Anselme is a strategic leader in child-focused development and humanitarian programmes. He brings strong expertise in programme management, partnerships, and results-based approaches, ensuring that Children for Life's work aligns with national priorities and international standards while responding to the needs of vulnerable children and communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else if (currentScreen === 'about-board') {
      title = "Our Board of Trustees";
      subtitle = "Governance, oversight, and strategic guidance";
      bgImage = cleanEnergy;
      content = (
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Our Board of Trustees provides governance, oversight, and strategic guidance to ensure that Children for Life remains dedicated to its mission, operates ethically, and maintains the highest standards of accountability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { name: "Hon. Arthur Pendelton", role: "Board Chair", desc: "Former diplomat with extensive experience in international cooperation policies." },
              { name: "Elena Rostova", role: "Treasurer", desc: "Financial consultant specializing in global charity audits and risk management." },
              { name: "Samuel Wambua", role: "Director", desc: "Community leader and agricultural specialist advocate based in Tanzania." },
              { name: "Claire Dupont", role: "Director", desc: "Human rights lawyer specializing in children's education rights and social inclusion." }
            ].map((b, i) => (
              <div key={i} className="bg-gray-50 border border-gray-150 rounded-2xl p-8 shadow-sm">
                <h4 className="font-black text-gray-900 text-lg mb-1">{b.name}</h4>
                <p className="text-[#005c7a] font-bold text-xs uppercase mb-3">{b.role}</p>
                <p className="text-gray-500 font-semibold text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    else if (currentScreen === 'about-careers') {
      title = "Careers";
      subtitle = "Build your career while building better futures";
      bgImage = sallyStory;
      content = (
        <div className="space-y-12">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">
            Looking for a career with purpose? Join our global team of project managers, logisticians, educators, and engineers working together to support children and families.
          </p>
          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-8 space-y-6">
            <h3 className="text-xl font-black text-gray-900 mb-2">Current Open Staff Positions</h3>
            <div className="divide-y divide-gray-200">
              {[
                { title: "Senior Program Manager (WASH)", loc: "Dar es Salaam, Tanzania", type: "Full-Time" },
                { title: "Monitoring & Evaluation (M&E) Specialist", loc: "Addis Ababa, Ethiopia", type: "Full-Time" },
                { title: "Communications & Media Relations Officer", loc: "Remote", type: "Contract" }
              ].map((job, i) => (
                <div key={i} className="py-4 flex justify-between items-center first:pt-0 last:pb-0">
                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{job.title}</h4>
                    <p className="text-gray-500 font-semibold text-xs mt-1">{job.loc} • {job.type}</p>
                  </div>
                  <a href="mailto:careers@childrenforlife.org" className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider">Apply Now</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white min-h-screen">
        {/* Parallax Hero Header */}
        <div 
          className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
            <button 
              onClick={() => navigate('home')}
              className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors"
            >
              <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
            </button>
            <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">About Us</span>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3 drop-shadow-md">
              {title}
            </h1>
            <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {content}
        </section>
      </div>
    );
  };

  const BecomeVolunteerScreen = () => {
    const [activeVolSection, setActiveVolSection] = React.useState('overview');

    const scrollToVolSection = (sectionId) => {
      setActiveVolSection(sectionId);
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const volNavSections = [
      { id: 'overview', label: 'Overview' },
      { id: 'why-volunteer', label: 'Why Volunteer' },
      { id: 'what-to-expect', label: 'What to Expect' },
      { id: 'ways-to-volunteer', label: 'Ways to Volunteer' },
      { id: 'am-i-eligible', label: 'Am I eligible' },
      { id: 'process', label: 'Process' },
      { id: 'voices', label: 'Voices' },
    ];

    return (
      <div className="bg-white min-h-screen">
        {/* Section 1: Hero */}
        <section id="overview" className="relative w-full h-[600px] flex items-center">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroStudents})` }}>
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button onClick={() => navigate('home')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
              <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
            </button>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 drop-shadow-md tracking-tight">Become a Volunteer</h1>
            <p className="text-lg md:text-2xl text-gray-200 font-bold mb-10 max-w-xl">A world of endless possibilities</p>
            <button onClick={() => navigate('see-placements')} className="bg-[#9dc84a] hover:bg-[#8bb43d] text-gray-900 font-extrabold py-4 px-10 rounded-full flex items-center space-x-3 text-xs uppercase tracking-wider shadow-lg transform transition-all hover:-translate-y-0.5">
              <Leaf className="w-5 h-5" />
              <span>Find an open volunteer placement</span>
            </button>
          </div>
        </section>

        {/* Section 2: Secondary Sticky Nav */}
        <nav className="sticky top-32 lg:top-36 bg-white border-b border-gray-200 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
            <div className="flex space-x-0 min-w-max">
              {volNavSections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToVolSection(s.id)}
                  className={`px-5 py-4 text-[13px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                    activeVolSection === s.id
                      ? 'text-[#005c7a] border-[#9dc84a]'
                      : 'text-gray-400 border-transparent hover:text-[#005c7a]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Section 3: Why Volunteer */}
        <section id="why-volunteer" className="py-16 md:py-24 bg-[#EAF4F9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left: Image — appears first on mobile naturally */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg mt-12 md:mt-32 -mb-28 md:-mb-64 z-10">
              <img src={heroStudents} className="w-full h-[320px] md:h-[420px] object-cover" alt="Volunteer" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F26A44] rounded-full flex items-center justify-center hover:bg-[#e05a34] transition-colors cursor-pointer shadow-lg hover:scale-105 duration-200">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><polygon points="8,5 19,12 8,19" /></svg>
                </div>
              </div>
            </div>
            {/* Right: Text */}
            <div className="pt-4 md:pt-20">
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-black text-[#00263A] leading-tight mb-5 md:mb-6">Here's why you should volunteer with Cuso International</h2>
              <p className="text-[#4A5568] font-semibold text-base md:text-[17px] leading-relaxed mb-8">
                By volunteering with us, you'll share your professional skills with local partners, build capacity, and create lasting change in communities around the world — all while gaining invaluable experience and perspective.
              </p>
              <button onClick={() => scrollToVolSection('what-to-expect')} className="bg-[#94C947] hover:bg-[#85b43a] text-white font-extrabold py-4 px-8 rounded-full text-xs uppercase tracking-wider flex items-center space-x-2.5 shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.384 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
                <span>RECEIVE PLACEMENT ALERTS</span>
              </button>
            </div>
          </div>
          </div>
        </section>

        {/* Section 4: What to Expect — Zig-Zag */}
        <section id="what-to-expect" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
            {[
              {
                title: "Apply your skills to new challenges",
                desc: "Use your professional expertise to tackle real-world development challenges alongside local organizations.",
                points: ["Transfer technical knowledge to local teams", "Design and implement sustainable solutions", "Mentor emerging leaders in your field"],
                img: cleanWater,
              },
              {
                title: "Expand your worldview",
                desc: "Immerse yourself in a new culture, language, and community while sharing your perspective and skills.",
                points: ["Live and work in vibrant communities", "Build cross-cultural competencies", "Create lifelong global connections"],
                img: monthlyGiving,
              },
              {
                title: "Receive support every step of the way",
                desc: "From pre-departure training to in-country orientation and ongoing support, we're with you throughout your placement.",
                points: ["Comprehensive pre-departure training", "Dedicated in-country support team", "Monthly living allowance and housing"],
                img: cleanEnergy,
              }
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="">
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 font-semibold text-sm leading-relaxed mb-6">{item.desc}</p>
                  <ul className="space-y-3">
                    {item.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-gray-600 font-semibold text-sm">
                        <span className="w-5 h-5 rounded-full bg-[#9dc84a]/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9dc84a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="">
                  <div className="rounded-3xl overflow-hidden shadow-lg">
                    <img src={item.img} className="w-full h-[340px] object-cover" alt={item.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: 3 Ways to Volunteer */}
        <section id="ways-to-volunteer" className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-16">3 ways to volunteer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "International",
                  desc: "Volunteer overseas and make a global impact.",
                  link: "FIND OPEN PLACEMENTS",
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#007b9e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                      <path d="M12 2v3" />
                      <path d="M12 14v3" />
                      <circle cx="8" cy="4" r="1" fill="#007b9e" stroke="none" />
                      <circle cx="16" cy="4" r="1" fill="#007b9e" stroke="none" />
                    </svg>
                  ),
                },
                {
                  title: "E-volunteer",
                  desc: "Use your professional skills to support organizations remotely.",
                  link: "VIEW E-VOLUNTEER POSTS",
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#007b9e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                      <circle cx="12" cy="10" r="4" />
                      <line x1="10" y1="10" x2="14" y2="10" />
                    </svg>
                  ),
                },
                {
                  title: "Canada",
                  desc: "Volunteer in Canada and support our mission locally.",
                  link: "SEE POSITIONS IN CANADA",
                  icon: (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#007b9e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C9.5 2 6 5 6 5S6 12 12 22c6-10 6-17 6-17s-3.5-3-6-3z" />
                      <path d="M12 22V8" />
                      <line x1="9" y1="6" x2="9" y2="10" />
                      <line x1="15" y1="6" x2="15" y2="10" />
                    </svg>
                  ),
                },
              ].map((card, i) => (
                <div key={i} className={`bg-[#e1f3f8] rounded-3xl p-14 flex flex-col items-center text-center hover:shadow-lg transition-shadow border border-gray-100 ${i === 1 ? '-mt-12' : ''}`}>
                  <div className="w-24 h-24 bg-[#d5f0d5] rounded-full flex items-center justify-center mb-6">
                    {card.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{card.title}</h3>
                  <p className="text-gray-600 font-semibold text-lg leading-relaxed mb-10 flex-1">{card.desc}</p>
                  <button onClick={() => navigate('see-placements')} className="text-[#005c7a] font-black text-base uppercase tracking-wider hover:underline">{card.link} →</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Am I Eligible? */}
        <section id="am-i-eligible" className="py-24 bg-[#e1f3f8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
              <div className="rounded-3xl overflow-hidden shadow-lg">
                <img src={heroStudents} className="w-full h-[420px] object-cover" alt="Volunteer eligibility" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Am I eligible?</h2>
                <p className="text-[#4A5568] font-bold leading-[1.5] break-words mb-8" style={{ fontFamily: '"Europa Regular", europa, sans-serif', fontSize: '85%', padding: 0 }}>
                  We're looking for passionate professionals who want to share their skills and create lasting change.
                </p>
                <ul className="space-y-4 mb-10">
                  {[
                    "A university degree or equivalent professional certification",
                    "At least 2 years of relevant professional experience",
                    "Fluency in English or French (bilingualism is an asset)",
                    "Commitment to a placement of 3 to 24 months",
                  ].map((req, i) => (
                    <li key={i} className="flex items-start space-x-3 text-[#4A5568] font-bold leading-[1.5] break-words" style={{ fontFamily: '"Europa Regular", europa, sans-serif', fontSize: '85%', padding: 0 }}>
                      <span className="w-5 h-5 rounded-full bg-[#9dc84a]/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9dc84a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate('see-placements')} className="bg-[#9dc84a] hover:bg-[#8bb43d] text-gray-900 font-extrabold py-3.5 px-10 rounded-full text-xs uppercase tracking-wider shadow-sm transition-colors">
                  Browse open placements
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Video Quote Banner */}
        <section className="relative w-full h-[500px] flex items-center">
          <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${sallyStory})` }}>
            <div className="absolute inset-0 bg-black/70"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-8 leading-tight">
                "Volunteering with Cuso International was the most transformative experience of my career. It changed how I see the world and my role in it."
              </h2>
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer border-2 border-white/50">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><polygon points="8,5 19,12 8,19" /></svg>
                </div>
                <span className="text-white font-black text-sm uppercase tracking-wider hover:underline cursor-pointer">
                  Watch our volunteer recruitment video
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Process Steps */}
        <section id="process" className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Ready to take the next step?</h2>
            <p className="text-xl font-black text-[#9dc84a] mb-14">Here's the process</p>
            <div className="space-y-0">
              {[
                { step: "1", title: "Review open placements", desc: "Browse our current volunteer opportunities and find a placement that matches your skills, interests, and availability." },
                { step: "2", title: "Submit your application", desc: "Complete our online application form with your CV, covering letter, and references. Our team reviews within 5 business days." },
                { step: "3", title: "Interview & Assessment", desc: "If your profile matches a placement, we'll invite you for a virtual interview to discuss your experience and motivation." },
                { step: "4", title: "Pre-departure preparation", desc: "Once selected, complete pre-departure training covering cultural orientation, security protocols, and project planning." },
                { step: "5", title: "Begin your placement", desc: "Travel to your host country, receive in-country orientation, and start working alongside your local partners." },
              ].map((item, i) => (
                <div key={i} className="flex space-x-5">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-[#9dc84a] text-white rounded-full flex items-center justify-center font-black text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    {i < 4 && <div className="w-0.5 flex-1 bg-[#9dc84a]/30 my-1.5"></div>}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-lg font-black text-gray-900 mb-1.5">{item.title}</h3>
                    <p className="text-gray-500 font-semibold text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <button onClick={() => navigate('see-placements')} className="bg-[#9dc84a] hover:bg-[#8bb43d] text-gray-900 font-extrabold py-4 px-12 rounded-full text-xs uppercase tracking-wider shadow-lg transition-colors">
                Start your volunteer journey
              </button>
            </div>
          </div>
        </section>

        {/* Section 9: Volunteer Voices */}
        <section id="voices" className="py-24 bg-[#ffc72c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12">Volunteer voices</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                { title: "Building solar micro-grids in rural Tanzania", name: "Sarah, Energy Advisor", img: cleanEnergy },
                { title: "Empowering girls through education in Benin", name: "David, Education Specialist", img: ugirlsGraduation },
                { title: "Clean water access transforms school attendance", name: "Marie, WASH Expert", img: cleanWater },
              ].map((story, i) => (
                <div key={i} className="relative rounded-3xl overflow-hidden h-[340px] group cursor-pointer shadow-lg">
                  <img src={story.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={story.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-black text-lg mb-1">{story.title}</h3>
                    <p className="text-gray-200 font-bold text-xs">{story.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button className="bg-white text-gray-900 font-extrabold py-3.5 px-10 rounded-full text-xs uppercase tracking-wider shadow-md hover:bg-gray-50 transition-colors">
                Read more volunteer stories
              </button>
            </div>
          </div>
        </section>

        {/* Section 10: Keep Exploring & Newsletter */}
        <section className="py-24 bg-[#e1f3f8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-sm">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="w-10 h-10 rounded-full bg-[#005c7a]/10 flex items-center justify-center text-[#005c7a]">
                  <Compass size={20} className="stroke-[2.5]" />
                </div>
                <span className="text-xl font-black text-[#005c7a] ml-4">Keep exploring</span>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-8 space-y-3 md:space-y-0 text-xs font-black text-[#005c7a] uppercase tracking-wider">
                <button onClick={() => navigate('see-placements')} className="hover:underline text-left">Current placements →</button>
                <button onClick={() => navigate('volunteer-faq')} className="hover:underline text-left">Volunteer FAQ →</button>
                <button onClick={() => navigate('alumni')} className="hover:underline text-left">Alumni stories →</button>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
              <h3 className="text-2xl font-extrabold text-[#005c7a] mb-3 flex items-center">
                <Mail className="mr-3 text-[#005c7a] w-6 h-6" /> Stay Informed
              </h3>
              <p className="text-gray-500 mb-8 font-bold text-sm">
                Get volunteer updates, placement alerts, and stories from the field delivered to your inbox.
              </p>
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">First Name</label>
                    <input type="text" className="w-full border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#005c7a] bg-transparent font-semibold" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Last Name</label>
                    <input type="text" className="w-full border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#005c7a] bg-transparent font-semibold" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Email address</label>
                  <input type="email" className="w-full border-b border-gray-300 py-2.5 focus:outline-none focus:border-[#005c7a] bg-transparent font-semibold" />
                </div>
                <button type="submit" className="border-2 border-[#9dc84a] text-[#9dc84a] font-extrabold py-2.5 px-10 rounded-full hover:bg-[#9dc84a] hover:text-gray-900 transition-colors text-xs tracking-wider uppercase">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const SallyStoryScreen = () => {
    return (
      <div className="bg-white min-h-screen">
        {/* Story Header Hero with Parallax Background matching screenshot */}
        <div 
          className="relative h-[550px] bg-cover bg-center bg-fixed flex items-center"
          style={{ backgroundImage: `url(${sallyStory})` }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50 z-0"></div>
          
          {/* Title Container */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
            <button 
              onClick={() => navigate('home')}
              className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors"
            >
              <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
            </button>
            <div className="max-w-3xl">
              <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Sally's Story</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 tracking-tight drop-shadow-md">
                Lighting Futures: <br /> Sally's Story
              </h1>
              <p className="text-lg md:text-xl text-gray-200 font-bold max-w-2xl leading-relaxed">
                How Practical Solutions Changed One Family's Future
              </p>
            </div>
          </div>
        </div>

        {/* Block 1: Intro with image left and bullet points/text right */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Image */}
            <div className="rounded-[24px] overflow-hidden shadow-md">
              <img 
                src={cleanWater} 
                alt="Children in classroom" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
            {/* Right Content */}
            <div className="flex flex-col justify-between h-full">
              <div>
                {/* Blue Dot Bullet Points */}
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
                  <p>
                    Sally sat quietly on the edge of her bed, the soft sound of her children playing outside barely audible through the thin walls of their small home. It had been nearly a year since her husband passed away, leaving her alone to raise their three children. The days had blurred together, each filled with the same struggles: fetching water, preparing meals over a small fire, and doing her best to ensure her children stayed in school.
                  </p>
                  <p>
                    But as the sun set each evening, a wave of helplessness washed over her. Without electricity, their home was plunged into darkness. The children, eager to learn, couldn’t study once the sun went down. Amara, 12, and Tunde, 10, would sit by the fading light of a candle, trying to make out the words in their textbooks, while little Aisha, just 6, would curl up beside her mother, too young to understand why life had become so difficult.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Block 2: Middle section with text left and image right */}
        <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-gray-600 font-semibold text-[15px] leading-relaxed space-y-6">
              <p>
                Adding to their struggle, the house didn’t have a proper toilet. The lack of sanitation wasn’t just uncomfortable, it was dangerous, especially for the children. Every time they had to relieve themselves, they’d have to go outside, often in the middle of the night, to find a secluded spot. Sally worried constantly about their safety.
              </p>
              <p>
                One evening, as the candle’s flame flickered and dimmed, Amara set her book aside and sighed. “Mama,” she said, her voice full of frustration, “how can I study if I can’t even see?” Sally’s heart sank. She wanted to give her children everything, a better life, a brighter future, but she didn’t have the means. She had heard about an organization called Children for Life, known for helping families in need. With a spark of hope, Sally decided to approach them.
              </p>
              <div className="pt-4">
                <button 
                  onClick={() => navigate('donate')}
                  className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md inline-flex items-center space-x-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>BECOME A VOLUNTEER</span>
                </button>
              </div>
            </div>
            {/* Right Image */}
            <div className="rounded-[24px] overflow-hidden shadow-md">
              <img 
                src={cleanEnergy} 
                alt="Solar clinic panels" 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </section>

        {/* Block 3: U-GIRLS 2 / Sally's Story Updates Grid Section matching screenshot */}
        <section className="bg-[#eef8fc] py-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <h2 className="text-3xl font-black text-gray-900 mb-16 tracking-tight uppercase">
              Sally's Story Updates
            </h2>

            {/* Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center mb-16">
              {/* Left Image (cols 2) with Yellow Accent Shadow */}
              <div className="lg:col-span-2 relative">
                {/* Yellow shadow shifted behind */}
                <div className="absolute inset-0 bg-[#ffc72c] rounded-2xl translate-x-2.5 translate-y-2.5 -z-10"></div>
                <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-white">
                  <img 
                    src={sallyStory} 
                    alt="Sally story" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Right Content (cols 3) */}
              <div className="lg:col-span-3">
                <h3 className="text-2xl md:text-[28px] font-black text-gray-900 leading-snug mb-4 hover:text-[#005c7a] transition-colors">
                  How Children for Life stepped in to build a brighter future
                </h3>
                <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed mb-6">
                  The local Children for Life team visited Sally’s home, assessed their needs, and installed a solar power grid and a safe toilet. Amara can now study late into the evening, and the family has safe, private sanitation.
                </p>
                <button 
                  onClick={() => navigate('donate')}
                  className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-7 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                >
                  READ THIS STORY
                </button>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              {/* Left Image (cols 2) with Yellow Accent Shadow */}
              <div className="lg:col-span-2 relative">
                {/* Yellow shadow shifted behind */}
                <div className="absolute inset-0 bg-[#ffc72c] rounded-2xl translate-x-2.5 translate-y-2.5 -z-10"></div>
                <div className="rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-white">
                  <img 
                    src={monthlyGiving} 
                    alt="Community farm collective" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Right Content (cols 3) */}
              <div className="lg:col-span-3">
                <h3 className="text-2xl md:text-[28px] font-black text-gray-900 leading-snug mb-4 hover:text-[#005c7a] transition-colors">
                  A new sense of dignity and security for Sally's children
                </h3>
                <p className="text-gray-500 font-bold text-[14.5px] leading-relaxed mb-6">
                  With a private sanitation facility and solar lights, Sally no longer fears for her children’s safety in the dark. The family is healthy, comfortable, and thriving in their own community.
                </p>
                <button 
                  onClick={() => navigate('donate')}
                  className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-7 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                >
                  DONATE TODAY
                </button>
              </div>
            </div>

            {/* Call to Action Banner at bottom */}
            <div className="mt-20 border-t border-gray-200/50 pt-16 text-center">
              <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                Families like Sally's need your support today.
              </h3>
              <p className="text-gray-500 font-bold max-w-lg mx-auto mb-8 text-[15px]">
                Your donation helps Children for Life provide immediate, practical resources like solar power, sanitation facilities, and learning tools to children and mothers.
              </p>
              <button 
                onClick={() => navigate('donate')}
                className="bg-[#f37021] hover:bg-[#da621a] text-white px-10 py-4 rounded-full text-xs font-black uppercase tracking-wider shadow-md transition-colors"
              >
                DONATE NOW
              </button>
            </div>

          </div>
        </section>

      </div>
    );
  };

  const mainContentRef = useRef(null);

  useEffect(() => {
    if (mainContentRef.current) {
      gsap.killTweensOf(mainContentRef.current);
      gsap.fromTo(mainContentRef.current, 
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    }
  }, [currentScreen]);

  return (
    <div className="font-sans bg-gray-50 text-gray-900 antialiased selection:bg-[#f37021] selection:text-white">
      <Navigation />
      
      <main ref={mainContentRef} className="overflow-hidden">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'login' && <LoginScreen />}
        {currentScreen === 'donate' && <DonateScreen />}
        {currentScreen === 'sally-story' && <SallyStoryScreen />}
        {currentScreen === 'become-volunteer' && <BecomeVolunteerScreen />}
        {['see-placements', 'volunteer-faq', 'alumni', 'donate-monthly', 'donate-stocks', 'fundraise', 'leave-legacy', 'tribute-gifts', 'become-partner'].includes(currentScreen) && <ActionDetailScreen />}
        {['what-volunteering', 'what-gender', 'what-economic', 'what-climate', 'what-strategic'].includes(currentScreen) && <ProgramDetailScreen />}
        {currentScreen === 'about-who' && <AboutWhoScreen />}
        {['about-competencies', 'about-team', 'about-board', 'about-leadership', 'about-careers'].includes(currentScreen) && <AboutDetailScreen />}
        {currentScreen.startsWith('regions-') && <RegionDetailScreen />}
        {currentScreen === 'impact-stories' && <ImpactStoriesScreen />}
        {currentScreen === 'news' && <NewsScreen />}
        {currentScreen === 'publications' && <PublicationsScreen />}
        {currentScreen === 'accountability' && <AccountabilityScreen />}
      </main>

      <Footer />
    </div>
  );
}
