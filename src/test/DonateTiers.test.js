import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  donationTiers,
  donationTierById,
  tzsToUsdCents,
  validateCustomTzs,
  TZS_PER_USD,
  MIN_DONATION_TZS,
  MAX_DONATION_TZS,
  MIN_DONATION_USD,
  MAX_DONATION_USD,
} from '../data/donationTiers';

// The dollar figure printed on a tier card, e.g. "US$1,000 approx." -> 1000.
function usdFromLabel(label) {
  const match = label.match(/US\$([\d,]+)/);
  if (!match) throw new Error(`Tier card USD label is not parseable: "${label}"`);
  return Number(match[1].replace(/,/g, ''));
}

describe('donation tiers', () => {
  it('charges exactly what each tier card advertises', () => {
    for (const tier of donationTiers) {
      expect(
        tzsToUsdCents(tier.value),
        `${tier.name} advertises ${tier.usd} but charges ${tzsToUsdCents(tier.value) / 100} USD`,
      ).toBe(usdFromLabel(tier.usd) * 100);
    }
  });

  it('prints each tier TZS amount from its authoritative value', () => {
    for (const tier of donationTiers) {
      expect(tier.tzs).toBe(`TZS ${tier.value.toLocaleString('en-US')}`);
    }
  });

  it('has unique ids that resolve through donationTierById', () => {
    const ids = donationTiers.map((tier) => tier.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const tier of donationTiers) {
      expect(donationTierById(tier.id)).toBe(tier);
    }
    expect(donationTierById('does-not-exist')).toBeUndefined();
  });

  it('keeps the client amount bounds in lockstep with the checkout API', () => {
    const source = readFileSync(
      join(process.cwd(), 'api', 'create-checkout-session.js'),
      'utf8',
    );
    const apiBound = (name) => {
      const match = source.match(new RegExp(`${name} = ([\\d_]+)`));
      if (!match) throw new Error(`Could not read ${name} from api/create-checkout-session.js`);
      return Number(match[1].replace(/_/g, ''));
    };

    // The client's TZS bounds must convert to the API's cents bounds, or a
    // donor would pass client validation and still be rejected by the server.
    expect(tzsToUsdCents(MIN_DONATION_TZS)).toBe(apiBound('MIN_AMOUNT_CENTS'));
    expect(tzsToUsdCents(MAX_DONATION_TZS)).toBe(apiBound('MAX_AMOUNT_CENTS'));
    expect(MIN_DONATION_TZS).toBe(MIN_DONATION_USD * TZS_PER_USD);
    expect(MAX_DONATION_TZS).toBe(MAX_DONATION_USD * TZS_PER_USD);
  });
});

describe('validateCustomTzs', () => {
  it('accepts the minimum gift and converts it to the API minimum', () => {
    expect(validateCustomTzs(String(MIN_DONATION_TZS))).toEqual({
      valid: true,
      tzs: 2500,
      amountInCents: 100,
    });
  });

  it('accepts the maximum gift', () => {
    const result = validateCustomTzs(String(MAX_DONATION_TZS));
    expect(result.valid).toBe(true);
    expect(result.amountInCents).toBe(MAX_DONATION_USD * 100);
  });

  it('accepts a normal gift converted at the documented rate', () => {
    expect(validateCustomTzs('150000')).toEqual({ valid: true, tzs: 150000, amountInCents: 6000 });
    expect(validateCustomTzs('  87500  ')).toEqual({ valid: true, tzs: 87500, amountInCents: 3500 });
  });

  it('rejects empty input', () => {
    expect(validateCustomTzs('')).toMatchObject({ valid: false });
    expect(validateCustomTzs('   ')).toMatchObject({ valid: false });
    expect(validateCustomTzs(null)).toMatchObject({ valid: false });
    expect(validateCustomTzs(undefined)).toMatchObject({ valid: false });
  });

  it('rejects zero instead of silently falling back to the selected tier', () => {
    const result = validateCustomTzs('0');
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/minimum gift/i);
  });

  it('rejects negative amounts', () => {
    const result = validateCustomTzs('-5000');
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/minimum gift/i);
  });

  it('rejects fractional shillings', () => {
    expect(validateCustomTzs('1500.5')).toMatchObject({ valid: false });
  });

  it('rejects non-numeric and overflowing input', () => {
    expect(validateCustomTzs('abc')).toMatchObject({ valid: false });
    expect(validateCustomTzs('1e999')).toMatchObject({ valid: false });
  });

  it('rejects amounts above the maximum single gift', () => {
    expect(validateCustomTzs('1e9').valid).toBe(false);
    expect(validateCustomTzs(String(MAX_DONATION_TZS + TZS_PER_USD)).error).toMatch(/maximum/i);
  });
});
