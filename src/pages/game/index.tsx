import styles from "@/styles";
import { fetchFromAPI } from "@/utils/fetchFromAPI";
import { useEffect, useState } from "react";
import exampleData from "@/utils/exampleData.json";
import { GameLogic } from "./gameLogic";

type Props = {};

const Game = (props: Props) => {
  const [query, setQuery] = useState("UC4-bGrwiQOCVpvQwEGWaqGA");
  const [myData, setMyData] = useState<any[]>([]);
  const [answer, setAnswer] = useState(false);

  const {
    correctVideo,
    correctVideoTitle,
    correctVideoThumbnail,
    wrongTitles,
    answers,
  } = GameLogic(exampleData);

  // answers.push(gameLogic.correctVideoTitle);
  // answers.push(...gameLogic.wrongAnswers);

  return (
    <div className="bg-slate-200 h-screen">
      <div className={`${styles.innerWidth} py-8 flex`}>
        <img src={correctVideoThumbnail.url} alt="" />
        <div className="flex flex-col gap-4 justify-center align-middle px-16 w-full">
          {answers.map((item) =>
            item == correctVideoTitle ? (
              <button
                key={item}
                className="bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setAnswer(true)}
              >
                {item}
              </button>
            ) : (
              <button
                className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setAnswer(false)}
                key={item}
              >
                {item}
              </button>
            )
          )}
          <div className="text-center">{answer ? "Doğru" : "Yanlış"}</div>
        </div>
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
