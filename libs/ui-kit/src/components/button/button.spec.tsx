import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import { Button } from "./button";

describe("Button", () => {
  test("renders without crashing", () => {
    const content = "Click me";
    const { getByText } = render(<Button>{content}</Button>);
    expect(getByText(content)).toBeInTheDocument();
  });
});
