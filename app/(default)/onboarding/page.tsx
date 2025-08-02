"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { onboardingSteps } from "@/data/onboarding";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const saved = localStorage.getItem("shmaplex_onboardingAnswers");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  const updateAnswer = (key: string, value: any) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    localStorage.setItem("shmaplex_onboardingAnswers", JSON.stringify(updated));
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => (s > 0 ? s - 1 : 0));

  const finishOnboarding = async (finalAnswers: any) => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("onboarding").upsert(
      {
        user_id: user.id,
        status: "completed",
        preferences: finalAnswers,
      },
      { onConflict: "user_id" }
    );

    await supabase
      .from("profiles")
      .update({ onboarding_complete: true })
      .eq("id", user.id);

    localStorage.removeItem("shmaplex_onboardingAnswers");

    console.log("dashboardPreference", finalAnswers.dashboardPreference);

    if (finalAnswers.dashboardPreference === "mock") {
      router.push(`/onboarding/seeding?userId=${user.id}`);
    } else {
      setLoading(false);
      router.push("/dashboard");
    }
  };

  const current = onboardingSteps[step];

  const handleOptionClick = (value: string) => {
    if (current.type === "multi-choice") {
      const prevValues = Array.isArray(answers[current.key])
        ? answers[current.key]
        : [];
      const updatedValues = prevValues.includes(value)
        ? prevValues.filter((v: string) => v !== value)
        : [...prevValues, value];
      updateAnswer(current.key, updatedValues);
    } else {
      // Calculate updated answers synchronously
      const updated = { ...answers, [current.key]: value };
      setAnswers(updated);
      localStorage.setItem(
        "shmaplex_onboardingAnswers",
        JSON.stringify(updated)
      );

      if (current.type === "final") {
        finishOnboarding(updated); // pass the updated object
      } else {
        nextStep();
      }
    }
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  const questionVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-br from-green-50 via-white to-green-100">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          className="bg-white/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-xl border border-green-100"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              className="mb-12"
            >
              <Image
                src="/svg/shmaplexplant-logo.svg"
                alt="XPlant Logo"
                width={300}
                height={80}
                className="animate-pulse-slow"
              />
            </motion.div>

            {/* Intro on first step */}
            {step === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-sm italic text-moss-shadow/50 max-w-lg text-center mb-6 select-none"
                style={{ userSelect: "none" }}
              >
                Please answer the following questions to help us customize your
                experience. Your responses are private and will never be sold or
                shared.
              </motion.p>
            )}

            <motion.h2
              variants={questionVariants}
              initial="initial"
              animate="animate"
              className="text-xl font-bold"
              style={{ color: "var(--biochar-black)" }}
            >
              {current.question}
            </motion.h2>

            <div className="flex flex-wrap gap-4 justify-center">
              {current.options?.map((opt) => {
                const selected = Array.isArray(answers[current.key])
                  ? answers[current.key].includes(opt.value)
                  : answers[current.key] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleOptionClick(opt.value)}
                    disabled={loading}
                    className={`px-5 py-3 rounded-xl font-medium transition-all duration-200 shadow-sm ${
                      selected
                        ? "bg-gradient-to-r from-future-lime to-moss-shadow text-white shadow-md"
                        : "bg-gradient-to-r from-spore-grey to-milk-bio text-moss-shadow hover:from-organic-amber hover:to-organic-amber-light"
                    }`}
                    style={{
                      backgroundImage: selected
                        ? `linear-gradient(to right, var(--future-lime), var(--moss-shadow))`
                        : `linear-gradient(to right, var(--spore-grey), var(--milk-bio))`,
                      color: selected ? "white" : "var(--moss-shadow)",
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex space-x-4 justify-center mt-6">
              {step > 0 && (
                <button
                  onClick={prevStep}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-lg border border-spore-grey text-moss-shadow font-medium 
                     bg-transparent hover:bg-organic-amber hover:text-biochar-black 
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back
                </button>
              )}

              {current.type !== "final" && (
                <button
                  onClick={nextStep}
                  disabled={loading}
                  className="px-3 py-1.5 rounded-lg border border-future-lime text-future-lime font-medium
                     bg-transparent hover:bg-gradient-to-r hover:from-future-lime hover:to-moss-shadow
                     hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
