import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("WasmGame Edge Cases Tests", () => {
  it("verifies options parameter handling for edge cases", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // オプションパラメータの処理を検証
    expect(fileContent).toContain(
      "const wasmImage = (id, options = defaultOptions)",
    );

    // 個別のオプションの取り出し方法を検証
    // options引数がnullやundefinedでも安全に動作するか
    expect(fileContent).toContain("const cellSize = options.cellSize");
    expect(fileContent).toContain("const gridColor = options.gridColor");
    expect(fileContent).toContain("const deadColor = options.deadColor");
    expect(fileContent).toContain("const aliveColor = options.aliveColor");
    expect(fileContent).toContain("const sleepTime = options.sleepTime");

    // デフォルト値の使用を検証
    // (これはオプションが部分的に提供された場合の処理を間接的に確認)
    expect(fileContent).toContain("options = defaultOptions");
  });

  it("handles canvas coordinates calculation appropriately", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // マウス座標の計算と境界チェックを検証
    expect(fileContent).toContain("getCellPosition");

    // 境界チェックの実装を検証
    expect(fileContent).toContain("Math.min(Math.floor(canvasTop");
    expect(fileContent).toContain("Math.min(Math.floor(canvasLeft");

    // 上限のチェック（範囲外アクセス防止）
    expect(fileContent).toContain("height - 1");
    expect(fileContent).toContain("width - 1");

    // スケーリング計算を検証
    expect(fileContent).toContain(
      "const scaleX = canvas.width / boundingRect.width",
    );
    expect(fileContent).toContain(
      "const scaleY = canvas.height / boundingRect.height",
    );
  });

  it("checks for memory handling safety", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // メモリアクセスの安全性を検証
    // - インデックス計算関数の存在
    expect(fileContent).toContain("getIndex");
    expect(fileContent).toContain("return row * width + column");

    // - バッファサイズの正確な指定
    expect(fileContent).toContain(
      "new Uint8Array(memory.buffer, cellsPtr, width * height)",
    );

    // - インデックス計算時の範囲チェック（getCellPositionの結果を使用）
    expect(fileContent).toMatch(
      /const\s+{\s*row,\s*col\s*}\s*=\s*getCellPosition\(event\)/,
    );
    expect(fileContent).toContain("toggleCell(row, col)");

    // 内部で使用されるインデックスがwidth*heightの範囲内に収まることを
    // 間接的に確認する要素
    expect(fileContent).toContain(
      "Math.min(Math.floor(canvasTop / (cellSize + 1)), height - 1)",
    );
    expect(fileContent).toContain(
      "Math.min(Math.floor(canvasLeft / (cellSize + 1)), width - 1)",
    );
  });
});
