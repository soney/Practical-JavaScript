import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

async function fetchWords(searchTerm) {
  const params = new URLSearchParams({
    ml: searchTerm,
  });

  const response = await fetch(`https://api.datamuse.com/words?${params}`);

  if (!response.ok) {
    throw new Error("Could not fetch words");
  }

  return response.json();
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("state");
  const wordsQuery = useQuery({
    queryKey: ["ml", searchTerm],
    queryFn: () => fetchWords(searchTerm),
    enabled: searchTerm.length > 0
  });

  return (
    <main>
      <h1>Word Finder</h1>

      <input value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)} />

      {wordsQuery.isPending && searchTerm && <p>Loading...</p>}
      {wordsQuery.isError && <p>Something went wrong.</p>}

      <ul>
        {wordsQuery.isSuccess && wordsQuery.data.map((word) => (
          <li key={word.word}>{word.word}</li>
        ))}
      </ul>
    </main>
  );
}