## Submission Note (146 words)

My approach was to split the assignment into two independent pieces: a React and TypeScript frontend styled with Tailwind CSS, and a separate Express.js API for the registration form. I structured the page into clearly separated components (Hero, Workshop Details, Learning Outcomes, FAQ, and Registration Form) so each section stays easy to read and modify independently. The form includes client-side validation, inline error messages, and a loading state during submission, and the backend independently re-validates the same fields before responding, so the API stays safe even if called directly. MongoDB integration is wired in but optional, so the server still runs and logs enquiries if no database is configured.

With more time, I would add automated tests for both the validation logic and the API routes, persist form submissions with proper duplicate-handling, and deploy the project live on Vercel and Render for an end-to-end demo link.
