import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("App Integration", () => {
  test("searches for users and toggles repository dropdown", async () => {
    // Set up mock responses:
    const userResponse = {
      data: {
        items: [
          { login: "user1", id: 1, avatar_url: "avatar1" },
          { login: "user2", id: 2, avatar_url: "avatar2" },
        ],
      },
    };
    const repoResponse = {
      data: [
        {
          id: 1,
          name: "repo1",
          html_url: "http://example.com/repo1",
          description: "desc1",
        },
      ],
    };

    // axios.get returns different data based on URL:
    mockedAxios.get.mockImplementation((url) => {
      if (url.includes("search/users")) {
        return Promise.resolve(userResponse);
      }
      if (url.includes("user1/repos")) {
        return Promise.resolve(repoResponse);
      }
      return Promise.reject(new Error("not found"));
    });

    render(<App />);
    // Search for users
    const input = screen.getByPlaceholderText("Search GitHub users...");
    fireEvent.change(input, { target: { value: "user" } });
    const button = screen.getByRole("button", { name: /search/i });
    fireEvent.click(button);

    // Wait until the user list is rendered:
    await waitFor(() => {
      expect(screen.getByText("user1")).toBeInTheDocument();
    });

    // Click on the first user to expand the repository dropdown:
    const userRow = screen.getByText("user1");
    fireEvent.click(userRow);

    // Wait for the repository list to be displayed:
    await waitFor(() => {
      expect(screen.getByText("repo1")).toBeInTheDocument();
    });
  });
});
