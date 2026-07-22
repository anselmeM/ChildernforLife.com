import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Menu, X, Heart, ChevronDown, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

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
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm h-16 lg:h-36 flex flex-col justify-end relative" role="navigation" aria-label="Main navigation">
    
    {/* Desktop Utility Bar */}
    <div className="absolute top-0 right-0 left-1/2 h-12 bg-[#e1f3f8] rounded-l-full hidden lg:flex items-center pl-8 pr-12 text-[13.5px] font-extrabold text-[#005a74] tracking-wide shadow-sm z-10">
      <div className="relative group/about py-1">
        <button className="hover:text-[#008cb3] transition-colors flex items-center cursor-pointer whitespace-nowrap">
          About Us <ChevronDown size={13} className="ml-0.5 text-[#005a74] stroke-[2.5]" />
        </button>
        <div className="absolute left-0 mt-2 w-[240px] bg-white border border-[#005c7a] rounded-xl shadow-xl p-4 hidden group-hover/about:flex flex-col space-y-2.5 z-50 normal-case text-left text-[16.94px] text-[#005c7a] font-bold">
          <div className="absolute top-[-12px] left-0 right-0 h-3 bg-transparent"></div>
          <button onClick={() => navigate('/about/who')} className="text-left hover:underline transition-all">Who We Are</button>
          <button onClick={() => navigate('/programs/volunteering')} className="text-left hover:underline transition-all">What We Do</button>
          <button onClick={() => navigate('/about/competencies')} className="text-left hover:underline transition-all">Core Competencies</button>
          <button onClick={() => navigate('/about/team')} className="text-left hover:underline transition-all">Meet our team</button>
          <button onClick={() => navigate('/about/board')} className="text-left hover:underline transition-all">Our Board</button>
          <button onClick={() => navigate('/about/leadership')} className="text-left hover:underline transition-all">Our Leadership</button>
          <button onClick={() => navigate('/about/careers')} className="text-left hover:underline transition-all">Careers</button>
        </div>
      </div>
      <span className="text-gray-300 px-3.5">|</span>
      <button onClick={() => navigate('/impact-stories')} className="hover:text-[#008cb3] transition-colors whitespace-nowrap">Impact Stories</button>
      <span className="text-gray-300 px-3.5">|</span>
      <button onClick={() => navigate('/news')} className="hover:text-[#008cb3] transition-colors">News</button>
      <span className="text-gray-300 px-3.5">|</span>
      <button onClick={() => navigate('/publications')} className="hover:text-[#008cb3] transition-colors">Publications</button>
      <span className="text-gray-300 px-3.5">|</span>
      <button onClick={() => navigate('/accountability')} className="hover:text-[#008cb3] transition-colors">Accountability</button>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-2 lg:pb-4">
      <div className="flex justify-between items-center h-16 lg:h-20">
        
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-xl sm:text-3xl lg:text-4xl font-black text-[#005c7a] tracking-tight">Children</span>
            <span className="text-sm sm:text-lg lg:text-2xl font-light text-gray-500 mt-0.5 lg:mt-1.5">for Life</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
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
                <div className="absolute top-[-16px] left-0 right-0 h-4 bg-transparent"></div>
                <button onClick={() => navigate('/volunteer')} className="text-left hover:underline transition-all">Volunteering</button>
                <button onClick={() => navigate('/programs/gender')} className="text-left hover:underline transition-all">Gender Equality & Social Inclusion</button>
                <button onClick={() => navigate('/programs/economic')} className="text-left hover:underline transition-all">Improving Economic Resilience</button>
                <button onClick={() => navigate('/programs/climate')} className="text-left hover:underline transition-all">Advancing Climate Action</button>
                <button onClick={() => navigate('/programs/strategic')} className="text-left hover:underline transition-all">Our Strategic Plan</button>
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
                <div className="absolute top-[-16px] left-0 right-0 h-4 bg-transparent"></div>
                <div className="flex flex-col space-y-2.5 text-[16.94px] text-[#005c7a] font-bold border-b border-[#005c7a]/25 pb-3">
                  <button onClick={() => navigate('/regions/glance')} className="text-left hover:underline transition-all">Our Work At A Glance</button>
                  <button onClick={() => navigate('/regions/where')} className="text-left hover:underline transition-all">Where We Work</button>
                </div>
                
                <div className="text-[16.94px] text-[#005c7a] font-bold">
                  <div className="text-[16.94px] font-black text-gray-400 uppercase tracking-widest mb-2">Africa</div>
                  <div className="flex flex-col space-y-2.5">
                    <button onClick={() => navigate('/regions/benin')} className="text-left hover:underline transition-all">Benin</button>
                    <button onClick={() => navigate('/regions/cameroon')} className="text-left hover:underline transition-all">Cameroon</button>
                    <button onClick={() => navigate('/regions/congo')} className="text-left hover:underline transition-all">DR Congo</button>
                    <button onClick={() => navigate('/regions/ethiopia')} className="text-left hover:underline transition-all">Ethiopia</button>
                    <button onClick={() => navigate('/regions/nigeria')} className="text-left hover:underline transition-all">Nigeria</button>
                    <button onClick={() => navigate('/regions/tanzania')} className="text-left hover:underline transition-all">Tanzania</button>
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
                <div className="absolute top-[-16px] left-0 right-0 h-4 bg-transparent"></div>
                <div className="border-r border-[#005c7a]/30 pr-6">
                  <div className="text-[16.94px] font-black text-[#005c7a] uppercase tracking-wider mb-4">Volunteer</div>
                  <div className="flex flex-col space-y-3.5 text-[16.94px] text-[#005c7a] font-bold">
                    <button onClick={() => navigate('/placements')} className="text-left hover:underline transition-all">See Current Placements</button>
                    <button onClick={() => navigate('/volunteer')} className="text-left hover:underline transition-all">Become A Volunteer</button>
                    <button onClick={() => navigate('/volunteer-faq')} className="text-left hover:underline transition-all">Volunteer FAQ</button>
                    <button onClick={() => navigate('/alumni')} className="text-left hover:underline transition-all">Alumni</button>
                  </div>
                </div>
                
                <div className="pl-6">
                  <div className="text-[16.94px] font-black text-[#005c7a] uppercase tracking-wider mb-4">Donate</div>
                  <div className="flex flex-col space-y-3.5 text-[16.94px] text-[#005c7a] font-bold">
                    <button onClick={() => navigate('/donate')} className="text-left hover:underline transition-all">Make A One-Time Gift</button>
                    <button onClick={() => navigate('/donate/monthly')} className="text-left hover:underline transition-all">Donate Monthly</button>
                    <button onClick={() => navigate('/donate/stocks')} className="text-left hover:underline transition-all">Donate Stocks Or Securities</button>
                    <button onClick={() => navigate('/fundraise')} className="text-left hover:underline transition-all">Fundraise With Us</button>
                    <button onClick={() => navigate('/leave-legacy')} className="text-left hover:underline transition-all">Leave A Legacy</button>
                    <button onClick={() => navigate('/tribute-gifts')} className="text-left hover:underline transition-all">Tribute Gifts</button>
                    <button onClick={() => navigate('/partner')} className="text-left hover:underline transition-all">Become A Partner</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pill Action Buttons */}
          <div className="flex items-center space-x-4 text-[14px] font-black tracking-wider uppercase">
            <button className="bg-[#9dc84a] hover:bg-[#8bb43d] text-gray-900 px-8 py-3.5 rounded-full flex items-center space-x-2 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-0.5">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3l.7.8M22 12.5a10 10 0 0 1-18.8 4.2l-.7-.8" />
              </svg>
              <span>Volunteer</span>
            </button>
            
            <button 
              onClick={() => navigate('/donate')}
              className="bg-[#ffc72c] hover:bg-[#eebb22] text-gray-900 px-8 py-3.5 rounded-full flex items-center space-x-2 shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Heart className="w-5 h-5 mr-0.5 fill-gray-900 stroke-gray-900" />
              <span>Donate</span>
            </button>
          </div>

        </div>

        {/* Mobile CTA Buttons */}
        <div className="lg:hidden flex items-center space-x-2">
          <button 
            onClick={() => { navigate('/donate'); setIsMobileMenuOpen(false); }}
            className="bg-[#ffc72c] hover:bg-[#eebb22] text-gray-900 font-extrabold px-4 py-2 rounded-full text-xs uppercase tracking-wider flex items-center shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 mr-1 fill-gray-900 stroke-gray-900" />
            Donate
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 p-2" aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
      </div>
    </div>

    {/* Mobile Menu Overlay */}
    <div 
      className={`lg:hidden fixed inset-0 top-16 bg-black/50 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={() => setIsMobileMenuOpen(false)}
      aria-hidden="true"
    />

    {/* Mobile Menu Panel */}
    <div className={`lg:hidden fixed top-16 right-0 h-[calc(100vh-64px)] w-full sm:max-w-sm bg-white z-50 shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="px-6 pt-6 pb-10 space-y-6">
        
        <div>
          <span className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">What We Do</span>
          <div className="flex flex-col space-y-1">
            <button onClick={() => { navigate('/volunteer'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Volunteering</span><ChevronRight size={16} className="text-gray-300" /></button>
            <button onClick={() => { navigate('/programs/gender'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Gender Equality & Social Inclusion</span><ChevronRight size={16} className="text-gray-300 shrink-0 ml-2" /></button>
            <button onClick={() => { navigate('/programs/economic'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Improving Economic Resilience</span><ChevronRight size={16} className="text-gray-300 shrink-0 ml-2" /></button>
            <button onClick={() => { navigate('/programs/climate'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Advancing Climate Action</span><ChevronRight size={16} className="text-gray-300 shrink-0 ml-2" /></button>
            <button onClick={() => { navigate('/programs/strategic'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Our Strategic Plan</span><ChevronRight size={16} className="text-gray-300 shrink-0 ml-2" /></button>
          </div>
        </div>

        <div>
          <span className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">About Us</span>
          <div className="flex flex-col space-y-1">
            <button onClick={() => { navigate('/about/who'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Who We Are</span><ChevronRight size={16} className="text-gray-300" /></button>
            <button onClick={() => { navigate('/about/competencies'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Core Competencies</span><ChevronRight size={16} className="text-gray-300" /></button>
            <button onClick={() => { navigate('/about/team'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Meet Our Team</span><ChevronRight size={16} className="text-gray-300" /></button>
            <button onClick={() => { navigate('/about/board'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Our Board</span><ChevronRight size={16} className="text-gray-300" /></button>
            <button onClick={() => { navigate('/about/leadership'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Our Leadership</span><ChevronRight size={16} className="text-gray-300" /></button>
            <button onClick={() => { navigate('/about/careers'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Careers</span><ChevronRight size={16} className="text-gray-300" /></button>
          </div>
        </div>

        <div>
          <span className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Regions We Serve</span>
          <div className="flex flex-col space-y-1">
            <button onClick={() => { navigate('/regions/glance'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Our Work At A Glance</span><ChevronRight size={16} className="text-gray-300" /></button>
            <button onClick={() => { navigate('/regions/where'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Where We Work</span><ChevronRight size={16} className="text-gray-300" /></button>
            <button onClick={() => { navigate('/regions/tanzania'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Tanzania, Benin & more</span><ChevronRight size={16} className="text-gray-300" /></button>
          </div>
        </div>

        <div className="pt-1 border-t border-gray-100">
          <div className="flex flex-col space-y-1 pt-3">
            <button onClick={() => { navigate('/impact-stories'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Impact Stories</span><ChevronRight size={16} className="text-gray-300" /></button>
            <button onClick={() => { navigate('/news'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>News</span><ChevronRight size={16} className="text-gray-300" /></button>
            <button onClick={() => { navigate('/publications'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Publications</span><ChevronRight size={16} className="text-gray-300" /></button>
            <button onClick={() => { navigate('/accountability'); setIsMobileMenuOpen(false); }} className="flex items-center justify-between text-left py-2.5 text-base font-semibold text-gray-800 hover:text-[#005c7a] border-b border-gray-100"><span>Accountability</span><ChevronRight size={16} className="text-gray-300" /></button>
          </div>
        </div>

        <div>
          <span className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Take Action</span>
          <div className="space-y-4">
            <div>
              <span className="block text-xs font-black text-[#8bb43d] uppercase tracking-wider mb-1.5">Volunteer</span>
              <div className="flex flex-col space-y-1">
                <button onClick={() => { navigate('/placements'); setIsMobileMenuOpen(false); }} className="text-left py-2.5 text-sm font-semibold text-gray-700 hover:text-[#005c7a] border-b border-gray-100">See Current Placements</button>
                <button onClick={() => { navigate('/volunteer'); setIsMobileMenuOpen(false); }} className="text-left py-2.5 text-sm font-semibold text-gray-700 hover:text-[#005c7a] border-b border-gray-100">Become A Volunteer</button>
                <button onClick={() => { navigate('/volunteer-faq'); setIsMobileMenuOpen(false); }} className="text-left py-2.5 text-sm font-semibold text-gray-700 hover:text-[#005c7a] border-b border-gray-100">Volunteer FAQ</button>
                <button onClick={() => { navigate('/alumni'); setIsMobileMenuOpen(false); }} className="text-left py-2.5 text-sm font-semibold text-gray-700 hover:text-[#005c7a] border-b border-gray-100">Alumni</button>
              </div>
            </div>
            <div>
              <span className="block text-xs font-black text-[#f37021] uppercase tracking-wider mb-1.5">Donate</span>
              <div className="flex flex-col space-y-1">
                <button onClick={() => { navigate('/donate'); setIsMobileMenuOpen(false); }} className="text-left py-2.5 text-sm font-semibold text-gray-700 hover:text-[#005c7a] border-b border-gray-100">Make A One-Time Gift</button>
                <button onClick={() => { navigate('/donate/monthly'); setIsMobileMenuOpen(false); }} className="text-left py-2.5 text-sm font-semibold text-gray-700 hover:text-[#005c7a] border-b border-gray-100">Donate Monthly</button>
                <button onClick={() => { navigate('/donate/stocks'); setIsMobileMenuOpen(false); }} className="text-left py-2.5 text-sm font-semibold text-gray-700 hover:text-[#005c7a] border-b border-gray-100">Donate Stocks Or Securities</button>
                <button onClick={() => { navigate('/fundraise'); setIsMobileMenuOpen(false); }} className="text-left py-2.5 text-sm font-semibold text-gray-700 hover:text-[#005c7a] border-b border-gray-100">Fundraise With Us</button>
                <button onClick={() => { navigate('/leave-legacy'); setIsMobileMenuOpen(false); }} className="text-left py-2.5 text-sm font-semibold text-gray-700 hover:text-[#005c7a] border-b border-gray-100">Leave A Legacy</button>
                <button onClick={() => { navigate('/tribute-gifts'); setIsMobileMenuOpen(false); }} className="text-left py-2.5 text-sm font-semibold text-gray-700 hover:text-[#005c7a] border-b border-gray-100">Tribute Gifts</button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
          {user ? (
            <button onClick={() => setUser(null)} className="w-full text-left py-2.5 text-base font-semibold text-[#005c7a]">Log out</button>
          ) : (
            <button onClick={() => navigate('/login')} className="w-full text-left py-2.5 text-base font-semibold text-[#005c7a]">Log in</button>
          )}
          <button onClick={() => { navigate('/volunteer'); setIsMobileMenuOpen(false); }} className="w-full bg-[#9dc84a] hover:bg-[#8bb43d] text-gray-900 py-3 rounded-full font-extrabold text-sm uppercase tracking-wider">Become a Volunteer</button>
          <button onClick={() => { navigate('/donate'); setIsMobileMenuOpen(false); }} className="w-full bg-[#ffc72c] hover:bg-[#eebb22] text-gray-900 py-3 rounded-full font-extrabold text-sm uppercase tracking-wider">Donate</button>
        </div>
      </div>
    </div>
  </nav>
  );
}
