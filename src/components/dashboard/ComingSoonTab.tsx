
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Sparkles, Bell, ArrowRight } from 'lucide-react';

interface ComingSoonTabProps {
  title: string;
  description: string;
  estimatedDate?: string;
}

const ComingSoonTab = ({ title, description, estimatedDate = "Q2 2025" }: ComingSoonTabProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 border-slate-200/50 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">{title}</CardTitle>
          <CardDescription className="text-lg text-slate-600 max-w-md mx-auto">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200/50">
            <Clock className="w-4 h-4 mr-2 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Coming Soon - {estimatedDate}</span>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg">
            <h3 className="font-semibold text-slate-800 mb-3">What to expect:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="flex items-start space-x-2">
                <ArrowRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span>Intuitive user interface</span>
              </div>
              <div className="flex items-start space-x-2">
                <ArrowRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span>Advanced customization options</span>
              </div>
              <div className="flex items-start space-x-2">
                <ArrowRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span>Real-time updates</span>
              </div>
              <div className="flex items-start space-x-2">
                <ArrowRight className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
                <span>Seamless integration</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button 
              variant="outline" 
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notify Me When Ready
            </Button>
            <Button 
              variant="ghost" 
              className="text-slate-600 hover:text-slate-800"
            >
              Request Feature Priority
            </Button>
          </div>
          
          <p className="text-xs text-slate-500 mt-4">
            We're working hard to bring you this feature. Stay tuned for updates!
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white/50 backdrop-blur-sm border-white/50 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg text-slate-800">Development Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Planning & Design</span>
              <span className="text-green-600 font-medium">100%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full w-full"></div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Development</span>
              <span className="text-blue-600 font-medium">45%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-5/12"></div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Testing & QA</span>
              <span className="text-slate-400 font-medium">0%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-slate-300 h-2 rounded-full w-0"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoonTab;
