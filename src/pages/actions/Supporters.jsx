import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import PageSEO from '../../components/PageSEO';
import CountUp from '../../components/CountUp';
import { impactStats } from '../../data/impactStats';
import { donorMilestones } from '../../data/donorWall';
import monthlyGiving from '../../assets/monthly_giving.jpg';

const totalRaised = donorMilestones.reduce((sum, m) => sum + m.amount, 0);

export default function Supporters() {
  return (
    <div className="bg-white min-h-screen">
      <PageSEO
        title="Wall of Support"
        description="The donors and supporters who make Children for Life's work possible. Thank you for every gift."
        path="/supporters"
      />
      <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] bg-cover bg-center bg-local md:bg-fixed flex items-center" style={{ backgroundImage: `url(${monthlyGiving})` }}>
        <div className="absolute inset-0 bg-[#005c7a]/70 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Wall of Support</h1>
          <p className="text-base md:text-lg text-gray-100 font-bold max-w-2xl leading-relaxed">
            Every gift — large or small — changes a child's future. This wall celebrates the milestones our supporters have made possible.
          </p>
        </div>
      </div>

      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f0f9fc] border border-[#005c7a]/15 rounded-3xl p-8 md:p-12 text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[#f37021] text-[11px] font-black tracking-widest uppercase bg-[#f37021]/15 px-3 py-1.5 rounded-full mb-4">
            <Heart className="w-3.5 h-3.5 fill-[#f37021]" /> Thank you
          </div>
          <div className="text-5xl sm:text-6xl font-black text-[#005c7a] mb-3">
            <CountUp value={totalRaised} suffix="" /> USD
          </div>
          <p className="text-gray-500 font-semibold text-sm">celebrated milestones on this wall — and counting</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200 mb-16">
          {impactStats.map((stat) => (
            <div key={stat.label} className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f37021] mb-2">
                <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
              </div>
              <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider px-4">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donorMilestones.map((milestone, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-2xl font-black text-[#005c7a]">${milestone.amount.toLocaleString()}</span>
                {milestone.when && <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider">{milestone.when}</span>}
              </div>
              <p className="text-gray-700 font-semibold text-sm leading-relaxed mb-2">{milestone.label}</p>
              {milestone.campaign && (
                <Link to={`/campaigns/${milestone.campaign.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`} className="text-[11px] font-black text-[#f37021] uppercase tracking-wider hover:underline">
                  {milestone.campaign}
                </Link>
              )}
              <p className="text-[11px] text-gray-400 font-bold mt-2">{milestone.donor}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 font-semibold mt-10">
          Donor privacy comes first — supporters are listed only with their consent.
        </p>
      </section>
    </div>
  );
}
