// Donation tiers for the /donate page.
//
// UNIT CONVENTION: `value` is the tier price in TZS and is the authoritative
// number — it is what the donor is charged. The `usd` string is a derived,
// approximate label converted at TZS_PER_USD. The two are kept honest by
// src/test/DonateTiers.test.js, which asserts that `value / TZS_PER_USD` equals
// the dollar figure printed in `usd`, so a typo in either one fails the suite.
//
// api/create-checkout-session.js re-validates every amount server-side and is
// the real source of truth for the accepted range. The bounds below exist only
// so the donor gets an immediate, friendly error instead of a round-trip 400.

export const TZS_PER_USD = 2500;

// Keep in sync with MIN_AMOUNT_CENTS / MAX_AMOUNT_CENTS in
// api/create-checkout-session.js — asserted by DonateTiers.test.js.
export const MIN_DONATION_USD = 1;
export const MAX_DONATION_USD = 100000;
export const MIN_DONATION_TZS = MIN_DONATION_USD * TZS_PER_USD;
export const MAX_DONATION_TZS = MAX_DONATION_USD * TZS_PER_USD;

export const donationTiers = [
  {
    id: 'starter',
    name: 'Starter Support',
    tzs: 'TZS 250,000',
    usd: 'US$100 approx.',
    value: 250000,
    focus: 'Hygiene & basic learning needs',
    desc: 'Hygiene supplies (soap, detergents, sanitary pads), safe water refills/filters (where needed), and basic learning materials (exercise books, pens).',
  },
  {
    id: 'core',
    name: 'Core Care',
    tzs: 'TZS 500,000',
    usd: 'US$200 approx.',
    value: 500000,
    focus: 'Food top-up & hygiene & minor fixes',
    desc: 'Food top-up (staples/proteins), hygiene & cleaning supplies, and minor facility maintenance (locks, lighting, small repairs).',
  },
  {
    id: 'foundation',
    name: 'Strong Foundation',
    tzs: 'TZS 1,000,000',
    usd: 'US$400 approx.',
    value: 1000000,
    focus: 'Integrated child wellbeing support',
    desc: 'Food & hygiene, basic health support (clinic visits/essential items where appropriate), and education support (uniforms, supplies, transport/fees where applicable).',
  },
  {
    id: 'whole',
    name: 'Whole Home Sponsor',
    tzs: 'TZS 2,500,000',
    usd: 'US$1,000 approx.',
    value: 2500000,
    focus: 'Full, tailored home plan',
    desc: 'A tailored package based on a joint plan across nutrition, health, education, protection & dignity, and basic improvements (water access, sleeping materials, safe spaces).',
  },
];

export const donationTierById = (id) => donationTiers.find((tier) => tier.id === id);

// TZS is a zero-decimal currency, so every whole shilling converts cleanly to a
// whole number of US cents at this rate.
export function tzsToUsdCents(tzs) {
  return Math.round((tzs / TZS_PER_USD) * 100);
}

// Validates the raw string from the custom-amount <input type="number">.
// Returns { valid: true, tzs, amountInCents } or { valid: false, error }.
export function validateCustomTzs(raw) {
  const text = String(raw ?? '').trim();

  if (!text) {
    return { valid: false, error: 'Enter an amount in TZS.' };
  }

  const tzs = Number(text);

  if (!Number.isFinite(tzs)) {
    return { valid: false, error: 'Enter a valid amount in TZS.' };
  }
  if (!Number.isInteger(tzs)) {
    return { valid: false, error: 'Enter a whole number of TZS — the shilling has no cents.' };
  }
  if (tzs < MIN_DONATION_TZS) {
    return {
      valid: false,
      error: `The minimum gift is TZS ${MIN_DONATION_TZS.toLocaleString()} (about US$${MIN_DONATION_USD}).`,
    };
  }
  if (tzs > MAX_DONATION_TZS) {
    return {
      valid: false,
      error: `The maximum single gift is TZS ${MAX_DONATION_TZS.toLocaleString()} (about US$${MAX_DONATION_USD.toLocaleString()}).`,
    };
  }

  return { valid: true, tzs, amountInCents: tzsToUsdCents(tzs) };
}
