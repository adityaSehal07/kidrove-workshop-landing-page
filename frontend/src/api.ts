import type { EnquiryFormData } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export interface ApiSuccessResponse {
  success: true;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export async function submitEnquiry(data: EnquiryFormData): Promise<ApiResponse> {
  const response = await fetch(`${API_BASE_URL}/api/enquiry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const payload = (await response.json()) as ApiResponse;

  if (!response.ok) {
    return {
      success: false,
      message: payload.message || "Something went wrong. Please try again.",
      errors: (payload as ApiErrorResponse).errors,
    };
  }

  return payload;
}
