// App.tsx
import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import UserList, { type GitHubUser } from "./components/UserList";

const App: React.FC = () => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  const searchUsers = async (query: string) => {
    setLoadingUsers(true);
    setUserError(null);
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${query}&per_page=5`
      );
      setUsers(response.data.items);
    } catch (error: any) {
      setUserError(error.message || "Error fetching users");
    } finally {
      setLoadingUsers(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-500 text-white py-6 shadow">
        <h1 className="text-center text-3xl font-bold">GitHub Search Explorer</h1>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <SearchBar onSearch={searchUsers} loading={loadingUsers} />
        <div className="mt-8">
          <UserList users={users} loading={loadingUsers} error={userError} />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-600">
        &copy; {new Date().getFullYear()} GitHub Explorer. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;
