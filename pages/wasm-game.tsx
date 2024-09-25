import React, { useEffect } from "react";
import wasmImage from "scripts/wasm-game";

const WasmGame = () => {
  useEffect(() => {
    wasmImage("game-of-life");
  }, []);
  return (
    <div>
      <canvas id="game-of-life" />
    </div>
  );
};

export default WasmGame;
