import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import { Homepage, Game } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
