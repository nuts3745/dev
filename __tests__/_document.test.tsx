import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MyDocument from "../pages/_document";

// Mock the next/document components
vi.mock("next/document", () => {
  return {
    default: class Document {
      static getInitialProps = vi.fn().mockResolvedValue({});
      render() {
        return null;
      }
    },
    Html: ({ lang, children }: { lang: string; children: React.ReactNode }) => (
      <div data-testid="html" data-lang={lang}>
        {children}
      </div>
    ),
    Head: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="head">{children}</div>
    ),
    Main: () => <div data-testid="main" />,
    NextScript: () => <div data-testid="next-script" />,
  };
});

describe("Document Component", () => {
  it("renders document structure correctly", () => {
    // Create a new instance of MyDocument
    const documentInstance = new MyDocument({} as any);

    // Render the document
    const { getByTestId } = render(documentInstance.render());

    // Check for the main document elements
    const htmlElement = getByTestId("html");
    const headElement = getByTestId("head");
    const mainElement = getByTestId("main");
    const scriptElement = getByTestId("next-script");

    // Verify html lang attribute (using data-lang in mock)
    expect(htmlElement.getAttribute("data-lang")).toBe("ja");

    // Verify other elements exist
    expect(headElement).not.toBeNull();
    expect(mainElement).not.toBeNull();
    expect(scriptElement).not.toBeNull();

    // Verify meta elements exist within head
    const metaElements = headElement.querySelectorAll("meta");
    expect(metaElements.length).toBeGreaterThan(0);

    // Verify favicon links exist
    const linkElements = headElement.querySelectorAll("link");
    expect(linkElements.length).toBeGreaterThan(0);
  });
});
