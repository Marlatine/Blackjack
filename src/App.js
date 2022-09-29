import { useState } from "react";
import GameBoard from "./Components/GameBoard/GameBoard";
import Highscore from "./Components/Highscore/Highscore";

import StartMenu from "./Components/StartMenu/StartMenu";

const App = () => {
  const [mode, setMode] = useState("start");

  return (
    <>
      {mode === "start" && <StartMenu onStartClick={() => setMode("battle")} />}

      {mode === "battle" && (
        <GameBoard onStartClick={() => setMode("highscore")} />
      )}

      {mode === "highscore" && (
        <Highscore onStartClick={() => setMode("battle")} />
      )}
    </>
  );
};

export default App;
