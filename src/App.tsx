import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import { Homepage, Game } from "./pages";
import styles from "@/styles";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/game/:channelId" element={<Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
