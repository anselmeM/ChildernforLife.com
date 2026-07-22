import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const Donate = () => {
  const [selectedTier, setSelectedTier] = useState('core');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams] = useSearchParams();
  const wasCancelled = searchParams.get('cancelled') === 'true';

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

  const handleDonation = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');

    const selectedTierObj = tiers.find(t => t.id === selectedTier);
    const amountInTZS = customAmount
      ? Number(customAmount)
      : (selectedTierObj ? selectedTierObj.value : 0);
    const amountInCents = Math.round(amountInTZS / 10);

    try {
      const origin = window.location.origin;
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInCents,
          currency: 'usd',
          frequency,
          tierName: customAmount ? 'Custom Donation' : (selectedTierObj ? selectedTierObj.name : 'Donation'),
          tierDesc: customAmount ? 'Custom amount donation' : (selectedTierObj ? selectedTierObj.focus : ''),
          successUrl: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${origin}/donate?cancelled=true`,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setErrorMessage('Unable to connect. Please try again later.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">

        {wasCancelled && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
            <p className="text-yellow-800 font-bold">Your donation was not completed. If you ran into an issue, please try again or contact us.</p>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-800 font-bold">{errorMessage}</p>
          </div>
        )}

        {/* Header Description */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm space-y-6">
          <div className="inline-flex items-center space-x-2 text-[#f37021] text-[11px] font-black tracking-widest uppercase bg-[#f37021]/15 px-3 py-1.5 rounded-full">
            <Heart className="w-3.5 h-3.5 fill-[#f37021]" />
            <span>SUPPORT A HOME</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
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
                  <span><strong>Quarterly Impact Updates:</strong> Review progress against the home's plan.</span>
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

export default Donate;
