import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("WasmGame Performance Tests", () => {
  it("verifies sleep function implementation", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // sleep関数の実装を検証
    expect(fileContent).toContain("const sleep = (waitTime) =>");
    expect(fileContent).toContain(
      "new Promise((resolve) => setTimeout(resolve, waitTime))",
    );

    // sleepTimeパラメータの使用を検証
    expect(fileContent).toContain("await sleep(sleepTime)");

    // デフォルトのsleepTime値を検証
    const sleepTimeMatch = fileContent.match(/sleepTime:\s*(\d+)/);
    expect(sleepTimeMatch).not.toBeNull();

    // 数値として変換可能か確認
    if (sleepTimeMatch) {
      const sleepTimeValue = parseInt(sleepTimeMatch[1], 10);
      expect(sleepTimeValue).toBeGreaterThan(0);
      expect(sleepTimeValue).toBeLessThan(5000); // 合理的な範囲内か
    }
  });

  it("verifies that animation is throttled for performance", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // アニメーションサイクルでsleepが使用されているか検証
    expect(fileContent).toContain("const renderLoop = async");
    expect(fileContent).toContain("await sleep(sleepTime)");

    // 最適化のポイントを検証
    // - sleepを使用してフレームレートを制御
    // - drawGridとdrawCellsの呼び出し順序
    expect(fileContent).toMatch(
      /universe\.tick\(\).*?await sleep.*?drawGrid\(\).*?drawCells\(\)/s,
    );
  });
});
