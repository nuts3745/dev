import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("WasmGame Animation Tests", () => {
  it("verifies animation cycle in wasm-game.js", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // アニメーションサイクル機能の存在を検証
    expect(fileContent).toContain("renderLoop");
    expect(fileContent).toContain("requestAnimationFrame");
    expect(fileContent).toContain("sleep(");
    expect(fileContent).toContain("universe.tick()");
    expect(fileContent).toContain("drawGrid()");
    expect(fileContent).toContain("drawCells()");

    // sleepヘルパー関数を検証
    expect(fileContent).toContain("new Promise((resolve)");
    expect(fileContent).toContain("setTimeout(resolve");

    // アニメーションの開始位置を検証
    expect(fileContent).toContain("requestAnimationFrame(renderLoop)");

    // アニメーションIDの保持を検証
    expect(fileContent).toContain("let animationFrameId");
    expect(fileContent).toContain("animationFrameId = requestAnimationFrame");
  });

  it("verifies cleanup function in wasm-game.js", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // クリーンアップ機能の存在を検証
    expect(fileContent).toContain("return () => {");
    expect(fileContent).toContain(
      "if (animationFrameId) cancelAnimationFrame(animationFrameId)",
    );

    // エクスポートを検証
    expect(fileContent).toContain("export default wasmImage");
  });
});
