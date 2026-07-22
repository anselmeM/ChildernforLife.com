import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Leaf, ShieldCheck } from 'lucide-react';

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

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#007b9e] text-white pt-24 pb-12 border-t-[12px] border-[#005c7a]" role="contentinfo" aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          
          <div>
            <h4 className="font-extrabold mb-6 uppercase tracking-wider text-[13.5px] text-[#e0f2fe]">Take Action</h4>
            <ul className="space-y-4 text-[14.5px] font-bold text-blue-50/90">
              <li><button onClick={() => navigate('/volunteer')} className="hover:underline hover:text-white transition-all text-left">Become a Volunteer</button></li>
              <li><button onClick={() => navigate('/donate')} className="hover:underline hover:text-white transition-all text-left">Donate</button></li>
              <li><button onClick={() => navigate('/about/careers')} className="hover:underline hover:text-white transition-all text-left">Careers at Children for Life</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold mb-6 uppercase tracking-wider text-[13.5px] text-[#e0f2fe]">Stay Informed</h4>
            <ul className="space-y-4 text-[14.5px] font-bold text-blue-50/90">
              <li><button onClick={() => navigate('/programs/strategic')} className="hover:underline hover:text-white transition-all text-left">Strategic Plan 2026</button></li>
              <li><button onClick={() => navigate('/impact-stories')} className="hover:underline hover:text-white transition-all text-left">Stories</button></li>
              <li><button onClick={() => navigate('/news')} className="hover:underline hover:text-white transition-all text-left">News</button></li>
              <li><button onClick={() => navigate('/publications')} className="hover:underline hover:text-white transition-all text-left">Publications</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold mb-6 uppercase tracking-wider text-[13.5px] text-[#e0f2fe]">Connect</h4>
            <ul className="space-y-4 text-[14.5px] font-bold text-blue-50/90 mb-8">
              <li><a href="mailto:info@Childrenforlife.com" className="hover:underline hover:text-white transition-all">Contact Us</a></li>
              <li><button onClick={() => navigate('/about/leadership')} className="hover:underline hover:text-white transition-all text-left">Meet our leadership</button></li>
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
                onClick={() => navigate('/donate')}
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
}
