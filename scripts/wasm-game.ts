import {
  Cell,
  Universe,
} from "scripts/wasm-game-of-life/pkg/wasm_game_of_life";
import { memory } from "scripts/wasm-game-of-life/pkg/wasm_game_of_life_bg.wasm";

const defaultOptions = {
  cellSize: 5,
  gridColor: "#F8F7F2",
  deadColor: "#F8F7F2",
  aliveColor: "#333",
  sleepTime: 678,
};

const wasmImage = (id: string, options = defaultOptions) => {
  const cellSize = options.cellSize;
  const gridColor = options.gridColor;
  const deadColor = options.deadColor;
  const aliveColor = options.aliveColor;
  const sleepTime = options.sleepTime;

  const universe = Universe.new();
  const width = universe.width();
  const height = universe.height();

  const canvas = document.getElementById(id);
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("Canvas not found");
  }
  canvas.height = (cellSize + 1) * height + 1;
  canvas.width = (cellSize + 1) * width + 1;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  let animationFrameId: number;

  const sleep = (waitTime: number) =>
    new Promise((resolve) => setTimeout(resolve, waitTime));
  const renderLoop = async () => {
    universe.tick();
    await sleep(sleepTime);
    drawGrid();
    drawCells();
    animationFrameId = requestAnimationFrame(renderLoop);
  };

  const drawGrid = () => {
    ctx.beginPath();
    ctx.strokeStyle = gridColor;

    for (let i = 0; i <= width; i++) {
      ctx.moveTo(i * (cellSize + 1) + 1, 0);
      ctx.lineTo(i * (cellSize + 1) + 1, (cellSize + 1) * height + 1);
    }

    for (let j = 0; j <= height; j++) {
      ctx.moveTo(0, j * (cellSize + 1) + 1);
      ctx.lineTo((cellSize + 1) * width + 1, j * (cellSize + 1) + 1);
    }

    ctx.stroke();
  };

  const getIndex = (row: number, column: number) => {
    return row * width + column;
  };

  const drawCells = async () => {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    ctx.beginPath();
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col);

        ctx.fillStyle = cells[idx] === Cell.Dead ? deadColor : aliveColor;
        ctx.fillRect(
          col * (cellSize + 1) + 1,
          row * (cellSize + 1) + 1,
          cellSize,
          cellSize,
        );
      }
    }
    ctx.stroke();
  };

  // メモリを直接操作してセルの状態を切り替える
  const toggleCell = (row: number, col: number) => {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);
    const idx = getIndex(row, col);

    // セルの状態を反転（生きている→死、死んでいる→生）
    cells[idx] = cells[idx] === Cell.Dead ? Cell.Alive : Cell.Dead;

    // 変更されたセルのみを再描画
    ctx.fillStyle = cells[idx] === Cell.Dead ? deadColor : aliveColor;
    ctx.fillRect(
      col * (cellSize + 1) + 1,
      row * (cellSize + 1) + 1,
      cellSize,
      cellSize,
    );
  };

  // キャンバス上のクリック位置からセルの行と列を計算
  const getCellPosition = (event: MouseEvent) => {
    const boundingRect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / boundingRect.width;
    const scaleY = canvas.height / boundingRect.height;

    const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
    const canvasTop = (event.clientY - boundingRect.top) * scaleY;

    const row = Math.min(Math.floor(canvasTop / (cellSize + 1)), height - 1);
    const col = Math.min(Math.floor(canvasLeft / (cellSize + 1)), width - 1);

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
