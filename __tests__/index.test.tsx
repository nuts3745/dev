import type React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "../pages/index";

// Mock the WasmGame component to avoid WASM loading issues
vi.mock("../pages/wasm-game", () => {
  return {
    default: () => <div data-testid="wasm-game-mock">WasmGame Mock</div>,
  };
});

// Mock next/head to avoid errors
vi.mock("next/head", () => {
  return {
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe("Home Page", () => {
  it("renders the WasmGame component", () => {
    render(<Home />);
    const wasmGame = screen.getByTestId("wasm-game-mock");
    expect(wasmGame).not.toBeNull();
    expect(wasmGame.textContent).toBe("WasmGame Mock");
  });

  it("renders social links", () => {
    render(<Home />);

    // Check for Bluesky link
    const blueskyLink = screen.getByTitle("Bluesky");
    expect(blueskyLink).not.toBeNull();
    expect(blueskyLink.getAttribute("href")).toBe(
      "https://bsky.app/profile/nuts3745.dev",
    );
    expect(blueskyLink.getAttribute("target")).toBe("_blank");

    // Check for GitHub link
    const githubLink = screen.getByTitle("GitHub");
    expect(githubLink).not.toBeNull();
    expect(githubLink.getAttribute("href")).toBe("https://github.com/nuts3745");

    // Check for Scrapbox link
    const scrapboxLink = screen.getByTitle("Scrapbox");
    expect(scrapboxLink).not.toBeNull();
    expect(scrapboxLink.getAttribute("href")).toBe(
      "https://scrapbox.io/suzuki-log/",
    );
  });

  it("renders footer with copyright information", () => {
    render(<Home />);

    // Get the current year for copyright text
    const currentYear = new Date().getFullYear();

    // Check for copyright text
    const footerText = screen.getByText((content) =>
      content.includes(`Copyright © 2019-${currentYear} nuts3745`),
    );
    expect(footerText).not.toBeNull();

    // Check for Simple Icons attribution
    const simpleIconsLink = screen.getByTitle("Simple Icons");
    expect(simpleIconsLink).not.toBeNull();
    expect(simpleIconsLink.getAttribute("href")).toBe(
      "https://github.com/simple-icons/simple-icons",
    );
  });
});
