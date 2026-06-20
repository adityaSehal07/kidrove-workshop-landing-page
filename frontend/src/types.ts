export interface WorkshopDetail {
  label: string;
  value: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
}

export interface EnquiryFormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export type SubmitStatus = "idle" | "submitting" | "success" | "error";
