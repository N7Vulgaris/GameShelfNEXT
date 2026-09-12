import { useState } from "react";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "./ui/questionnaire";
import { Button } from "./ui/button";

export default function QuizQuestionnaire() {
  const quizItems = [
    {
      name: "console-sales",
      title: "Which of these has sold the most units?",
      description: "Choose a console",
      required: true,
      choices: [
        {
          label: "Nintendo Switch",
          value: "switch",
        },
        {
          label: "Playstation 4",
          value: "ps4",
        },
        {
          label: "Playstation 2",
          value: "ps2",
        },
        { label: "Xbox 360", value: "360" },
      ],
      correctAnswer: "ps2",
    },
    {
      name: "industry",
      title: "Are videogames more popular than movies in 2026?",
      description: "Are they?",
      required: true,
      choices: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
      correctAnswer: "yes",
    },
    {
      name: "from-software",
      title: "Which of these is a FromSoftware game?",
      description: "Choose one",
      required: true,
      choices: [
        { label: "Devil May Cry", value: "dmc" },
        { label: "Halo 3", value: "halo" },
        { label: "Bloodborne", value: "bloodborne" },
        { label: "Final Fantasy 7", value: "ff7" },
      ],
      correctAnswer: "bloodborne",
    },
    {
      name: "halo",
      title: "When was Halo: Combat Evolved released?",
      description: "Choose one",
      required: true,
      choices: [
        { label: "1999", value: "1999" },
        { label: "2007", value: "2007" },
        { label: "2001", value: "2001" },
        { label: "2003", value: "2003" },
      ],
      correctAnswer: "2001",
    },
  ] as const;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateScore = () => {
    let correctCount = 0;
    quizItems.forEach((q) => {
      if (answers[q.name] === q.correctAnswer) {
        correctCount++;
      }
    });
    return {
      correct: correctCount,
      total: quizItems.length,
      incorrect: quizItems.length - correctCount,
    };
  };

  if (isSubmitted) {
    const score = calculateScore();
    return (
      <div className="p-6 text-center max-w-md mx-auto bg-card rounded-lg border shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Quiz completed!</h2>
        <p className="text-lg mb-2">
          Correct answers:{" "}
          <span className="text-green-600 font-bold">{score.correct}</span>
        </p>
        <p className="text-lg mb-6">
          Incorrect answers:{" "}
          <span className="text-destructive font-bold">{score.incorrect}</span>
        </p>
        <Button
          onClick={() => {
            setAnswers({});
            setIsSubmitted(false);
          }}
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <Questionnaire
      className="mx-auto max-w-md bg-gray-950 p-3 rounded-2xl text-white"
      items={quizItems}
      shortcuts="letters"
      onSubmit={() => setIsSubmitted(true)}
    >
      <QuestionnaireProgress className="text-gray-300" />
      {quizItems.map((question) => (
        <QuestionnaireItem
          key={question.name}
          name={question.name}
          required={question.required}
        >
          <QuestionnaireTitle>{question.title}</QuestionnaireTitle>
          <QuestionnaireDescription className="text-gray-300">
            {question.description}
          </QuestionnaireDescription>
          <QuestionnaireChoices>
            {question.choices.map((choice) => (
              <QuestionnaireChoice
                key={choice.value}
                value={choice.value}
                onClick={() =>
                  setAnswers((prev) => ({
                    ...prev,
                    [question.name]: choice.value,
                  }))
                }
              >
                <span className="font-medium">{choice.label}</span>
              </QuestionnaireChoice>
            ))}
          </QuestionnaireChoices>
          <QuestionnaireError />
        </QuestionnaireItem>
      ))}

      <QuestionnaireActions>
        <QuestionnairePrevious className="bg-white text-black" />
        <QuestionnaireSkip className="bg-white text-black" />
        <QuestionnaireNext className="bg-white text-black hover:bg-gray-300">
          Next
        </QuestionnaireNext>
        <QuestionnaireSubmit className="bg-white text-black hover:bg-gray-300">
          Submit
        </QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  );
}
