// App.tsx
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
    setRepos([]); // clear previous repos on a new search
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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl text-blue-600 font-bold">GitHub Search Explorer</h1>
      </header>
      <SearchBar onSearch={searchUsers} loading={loadingUsers} />
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <div className="sm:w-1/3">
          <UserList
            users={users}
            loading={loadingUsers}
            error={userError}
            onUserClick={loadUserRepos}
          />
        </div>
        <div className="sm:w-2/3">
          <RepoList
            repos={repos}
            loading={loadingRepos}
            error={repoError}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
