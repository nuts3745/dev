import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Snapshot Tests", () => {
  // wasm-game.jsのスナップショットテスト
  it("wasm-game.js file structure matches expected pattern", () => {
    const filePath = path.resolve("./scripts/wasm-game.js");
    const fileContent = fs.readFileSync(filePath, "utf8");

    // ファイル内容をフォーマットして一貫性のあるテスト結果を得る
    const normalizedContent = fileContent
      .replace(/\r\n/g, "\n") // 改行の正規化
      .replace(/[ \t]+$/gm, "") // 行末の空白を削除
      .trim(); // 先頭と末尾の空白を削除

    // スナップショットと比較
    expect(normalizedContent).toMatchSnapshot();
  });

  // wasm-game.tsxのスナップショットテスト
  it("wasm-game.tsx component matches expected pattern", () => {
    const filePath = path.resolve("./pages/wasm-game.tsx");
    const fileContent = fs.readFileSync(filePath, "utf8");

    // ファイル内容をフォーマットして一貫性のあるテスト結果を得る
    const normalizedContent = fileContent
      .replace(/\r\n/g, "\n") // 改行の正規化
      .replace(/[ \t]+$/gm, "") // 行末の空白を削除
      .trim(); // 先頭と末尾の空白を削除

    // スナップショットと比較
    expect(normalizedContent).toMatchSnapshot();
  });

  // next.config.jsのスナップショットテスト
  it("next.config.js configuration matches expected pattern", () => {
    const filePath = path.resolve("./next.config.js");
    const fileContent = fs.readFileSync(filePath, "utf8");

    // ファイル内容をフォーマットして一貫性のあるテスト結果を得る
    const normalizedContent = fileContent
      .replace(/\r\n/g, "\n") // 改行の正規化
      .replace(/[ \t]+$/gm, "") // 行末の空白を削除
      .trim(); // 先頭と末尾の空白を削除

    // スナップショットと比較
    expect(normalizedContent).toMatchSnapshot();
  });
});
