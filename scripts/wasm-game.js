import { Universe, Cell } from 'scripts/wasm-game-of-life/pkg/wasm_game_of_life'
import { memory } from 'scripts/wasm-game-of-life/pkg/wasm_game_of_life_bg.wasm'

const wasmImage = (id) => {
  const CELL_SIZE = 8
  const GRID_COLOR = '#CCCCCC'
  const DEAD_COLOR = '#f8f7f2'
  const ALIVE_COLOR = '#000000'

  const universe = Universe.new()
  const width = universe.width()
  const height = universe.height()

  const canvas = document.getElementById(id)
  canvas.height = (CELL_SIZE + 1) * height + 1
  canvas.width = (CELL_SIZE + 1) * width + 1

  const ctx = canvas.getContext('2d')

  const sleep = (waitTime) =>
    new Promise((resolve) => setTimeout(resolve, waitTime))
  const renderLoop = async () => {
    universe.tick()
    await sleep(888)
    drawGrid()
    drawCells()
    requestAnimationFrame(renderLoop)
  }

  const drawGrid = () => {
    ctx.beginPath()
    ctx.strokeStyle = GRID_COLOR

    for (let i = 0; i <= width; i++) {
      ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0)
      ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1)
    }

    for (let j = 0; j <= height; j++) {
      ctx.moveTo(0, j * (CELL_SIZE + 1) + 1)
      ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1)
    }

    ctx.stroke()
  }

  const getIndex = (row, column) => {
    return row * width + column
  }

  const drawCells = async () => {
    const cellsPtr = universe.cells()
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height)

    ctx.beginPath()
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col)

        ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR
        ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
        )
      }
    }
    ctx.stroke()
  }

  drawGrid()
  drawCells()
  requestAnimationFrame(renderLoop)
  return canvas
}

export default wasmImage
