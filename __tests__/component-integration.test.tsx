import React from "react";
import { describe, it, expect, vi } from "vitest";
import fs from "fs";
import path from "path";

// コンポーネント統合テスト - ファイル構造と依存関係を確認
describe("Component Integration Tests", () => {
  // インポート構造のテスト
  it("verifies wasm-game component imports and structure", () => {
    const wasmGamePath = path.resolve("./pages/wasm-game.tsx");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGamePath, "utf8");

    // 構造を確認
    expect(fileContent).toContain("import React, { useEffect }");
    expect(fileContent).toContain('import wasmImage from "scripts/wasm-game"');
    expect(fileContent).toContain("const WasmGame = () => {");
    expect(fileContent).toContain("useEffect(() => {");
    expect(fileContent).toContain('const cleanup = wasmImage("game-of-life")');
    expect(fileContent).toContain("return cleanup");
    expect(fileContent).toContain('<canvas id="game-of-life"');
    expect(fileContent).toContain("export default WasmGame");

    // クラス構造ではなく関数コンポーネントであることを確認
    expect(fileContent).not.toContain("class WasmGame");

    // 適切な依存関係が指定されていることを確認
    expect(fileContent).toMatch(
      /useEffect\(\s*\(\s*\)\s*=>\s*\{[\s\S]*\},\s*\[\s*\]\s*\)/,
    );
  });

  // WAMイメージインポートのテスト
  it("verifies scripts/wasm-game.js structure and imports", () => {
    const wasmGamePath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGamePath, "utf8");

    // WASM依存関係のインポートを確認
    expect(fileContent).toMatch(
      /import\s*{[^}]*Cell[^}]*,[^}]*Universe[^}]*}\s*from/,
    );
    expect(fileContent).toContain(
      'from "scripts/wasm-game-of-life/pkg/wasm_game_of_life"',
    );
    expect(fileContent).toContain(
      'import { memory } from "scripts/wasm-game-of-life/pkg/wasm_game_of_life_bg.wasm"',
    );

    // 関数構造を確認
    expect(fileContent).toContain(
      "const wasmImage = (id, options = defaultOptions)",
    );
    expect(fileContent).toContain("export default wasmImage");

    // キャンバス操作を確認
    expect(fileContent).toContain("document.getElementById(id)");
    expect(fileContent).toContain("canvas.height");
    expect(fileContent).toContain("canvas.width");
    expect(fileContent).toContain('const ctx = canvas.getContext("2d")');

    // アニメーションループを確認
    expect(fileContent).toContain("let animationFrameId");
    expect(fileContent).toContain("requestAnimationFrame(renderLoop)");
    expect(fileContent).toContain("cancelAnimationFrame(animationFrameId)");

    // クリーンアップ関数を確認
    expect(fileContent).toMatch(/return\s*\(\s*\)\s*=>\s*\{[^}]*\}/);
  });

  // Next.jsインテグレーションのテスト
  it("verifies Next.js integration in index.tsx", () => {
    const indexPath = path.resolve("./pages/index.tsx");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(indexPath, "utf8");

    // WAMSコンポーネントのインポートと使用を確認
    expect(fileContent).toContain('import WasmGame from "./wasm-game"');
    expect(fileContent).toMatch(/<WasmGame\s*\/>/);

    // Next.js特有のインポートを確認
    expect(fileContent).toContain('import type { NextPage } from "next"');
    expect(fileContent).toContain('import Head from "next/head"');

    // 正しいエクスポート形式を確認
    expect(fileContent).toContain("export default Home");
  });
});
