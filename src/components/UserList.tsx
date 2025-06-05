import React from "react";

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
}

export interface UserListProps {
  users: GitHubUser[];
  onUserClick: (username: string) => void;
  loading: boolean;
  error: string | null;
}

const UserList: React.FC<UserListProps> = ({
  users,
  onUserClick,
  loading,
  error,
}) => {
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
        <li
          key={user.id}
          onClick={() => onUserClick(user.login)}
          className="flex items-center space-x-4 p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
        >
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-lg">{user.login}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
