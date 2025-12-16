import React from 'react';

const platforms = [
  { name: 'Amazon Ads', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Walmart', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Walmart_logo.svg' },
  { name: 'Meta Ads', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
  { name: 'Google Ads', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Shopify', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg' },
  { name: 'eBay', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg' },
  { name: 'Etsy', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Etsy_logo.svg' },
];

const PlatformLogos = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Trusted Partnerships
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Growing Platforms
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We help brands scale across all major e-commerce and advertising platforms
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="group flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 hover:bg-white/5"
            >
              <div className="h-10 md:h-12 flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="h-full w-auto max-w-[120px] md:max-w-[140px] object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                />
              </div>
              <span className="mt-2 text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformLogos;
