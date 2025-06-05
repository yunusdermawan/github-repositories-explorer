import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserList, { type GitHubUser } from "./components/UserList";
import RepoList, { type Repo } from "./components/RepoList";
import axios from 'axios'

const App: React.FC = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [repoError, setRepoError] = useState<string | null>(null);

  const searchUsers = async (searchTerm: string) => {
    setQuery(searchTerm);
    setLoadingUsers(true);
    setUserError(null);
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchTerm}&per_page=5`
      );
      setUsers(response.data.items);
    } catch (error: any) {
      setUserError(error.message || "Error fetching users");
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchUserRepos = async (username: string) => {
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
    <div className="app">
      <h1>GitHub User & Repository Search</h1>
      <SearchBar onSearch={searchUsers} loading={loadingUsers} />
      <UserList users={users} onUserClick={fetchUserRepos} loading={loadingUsers} error={userError} />
      <RepoList repos={repos} loading={loadingRepos} error={repoError} />
    </div>
  );
};

export default App;
