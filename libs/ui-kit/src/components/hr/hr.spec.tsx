import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import { Hr } from "./hr";

describe("Button", () => {
  test("renders without crashing", () => {
    const content = "Click me";
    const { getByText } = render(<Hr>{content}</Hr>);
    expect(getByText(content)).toBeInTheDocument();
  });
});
