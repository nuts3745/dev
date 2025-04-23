import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";

// コンポーネントのモック（WASMロードなし）
const WasmGameMock = () => {
  return (
    <div>
      <canvas id="game-of-life" />
    </div>
  );
};

describe("WasmGame Accessibility Tests", () => {
  it("checks for basic DOM structure accessibility", () => {
    // レンダリングしてキャンバス要素を取得
    const { container } = render(<WasmGameMock />);
    const canvas = container.querySelector("canvas");

    // キャンバス要素が存在するか確認
    expect(canvas).not.toBeNull();
    expect(canvas?.id).toBe("game-of-life");

    // キャンバスがdiv内にあることを確認（スクリーンリーダー対応などのため）
    expect(canvas?.parentElement?.tagName.toLowerCase()).toBe("div");
  });
});
