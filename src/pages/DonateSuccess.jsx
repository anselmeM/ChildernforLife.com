import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Settings } from 'lucide-react';
import PageSEO from '../components/PageSEO';

const SESSION_ID_RE = /^cs_(test|live)_[A-Za-z0-9]+$/;

export default function DonateSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [receiptStatus, setReceiptStatus] = useState('idle'); // idle | sending | sent | error
  const [portal, setPortal] = useState({ state: 'idle', url: null, showManage: false }); // idle | loading | error

  useEffect(() => {
    if (!sessionId) return;
    window.scrollTo(0, 0);

    if (!SESSION_ID_RE.test(sessionId)) return;

    let cancelled = false;

    // Request the receipt email; never block the thank-you page on it.
    (async () => {
      setReceiptStatus('sending');
      try {
        const res = await fetch('/api/send-receipt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });
        if (!cancelled) setReceiptStatus(res.ok ? 'sent' : 'error');
      } catch {
        if (!cancelled) setReceiptStatus('error');
      }
    })();

    // Check whether this donor has an active subscription (for the portal button).
    (async () => {
      try {
        const res = await fetch('/api/create-portal-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });
        const data = await res.json();
        if (!cancelled && res.ok && data.hasActiveSubscription) {
          setPortal({ state: 'idle', url: data.url, showManage: true });
        }
      } catch {
        // Non-fatal: portal button just stays hidden.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const openPortal = async () => {
    setPortal((p) => ({ ...p, state: 'loading' }));
    try {
      if (!portal.url) {
        const res = await fetch('/api/create-portal-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId }),
        });
        const data = await res.json();
        if (!res.ok || !data.url) throw new Error('portal unavailable');
        window.location.assign(data.url);
        return;
      }
      window.location.assign(portal.url);
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

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <PageSEO title="Donation Confirmation" description="" path="/donate/success" />
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-lg text-center border border-gray-100">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
          <ShieldCheck className="text-green-600 w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">Thank You!</h2>
        <p className="text-gray-600 mb-4 leading-relaxed font-bold">
          Your donation has been processed successfully.
        </p>
        <p className="text-gray-400 text-xs font-semibold mb-8" role="status" aria-live="polite">
          {receiptStatus === 'sending' && 'Preparing your receipt…'}
          {receiptStatus === 'sent' && 'A receipt has been sent to your email.'}
          {receiptStatus === 'error' && "We couldn't send your receipt automatically. Please contact us and we'll email it to you."}
          {receiptStatus === 'idle' && 'A receipt will be sent to your email.'}
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
