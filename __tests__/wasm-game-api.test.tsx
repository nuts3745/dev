import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("WasmGame API Tests", () => {
  it("verifies function API consistency", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // メインAPIの存在を検証
    expect(fileContent).toContain(
      "const wasmImage = (id, options = defaultOptions)",
    );

    // オプションパラメータのデフォルト値と構造を検証
    expect(fileContent).toContain("const defaultOptions = {");
    expect(fileContent).toContain("cellSize:");
    expect(fileContent).toContain("gridColor:");
    expect(fileContent).toContain("deadColor:");
    expect(fileContent).toContain("aliveColor:");
    expect(fileContent).toContain("sleepTime:");

    // 戻り値（クリーンアップ関数）を検証
    expect(fileContent).toContain("return () => {");
    expect(fileContent).toContain(
      "if (animationFrameId) cancelAnimationFrame(animationFrameId)",
    );

    // エクスポートを検証
    expect(fileContent).toContain("export default wasmImage");
  });

  it("verifies internal API functions", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // 内部APIの存在を検証
    const internalFunctions = [
      "drawGrid",
      "drawCells",
      "getIndex",
      "toggleCell",
      "getCellPosition",
      "renderLoop",
      "sleep",
    ];

    internalFunctions.forEach((funcName) => {
      // 関数宣言を検証（いくつかのパターンに対応）
      const hasFunctionDeclaration = fileContent.match(
        new RegExp(
          `(const|let|var)\\s+${funcName}\\s*=|function\\s+${funcName}\\s*\\(`,
        ),
      );
      expect(hasFunctionDeclaration).not.toBeNull();
    });
  });

  it("verifies event handler API", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // イベントハンドラの実装を検証
    expect(fileContent).toContain(
      'canvas.addEventListener("click", (event) => {',
    );
    expect(fileContent).toContain(
      "const { row, col } = getCellPosition(event)",
    );
    expect(fileContent).toContain("toggleCell(row, col)");
  });
});
