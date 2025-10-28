"use client";

import { useMemo, useState } from "react";

type Question = {
  sentence: string;
  correctOption: "a" | "an" | "the";
  explanation: string;
};

type Answer = {
  question: string;
  correctOption: Question["correctOption"];
  selectedOption: Question["correctOption"];
  explanation: string;
  isCorrect: boolean;
};

const QUESTION_BANK: Question[] = [
  {
    sentence: "___ apple a day keeps the doctor away.",
    correctOption: "an",
    explanation: "Use \"an\" before vowel sounds like the 'a' in apple.",
  },
  {
    sentence: "Please hand me ___ salt from the table.",
    correctOption: "the",
    explanation: "We use \"the\" when both speaker and listener know the specific thing.",
  },
  {
    sentence: "Maya adopted ___ curious kitten from the shelter.",
    correctOption: "a",
    explanation: "Use \"a\" to introduce a singular noun that is not specific yet.",
  },
  {
    sentence: "___ orange umbrella is hanging by the door.",
    correctOption: "an",
    explanation: "Use \"an\" before words that begin with a vowel sound such as orange.",
  },
  {
    sentence: "We watched ___ elephants at the watering hole.",
    correctOption: "the",
    explanation: "\"The\" points to specific elephants that both people can identify.",
  },
  {
    sentence: "Dad parked ___ car in the driveway.",
    correctOption: "the",
    explanation: "It refers to the family's known car, so the definite article \"the\" is best.",
  },
  {
    sentence: "She wants to be ___ astronaut when she grows up.",
    correctOption: "an",
    explanation: "Astronaut begins with a vowel sound (\u0103), so \"an\" fits smoothly.",
  },
  {
    sentence: "I found ___ unique seashell on the beach.",
    correctOption: "a",
    explanation: "Unique starts with a \"yoo\" sound, so it takes \"a\" instead of \"an\".",
  },
  {
    sentence: "___ hour flew by while we played the game.",
    correctOption: "an",
    explanation: "Hour begins with a silent h, so the vowel sound \"our\" needs \"an\".",
  },
  {
    sentence: "___ students who studied together aced the quiz!",
    correctOption: "the",
    explanation: "The group of students is specific, so use the definite article \"the\".",
  },
  {
    sentence: "They rescued ___ injured owl last night.",
    correctOption: "an",
    explanation: "Injured starts with a vowel sound, so choose \"an\".",
  },
  {
    sentence: "Leo packed ___ sandwich for the picnic.",
    correctOption: "a",
    explanation: "Sandwich is a singular consonant sound, so we use \"a\".",
  },
];

const OPTIONS: Question["correctOption"][] = ["a", "an", "the"];
const TOTAL_QUESTIONS = 10;

function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function Page() {
  const [shuffleKey, setShuffleKey] = useState(() => Math.random());
  const questions = useMemo(
    () => shuffle(QUESTION_BANK).slice(0, TOTAL_QUESTIONS),
    [shuffleKey]
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<Answer["selectedOption"] | null>(
    null
  );
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + Number(showFeedback)) / TOTAL_QUESTIONS) * 100;

  const handleOptionClick = (option: Answer["selectedOption"]) => {
    if (showFeedback || isFinished) {
      return;
    }

    const isCorrect = option === currentQuestion.correctOption;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setSelectedOption(option);
    setShowFeedback(true);
    setAnswers((prev) => {
      const next = [...prev];
      next[currentQuestionIndex] = {
        question: currentQuestion.sentence,
        correctOption: currentQuestion.correctOption,
        selectedOption: option,
        explanation: currentQuestion.explanation,
        isCorrect,
      };
      return next;
    });

    if (currentQuestionIndex === TOTAL_QUESTIONS - 1) {
      setIsFinished(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  const handleRestart = () => {
    setShuffleKey(Math.random());
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  const motivationMessage = () => {
    if (score >= 9) {
      return "You are an article ace! Keep shining!";
    }
    if (score >= 7) {
      return "Fantastic effort! A little more practice and you'll master every sentence.";
    }
    if (score >= 5) {
      return "Great job! Keep practicing those rules and you'll level up fast.";
    }
    return "You're building strong skills—keep going and those tricky articles will feel easy!";
  };

  const feedbackMessage = () => {
    if (!showFeedback || selectedOption === null) {
      return null;
    }

    const currentAnswer = answers[currentQuestionIndex];
    if (currentAnswer?.isCorrect) {
      return `✅ Nice! ${currentAnswer.explanation}`;
    }
    return `❌ Oops! ${currentAnswer?.explanation ?? "Remember to think about the sound and specificity."}`;
  };

  const summaryContent = () => (
    <div className="summary">
      <h2>
        🎉 Game Complete! You scored {score} / {TOTAL_QUESTIONS}
      </h2>
      <p className="motivation">{motivationMessage()}</p>
      <ul>
        {answers.map((answer, index) => (
          <li key={`${answer.question}-${index}`}>
            <strong>
              Round {index + 1}: {answer.question.replace("___", "____")}
            </strong>
            <span className={answer.isCorrect ? "correct" : "incorrect"}>
              {answer.isCorrect ? "✅ Correct" : "❌ Not this time"} — You chose "{answer.selectedOption}".
            </span>
            <div>
              The best choice was "{answer.correctOption}". {answer.explanation}
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="restart-button" onClick={handleRestart}>
        🔁 Play again
      </button>
    </div>
  );

  return (
    <main>
      <div className="quiz-card">
        <h1>Article Quest</h1>
        <p className="subtitle">Help your grammar hero pick the perfect article!</p>
        <div className="progress">
          <span>
            Round {Math.min(currentQuestionIndex + 1, TOTAL_QUESTIONS)} of {TOTAL_QUESTIONS}
          </span>
          <span>Score: {score}</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>

        {isFinished ? (
          summaryContent()
        ) : (
          <>
            <div className="question">{currentQuestion?.sentence}</div>
            <div className="options">
              {OPTIONS.map((option) => {
                const isSelected = option === selectedOption;
                const optionClass = [
                  "option-button",
                  showFeedback ? "option-disabled" : "",
                  showFeedback && option === currentQuestion.correctOption
                    ? "option-correct"
                    : "",
                  showFeedback &&
                  isSelected &&
                  option !== currentQuestion.correctOption
                    ? "option-wrong"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <button
                    key={option}
                    type="button"
                    className={optionClass}
                    onClick={() => handleOptionClick(option)}
                    disabled={showFeedback}
                  >
                    {option === "a" && "🟡"}
                    {option === "an" && "🟣"}
                    {option === "the" && "🟢"}
                    <span>{option.toUpperCase()}</span>
                  </button>
                );
              })}
            </div>

            {feedbackMessage() && <div className="feedback">{feedbackMessage()}</div>}

            {showFeedback && !isFinished && (
              <button type="button" className="next-button" onClick={handleNext}>
                👉 Next round
              </button>
            )}
          </>
        )}
      </div>
    </main>
  );
}
