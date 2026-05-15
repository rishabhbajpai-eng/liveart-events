import { motion } from 'motion/react';
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-paper flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center space-y-6"
          >
            <div className="w-20 h-20 bg-purple/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">✨</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-charcoal">Something went quiet...</h1>
            <p className="text-charcoal/60 leading-relaxed">
              We encountered an unexpected moment. Don&apos;t worry, our team has been notified and we&apos;re bringing the celebration back shortly.
            </p>
            <button 
              onClick={() => window.location.href = '/'}
              className="inline-block bg-purple text-paper px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-charcoal transition-all shadow-xl"
            >
              Return to Home
            </button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
