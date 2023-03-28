import styles from "@/styles";
import { fetchFromAPI } from "@/utils/fetchFromAPI";
import React, { MouseEvent, useEffect, useState } from "react";
import exampleData from "@/utils/exampleData.json";
import { GameLogic, Item } from "./gameLogic";

type Props = {};

export type Video = {
  videoId: string;
  correctTitle: string;
  incorrectTitles: string[];
};

const TOTAL_QUESTIONS = 6;

const Game = (props: Props) => {
  // const [query, setQuery] = useState("UC4-bGrwiQOCVpvQwEGWaqGA");
  const [userAnswers, setUserAnswers] = useState(0);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [lastAnswer, setLastAnswer] = useState(false);
  const [randomVideos, setRandomVideos] = useState<Item[]>([]);
  const [allAnswers, setAllAnswers] = useState<string[][]>([]);

  const buttonState = (answer: boolean) => {
    if (userAnswers !== number + 1) return "bg-slate-800 hover:bg-slate-800";
    if (answer) {
      return "bg-green-800 hover:bg-green-800";
    } else {
      return "bg-red-800 hover:bg-red-800";
    }
  };

  // const {
  //   randomVideos,
  //   allTitles,
  //   correctVideo,
  //   correctVideoTitle,
  //   correctVideoThumbnail,
  //   wrongTitles,
  //   answers,
  // } = GameLogic(exampleData);

  // console.log("hey");

  const startGame = () => {
    setGameOver(false);
    setNumber(0);
    const { randomVideos, allAnswers } = GameLogic(exampleData);
    setRandomVideos(randomVideos);
    setAllAnswers(allAnswers);

    console.log(randomVideos);
    console.log(allAnswers[number]);

    setScore(0);
    setUserAnswers(0);
    // setNumber(0);
  };

  const checkAnswer = (answer: boolean) => {
    if (gameOver) return;
    if (answer) {
      setScore((prev) => prev + 1);
      setLastAnswer(true);
    } else {
      setLastAnswer(false);
    }
    console.log("pressed");
    setUserAnswers((num) => num + 1);
  };

  const nextQuestion = () => {
    const nextQ = number + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <div className="bg-slate-200 h-screen">
      <div className={`${styles.innerWidth} py-8 flex`}>
        {gameOver && (
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={startGame}
          >
            Start
          </button>
        )}
        {!gameOver ? (
          <>
            <div className="flex flex-col gap-4 justify-start align-middle px-16 w-full text-center">
              <div className="bg-slate-200  overflow-hidden">
                <img
                  className="blur-lg"
                  src={randomVideos[number].snippet.thumbnails.high.url}
                  alt=""
                />
              </div>
            </div>
            {/* <p className="p-8">{randomVideos[number].snippet.title}</p> */}
            <div className="flex flex-col gap-4 justify-start align-middle px-16 w-full text-center">
              <p>Score: {score}</p>
              <p>
                Question: {number + 1}/{TOTAL_QUESTIONS}
              </p>
              {allAnswers[number].map((answer, index) =>
                answer === randomVideos[number].snippet.title ? (
                  <button
                    key={index}
                    className={`bg-slate-600 hover:bg-slate-700 ${buttonState(
                      true
                    )} text-white font-normal py-2 px-4 rounded"`}
                    disabled={userAnswers !== number ? true : false}
                    onClick={() => checkAnswer(true)}
                  >
                    {answer}
                  </button>
                ) : (
                  <button
                    key={index}
                    className={`bg-slate-600 hover:bg-slate-700 ${buttonState(
                      false
                    )} text-white font-normal py-2 px-4 rounded"`}
                    disabled={userAnswers !== number ? true : false}
                    onClick={() => checkAnswer(false)}
                  >
                    {answer}
                  </button>
                )
              )}

              {!gameOver &&
                userAnswers === number + 1 &&
                number !== TOTAL_QUESTIONS - 1 && (
                  <>
                    <p>{lastAnswer ? "Correct!✔️" : "Wrong!❌"}</p>
                    <button
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                      onClick={nextQuestion}
                    >
                      Next Question
                    </button>
                  </>
                )}

              {userAnswers === TOTAL_QUESTIONS && (
                <>
                  <p>{lastAnswer ? "Correct!✔️" : "Wrong!❌"}</p>
                  <button
                    className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    onClick={startGame}
                  >
                    Play Again
                  </button>
                </>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );

  // useEffect(() => {
  //   let ignore = false;

  // search videos
  //   // fetchFromAPI(`search?part=snippet&q=${query}`).then((data) => {
  //   //   if (!ignore) {
  //   //     setMyData(data.items);
  //   //     console.log(myData);
  //   //   }
  //   // });

  // get videos of a channel
  //   fetchFromAPI(`search?part=snippet&channelId=${query}&order=date`).then(
  //     (data) => {
  //       setMyData(data.items);
  //     }
  //   );
  //   console.log(query);
  //   console.log(myData);
  // }, [query]);
};

export default Game;
