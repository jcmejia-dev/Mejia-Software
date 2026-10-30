export type RepositoryStats = {
  fullName: string;
  stars: number;
  forks: number;
  language: string | null;
  updatedAt: string;
};

export async function getRepositoryStats(fullName: string): Promise<RepositoryStats | null> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${fullName}`, {
      headers,
      next: { revalidate: 1800 },
    });

    if (!response.ok) return null;
    const data = await response.json();

    return {
      fullName: data.full_name,
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
      updatedAt: data.updated_at,
    };
  } catch {
    return null;
  }
}
