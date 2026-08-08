# Dev container

Opening this repository in GitHub Codespaces (or VS Code's "Reopen in
Container") gives you the same setup as the Coursera course lab:

- Node 24 (the same major version the course autograder runs)
- The Web Notebook extension, so the `.webnb` lesson notebooks under
  `notebooks/` render and run instead of showing as plain text
- Portable Live Preview, for previewing assignment HTML pages in the editor
- TODO Highlight, so the `TODO:` edit markers in assignment starters stand out
- Every npm package the Course 3 server assignments import, pre-installed on
  Node's lookup path (no `npm install` needed inside assignment folders;
  lecture samples with their own `package.json` still use `npm install` +
  `npm start` as their READMEs say)
