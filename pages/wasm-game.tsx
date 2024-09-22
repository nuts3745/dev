import React, { useEffect } from "react";
import wasmImage from "scripts/wasm-game";

export const WasmGame = () => {
	useEffect(() => {
		wasmImage("game-of-life");
	}, []);
	return (
		<div>
			<canvas id="game-of-life" />
		</div>
	);
};
