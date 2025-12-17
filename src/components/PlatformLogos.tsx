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
              <path d="M12 28c-2.5 0-4.5-1-6-3-1.5-2-2.5-4.5-2.5-7.5 0-4 1.5-7.5 4-10C10 5 13 3.5 16.5 3.5c2.5 0 5 1 7 3l4.5 5 4.5-5c2-2 4.5-3 7-3 3.5 0 6.5 1.5 9 4 2.5 2.5 4 6 4 10 0 3-1 5.5-2.5 7.5-1.5 2-3.5 3-6 3-2.5 0-5-1.5-7-4L28 14l-9 10c-2 2.5-4.5 4-7 4z" fill="white"/>
              <text x="55" y="22" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial">Meta</text>
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
              <path d="M22 8l-2 1-.5-2c-.5-1-1-1.5-2-1.5h-.5l-1-1c-.5-.5-1-.5-2-.5-2 0-4 1.5-5 4l-2 .5c-.5.1-1 .5-1 1L4 22l14 3 8-2-4-15zm-7-2c.5 0 1 0 1.5.5l.5 2-3 1c.5-2 1.5-3.5 1-3.5zm-2 4l2-.5c0 1 .5 2 1 2.5l-3 1v-3z" fill="white"/>
              <path d="M18 6.5c1 0 1.5.5 2 1.5l.5 2 2-1L22 8c-.5-.5-1-1-2-1.5v0z" fill="rgba(255,255,255,0.7)"/>
              <text x="26" y="22" fill="white" fontSize="14" fontWeight="600" fontFamily="Arial">Shopify</text>
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
