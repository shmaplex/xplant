// data/onboarding.ts
import type { OnboardingStep } from "@/lib/types";

export const onboardingSteps: OnboardingStep[] = [
  {
    key: "usageType",
    question: "Are you using xPlant for personal or commercial purposes?",
    type: "single-choice",
    options: [
      { label: "Hobbyist / Personal", value: "hobbyist" },
      { label: "Commercial / Business", value: "commercial" },
    ],
  },
  {
    key: "experience",
    question: "What best describes your tissue culture experience?",
    type: "single-choice",
    options: [
      { label: "Beginner", value: "beginner" },
      { label: "Intermediate", value: "intermediate" },
      { label: "Advanced", value: "advanced" },
    ],
  },
  {
    key: "goals",
    question: "What are your main goals?",
    type: "multi-choice",
    options: [
      { label: "Learn plant tissue culture", value: "learn" },
      { label: "Track and manage plant growth", value: "tracking" },
      { label: "Professional nursery or lab management", value: "nursery" },
      { label: "Explore contamination tracking", value: "contamination" },
      { label: "Build and manage media recipes", value: "recipes" },
    ],
  },
  {
    key: "dashboardPreference",
    question: "How would you like to start your dashboard?",
    type: "final",
    options: [
      { label: "Start with Mock Data", value: "mock" },
      { label: "Start Blank", value: "blank" },
    ],
  },
];
