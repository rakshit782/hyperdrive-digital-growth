
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "@/types/freeAuditSchema";

interface BusinessInfoFormProps {
  form: UseFormReturn<FormValues>;
}

const BusinessInfoForm = ({ form }: BusinessInfoFormProps) => {
  const adSpendRanges = [
    { value: "under-1k", label: "Under $1,000/month" },
    { value: "1k-5k", label: "$1,000 - $5,000/month" },
    { value: "5k-10k", label: "$5,000 - $10,000/month" },
    { value: "10k-25k", label: "$10,000 - $25,000/month" },
    { value: "25k-50k", label: "$25,000 - $50,000/month" },
    { value: "over-50k", label: "Over $50,000/month" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-slate-900 border-b pb-2">Business Information</h3>
      
      <FormField
        control={form.control}
        name="platform"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Advertising Platform *</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="amazon" id="amazon" />
                  <label htmlFor="amazon" className="font-medium">Amazon</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="walmart" id="walmart" />
                  <label htmlFor="walmart" className="font-medium">Walmart</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="meta" id="meta" />
                  <label htmlFor="meta" className="font-medium">Meta (Facebook/Instagram)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multiple" id="multiple" />
                  <label htmlFor="multiple" className="font-medium">Multiple Platforms</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="monthlyAdSpend"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Monthly Advertising Spend *</FormLabel>
            <FormControl>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md"
                value={field.value}
                onChange={field.onChange}
              >
                <option value="">Select your monthly ad spend range</option>
                {adSpendRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="businessGoals"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Goals & Challenges *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Tell us about your current challenges, goals, and what you'd like to improve with your advertising campaigns..."
                className="min-h-[120px]"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Please describe your main business objectives and any specific challenges you're facing
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BusinessInfoForm;
