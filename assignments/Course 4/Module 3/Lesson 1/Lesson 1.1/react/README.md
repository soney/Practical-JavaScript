# React Assignment Runtime

Course 4 assignments use these vendored browser scripts so JSX-based React problems can run as static assignments without a per-problem build step.

- `react.development.js`: React 18.3.1 UMD development build
- `react-dom.development.js`: React DOM 18.3.1 UMD development build
- `jsx.min.js`: the in-browser JSX compiler (see below). Replaced Babel Standalone 7.28.5, which was 3.1 MB.
- `course4.css`: shared styles for the assignment pages
- `react-router-dom.js`: React Router DOM UMD build (global `ReactRouterDOM`)
- `i18next.js` / `react-i18next.js`: i18next UMD builds (globals `i18next` and `ReactI18next`)
- `zustand.js`: zustand 5.0.14 state-management library, self-contained UMD build (global `zustand`, exposing `create` and `createStore`). React is an external dependency read from the global `React`, so this script must load after `react.development.js`.

These files are used only by learner-facing assignment pages.

## Rebuilding `jsx.min.js`

This file is copied into all 33 Course 4 assignments, so its size is multiplied by 33
in `assignments.zip`. Babel Standalone was 3.1 MB of the 4.2 MB each copy weighed --
139 MB of the bundle's 141 MB, which pushed the zip to 33 MB and made seeding it into
a Coursera lab mount time out at the gateway every time. Babel Standalone is that
large because it bundles every plugin and preset; the course only ever asks for one
thing, `data-presets="react"`, and none of the `.jsx` files use imports, exports or
any syntax beyond JSX. So this is a purpose-built 195 KB replacement: sucrase's JSX
transform plus the small piece of Babel Standalone's behaviour the pages rely on --
find `<script type="text/babel" src="...">`, fetch it, compile JSX to
`React.createElement` calls (classic runtime, so `React` must already be a global),
and run the results in document order.

It warns rather than fails silently if a page asks for a preset other than `react`,
since Babel Standalone would have accepted several.

The build source and full rationale are in `tools/jsx-runtime/` (kept out of this
directory because everything here is copied into all 33 assignments).

## Rebuilding `zustand.js`

zustand does not ship a self-contained browser build, so this file is bundled from the npm package with React left external:

```
npm install zustand@5.0.14 rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs
# entry.js:  export { create, createStore } from "zustand";
npx rollup entry.js -p @rollup/plugin-node-resolve -p @rollup/plugin-commonjs \
  --format umd --name zustand --external react --globals react:React -o zustand.js
```
