import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageSEO from '../../components/PageSEO';
import ProgressBar from '../../components/ProgressBar';
import { campaigns } from '../../data/campaigns';

export default function Campaigns() {
  return (
    <div className="bg-white min-h-screen">
      <PageSEO
        title="Campaigns"
        description="Support a focused campaign — solar power, clean water, and girls' STEM scholarships — and watch the progress."
        path="/campaigns"
      />
      <div className="relative h-[260px] sm:h-[320px] lg:h-[380px] bg-cover bg-center bg-local md:bg-fixed flex items-center" style={{ backgroundImage: `url(${campaigns[0].img})` }}>
        <div className="absolute inset-0 bg-[#005c7a]/70 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 drop-shadow-md">Fundraising Campaigns</h1>
          <p className="text-base md:text-lg text-gray-100 font-bold max-w-2xl leading-relaxed">
            Focused projects with clear goals. Every dollar moves a visible progress bar — and a real community forward.
          </p>
        </div>
      </div>

      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.slug} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div>
                <Link to={`/campaigns/${campaign.slug}`}>
                  <picture>
                    <source srcSet={campaign.imgCard} type="image/webp" />
                    <img loading="lazy" src={campaign.img} alt={campaign.name} className="w-full h-48 object-cover" />
                  </picture>
                </Link>
                <div className="p-6">
                  <h2 className="text-lg font-black text-gray-900 mb-1">
                    <Link to={`/campaigns/${campaign.slug}`} className="hover:text-[#005c7a] transition-colors">{campaign.name}</Link>
                  </h2>
                  <p className="text-gray-500 font-semibold text-xs leading-relaxed mb-5">{campaign.tagline}</p>
                  <ProgressBar raised={campaign.raised} goal={campaign.goal} />
                </div>
              </div>
              <div className="p-6 pt-0 flex gap-3">
                <Link
                  to={`/donate?campaign=${campaign.slug}`}
                  className="flex-1 bg-[#f37021] text-white font-extrabold text-xs uppercase tracking-wider px-4 py-3 rounded-xl text-center hover:bg-[#da621a] transition-colors"
                >
                  Donate
                </Link>
                <Link
                  to={`/campaigns/${campaign.slug}`}
                  className="flex items-center justify-center gap-1 border border-[#005c7a] text-[#005c7a] font-extrabold text-xs uppercase tracking-wider px-4 py-3 rounded-xl hover:bg-[#005c7a] hover:text-white transition-colors"
                >
                  Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
