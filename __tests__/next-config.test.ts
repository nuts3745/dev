import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Next.js Configuration Tests", () => {
  it("verifies next.config.js exists and contains expected configuration", () => {
    const configPath = path.resolve("./next.config.js");

    // ファイルが存在することを確認
    expect(fs.existsSync(configPath)).toBe(true);

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(configPath, "utf8");

    // 基本的な設定が含まれていることを確認
    expect(fileContent).toContain("module.exports");

    // 正しいモジュールエクスポート形式かを確認
    expect(fileContent).toMatch(/module\.exports\s*=/);
  });

  it("verifies next-env.d.ts exists for type definitions", () => {
    const envTypePath = path.resolve("./next-env.d.ts");

    // ファイルが存在することを確認
    expect(fs.existsSync(envTypePath)).toBe(true);

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(envTypePath, "utf8");

    // 型定義のインポートが含まれていることを確認
    expect(fileContent).toContain('/// <reference types="next" />');
  });

  it("verifies tsconfig.json exists with proper Next.js configuration", () => {
    const tsconfigPath = path.resolve("./tsconfig.json");

    // ファイルが存在することを確認
    expect(fs.existsSync(tsconfigPath)).toBe(true);

    // ファイル内容を読み取りJSONとしてパース
    const fileContent = fs.readFileSync(tsconfigPath, "utf8");
    const tsconfig = JSON.parse(fileContent);

    // 基本的な設定が含まれていることを確認
    expect(tsconfig).toHaveProperty("compilerOptions");

    // Next.js特有の設定が含まれていることを確認
    expect(tsconfig.compilerOptions).toHaveProperty("jsx");

    // コンパイラオプションの確認
    expect(tsconfig.compilerOptions.jsx).toBeDefined();
  });
});
