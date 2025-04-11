import React, { useEffect } from "react";
import wasmImage from "scripts/wasm-game";

const WasmGame = () => {
  useEffect(() => {
    const cleanup = wasmImage("game-of-life");
    return cleanup;
  }, []);
  return (
    <div>
      <canvas id="game-of-life" />
    </div>
  );
};

export default WasmGame;
