import { useNavigate, useParams, Link } from 'react-router-dom';
import { ChevronLeft, Heart } from 'lucide-react';
import PageSEO from '../../components/PageSEO';
import ProgressBar from '../../components/ProgressBar';
import { campaignBySlug } from '../../data/campaigns';

export default function CampaignDetail() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const campaign = campaignBySlug(slug);

  if (!campaign) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center px-4">
        <PageSEO title="Campaign Not Found" description="This campaign could not be found." path={`/campaigns/${slug || ''}`} />
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-black text-gray-900 mb-4">Campaign Not Found</h1>
          <p className="text-gray-500 font-semibold text-sm mb-8">This campaign may have ended or been removed.</p>
          <button onClick={() => navigate('/campaigns')} className="bg-[#005c7a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#004a63] text-xs uppercase tracking-widest">
            Back to Campaigns
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <PageSEO title={campaign.name} description={campaign.tagline} path={`/campaigns/${campaign.slug}`} image={campaign.img} />
      <div className="relative h-[300px] sm:h-[360px] lg:h-[420px] bg-cover bg-center bg-local md:bg-fixed flex items-end" style={{ backgroundImage: `url(${campaign.img})` }}>
        <div className="absolute inset-0 bg-[#005c7a]/70 z-0"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white pb-10">
          <button onClick={() => navigate('/campaigns')} className="inline-flex items-center text-white/80 hover:text-white font-black text-xs uppercase tracking-widest mb-4 transition-colors">
            <ChevronLeft size={16} className="mr-1 stroke-[3]" /> All Campaigns
          </button>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight drop-shadow-md leading-tight">{campaign.name}</h1>
          <p className="mt-4 text-base text-gray-100 font-bold max-w-2xl leading-relaxed">{campaign.tagline}</p>
        </div>
      </div>

      <div className="py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#f0f9fc] border border-[#005c7a]/15 rounded-3xl p-6 md:p-8 mb-10">
          <ProgressBar raised={campaign.raised} goal={campaign.goal} />
          <Link
            to={`/donate?campaign=${campaign.slug}`}
            className="mt-5 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f37021] text-white font-extrabold text-sm px-8 py-4 rounded-xl hover:bg-[#da621a] transition-colors shadow-sm uppercase tracking-wider"
          >
            <Heart className="w-4 h-4 fill-white" /> Donate to this campaign
          </Link>
          <p className="mt-3 text-[11px] text-gray-500 font-semibold">
            Your gift is tagged with this campaign and appears in the total above.
          </p>
        </div>

        {campaign.body.map((paragraph, i) => (
          <p key={i} className="text-gray-600 leading-relaxed text-base mb-6">{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
