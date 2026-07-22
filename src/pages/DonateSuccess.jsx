import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export default function DonateSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      window.scrollTo(0, 0);
    }
  }, [sessionId]);

  if (!sessionId) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
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
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-lg text-center border border-gray-100">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
          <ShieldCheck className="text-green-600 w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">Thank You!</h2>
        <p className="text-gray-600 mb-4 leading-relaxed font-bold">
          Your donation has been processed successfully.
        </p>
        <p className="text-gray-400 text-xs font-semibold mb-8">A receipt will be sent to your email.</p>
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
