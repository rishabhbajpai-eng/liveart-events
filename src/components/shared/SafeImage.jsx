import { useState } from 'react';
import { motion } from 'motion/react';

const SafeImage = ({ src, alt, className, ...props }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Use a neutral premium placeholder image
  const fallbackSrc = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 bg-cream animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-purple/20 border-t-purple rounded-full animate-spin" />
        </div>
      )}
      <motion.img
        src={error ? fallbackSrc : src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${loading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        {...props}
      />
    </div>
  );
};

export default SafeImage;
