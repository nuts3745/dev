import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("WasmGame Options Tests", () => {
  it("verifies default options in wasm-game.js", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイルが存在することを確認
    expect(fs.existsSync(wasmGameJsPath)).toBe(true);

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // デフォルトオプションの存在を検証
    expect(fileContent).toContain("const defaultOptions = {");
    expect(fileContent).toContain("cellSize:");
    expect(fileContent).toContain("gridColor:");
    expect(fileContent).toContain("deadColor:");
    expect(fileContent).toContain("aliveColor:");
    expect(fileContent).toContain("sleepTime:");

    // オプションの扱いを検証
    expect(fileContent).toContain(
      "const wasmImage = (id, options = defaultOptions)",
    );
    expect(fileContent).toContain("const cellSize = options.cellSize");
    expect(fileContent).toContain("const gridColor = options.gridColor");
    expect(fileContent).toContain("const deadColor = options.deadColor");
    expect(fileContent).toContain("const aliveColor = options.aliveColor");
    expect(fileContent).toContain("const sleepTime = options.sleepTime");
  });
});
