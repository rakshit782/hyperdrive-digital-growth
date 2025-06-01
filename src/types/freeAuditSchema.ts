
import * as z from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv"
];

export const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  platform: z.enum(["amazon", "walmart", "meta", "multiple"], {
    required_error: "Please select a platform",
  }),
  monthlyAdSpend: z.string().min(1, "Please select your monthly ad spend range"),
  businessGoals: z.string().min(20, "Please describe your business goals (minimum 20 characters)"),
  businessReport: z.instanceof(File).optional(),
  searchTermReport: z.instanceof(File).optional(),
  asinReport: z.instanceof(File).optional(),
});

export type FormValues = z.infer<typeof formSchema>;

export { MAX_FILE_SIZE, ACCEPTED_FILE_TYPES };
