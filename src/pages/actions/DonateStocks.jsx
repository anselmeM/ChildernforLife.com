import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import sallyStory from '../../assets/sally_story.png';

export default function DonateStocks() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-[380px] bg-cover bg-center bg-fixed flex items-center" style={{ backgroundImage: `url(${sallyStory})` }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <button onClick={() => navigate('/')} className="inline-flex items-center text-[#ffc72c] hover:text-[#eebb22] font-black text-xs uppercase tracking-widest mb-6 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> Back to Home
          </button>
          <span className="text-[13px] font-black text-[#ffc72c] uppercase tracking-widest mb-3 block">Donate</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Donate Stocks & Securities</h1>
          <p className="text-base md:text-lg text-gray-200 font-bold max-w-2xl leading-relaxed">Maximize your charitable tax benefit</p>
        </div>
      </div>
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-gray-600 text-lg font-medium leading-relaxed">Donating appreciated securities (stocks, bonds, mutual funds) is one of the most tax-efficient ways to support Children for Life. You pay no capital gains tax on the transfer and receive a tax-deductible receipt for the full market value.</p>
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-150 space-y-4">
            <h3 className="text-xl font-black text-gray-900 mb-2">How to Complete a Transfer</h3>
            <ol className="list-decimal pl-6 space-y-3 text-gray-500 font-bold text-[14.5px] leading-relaxed">
              <li>Download our Transfer Notification Form.</li>
              <li>Instruct your broker to transfer the shares to Children for Life's brokerage account.</li>
              <li>Submit the notification form to our finance team to ensure your tax receipt is generated instantly.</li>
            </ol>
            <div className="pt-4">
              <a href="mailto:finance@childrenforlife.org" className="bg-[#008cb3] hover:bg-[#005c7a] text-white px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider inline-block">Request Form Details</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
