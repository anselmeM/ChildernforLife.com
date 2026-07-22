import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-lg text-center border border-gray-100">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">!</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-8 leading-relaxed font-semibold">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#005c7a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#004a63] text-xs uppercase tracking-widest"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
