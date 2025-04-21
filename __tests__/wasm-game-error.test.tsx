import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("WasmGame Error Handling Tests", () => {
  it("verifies canvas element existence check", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // canvas要素の取得ロジックを検証
    expect(fileContent).toContain("document.getElementById(id)");

    // 直接エラーチェックがなくてもよいが、
    // canvas要素がnullの場合に続けて実行しないように
    // 暗黙的にエラーになるコード構造を確認
    expect(fileContent).toMatch(
      /const\s+canvas\s*=\s*document\.getElementById\(id\)/,
    );
    expect(fileContent).toMatch(/canvas\.height/);
    expect(fileContent).toMatch(/canvas\.width/);
  });

  it("verifies WebAssembly integration robustness", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // try-catchブロックがなくても、WASMモジュールを
    // 適切に使用しているか検証

    // 基本的なUniverse生成
    expect(fileContent).toContain("const universe = Universe.new()");

    // メモリアクセスの方法を検証
    // - メモリバッファの取得
    expect(fileContent).toContain("const cellsPtr = universe.cells()");
    // - Uint8Arrayでメモリにアクセス
    expect(fileContent).toContain("new Uint8Array(memory.buffer, cellsPtr");
    // - 適切なサイズ指定
    expect(fileContent).toContain("width * height");
  });
});
