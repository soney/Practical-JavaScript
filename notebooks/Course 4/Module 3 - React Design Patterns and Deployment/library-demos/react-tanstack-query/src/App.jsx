// The Word Finder from the video: type a search term, get words with a
// similar meaning back from the Datamuse API, with the request state managed
// by TanStack Query.
//
// Unlike the react-i18next demo next to this project, this one cannot run
// from a plain preview: TanStack Query is published only as npm modules, so
// the project keeps the build step from the video (webpack and Babel). To run
// it, copy this whole folder somewhere outside the workspace, then in a
// terminal inside the copy:
//
//     npm install
//     npm run dev
//
// It fetches live data from the Datamuse API, so running it also needs
// network access. Inside the workspace, the reading next to this folder is
// the way to read it.

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// #region fetch-words
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
// #endregion

export default function App() {
  // #region use-query
  const [searchTerm, setSearchTerm] = useState("state");
  const wordsQuery = useQuery({
    queryKey: ["ml", searchTerm],
    queryFn: () => fetchWords(searchTerm),
    enabled: searchTerm.length > 0
  });
  // #endregion

  // #region render
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
  // #endregion
}
