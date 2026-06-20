import { useState, forwardRef } from "react";
import type { FormEvent } from "react";
import type { EnquiryFormData, EnquiryFormErrors, SubmitStatus } from "../types";
import { submitEnquiry } from "../api";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9]{10}$/;

function validate(data: EnquiryFormData): EnquiryFormErrors {
  const errors: EnquiryFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!data.email.trim()) {
    errors.email = "Please enter an email address.";
  } else if (!EMAIL_PATTERN.test(data.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Please enter a phone number.";
  } else if (!PHONE_PATTERN.test(data.phone.trim())) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  return errors;
}

const RegistrationForm = forwardRef<HTMLDivElement>((_props, ref) => {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  const handleChange = (field: keyof EnquiryFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await submitEnquiry(formData);

      if (response.success) {
        setStatus("success");
        setServerMessage(response.message || "Registration received! We'll be in touch soon.");
        setFormData({ name: "", email: "", phone: "" });
      } else {
        setStatus("error");
        setServerMessage(response.message || "Something went wrong. Please try again.");
        if (response.errors) {
          setErrors(response.errors as EnquiryFormErrors);
        }
      }
    } catch {
      setStatus("error");
      setServerMessage(
        "We couldn't reach the server. Please check your connection and try again."
      );
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <section id="register" ref={ref} className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-kid-blue to-grape p-8 shadow-xl sm:p-12 md:flex md:gap-12">
          {/* Decorative floating dots */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute right-8 top-8 h-10 w-10 rounded-full bg-kid-yellow opacity-80" />
            <div className="absolute bottom-10 right-1/3 h-6 w-6 rounded-full bg-kid-pink opacity-70" />
          </div>

          {/* Left side - info */}
          <div className="relative mb-8 md:mb-0 md:w-1/2">
            <span className="font-display inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold text-white backdrop-blur-sm">
              🎈 Register Now
            </span>
            <h2 className="font-display mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              Reserve a Spot
            </h2>
            <p className="mt-3 text-blue-100">
              Seats are limited to keep mentor attention high. Fill in the form and our team will confirm your spot within 24 hours.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: "✨", text: "No prior coding experience needed" },
                { icon: "🏆", text: "Certificate on completion" },
                { icon: "🎬", text: "Recorded sessions for catch-up" },
                { icon: "🤝", text: "Small batch sizes for individual attention" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white/20 text-base">
                    {item.icon}
                  </div>
                  <span className="text-sm text-blue-100">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - form */}
          <div className="relative md:w-1/2">
            <div className="rounded-3xl bg-white p-6 shadow-lg sm:p-8">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-gray-700">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange("name")}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder="e.g. Aarav Sharma"
                    className={`w-full rounded-2xl border-2 bg-gray-50 px-4 py-3 text-gray-800 placeholder:text-gray-400 transition focus:bg-white focus:outline-3 focus:outline-kid-blue ${
                      errors.name ? "border-danger" : "border-gray-100"
                    }`}
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1.5 text-sm font-medium text-danger">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="e.g. parent@example.com"
                    className={`w-full rounded-2xl border-2 bg-gray-50 px-4 py-3 text-gray-800 placeholder:text-gray-400 transition focus:bg-white focus:outline-3 focus:outline-kid-blue ${
                      errors.email ? "border-danger" : "border-gray-100"
                    }`}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-sm font-medium text-danger">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-bold text-gray-700">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange("phone")}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    placeholder="10-digit mobile number"
                    className={`w-full rounded-2xl border-2 bg-gray-50 px-4 py-3 text-gray-800 placeholder:text-gray-400 transition focus:bg-white focus:outline-3 focus:outline-kid-blue ${
                      errors.phone ? "border-danger" : "border-gray-100"
                    }`}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1.5 text-sm font-medium text-danger">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-display flex w-full items-center justify-center gap-2 rounded-2xl bg-kid-orange px-6 py-4 text-base font-bold text-white shadow-md shadow-kid-orange/30 transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                        aria-hidden="true"
                      />
                      Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </button>

                {status === "success" && (
                  <div role="status" className="flex items-start gap-3 rounded-2xl bg-success-light p-4">
                    <svg className="mt-0.5 h-5 w-5 flex-none text-success" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <p className="text-sm font-medium text-success">{serverMessage}</p>
                  </div>
                )}
                {status === "error" && (
                  <div role="alert" className="flex items-start gap-3 rounded-2xl bg-danger-light p-4">
                    <svg className="mt-0.5 h-5 w-5 flex-none text-danger" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <p className="text-sm font-medium text-danger">{serverMessage}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

RegistrationForm.displayName = "RegistrationForm";

export default RegistrationForm;
