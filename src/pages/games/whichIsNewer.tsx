import { useEffect, useState } from "react";

import he from "he";

import { Item } from "@/types";
import {
  isFirstDateLatest,
  getFormattedDate,
  getRandomVideos,
} from "@/utils/randomVideos";
import Button from "@/components/Button";

type Props = {
  videos: Item[];
};

const TOTAL_QUESTIONS = 6;

const WhichIsNewer = ({ videos }: Props) => {
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswered, setUserAnswered] = useState(0);
  const [lastAnswer, setLastAnswer] = useState(false);
  const [randomVideos, setRandomVideos] = useState<Item[]>([]);
  const [firstDateLatest, setFirstDateLatest] = useState<boolean>();

  useEffect(() => {
    const { randomVideos } = getRandomVideos(videos, 2);
    setRandomVideos(randomVideos);

    setFirstDateLatest(
      isFirstDateLatest(
        randomVideos[0]?.snippet.publishedAt,
        randomVideos[1]?.snippet.publishedAt
      )
    );
  }, [questionNumber]);

  const startGame = () => {
    setScore(0);
    setQuestionNumber(0);
    setUserAnswered(0);
    setLastAnswer(false);
    const { randomVideos } = getRandomVideos(videos!, TOTAL_QUESTIONS);
    setRandomVideos(randomVideos);
  };

  const buttonState = (answer: boolean | undefined) => {
    if (userAnswered !== questionNumber + 1) return;
    if (!answer) {
      return "outline-primary";
    } else {
      return "outline-green-600";
    }
  };

  const checkAnswer = (answer: boolean | undefined) => {
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
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <p>Score: {score}</p>
          <p>
            Question: {questionNumber + 1}/{TOTAL_QUESTIONS}
          </p>
        </div>
        {/* TODO: fix w-96 fixed width, bug:multiline changes the height of both
        sides */}
        <div className="flex gap-8">
          <div className="flex w-96 flex-col gap-2">
            <img src={randomVideos[0]?.snippet.thumbnails.medium.url} alt="" />
            <div>{he.decode(randomVideos[0]?.snippet.title)}</div>

            <Button
              children="This is newer"
              disabled={userAnswered !== questionNumber ? true : false}
              outlineColor={buttonState(firstDateLatest)}
              onClick={() => checkAnswer(firstDateLatest)}
            />
            {userAnswered === questionNumber + 1 && (
              <div>
                {getFormattedDate(randomVideos[0]?.snippet.publishedAt)}
              </div>
            )}
          </div>
          <div className="flex w-96 flex-col gap-2">
            <img src={randomVideos[1]?.snippet.thumbnails.medium.url} alt="" />
            <div>{he.decode(randomVideos[1]?.snippet.title)}</div>

            <Button
              children="This is newer"
              disabled={userAnswered !== questionNumber ? true : false}
              outlineColor={buttonState(!firstDateLatest)}
              onClick={() => checkAnswer(!firstDateLatest)}
            />
            {userAnswered === questionNumber + 1 && (
              <div>
                {getFormattedDate(randomVideos[1]?.snippet.publishedAt)}
              </div>
            )}
          </div>
        </div>
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

export default WhichIsNewer;
