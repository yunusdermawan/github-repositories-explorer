import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  const onSearch = jest.fn();

  beforeEach(() => {
    onSearch.mockReset();
  });

  test("renders input and search button", () => {
    render(<SearchBar onSearch={onSearch} loading={false} />);
    const input = screen.getByPlaceholderText("Search GitHub users...");
    const button = screen.getByRole("button", { name: /search/i });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("calls onSearch when the button is clicked", () => {
    render(<SearchBar onSearch={onSearch} loading={false} />);
    const input = screen.getByPlaceholderText("Search GitHub users...");
    fireEvent.change(input, { target: { value: "testuser" } });
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalledWith("testuser");
  });

  test("calls onSearch when Enter key is pressed", () => {
    render(<SearchBar onSearch={onSearch} loading={false} />);
    const input = screen.getByPlaceholderText("Search GitHub users...");
    fireEvent.change(input, { target: { value: "anotheruser" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(onSearch).toHaveBeenCalledWith("anotheruser");
  });

  test("does not call onSearch with only whitespace", () => {
    render(<SearchBar onSearch={onSearch} loading={false} />);
    const input = screen.getByPlaceholderText("Search GitHub users...");
    fireEvent.change(input, { target: { value: "   " } });
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);
    expect(onSearch).not.toHaveBeenCalled();
  });
});
