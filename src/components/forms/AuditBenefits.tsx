
import { CheckCircle } from "lucide-react";

const AuditBenefits = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
        <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
        What You'll Receive
      </h3>
      <ul className="space-y-2 text-slate-700">
        <li className="flex items-start">
          <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Comprehensive performance analysis of your advertising campaigns</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Detailed keyword and targeting optimization recommendations</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Budget allocation and bidding strategy improvements</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
          <span>ROI improvement opportunities and growth projections</span>
        </li>
        <li className="flex items-start">
          <CheckCircle className="w-4 h-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
          <span>30-minute strategy consultation call with our experts</span>
        </li>
      </ul>
    </div>
  );
};

export default AuditBenefits;
