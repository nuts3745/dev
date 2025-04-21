import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../pages/_app";

describe("App Component", () => {
  it("renders children correctly", () => {
    // Create a mock Component
    const TestComponent = () => (
      <div data-testid="test-component">Test Content</div>
    );

    // Create mock pageProps
    const pageProps = { testProp: "test value" };

    // Render the App with the test component
    const { getByTestId } = render(
      <App
        Component={TestComponent}
        pageProps={pageProps}
        // @ts-ignore - router is required by AppProps but not needed for this test
        router={{}}
      />,
    );

    // Verify that the component rendered correctly
    const testComponent = getByTestId("test-component");
    expect(testComponent).not.toBeNull();
    expect(testComponent.textContent).toBe("Test Content");
  });
});
