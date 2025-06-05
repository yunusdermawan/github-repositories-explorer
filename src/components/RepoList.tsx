import React from "react";

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

export interface RepoListProps {
  repos: Repo[];
  loading: boolean;
  error: string | null;
}

const RepoList: React.FC<RepoListProps> = ({ repos, loading, error }) => {
  if (loading) {
    return <p className="text-center">Loading repositories...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }
  if (repos.length === 0) {
    return <p className="text-center">No repositories found for this user.</p>;
  }
  return (
    <ul>
      {repos.map((repo) => (
        <li
          key={repo.id}
          className="p-4 border border-gray-300 rounded mb-4"
        >
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-blue-600 hover:underline"
          >
            {repo.name}
          </a>
          {repo.description && (
            <p className="mt-2 text-gray-600">{repo.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
