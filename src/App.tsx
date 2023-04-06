import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import { Homepage, Games } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/games/:channelId" element={<Games />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
