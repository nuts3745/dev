import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("WasmGame Interactivity Tests", () => {
  it("verifies interactive features in wasm-game.js", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイルが存在することを確認
    expect(fs.existsSync(wasmGameJsPath)).toBe(true);

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // インタラクティブ機能の存在を検証
    expect(fileContent).toContain("toggleCell");
    expect(fileContent).toContain("getCellPosition");
    expect(fileContent).toContain('canvas.addEventListener("click"');

    // クリックイベントの処理を検証
    expect(fileContent).toMatch(/canvas\.addEventListener\(\s*["']click["']/);
    expect(fileContent).toContain(
      "const { row, col } = getCellPosition(event)",
    );
    expect(fileContent).toContain("toggleCell(row, col)");

    // セル状態の切り替え機能を検証
    expect(fileContent).toContain(
      "cells[idx] = cells[idx] === Cell.Dead ? Cell.Alive : Cell.Dead",
    );
  });
});
