import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("WasmGame Drawing Tests", () => {
  it("verifies drawing functions in wasm-game.js", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // グリッド描画機能の存在を検証
    expect(fileContent).toContain("drawGrid");
    expect(fileContent).toContain("ctx.beginPath()");
    expect(fileContent).toContain("ctx.strokeStyle = gridColor");
    expect(fileContent).toContain("ctx.moveTo(");
    expect(fileContent).toContain("ctx.lineTo(");
    expect(fileContent).toContain("ctx.stroke()");

    // セル描画機能の存在を検証
    expect(fileContent).toContain("drawCells");
    expect(fileContent).toContain("const cellsPtr = universe.cells()");
    expect(fileContent).toContain(
      "new Uint8Array(memory.buffer, cellsPtr, width * height)",
    );
    expect(fileContent).toContain(
      "ctx.fillStyle = cells[idx] === Cell.Dead ? deadColor : aliveColor",
    );
    expect(fileContent).toContain("ctx.fillRect(");

    // インデックス計算関数を検証
    expect(fileContent).toContain("getIndex");
    expect(fileContent).toContain("return row * width + column");
  });

  it("verifies canvas initialization in wasm-game.js", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // キャンバスの初期化を検証
    expect(fileContent).toContain("document.getElementById(id)");
    expect(fileContent).toContain("canvas.height");
    expect(fileContent).toContain("canvas.width");
    expect(fileContent).toContain('const ctx = canvas.getContext("2d")');

    // Universeの初期化を検証
    expect(fileContent).toContain("Universe.new()");
    expect(fileContent).toContain("const width = universe.width()");
    expect(fileContent).toContain("const height = universe.height()");
  });
});
