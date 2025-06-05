import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import UserList, { type GitHubUser } from "./components/UserList";
import RepoList, { type Repo } from "./components/RepoList";

const App: React.FC = () => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [repoError, setRepoError] = useState<string | null>(null);

  const searchUsers = async (query: string) => {
    setLoadingUsers(true);
    setUserError(null);
    setRepos([]); // Clear previous repos on a new search
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

  const loadUserRepos = async (username: string) => {
    setLoadingRepos(true);
    setRepoError(null);
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      setRepos(response.data);
    } catch (error: any) {
      setRepoError(error.message || "Error fetching repositories");
    } finally {
      setLoadingRepos(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-500 text-white py-6 shadow">
        <h1 className="text-center text-3xl font-bold">
          GitHub Search Explorer
        </h1>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <SearchBar onSearch={searchUsers} loading={loadingUsers} />

        <div className="mt-8 flex flex-col md:flex-row gap-6">
          {/* Left Panel: User List */}
          <section className="md:w-1/3">
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-4">Users</h2>
              <UserList
                users={users}
                loading={loadingUsers}
                error={userError}
                onUserClick={loadUserRepos}
              />
            </div>
          </section>
          {/* Right Panel: Repo List */}
          <section className="md:w-2/3">
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-4">Repositories</h2>
              <RepoList
                repos={repos}
                loading={loadingRepos}
                error={repoError}
              />
            </div>
          </section>
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
