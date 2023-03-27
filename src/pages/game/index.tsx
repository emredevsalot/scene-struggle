import styles from "@/styles";
import { fetchFromAPI } from "@/utils/fetchFromAPI";
import { useEffect, useState } from "react";
import exampleData from "@/utils/exampleData.json";
import { GameLogic } from "./gameLogic";

type Props = {};

const Game = (props: Props) => {
  const [query, setQuery] = useState("UC4-bGrwiQOCVpvQwEGWaqGA");
  const [myData, setMyData] = useState<any[]>([]);

  const gameLogic = GameLogic(exampleData);

  return (
    <div className="bg-slate-200 h-screen">
      <div className={`${styles.innerWidth} py-8`}>
        <img src={gameLogic.correctVideoThumbnail.url} alt="" />
        <p className="text-slate-900 text-2xl font-semibold">
          {gameLogic.correctVideoTitle}
        </p>
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
