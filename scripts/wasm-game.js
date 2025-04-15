import {
  Cell,
  Universe,
} from "scripts/wasm-game-of-life/pkg/wasm_game_of_life";
import { memory } from "scripts/wasm-game-of-life/pkg/wasm_game_of_life_bg.wasm";

const wasmImage = (id) => {
  const CELL_SIZE = 5;
  const GRID_COLOR = "#F8F7F2";
  const DEAD_COLOR = "#F8F7F2";
  const ALIVE_COLOR = "#333";

  const universe = Universe.new();
  const width = universe.width();
  const height = universe.height();

  const canvas = document.getElementById(id);
  canvas.height = (CELL_SIZE + 1) * height + 1;
  canvas.width = (CELL_SIZE + 1) * width + 1;

  const ctx = canvas.getContext("2d");

  let animationFrameId;

  const sleep = (waitTime) =>
    new Promise((resolve) => setTimeout(resolve, waitTime));
  const renderLoop = async () => {
    universe.tick();
    await sleep(888);
    drawGrid();
    drawCells();
    animationFrameId = requestAnimationFrame(renderLoop);
  };

  const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    for (let i = 0; i <= width; i++) {
      ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
      ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    for (let j = 0; j <= height; j++) {
      ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
      ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
  };

  const getIndex = (row, column) => {
    return row * width + column;
  };

  const drawCells = async () => {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    ctx.beginPath();
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col);

        ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;
        ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE,
        );
      }
    }
    ctx.stroke();
  };

  // メモリを直接操作してセルの状態を切り替える
  const toggleCell = (row, col) => {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);
    const idx = getIndex(row, col);

    // セルの状態を反転（生きている→死、死んでいる→生）
    cells[idx] = cells[idx] === Cell.Dead ? Cell.Alive : Cell.Dead;

    // 変更をすぐに反映
    drawCells();
  };

  // キャンバス上のクリック位置からセルの行と列を計算
  const getCellPosition = (event) => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
    const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);

    return { row, col };
  };

  // クリックイベントハンドラ
  canvas.addEventListener("click", (event) => {
    const { row, col } = getCellPosition(event);
    toggleCell(row, col);
  });

  drawGrid();
  drawCells();
  requestAnimationFrame(renderLoop);
  return () => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };
};

export default wasmImage;
