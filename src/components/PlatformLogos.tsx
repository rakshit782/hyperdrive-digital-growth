import React from 'react';

const platforms = [
  { name: 'Amazon Ads', abbr: 'amazon' },
  { name: 'Walmart', abbr: 'walmart' },
  { name: 'Meta Ads', abbr: 'meta' },
  { name: 'Google Ads', abbr: 'google' },
  { name: 'Shopify', abbr: 'shopify' },
  { name: 'eBay', abbr: 'ebay' },
  { name: 'Etsy', abbr: 'etsy' },
];

const PlatformLogos = () => {
  return (
    <div className="py-6 bg-slate-800/50 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-400 text-sm font-medium mb-4">
          Growing Platforms
        </p>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="group px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/5"
            >
              <span className="text-slate-400 group-hover:text-white text-sm md:text-base font-medium transition-colors">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformLogos;
