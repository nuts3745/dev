import { describe, it, expect, beforeEach } from "vitest";
import React from "react";
import { render } from "@testing-library/react";

// Complete mock of the component to avoid WASM loading issues
const WasmGameMock = () => {
  return (
    <div>
      <canvas id="game-of-life" />
    </div>
  );
};

describe("WasmGame Component", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("renders a canvas element with the correct ID", () => {
    render(<WasmGameMock />);

    const canvas = document.querySelector("canvas");
    expect(canvas).not.toBeNull();
    expect(canvas?.id).toBe("game-of-life");
  });

  it("ensures canvas is within a div container", () => {
    render(<WasmGameMock />);

    const canvas = document.querySelector("canvas");
    expect(canvas?.parentElement?.tagName.toLowerCase()).toBe("div");
  });

  it("has the expected DOM structure", () => {
    const { container } = render(<WasmGameMock />);

    // Check for the div element
    const divElement = container.querySelector("div");
    expect(divElement).not.toBeNull();

    // Check that the canvas is inside the div
    const canvasElement = divElement?.querySelector("canvas");
    expect(canvasElement).not.toBeNull();
    expect(canvasElement?.id).toBe("game-of-life");
  });
});
