import { useState } from 'react';
import { Bitcoin, Check, Copy, Mail } from 'lucide-react';
import { cryptoGiving } from '../data/cryptoGiving';

export default function CryptoGiving() {
  const [copied, setCopied] = useState(false);
  const hasAddress = Boolean(cryptoGiving.address);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(cryptoGiving.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — fall back to showing the address selected
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-start gap-2.5">
        <span className="w-8 h-8 bg-[#f7931a]/15 text-[#f7931a] rounded-full flex items-center justify-center shrink-0">
          <Bitcoin className="w-4 h-4" />
        </span>
        <div>
          <h4 className="text-[12.5px] uppercase font-black text-[#005c7a] tracking-wider">Give Crypto</h4>
          <p className="text-gray-500 font-medium text-[11px] leading-relaxed mt-1">
            {hasAddress
              ? `Send ${cryptoGiving.network} to the address below. Please email us after sending so we can confirm and thank you.`
              : 'We are setting up crypto donations. In the meantime, contact us to arrange a transfer.'}
          </p>
        </div>
      </div>

      {hasAddress ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3">
            <span className="font-mono text-[11px] text-gray-600 break-all select-all">{cryptoGiving.address}</span>
            <button
              type="button"
              onClick={copyAddress}
              aria-label="Copy wallet address"
              className="shrink-0 w-8 h-8 flex items-center justify-center text-[#005c7a] hover:bg-[#005c7a] hover:text-white rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[11px] text-gray-400 font-semibold">{copied ? 'Address copied!' : `Network: ${cryptoGiving.network}`}</p>
        </div>
      ) : (
        <a
          href="mailto:info@childrenforlife.com?subject=Crypto%20Donation"
          className="inline-flex items-center gap-2 text-[#005c7a] font-extrabold text-xs uppercase tracking-wider hover:underline"
        >
          <Mail className="w-4 h-4" /> Contact us about crypto giving
        </a>
      )}
    </div>
  );
}
