import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("WasmGame Structure Tests", () => {
  it("verifies source code structure", () => {
    // ファイルパスを設定
    const wasmGamePath = path.resolve("./pages/wasm-game.tsx");

    // ファイルが存在することを確認
    expect(fs.existsSync(wasmGamePath)).toBe(true);

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGamePath, "utf8");

    // 実装の特定部分を検証
    expect(fileContent).toContain("import React, { useEffect }");
    expect(fileContent).toContain('import wasmImage from "scripts/wasm-game"');
    expect(fileContent).toContain("const WasmGame = () =>");
    expect(fileContent).toContain("useEffect(");
    expect(fileContent).toContain('wasmImage("game-of-life")');
    expect(fileContent).toContain('<canvas id="game-of-life"');
    expect(fileContent).toContain("export default WasmGame");
  });
});
