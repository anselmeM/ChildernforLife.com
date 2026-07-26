import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="w-20 h-20 bg-[#005c7a]/10 rounded-full flex items-center justify-center mx-auto">
          <Search size={32} className="text-[#005c7a]" />
        </div>
        <h1 className="text-5xl font-black text-gray-900">404</h1>
        <h2 className="text-xl font-bold text-gray-700">Page not found</h2>
        <p className="text-gray-500 font-semibold leading-relaxed">
          The page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center bg-[#005c7a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#004a63] text-xs uppercase tracking-widest transition-colors"
        >
          <ChevronLeft size={16} className="mr-1.5 stroke-[3]" /> Back to Home
        </button>
      </div>
    </div>
  );
}
