import { useState } from "react";
import GameBoard from "./Components/Battle/GameBoard";

import StartMenu from "./Components/StartMenu/StartMenu";

const App = () => {
  const [mode, setMode] = useState("start");


  return (
    <>
      {mode === "start" && <StartMenu onStartClick={() => setMode("battle")} />}

      {mode === "battle" && <GameBoard />}

      {mode === "gameOver" && <>Game Over</>}
     
    </>
  );
};

export default App;
