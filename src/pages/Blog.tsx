import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, PlusCircle } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Header />
      <div className="container mx-auto px-6 py-20 pt-32">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-200/50 mb-8">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 tracking-wide">BLOG</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-slate-900 leading-tight">
            Our <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">Blog</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light mb-8">
            Insights, tips, and strategies from our digital marketing experts
          </p>
        </div>

        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-8 shadow-lg">
              <PlusCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Coming Soon</h3>
              <p className="text-slate-600 mb-6">
                We're working on bringing you valuable insights and industry updates. Stay tuned!
              </p>
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => window.location.href = '/'}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
