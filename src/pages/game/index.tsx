import styles from "@/styles";
import { fetchFromAPI } from "@/utils/fetchFromAPI";
import { useEffect, useState } from "react";
import exampleData from "@/utils/exampleData.json";

type Props = {};

const Game = (props: Props) => {
  const [query, setQuery] = useState("UC4-bGrwiQOCVpvQwEGWaqGA");
  const [myData, setMyData] = useState<any[]>([]);

  // TODOS
  // shorts ise alma
  // check maxResults

  // useEffect(() => {
  //   let ignore = false;

  //   // fetchFromAPI(`search?part=snippet&q=${query}`).then((data) => {
  //   //   if (!ignore) {
  //   //     setMyData(data.items);
  //   //     console.log(myData);
  //   //   }
  //   // });

  //   fetchFromAPI(`search?part=snippet&channelId=${query}&order=date`).then(
  //     (data) => {
  //       setMyData(data.items);
  //     }
  //   );
  //   console.log(query);
  //   console.log(myData);
  // }, [query]);

  return (
    <div className={`${styles.innerWidth}`}>
      <button onClick={() => setQuery("coding")}>Coding</button>

      {exampleData.items.map((item, index) => (
        <div key={index}>
          {
            <>
              <p>{item?.snippet?.title}</p>
              {/* <a href={`https://www.youtube.com/watch?v=${item.id.videoId}`}>
                {item.id.videoId}
              </a>
              <img src={item?.snippet?.thumbnails?.medium?.url} alt="" /> */}
            </>
          }
        </div>
      ))}
    </div>
  );
};

export default Game;
