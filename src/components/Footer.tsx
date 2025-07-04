
const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Business
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A simple and clean business website.
          </p>
          <div className="pt-8 border-t border-slate-800">
            <p className="text-slate-500 text-sm">
              © 2024 Business. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
