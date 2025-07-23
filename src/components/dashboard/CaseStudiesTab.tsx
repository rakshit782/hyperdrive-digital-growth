
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

const CaseStudiesTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Case Studies Management</h2>
          <p className="text-gray-600 mt-2">Manage your case studies and success stories</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Case Study
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Case Studies</CardTitle>
          <CardDescription>Showcase your best work and results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No case studies yet</h3>
              <p className="text-gray-500 mb-4">Start by creating your first case study</p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Case Study
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseStudiesTab;
