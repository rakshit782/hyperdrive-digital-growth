
import { Upload } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormValues, MAX_FILE_SIZE, ACCEPTED_FILE_TYPES } from "@/types/freeAuditSchema";
import { useToast } from "@/hooks/use-toast";

interface FileUploadFormProps {
  form: UseFormReturn<FormValues>;
}

const FileUploadForm = ({ form }: FileUploadFormProps) => {
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, Excel, or CSV file",
          variant: "destructive",
        });
        return;
      }
      
      form.setValue(fieldName as any, file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">Required Reports (Amazon)</h3>
      <p className="text-slate-600 text-sm">
        Please upload your Amazon reports from the last 30 days for a comprehensive audit. All files should be in PDF, Excel, or CSV format.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-900">
            Business Report (Last 30 Days) *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <input
              type="file"
              accept=".pdf,.xlsx,.xls,.csv"
              onChange={(e) => handleFileUpload(e, "businessReport")}
              className="hidden"
              id="businessReport"
            />
            <label htmlFor="businessReport" className="cursor-pointer">
              <span className="text-sm text-blue-600 hover:text-blue-800">Upload File</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV (Max 10MB)</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-900">
            Search Term Report (Last 30 Days) *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <input
              type="file"
              accept=".pdf,.xlsx,.xls,.csv"
              onChange={(e) => handleFileUpload(e, "searchTermReport")}
              className="hidden"
              id="searchTermReport"
            />
            <label htmlFor="searchTermReport" className="cursor-pointer">
              <span className="text-sm text-blue-600 hover:text-blue-800">Upload File</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV (Max 10MB)</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-900">
            Advertised ASIN Report (Last 30 Days) *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <input
              type="file"
              accept=".pdf,.xlsx,.xls,.csv"
              onChange={(e) => handleFileUpload(e, "asinReport")}
              className="hidden"
              id="asinReport"
            />
            <label htmlFor="asinReport" className="cursor-pointer">
              <span className="text-sm text-blue-600 hover:text-blue-800">Upload File</span>
            </label>
            <p className="text-xs text-gray-500 mt-1">PDF, Excel, CSV (Max 10MB)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadForm;
