import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import { Group } from "./group";

describe("Button", () => {
  test("renders without crashing", () => {
    const content = "Click me";
    const { getByText } = render(<Group>{content}</Group>);
    expect(getByText(content)).toBeInTheDocument();
  });
});
