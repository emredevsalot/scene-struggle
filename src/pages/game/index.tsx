import styles from "@/styles";
import { useState } from "react";
import exampleData from "@/utils/exampleData.json";
import { getRandomVideos, Item } from "./randomVideos";

type Props = {};

const TOTAL_QUESTIONS = 6;

const Game = (props: Props) => {
  // const [query, setQuery] = useState("UC4-bGrwiQOCVpvQwEGWaqGA");
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswered, setUserAnswered] = useState(0);
  const [lastAnswer, setLastAnswer] = useState(false);
  const [randomVideos, setRandomVideos] = useState<Item[]>([]);
  const [allAnswers, setAllAnswers] = useState<string[][]>([]);

  const buttonState = (answer: boolean) => {
    if (userAnswered !== questionNumber + 1)
      return "bg-slate-700 hover:bg-slate-800";
    if (answer) {
      return "bg-green-800 hover:bg-green-800";
    } else {
      return "bg-red-800 hover:bg-red-800";
    }
  };

  const startGame = () => {
    setGameOver(false);
    setScore(0);
    setQuestionNumber(0);
    setUserAnswered(0);
    setLastAnswer(false);
    const { randomVideos, allAnswers } = getRandomVideos(
      exampleData,
      TOTAL_QUESTIONS
    );
    setRandomVideos(randomVideos);
    setAllAnswers(allAnswers);
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
    setUserAnswered((num) => num + 1);
  };

  const nextQuestion = () => {
    const nextQ = questionNumber + 1;
    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQ);
    }
  };

  return (
    <div className="bg-slate-200 min-h-[90vh]">
      <div
        className={`${styles.innerWidth} flex flex-col md:flex-row py-8 gap-4 justify-center align-middle`}
      >
        {gameOver && (
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={startGame}
          >
            Start
          </button>
        )}
        {/* Game started */}
        {!gameOver ? (
          <>
            <div className="flex flex-col gap-4 justify-start align-middle px-16 w-full text-center">
              <div className="bg-slate-200  overflow-hidden rounded">
                <img
                  // className="blur-lg"
                  src={randomVideos[questionNumber].snippet.thumbnails.high.url}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-start align-middle px-16 w-full text-center">
              <div className="flex justify-between">
                <p>Score: {score}</p>
                <p>
                  Question: {questionNumber + 1}/{TOTAL_QUESTIONS}
                </p>
              </div>
              {allAnswers[questionNumber].map((answer, index) => (
                <button
                  key={index}
                  className={`${buttonState(
                    answer === randomVideos[questionNumber].snippet.title
                  )} text-white font-normal py-2 px-4 rounded`}
                  disabled={userAnswered !== questionNumber ? true : false}
                  onClick={() =>
                    checkAnswer(
                      answer === randomVideos[questionNumber].snippet.title
                    )
                  }
                >
                  {answer}
                </button>
              ))}

              {/* Question answered */}
              {!gameOver &&
                userAnswered === questionNumber + 1 &&
                questionNumber !== TOTAL_QUESTIONS - 1 && (
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

              {/* Last question answered */}
              {userAnswered === TOTAL_QUESTIONS && (
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
