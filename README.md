# Practical JavaScript

Public course materials for the **Practical JavaScript** specialization
by Steve Oney, University of Michigan.

## What is here

[`presentation-code/`](presentation-code/) - the source code written during the lecture
videos. 192 folders across 4 courses; 172 of them are code
typed on camera during a specific video, and each folder's lesson README names
that video and links to it.

Paths follow the course structure:

```
presentation-code/course-<n>/module-<n>/lesson-<n>/<sample>/
```

so `presentation-code/course-1/module-1/lesson-2/introduction-to-html/` is the
code from Course 1, Module 1, Lesson 2.

Start at the [index](presentation-code/README.md) to browse everything in course order,
or open the README in any lesson folder to see which video its samples came from.

## Running the samples

Most are single HTML files - open them in a browser. Folders with a
`package.json` are Node projects: `npm install` then `npm start`.

A few samples call third-party APIs and ship with the key replaced by a
placeholder such as `YOUR_OMDB_API_KEY`. Get your own (they are free) and drop
it in. Nothing here contains a working credential.

## Where this comes from

This repository is generated from the course's private authoring repository and
should not be edited directly - changes here are overwritten on the next sync.
