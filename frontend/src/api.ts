import type { EnquiryFormData } from "./types";

// In local development, default to the standalone Express server.
// In production on Vercel, the API is served from the same domain as the
// frontend (via the /api serverless functions), so an empty base URL
// correctly resolves to a same-origin relative path.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? "http://localhost:5000" : "");

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
