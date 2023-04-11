import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "@/styles";
import { Item } from "@/types";
import { fetchVideosFromChannel } from "@/utils/fetchFromAPI";
import Button from "@/components/Button";

import GuessTheCorrectTitle from "./guessTheCorrectTitle";
import GameTwo from "./gameTwo";

type Props = {};

// enum GameList {
//   guessTheCorrectTitle = "Guess The Correct Title",
//   gameTwo = "Game Two",
// }
// const gameIds = Object.keys(GameList);
// const gameNames = Object.values(GameList);

let games = {
  guessTheCorrectTitle: "Guess The Correct Title",
  gameTwo: "Game Two",
};

const Games = (props: Props) => {
  let { channelId } = useParams();
  const [videos, setVideos] = useState<Item[]>();
  const [gameOver, setGameOver] = useState(true);
  const [gameId, setGameId] = useState("");

  useEffect(() => {
    fetchVideosFromChannel(
      `search?part=snippet&channelId=${channelId}&order=date`,
      3
    ).then((videos) => {
      setVideos(videos);
    });
  }, [channelId]);

  const startGame = (gameId: string) => {
    setGameOver(false);
    setGameId(gameId);
  };

  return (
    <div
      className={`${styles.innerWidth} flex flex-col md:flex-row py-8 gap-4 justify-center align-middle`}
    >
      {gameOver &&
        Object.entries(games).map(([gameId, gameName]) => (
          <Button key={gameId} onClick={() => startGame(gameId)}>
            {gameName}
          </Button>
        ))}

      {!gameOver && gameId === "guessTheCorrectTitle" && (
        <GuessTheCorrectTitle videos={videos!} />
      )}
      {!gameOver && gameId === "gameTwo" && <GameTwo videos={videos!} />}
    </div>
  );
};

export default Games;
