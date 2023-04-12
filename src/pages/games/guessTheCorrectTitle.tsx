import { useEffect, useState } from "react";

import he from "he";

import { Item } from "@/types";
import { getRandomVideos } from "@/utils/randomVideos";
import Button from "@/components/Button";

type Props = {
  videos: Item[];
};

const TOTAL_QUESTIONS = 6;

const GuessTheCorrectTitle = ({ videos }: Props) => {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswered, setUserAnswered] = useState(0);
  const [lastAnswer, setLastAnswer] = useState(false);
  const [randomVideos, setRandomVideos] = useState<Item[]>([]);
  const [allAnswers, setAllAnswers] = useState<string[][]>([]);

  useEffect(() => {
    const { randomVideos, allAnswers } = getRandomVideos(
      videos!,
      TOTAL_QUESTIONS
    );
    setRandomVideos(randomVideos);
    setAllAnswers(allAnswers);
  }, []);

  const startGame = () => {
    // setGameOver(false);
    setScore(0);
    setQuestionNumber(0);
    setUserAnswered(0);
    setLastAnswer(false);
    const { randomVideos, allAnswers } = getRandomVideos(
      videos!,
      TOTAL_QUESTIONS
    );
    setRandomVideos(randomVideos);
    setAllAnswers(allAnswers);
  };

  const buttonState = (answer: boolean) => {
    if (userAnswered !== questionNumber + 1) return;
    if (!answer) {
      return "bg-primary";
    } else {
      return "bg-green-600";
    }
  };

  const checkAnswer = (answer: boolean) => {
    // if (gameOver) return;
    if (answer) {
      setScore((prev) => prev + 1);
      setLastAnswer(true);
    } else {
      setLastAnswer(false);
    }
    console.log("pressed");
    setUserAnswered((num) => num + 1);
  };

  const nextQuestion = () => {
    const nextQ = questionNumber + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      //   setGameOver(true);
    } else {
      setQuestionNumber(nextQ);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col justify-start gap-4 px-16 text-center align-middle">
        <div className="overflow-hidden rounded">
          <img
            // className="blur-lg"
            className="pixelated h-full w-full"
            src={randomVideos[questionNumber]?.snippet.thumbnails.default.url}
            alt=""
          />
        </div>
      </div>
      <div className="flex w-full flex-col justify-start gap-4 px-16 text-center align-middle">
        <div className="flex justify-between">
          <p>Score: {score}</p>
          <p>
            Question: {questionNumber + 1}/{TOTAL_QUESTIONS}
          </p>
        </div>
        {allAnswers[questionNumber]?.map((answer, index) => (
          <Button
            key={index}
            disabled={userAnswered !== questionNumber ? true : false}
            width="w-full"
            buttonBg={buttonState(
              answer === randomVideos[questionNumber].snippet.title
            )}
            onClick={() =>
              checkAnswer(answer === randomVideos[questionNumber].snippet.title)
            }
          >
            {he.decode(answer)}
          </Button>
        ))}

        {/* Question answered */}
        {userAnswered === questionNumber + 1 &&
          questionNumber !== TOTAL_QUESTIONS - 1 && (
            <>
              <p>{lastAnswer ? "Correct!✔️" : "Wrong!❌"}</p>
              <Button onClick={nextQuestion} width="w-full">
                Next Question
              </Button>
            </>
          )}

        {/* Last question answered */}
        {userAnswered === TOTAL_QUESTIONS && (
          <>
            <p>{lastAnswer ? "Correct!✔️" : "Wrong!❌"}</p>
            <Button onClick={startGame} width="w-full">
              Play Again
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default GuessTheCorrectTitle;
