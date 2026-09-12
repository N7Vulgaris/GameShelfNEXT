"use client";
import QuizQuestionnaire from "@/components/quiz-questionnaire";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function QuizPage() {
  const [quizStart, setQuizStart] = useState(false);

  return (
    <div className="flex justify-center my-auto">
      {quizStart ? (
        <QuizQuestionnaire />
      ) : (
        <div className="w-2xs h-40">
          <Button
            className="w-full h-full text-3xl"
            onClick={() => setQuizStart(true)}
          >
            Start Quiz!
          </Button>
        </div>
      )}
    </div>
  );
}
