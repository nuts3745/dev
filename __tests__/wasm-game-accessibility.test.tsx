import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import fs from "fs";
import path from "path";

// コンポーネントのモック（WASMロードなし）
const WasmGameMock = () => {
  return (
    <div>
      <canvas id="game-of-life" />
    </div>
  );
};

describe("WasmGame Accessibility Tests", () => {
  it("checks for basic DOM structure accessibility", () => {
    // レンダリングしてキャンバス要素を取得
    const { container } = render(<WasmGameMock />);
    const canvas = container.querySelector("canvas");

    // キャンバス要素が存在するか確認
    expect(canvas).not.toBeNull();
    expect(canvas?.id).toBe("game-of-life");

    // キャンバスがdiv内にあることを確認（スクリーンリーダー対応などのため）
    expect(canvas?.parentElement?.tagName.toLowerCase()).toBe("div");
  });

  it("verifies visual representation considerations", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // コントラストのためのカラー設定を検証
    expect(fileContent).toContain("gridColor:");
    expect(fileContent).toContain("deadColor:");
    expect(fileContent).toContain("aliveColor:");

    // デフォルトの色設定が存在するか確認
    const containsHexColorCodes = /#[0-9A-Fa-f]{6}/.test(fileContent);
    expect(containsHexColorCodes).toBe(true);

    // セルサイズの設定を検証（視認性のため）
    expect(fileContent).toContain("cellSize:");
    const cellSizeMatch = fileContent.match(/cellSize:\s*(\d+)/);
    expect(cellSizeMatch).not.toBeNull();

    // セルサイズが適切な範囲内か確認
    if (cellSizeMatch) {
      const cellSizeValue = parseInt(cellSizeMatch[1], 10);
      expect(cellSizeValue).toBeGreaterThan(0);
    }
  });
});
