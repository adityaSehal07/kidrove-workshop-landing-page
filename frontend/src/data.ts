import type { WorkshopDetail, FaqItem } from "./types";

export const WORKSHOP_TITLE = "AI & Robotics Summer Workshop";

export const WORKSHOP_TAGLINE =
  "Kids design, code, and build their own AI-powered robot — one mission at a time.";

export const WORKSHOP_DESCRIPTION =
  "A 4-week guided online program where children aged 8 to 14 learn the basics of artificial intelligence and robotics through hands-on missions: building logic circuits, training a simple AI model, and programming a virtual robot to complete real tasks. No prior coding experience needed.";

export const WORKSHOP_DETAILS: WorkshopDetail[] = [
  { label: "Age Group", value: "8 – 14 Years" },
  { label: "Duration", value: "4 Weeks" },
  { label: "Mode", value: "Online" },
  { label: "Fee", value: "₹2,999" },
  { label: "Start Date", value: "15 July 2026" },
];

export const LEARNING_OUTCOMES: string[] = [
  "Understand core AI concepts like pattern recognition and decision-making, explained through kid-friendly missions rather than jargon.",
  "Build and program a virtual robot to navigate obstacles, follow voice commands, and respond to sensors.",
  "Write real code using a beginner-friendly visual-to-text programming bridge, building toward actual syntax.",
  "Design a simple machine learning model that learns to sort and classify images, like telling cats apart from dogs.",
  "Develop problem-solving and computational thinking skills through weekly build challenges, not just theory.",
  "Present a final capstone project — a working AI + robotics demo — to family and fellow workshop builders.",
];

export const FAQS: FaqItem[] = [
  {
    question: "Does my child need any prior coding experience?",
    answer:
      "No prior experience is required. The workshop starts from the fundamentals and is designed for absolute beginners aged 8 to 14, with sessions paced to match different skill levels.",
  },
  {
    question: "What equipment or software is needed to join?",
    answer:
      "A laptop or desktop with a stable internet connection is enough to get started. All software used is free and browser-based — our team shares setup instructions after registration.",
  },
  {
    question: "How are the live sessions structured?",
    answer:
      "Each week includes two live instructor-led sessions plus one self-paced build challenge, so kids get guided learning time and independent practice time.",
  },
  {
    question: "What happens if my child misses a live session?",
    answer:
      "Every live session is recorded and shared within 24 hours, so your child can catch up at their own pace without losing progress on the weekly project.",
  },
  {
    question: "Is there a certificate or final project at the end?",
    answer:
      "Yes. Every participant builds a final AI and robotics capstone project and receives a certificate of completion that highlights the skills they demonstrated.",
  },
];
