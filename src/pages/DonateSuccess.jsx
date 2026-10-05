import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Settings } from 'lucide-react';
import PageSEO from '../components/PageSEO';

const SESSION_ID_RE = /^cs_(test|live)_[A-Za-z0-9]+$/;

// The server is the only thing that can confirm a payment, so the copy follows
// what it tells us:
//   checking    — the receipt request is in flight
//   verified    — /api/send-receipt accepted the session as paid (it reads the
//                 amount and email straight from Stripe, never from the client)
//   unverified  — Stripe says it is not paid yet (delayed method, or a stale link)
//   unconfirmed — we could not reach the server; say so instead of claiming success
const COPY = {
  checking: {
    heading: 'Thank You!',
    body: 'We’re confirming your donation with Stripe — this takes a moment.',
    tone: 'green',
  },
  verified: {
    heading: 'Thank You!',
    body: 'Your donation is confirmed. A receipt has been sent to your email.',
    tone: 'green',
  },
  unconfirmed: {
    heading: 'Thank You!',
    body: 'We couldn’t confirm your donation automatically just now. If you completed a gift, we’ll email your receipt shortly — contact us if you need it sooner.',
    tone: 'yellow',
  },
  unverified: {
    heading: 'Confirming Your Gift',
    body: 'We haven’t received confirmation of this payment yet. Delayed payment methods, such as bank transfers, can take a few days to clear — we’ll email your receipt as soon as it does.',
    tone: 'yellow',
  },
};

export default function DonateSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [verification, setVerification] = useState('checking');
  const [portal, setPortal] = useState({ state: 'idle', showManage: false });

  useEffect(() => {
    if (!sessionId) return;
    window.scrollTo(0, 0);

    if (!SESSION_ID_RE.test(sessionId)) return;

    let cancelled = false;

    // Asking for the receipt is also the payment check: it succeeds only for a
    // paid session. Never block the thank-you page on it.
    (async () => {
      try {
        const res = await fetch('/api/send-receipt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });
        if (cancelled) return;
        if (res.ok) setVerification('verified');
        else if (res.status === 400) setVerification('unverified');
        else setVerification('unconfirmed');
      } catch {
        if (!cancelled) setVerification('unconfirmed');
      }
    })();

    // Read-only probe: no billing-portal session is created until the donor
    // asks for one, so opening (or forwarding) this URL costs nothing.
    (async () => {
      try {
        const res = await fetch('/api/create-portal-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, intent: 'check' }),
        });
        const data = await res.json().catch(() => ({}));
        if (!cancelled && res.ok && data.hasActiveSubscription) {
          setPortal((p) => ({ ...p, showManage: true }));
        }
      } catch {
        // Non-fatal: the portal button just stays hidden.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const openPortal = async () => {
    setPortal((p) => ({ ...p, state: 'loading' }));
    try {
      // Mint the portal session on demand — they are short-lived.
      const res = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.url) throw new Error('portal unavailable');
      window.location.assign(data.url);
    } catch {
      setPortal((p) => ({ ...p, state: 'error' }));
    }
  };

  if (!sessionId) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <PageSEO title="Donation Confirmation" description="" path="/donate/success" />
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-lg text-center border border-gray-100">
          <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-100">
            <ShieldCheck className="text-yellow-600 w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">No Session Found</h2>
          <p className="text-gray-600 mb-8 leading-relaxed font-bold">We couldn't verify your donation. Please contact us if you believe this is an error.</p>
          <button onClick={() => navigate('/')} className="bg-[#005c7a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#004a63] text-xs uppercase tracking-widest">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const copy = COPY[verification];
  const isConfirmed = copy.tone === 'green';

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <PageSEO title="Donation Confirmation" description="" path="/donate/success" />
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-lg text-center border border-gray-100">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border ${
          isConfirmed ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'
        }`}>
          <ShieldCheck className={`w-10 h-10 ${isConfirmed ? 'text-green-600' : 'text-yellow-600'}`} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">{copy.heading}</h2>
        <p className="text-gray-600 mb-8 leading-relaxed font-bold" role="status" aria-live="polite">
          {copy.body}
        </p>
        {portal.showManage && (
          <button
            onClick={openPortal}
            disabled={portal.state === 'loading'}
            className="mb-3 w-full flex items-center justify-center gap-2 border border-[#005c7a] text-[#005c7a] px-8 py-3 rounded-full font-bold hover:bg-[#005c7a] hover:text-white text-xs uppercase tracking-widest transition-colors disabled:opacity-50"
          >
            <Settings className="w-4 h-4" />
            {portal.state === 'loading' ? 'Opening…' : 'Manage My Monthly Gift'}
          </button>
        )}
        {portal.state === 'error' && (
          <p className="text-xs text-red-600 mb-3" role="alert">Couldn't open the portal. Please try again later.</p>
        )}
        <div className="flex flex-col space-y-3">
          <button onClick={() => navigate('/')} className="bg-[#005c7a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#004a63] text-xs uppercase tracking-widest">
            Return to Home
          </button>
          <button onClick={() => navigate('/impact-stories')} className="border border-[#005c7a] text-[#005c7a] px-8 py-3 rounded-full font-bold hover:bg-[#005c7a] hover:text-white text-xs uppercase tracking-widest transition-colors">
            See Your Impact
          </button>
        </div>
      </div>
    </div>
  );
}
