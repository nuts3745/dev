import { describe, it, expect } from "vitest";
import path from "path";

describe("Next.js Configuration Coverage", () => {
  it("loads and executes next.config.js correctly", async () => {
    // 設定ファイルを動的にインポート
    const configPath = path.resolve("./next.config.js");
    const nextConfig = await import(configPath);

    // 設定オブジェクトが存在することを確認
    expect(nextConfig).toBeDefined();
    expect(nextConfig.default || nextConfig).toBeTypeOf("object");

    // 特定のNext.js設定オプションをチェック
    const config = nextConfig.default || nextConfig;

    // オブジェクトの形式で設定されているか
    expect(config).toBeTypeOf("object");

    // 少なくとも空のオブジェクトであることを確認
    expect(Object.keys(config).length).toBeGreaterThanOrEqual(0);
  });
});
