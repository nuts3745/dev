import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("WASM Integration Tests", () => {
  it("verifies WASM import structure", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // WASM要素のインポートを検証
    expect(fileContent).toContain("import {");
    expect(fileContent).toContain("Cell,");
    expect(fileContent).toContain("Universe,");
    expect(fileContent).toContain(
      '} from "scripts/wasm-game-of-life/pkg/wasm_game_of_life"',
    );
    expect(fileContent).toContain(
      'import { memory } from "scripts/wasm-game-of-life/pkg/wasm_game_of_life_bg.wasm"',
    );

    // WASMモジュールの使用を検証
    expect(fileContent).toContain("Universe.new()");
    expect(fileContent).toContain("universe.tick()");
    expect(fileContent).toContain("universe.cells()");
    expect(fileContent).toContain("universe.width()");
    expect(fileContent).toContain("universe.height()");
    expect(fileContent).toContain("Cell.Dead");
    expect(fileContent).toContain("Cell.Alive");
  });

  it("verifies WASM memory handling", () => {
    // ファイルパスを設定
    const wasmGameJsPath = path.resolve("./scripts/wasm-game.js");

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(wasmGameJsPath, "utf8");

    // メモリ操作を検証
    expect(fileContent).toContain("memory.buffer");
    expect(fileContent).toContain("new Uint8Array(memory.buffer");
  });

  it("verifies WASM type definition existence", () => {
    // 型定義ファイルのパスを設定
    const wasmDtsPath = path.resolve(
      "./scripts/wasm-game-of-life/pkg/wasm_game_of_life.d.ts",
    );

    // ファイルが存在することを確認
    expect(fs.existsSync(wasmDtsPath)).toBe(true);

    // メモリ定義ファイルも確認
    const wasmMemoryDtsPath = path.resolve(
      "./scripts/wasm-game-of-life/pkg/wasm_game_of_life_bg.wasm.d.ts",
    );
    expect(fs.existsSync(wasmMemoryDtsPath)).toBe(true);
  });
});
