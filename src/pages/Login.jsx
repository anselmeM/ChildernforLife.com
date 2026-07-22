import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ name: email.split('@')[0], email }));
      navigate('home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center text-[#005c7a] mb-4">
          <Heart size={56} className="fill-[#005c7a]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Or <a href="#" className="font-semibold text-[#f37021] hover:underline">create a new donor profile</a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-8 shadow-sm rounded-xl border border-gray-150">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#005c7a] focus:border-[#005c7a] sm:text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#005c7a] focus:border-[#005c7a] sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[#005c7a] focus:ring-[#005c7a] border-gray-300 rounded" />
                <label className="ml-2 block text-sm text-gray-900 font-medium">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-semibold text-[#005c7a] hover:underline">Forgot your password?</a>
              </div>
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#005c7a] hover:bg-[#004a63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#005c7a] transition-colors uppercase tracking-wider">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
