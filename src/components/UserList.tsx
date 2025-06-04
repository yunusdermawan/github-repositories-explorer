import React from "react";

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
}

interface UserListProps {
  users: GitHubUser[];
  onUserClick: (username: string) => void;
  loading: boolean;
  error: string | null;
}

const UserList: React.FC<UserListProps> = ({ users, onUserClick, loading, error }) => {
  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  if (users.length === 0) {
    return <p>No users found. Try a different search.</p>;
  }

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} onClick={() => onUserClick(user.login)} style={{ cursor: "pointer", padding: "5px" }}>
          <img
            src={user.avatar_url}
            alt={user.login}
            width={30}
            height={30}
            style={{ borderRadius: "50%", marginRight: "8px" }}
          />
          {user.login}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
