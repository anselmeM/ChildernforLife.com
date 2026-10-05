import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { useLocation, useSearchParams } from 'react-router-dom';
import PageSEO from '../components/PageSEO';
import MatchingGiftForm from '../components/MatchingGiftForm';
import GiftAidForm from '../components/GiftAidForm';
import CryptoGiving from '../components/CryptoGiving';
import { useI18n } from '../i18n/useI18n';
import { campaignBySlug } from '../data/campaigns';
import {
  donationTiers,
  donationTierById,
  tzsToUsdCents,
  validateCustomTzs,
  TZS_PER_USD,
  MIN_DONATION_TZS,
  MAX_DONATION_TZS,
} from '../data/donationTiers';

const CUSTOM_AMOUNT_ID = 'custom-tzs-amount';
const CUSTOM_AMOUNT_ERROR_ID = 'custom-tzs-amount-error';

const Donate = () => {
  const { t } = useI18n();
  const location = useLocation();
  const { tribute, amountUsd } = location.state || {};
  const [selectedTier, setSelectedTier] = useState('core');
  const [customAmount, setCustomAmount] = useState(() =>
    typeof amountUsd === 'number' && amountUsd > 0 ? String(Math.round(amountUsd * TZS_PER_USD)) : '',
  );
  const [frequency, setFrequency] = useState(() => (location.state?.frequency || 'monthly'));
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const wasCancelled = searchParams.get('cancelled') === 'true';
  const campaignSlug = searchParams.get('campaign');
  const campaign = campaignBySlug(campaignSlug);

  // An empty field means "no custom amount" — use the selected tier. Any typed
  // value (including "0") must pass validation before it can be charged.
  const hasCustomAmount = customAmount.trim() !== '';
  const customCheck = hasCustomAmount ? validateCustomTzs(customAmount) : null;
  const customError = customCheck && !customCheck.valid ? customCheck.error : '';
  const isTierSelected = (tierId) => selectedTier === tierId && !hasCustomAmount;

  const selectedTierObj = donationTierById(selectedTier);
  const displayAmountText = hasCustomAmount
    ? (customCheck.valid ? `TZS ${customCheck.tzs.toLocaleString()}` : 'TZS —')
    : (selectedTierObj ? `${selectedTierObj.tzs} (${selectedTierObj.usd})` : 'TZS 0');
  const submitDisabled = isProcessing || (hasCustomAmount && !customCheck.valid);

  const handleDonation = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (hasCustomAmount && !customCheck.valid) {
      document.getElementById(CUSTOM_AMOUNT_ID)?.focus();
      return;
    }

    const amountInCents = hasCustomAmount
      ? customCheck.amountInCents
      : tzsToUsdCents(selectedTierObj?.value ?? 0);
    const tierName = hasCustomAmount ? 'Custom Donation' : (selectedTierObj?.name ?? 'Donation');
    const tierDesc = hasCustomAmount ? 'Custom amount donation' : (selectedTierObj?.focus ?? '');

    setIsProcessing(true);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInCents,
          currency: 'usd',
          frequency,
          campaign: campaign ? campaign.slug : '',
          tribute,
          tierName,
          tierDesc,
        }),
      });

      const data = await res.json().catch(() => ({}));
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
      <PageSEO title="Donate" description="Support vulnerable children across Africa. Choose a donation tier and make a difference today." path="/donate" />
      <div className="max-w-7xl mx-auto space-y-12">

        {wasCancelled && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
            <p className="text-yellow-800 font-bold">Your donation was not completed. If you ran into an issue, please try again or contact us.</p>
          </div>
        )}

        {tribute && tribute.honoree && (
          <div className="bg-[#fff7ed] border border-[#f37021]/30 rounded-2xl p-5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 bg-[#f37021]/15 text-[#f37021] rounded-full flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 fill-[#f37021]" />
              </span>
              <div>
                <p className="text-[10px] font-black text-[#f37021] uppercase tracking-widest">Tribute gift</p>
                <p className="font-black text-gray-900 text-sm">In honor of {tribute.honoree}</p>
                {tribute.recipientName && <p className="text-gray-500 font-semibold text-xs mt-0.5">Notification card to {tribute.recipientName}</p>}
              </div>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <p className="text-red-800 font-bold">{errorMessage}</p>
          </div>
        )}

        {campaign && (
          <div className="bg-[#f0f9fc] border border-[#005c7a]/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 bg-[#f37021]/15 text-[#f37021] rounded-full flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 fill-[#f37021]" />
              </span>
              <div>
                <p className="text-[10px] font-black text-[#005c7a] uppercase tracking-widest">Supporting campaign</p>
                <p className="font-black text-gray-900 text-sm">
                  {campaign.name}
                  {campaign.goal - campaign.raised > 0 ? (
                    <span className="font-semibold text-gray-500"> — ${(campaign.goal - campaign.raised).toLocaleString()} to go</span>
                  ) : (
                    <span className="font-semibold text-green-600"> — goal reached, thank you!</span>
                  )}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSearchParams({}, { replace: true })}
              className="inline-flex items-center gap-1 text-[11px] font-black text-gray-400 uppercase tracking-wider hover:text-gray-600 shrink-0"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
        )}

        {/* Header Description */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm space-y-6">
          <div className="inline-flex items-center space-x-2 text-[#f37021] text-[11px] font-black tracking-widest uppercase bg-[#f37021]/15 px-3 py-1.5 rounded-full">
            <Heart className="w-3.5 h-3.5 fill-[#f37021]" />
            <span>{t('donate.supportHome')}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
            {t('donate.title')}
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
              <h2 className="text-lg font-black text-gray-900">{t('donate.choosePath')}</h2>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('donate.selectTier')}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {donationTiers.map(tier => (
                <button
                  type="button"
                  key={tier.id}
                  onClick={() => {
                    setSelectedTier(tier.id);
                    setCustomAmount('');
                  }}
                  aria-pressed={isTierSelected(tier.id)}
                  className={`text-left bg-white border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[210px] h-auto ${
                    isTierSelected(tier.id)
                      ? 'border-2 border-[#f37021] ring-4 ring-[#f37021]/10 bg-orange-50/5'
                      : 'border-gray-200 hover:border-[#005c7a]'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-lora font-black text-gray-900 text-sm">{tier.name}</h3>
                      {isTierSelected(tier.id) && (
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
                </button>
              ))}
            </div>

            {/* What your support funds description */}
            <div className="bg-[#f0f9fc]/85 border border-[#005c7a]/15 rounded-3xl p-6 space-y-3.5">
              <h3 className="font-lora text-[12.5px] uppercase font-black text-[#005c7a] tracking-wider">What your support funds:</h3>
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
                <h2 className="text-lg font-black text-gray-900 mb-1">{t('donate.donationDetails')}</h2>
                <p className="text-gray-400 font-semibold text-[11px]">{t('donate.secureCheckout')}</p>
              </div>

              {/* Frequency selector */}
              <fieldset className="space-y-2">
                <legend className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('donate.sponsorshipType')}</legend>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={frequency === 'monthly'}
                    onClick={() => setFrequency('monthly')}
                    className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      frequency === 'monthly'
                        ? 'bg-[#005c7a] text-white shadow-sm'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {t('donate.monthly')}
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={frequency === 'one-off'}
                    onClick={() => setFrequency('one-off')}
                    className={`py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      frequency === 'one-off'
                        ? 'bg-[#005c7a] text-white shadow-sm'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {t('donate.oneOff')}
                  </button>
                </div>
              </fieldset>

              {/* Selected tier / custom amount display */}
              <div className="space-y-3.5 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-400">{t('donate.totalGift')}</span>
                  <span className="text-[#005c7a] font-black">{displayAmountText}</span>
                </div>

                {/* Custom Amount input */}
                <div>
                  <label htmlFor={CUSTOM_AMOUNT_ID} className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{t('donate.customTzs')}</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-gray-400 font-bold text-xs">TZS</span>
                    <input
                      id={CUSTOM_AMOUNT_ID}
                      type="number"
                      inputMode="numeric"
                      min={MIN_DONATION_TZS}
                      max={MAX_DONATION_TZS}
                      step={1}
                      placeholder="e.g. 150000"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      aria-invalid={customError ? true : undefined}
                      aria-describedby={customError ? CUSTOM_AMOUNT_ERROR_ID : undefined}
                      className={`w-full border rounded-xl pl-11 pr-2 py-3 text-xs font-bold focus:outline-none ${
                        customError ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#005c7a]'
                      }`}
                    />
                  </div>
                  {customError && (
                    <p id={CUSTOM_AMOUNT_ERROR_ID} role="alert" className="mt-1.5 text-[11px] font-bold text-red-600">
                      {customError}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitDisabled}
                className="w-full bg-[#f37021] text-white font-extrabold text-sm py-4 rounded-xl hover:bg-[#da621a] transition-colors shadow-sm flex items-center justify-center disabled:opacity-70 uppercase tracking-wider"
              >
                {isProcessing
                  ? t('donate.processing')
                  : customError
                    ? 'Enter a valid TZS amount'
                    : `${t('donate.confirmGift')} ${displayAmountText}`}
              </button>
            </form>

            {/* Transparency & updates widget */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="font-lora text-[12.5px] uppercase font-black text-[#005c7a] tracking-wider border-b border-gray-100 pb-2">Transparency & Updates</h3>
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
              <h3 className="font-lora text-[12.5px] uppercase font-black text-[#005c7a] tracking-wider border-b border-gray-100 pb-2">Other Ways You Can Support</h3>
              <div className="space-y-3.5 text-xs font-semibold text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="text-[#f37021] mr-1 mt-0.5">•</span>
                  <div>
                    <h4 className="font-extrabold text-gray-900 mb-0.5">Partner With Us</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">Collaborate with CFL to deliver specialized community programs or build local alliances.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-[#f37021] mr-1 mt-0.5">•</span>
                  <div>
                    <h4 className="font-extrabold text-gray-900 mb-0.5">Be a Community Champion</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">Host a local fundraiser, volunteer, or advocate in your region to raise support.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Employer matching gift */}
            <MatchingGiftForm />

            {/* Tax receipt / Gift Aid */}
            <GiftAidForm />

            {/* Crypto giving */}
            <CryptoGiving />

          </div>

        </div>

      </div>
    </div>
  );
};

export default Donate;
