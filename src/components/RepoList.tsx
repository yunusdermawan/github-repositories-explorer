import React from "react";

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

interface RepoListProps {
  repos: Repo[];
  loading: boolean;
  error: string | null;
}

const RepoList: React.FC<RepoListProps> = ({ repos, loading, error }) => {
  if (loading) {
    return <p>Loading repositories...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
  if (repos.length === 0) {
    return <p>No repositories found for this user.</p>;
  }

  return (
    <ul className="repo-list">
      {repos.map((repo) => (
        <li key={repo.id} style={{ marginBottom: "1rem" }}>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
            {repo.name}
          </a>
          {repo.description && <p>{repo.description}</p>}
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
