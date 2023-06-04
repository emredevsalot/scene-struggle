import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import { Homepage, Games } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-secondary">
        <Navbar />
        <Routes>
          <Route path="/scene-struggle/" element={<Homepage />} />
          <Route path="/scene-struggle/games/:channelId" element={<Games />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
