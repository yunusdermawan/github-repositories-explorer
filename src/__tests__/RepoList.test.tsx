import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import RepoList from "../components/RepoList";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("RepoList", () => {
  test("displays loading message initially", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });
    render(<RepoList username="testuser" />);
    expect(screen.getByText(/loading repositories/i)).toBeInTheDocument();
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalled());
  });

  test("displays error message on fetch failure", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));
    render(<RepoList username="testuser" />);
    await waitFor(() =>
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    );
  });

  test("displays no repositories message when response is empty", async () => {
    mockedAxios.get.mockResolvedValue({ data: [] });
    render(<RepoList username="testuser" />);
    await waitFor(() =>
      expect(screen.getByText(/no repositories found/i)).toBeInTheDocument()
    );
  });

  test("displays list of repositories when data exists", async () => {
    const repos = [
      {
        id: 1,
        name: "repo1",
        html_url: "http://example.com/repo1",
        description: "desc1",
      },
      {
        id: 2,
        name: "repo2",
        html_url: "http://example.com/repo2",
        description: "desc2",
      },
    ];
    mockedAxios.get.mockResolvedValue({ data: repos });
    render(<RepoList username="testuser" />);
    await waitFor(() => {
      expect(screen.getByText("repo1")).toBeInTheDocument();
      expect(screen.getByText("repo2")).toBeInTheDocument();
    });
  });
});
