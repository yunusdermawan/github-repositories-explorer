import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserList, { type GitHubUser } from "../components/UserList";

// Stub RepoList so we don't actually fetch repositories during this test.
jest.mock("../RepoList", () => () => <div data-testid="repo-list">Repo List</div>);

const dummyUsers: GitHubUser[] = [
  { login: "user1", id: 1, avatar_url: "avatar1" },
  { login: "user2", id: 2, avatar_url: "avatar2" },
];

describe("UserList", () => {
  test("displays loading state", () => {
    render(<UserList users={[]} loading={true} error={null} />);
    expect(screen.getByText(/loading users/i)).toBeInTheDocument();
  });

  test("displays error state", () => {
    render(<UserList users={[]} loading={false} error="Error message" />);
    expect(screen.getByText(/error: error message/i)).toBeInTheDocument();
  });

  test("displays list of users", () => {
    render(<UserList users={dummyUsers} loading={false} error={null} />);
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
  });

  test("toggles repository dropdown on user click", () => {
    render(<UserList users={dummyUsers} loading={false} error={null} />);
    const userRow = screen.getByText("user1");
    // Initially, repo dropdown should not be visible.
    expect(screen.queryByTestId("repo-list")).not.toBeInTheDocument();
    // Click to expand dropdown.
    fireEvent.click(userRow);
    expect(screen.getByTestId("repo-list")).toBeInTheDocument();
    // Click again to collapse dropdown.
    fireEvent.click(userRow);
    expect(screen.queryByTestId("repo-list")).not.toBeInTheDocument();
  });
});
