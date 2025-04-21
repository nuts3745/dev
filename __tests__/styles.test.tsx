import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("CSS Styles Tests", () => {
  // Home.module.cssのテスト
  it("verifies Home.module.css exists and contains expected styles", () => {
    const cssPath = path.resolve("./styles/Home.module.css");

    // ファイルが存在することを確認
    expect(fs.existsSync(cssPath)).toBe(true);

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(cssPath, "utf8");

    // 主要なスタイル要素の確認
    expect(fileContent).toContain(".container");
    expect(fileContent).toContain(".main");
    expect(fileContent).toContain(".wasmGameContainer");
    expect(fileContent).toContain(".socialNav");
    expect(fileContent).toContain(".footer");

    // レスポンシブデザインの要素
    expect(fileContent).toContain("display: flex");
    expect(fileContent).toContain("justify-content: center");
  });

  // globals.cssのテスト
  it("verifies globals.css exists and contains expected styles", () => {
    const cssPath = path.resolve("./styles/globals.css");

    // ファイルが存在することを確認
    expect(fs.existsSync(cssPath)).toBe(true);

    // ファイル内容を読み取り
    const fileContent = fs.readFileSync(cssPath, "utf8");

    // 基本的なリセットスタイルが含まれていることを確認
    expect(fileContent).toContain("html,");
    expect(fileContent).toContain("body");
  });

  // インポートの整合性テスト
  it("verifies style imports in components", () => {
    // _app.tsxでのグローバルスタイルのインポート
    const appPath = path.resolve("./pages/_app.tsx");
    const appContent = fs.readFileSync(appPath, "utf8");
    expect(appContent).toContain('import "../styles/globals.css"');

    // index.tsxでのモジュールスタイルのインポート
    const indexPath = path.resolve("./pages/index.tsx");
    const indexContent = fs.readFileSync(indexPath, "utf8");
    expect(indexContent).toContain(
      'import styles from "../styles/Home.module.css"',
    );

    // スタイルが正しく適用されていることを確認
    expect(indexContent).toContain("className={styles.container}");
    expect(indexContent).toContain("className={styles.main}");
    expect(indexContent).toContain("className={styles.wasmGameContainer}");
    expect(indexContent).toContain("className={styles.footer}");
  });
});
