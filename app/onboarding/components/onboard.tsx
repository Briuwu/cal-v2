"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Welcome to CTRL + ALT + LEARN",
    description:
      "Discover how our app can revolutionize your workflow and boost productivity.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Create Your Profile",
    description:
      "Set up your personal profile to get the most out of our tailored features.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Explore Key Features",
    description:
      "Learn about the powerful tools and features that will enhance your experience.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Connect and Collaborate",
    description:
      "Discover how to connect with team members and collaborate effectively.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Connect and Collaborate",
    description:
      "Discover how to connect with team members and collaborate effectively.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Connect and Collaborate",
    description:
      "Discover how to connect with team members and collaborate effectively.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    title: "Connect and Collaborate",
    description:
      "Discover how to connect with team members and collaborate effectively.",
    image: "/placeholder.svg?height=400&width=400",
  },
];

export default function Onboard() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col justify-between">
      <header className="p-4">
        <Progress value={progress} className="w-full" />
      </header>
      <main className="flex flex-grow items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-8 text-center">
          <img
            src={steps[currentStep].image}
            alt={`Step ${currentStep + 1}`}
            className="mx-auto h-64 w-64 object-cover"
          />
          <h2 className="text-3xl font-bold">{steps[currentStep].title}</h2>
          <p className="text-muted-foreground text-xl">
            {steps[currentStep].description}
          </p>
        </div>
      </main>
      <footer className="flex justify-between p-4">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 1 ? "Get Started" : "Next"}{" "}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </footer>
    </div>
  );
}
