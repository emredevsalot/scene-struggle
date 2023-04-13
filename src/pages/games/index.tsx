import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import styles from "@/styles";
import { ChannelType, Item } from "@/types";
import { fetchVideosFromChannel } from "@/utils/fetchFromAPI";
import Button from "@/components/Button";

import GuessTheCorrectTitle from "./guessTheCorrectTitle";
import WhichIsNewer from "./whichIsNewer";

type Props = {};

let games = {
  guessTheCorrectTitle: "Guess The Correct Title",
  whichIsNewer: "Which Is Newer?",
};

const Games = (props: Props) => {
  // let { channelId } = useParams();
  const [videos, setVideos] = useState<Item[]>();
  const [gameOver, setGameOver] = useState(true);
  const [gameId, setGameId] = useState("");

  const location = useLocation();
  const [channel, setChannel] = useState<ChannelType>({
    id: "",
    title: "",
  });

  // Get channel data from the state on the homepage
  useEffect(() => {
    if (location.state) {
      setChannel(location.state.channel);
    }
  }, [location]);

  // Fetch videos of the channel if there's a channel id
  useEffect(() => {
    if (!channel.id) return;
    fetchVideosFromChannel(
      `search?part=snippet&channelId=${channel.id}&order=date`,
      3
    ).then((videos) => {
      setVideos(videos);
    });
  }, [channel.id]);

  const startGame = (gameId: string) => {
    setGameOver(false);
    setGameId(gameId);
  };

  return (
    <div
      className={`${styles.innerWidth} flex flex-col justify-center gap-4 py-8 align-middle md:flex-row`}
    >
      {gameOver && (
        <div className="flex flex-col items-center gap-8">
          <div>Games about {channel.title}:</div>
          {Object.entries(games).map(([gameId, gameName]) => (
            <Button
              key={gameId}
              onClick={() => startGame(gameId)}
              disabled={!videos}
            >
              {gameName}
            </Button>
          ))}
        </div>
      )}

      {!gameOver && gameId === Object.keys(games)[0] && (
        <GuessTheCorrectTitle videos={videos!} setGameId={setGameId} />
      )}
      {!gameOver && gameId === Object.keys(games)[1] && (
        <WhichIsNewer videos={videos!} setGameId={setGameId} />
      )}
    </div>
  );
};

export default Games;
