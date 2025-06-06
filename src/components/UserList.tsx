// UserList.tsx
import React, { useState } from "react";
import RepoList from "./RepoList";

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
}

export interface UserListProps {
  users: GitHubUser[];
  loading: boolean;
  error: string | null;
}

const UserList: React.FC<UserListProps> = ({ users, loading, error }) => {
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  const handleUserClick = (username: string) => {
    // Toggle dropdown: collapse if already expanded, otherwise expand.
    setExpandedUser(expandedUser === username ? null : username);
  };

  if (loading) {
    return <p className="text-center">Loading users...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }
  if (users.length === 0) {
    return <p className="text-center">No users found. Try a different search.</p>;
  }
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className="border-b border-gray-200">
          <div
            onClick={() => handleUserClick(user.login)}
            className="flex items-center space-x-4 p-2 cursor-pointer hover:bg-gray-50"
          >
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg text-black">{user.login}</span>
          </div>
          {expandedUser === user.login && (
            <div className="ml-12">
              <RepoList username={user.login} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
