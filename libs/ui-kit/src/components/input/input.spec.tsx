import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import { Input } from "./input";

describe("Button", () => {
  test("renders without crashing", () => {
    const { container } = render(<Input />);
    expect(container).toBeInTheDocument();
  });
});
