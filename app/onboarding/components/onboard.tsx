"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

const steps = [
  {
    title: "Welcome to CTRL + ALT + LEARN",
    description:
      "An immersive and engaging web-based 2D learning gamified platform that enhances your Web Development Skills!",
    image: "./onboarding/get-started.png",
  },
  {
    title: "Create Your Character",
    description:
      "Choose a character that represents you and create a username to get started.",
    image: "./onboarding/creation.png",
  },
  {
    title: "Stage Selections",
    description:
      "After creating your character, you will be able to select a stage to start your learning journey. The starting point has been set to the first stage.",
    image: "./onboarding/stages.png",
  },
  {
    title: "Learning the materials",
    description:
      "Every stage has a set of materials that you need to learn in order to progress to the next stage of the game. You can learn the materials by reading the content.",
    image: "./onboarding/learning.png",
  },
  {
    title: "Adventure Time!",
    description:
      "After learning the materials, you will be able to start the adventure. The adventure will test your knowledge on the materials you have learned. You have 5 lives and everytime you answer a question wrong, you will lose a life.",
    image: "./onboarding/adventure.png",
  },
  {
    title: "Boss Fight!",
    description:
      "After completing the adventure, you will face a boss fight. The boss fight will test your knowledge on the materials you have learned in the stage.",
    image: "./onboarding/boss.png",
  },
  {
    title: "The Rewards!",
    description:
      "After defeating the boss, you will be rewarded with coins and experience points. You can use the coins to buy different characters in the shop.",
    image: "./onboarding/reward.png",
  },
  {
    title: "The Leaderboard Rankings!",
    description:
      "You can check your ranking on the leaderboard to see how you are doing compared to other players.",
    image: "./onboarding/leaderboard.png",
  },
  {
    title: "Achievements you can earn!",
    description:
      "You can earn achievements by completing certain tasks in the game. Achievements will give you coins and experience points.",
    image: "./onboarding/achievements.png",
  },
  {
    title: "Shop to used your coins!",
    description:
      "You can use the coins you have earned to buy different characters that you can use in the game.",
    image: "./onboarding/shop.png",
  },
  {
    title: "Ready to get started?",
    description:
      "Click the Get Started button to create your character and start your learning journey!",
    image: "./onboarding/get-started.png",
  },
];

export default function Onboard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Disable button

  const handleNext = () => {
    if (!isButtonDisabled) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      if (currentStep === steps.length - 1) {
        router.push("/character-selection");
      }
      // Disable button temporarily after clicking
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false); // Re-enable button after 1 second
      }, 1000);
    }
  };

  const handlePrevious = () => {
    if (!isButtonDisabled) {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false); // Re-enable button after 1 second
      }, 1000);
    }
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
            className="mx-auto w-[600px] border object-contain"
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
          disabled={currentStep === 0 || isButtonDisabled} // Disable if at start or waiting for delay
          variant="outline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={isButtonDisabled} // Disable after click for a while
        >
          {currentStep === steps.length - 1 ? "Get Started" : "Next"}{" "}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </footer>
    </div>
  );
}
