import React from 'react';

const PlatformLogos = () => {
  return (
    <div className="py-6 bg-slate-800/50 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-400 text-sm font-medium mb-4">
          Growing Platforms
        </p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {/* Amazon Ads */}
          <div className="group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5">
            <svg className="h-7 md:h-8 w-auto opacity-50 group-hover:opacity-90 transition-opacity" viewBox="0 0 120 36" fill="none">
              <path d="M74.5 28.4c-6.7 4.9-16.3 7.6-24.7 7.6-11.7 0-22.2-4.3-30.2-11.5-.6-.6-.1-1.4.7-.9 8.6 5 19.2 8 30.2 8 7.4 0 15.5-1.5 23-4.7 1.1-.5 2.1.7 1 1.5z" fill="white"/>
              <path d="M77.2 25.2c-.9-1.1-5.7-.5-7.9-.3-.7.1-.8-.5-.2-.9 3.9-2.7 10.2-1.9 11-1 .7.9-.2 7.3-3.8 10.3-.6.5-1.1.2-.9-.4.8-2.1 2.7-6.6 1.8-7.7z" fill="white"/>
              <text x="10" y="20" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">amazon</text>
              <text x="65" y="20" fill="white" fontSize="10" fontWeight="500" fontFamily="Arial">ads</text>
            </svg>
          </div>

          {/* Walmart */}
          <div className="group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5">
            <svg className="h-7 md:h-8 w-auto opacity-50 group-hover:opacity-90 transition-opacity" viewBox="0 0 120 36" fill="none">
              <circle cx="18" cy="18" r="4" fill="white"/>
              <path d="M18 6v8M18 22v8M6 18h8M22 18h8M9 9l5.5 5.5M23.5 23.5l5.5 5.5M9 27l5.5-5.5M23.5 12.5l5.5-5.5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <text x="38" y="22" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">Walmart</text>
            </svg>
          </div>

          {/* Meta Ads */}
          <div className="group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5">
            <svg className="h-7 md:h-8 w-auto opacity-50 group-hover:opacity-90 transition-opacity" viewBox="0 0 100 36" fill="none">
              <path d="M6 18c0-5.5 2.2-10 6-10 2.2 0 3.8 1.2 5.2 3.2L18 12l.8.8 5.2 8.4c1 1.6 2 2.8 4 2.8 2.4 0 4-2.8 4-6s-1.6-6-4-6c-2 0-3 1.2-4 2.8l-.8 1.2-.8-1.2c-1.4-2.2-3-4-6.4-4C10.2 11 6 14.5 6 18zm12 0l-1.6-2.4C15 13.4 13.8 12 12 12c-2.4 0-4 2.8-4 6s1.6 6 4 6c2 0 3-1.2 4-2.8l.8-1.2.8 1.2c1.4 2.2 3 4 6.4 4 5.8 0 10-3.5 10-7s-2.2-10-6-10c-2.2 0-3.8 1.2-5.2 3.2L22 12l-.8-.8-5.2 8.4c-1 1.6-2 2.8-4 2.8" fill="none" stroke="white" strokeWidth="2"/>
              <text x="42" y="23" fill="white" fontSize="14" fontWeight="600" fontFamily="Arial">Meta</text>
            </svg>
          </div>

          {/* Google Ads */}
          <div className="group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5">
            <svg className="h-7 md:h-8 w-auto opacity-50 group-hover:opacity-90 transition-opacity" viewBox="0 0 110 36" fill="none">
              <text x="4" y="24" fontSize="18" fontWeight="500" fontFamily="Arial" fill="white">Google</text>
              <text x="68" y="24" fill="white" fontSize="14" fontWeight="400" fontFamily="Arial">Ads</text>
            </svg>
          </div>

          {/* Shopify */}
          <div className="group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5">
            <svg className="h-7 md:h-8 w-auto opacity-50 group-hover:opacity-90 transition-opacity" viewBox="0 0 110 36" fill="none">
              <path d="M21 6c-.2 0-.4.2-.4.2s-.4-.3-.9-.4c-.1-.4-.3-.7-.5-.9-.7-.7-1.6-.7-1.8-.7-1.4 0-2.5 1-3 2.5l-1.2.4c-.4.1-.4.1-.5.5L11 19l8.5 1.6 4.5-1.1S21.2 6.2 21 6zm-3.5.2l-1.8.6c.2-.8.6-1.5 1.3-1.8.2.4.4.8.5 1.2zm-1.8-1.5c.1 0 .2 0 .3.1-.9.3-1.6 1.2-1.9 2.8l-1.4.4c.4-1.3 1.4-3.3 3-3.3z" fill="white"/>
              <path d="M20.6 6.2c0-.1-.1-.2-.2-.2-.1 0-.3.2-.3.2s-.4-.3-.9-.4c-.1-.4-.3-.7-.5-.9l.1.1c.2.1.3.3.4.6l.2 1 2-.6s.9 10.4.9 10.5l-4.5 1.1 4.5-1.1c0 0-.9-10.2-.9-10.3l-2 .6-.2-1z" fill="white" opacity="0.7"/>
              <text x="28" y="22" fill="white" fontSize="14" fontWeight="600" fontFamily="Arial">Shopify</text>
            </svg>
          </div>

          {/* eBay */}
          <div className="group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5">
            <svg className="h-7 md:h-8 w-auto opacity-50 group-hover:opacity-90 transition-opacity" viewBox="0 0 70 36" fill="none">
              <text x="4" y="24" fontSize="18" fontWeight="bold" fontFamily="Arial" fontStyle="italic" fill="white">ebay</text>
            </svg>
          </div>

          {/* Etsy */}
          <div className="group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/5">
            <svg className="h-7 md:h-8 w-auto opacity-50 group-hover:opacity-90 transition-opacity" viewBox="0 0 70 36" fill="none">
              <text x="4" y="25" fill="white" fontSize="20" fontWeight="bold" fontFamily="Georgia, serif">Etsy</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformLogos;
