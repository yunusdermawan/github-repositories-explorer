// RepoList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
}

export interface RepoListProps {
  username: string;
}

const RepoList: React.FC<RepoListProps> = ({ username }) => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        setRepos(response.data);
      } catch (e: any) {
        setError(e.message || "Error fetching repositories");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  if (loading) {
    return <p className="text-center p-2">Loading repositories...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500 p-2">Error: {error}</p>;
  }
  if (repos.length === 0) {
    return <p className="text-center p-2">No repositories found for this user.</p>;
  }
  return (
    <ul className="mt-2 border-t pt-2">
      {repos.map((repo) => (
        <li key={repo.id} className="p-2 border-b last:border-b-0">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-bold hover:underline"
          >
            {repo.name}
          </a>
          {repo.description && (
            <p className="text-sm text-gray-700">{repo.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
