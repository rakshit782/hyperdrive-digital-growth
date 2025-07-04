
import React from 'react';
import './ScrollingLogos.css';

const ScrollingLogos = () => {
  const logos = [
    { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png' },
    { name: 'Walmart', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/200px-Walmart_logo.svg.png' },
    { name: 'Meta', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/200px-Meta_Platforms_Inc._logo.svg.png' },
    { name: 'Shopify', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/200px-Shopify_logo_2018.svg.png' },
    { name: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png' },
    { name: 'TikTok', src: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/200px-TikTok_logo.svg.png' },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
          Trusted Partners & Platforms
        </h2>
        <div className="scrolling-logos">
          <div className="logos-slide">
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="logo-item">
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollingLogos;
