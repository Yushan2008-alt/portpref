import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  service_type: z.enum([
    "web_development",
    "mobile_development",
    "ui_ux_design",
    "cloud_architecture",
    "consulting",
  ]).default("web_development"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
