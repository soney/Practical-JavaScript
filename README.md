# Practical JavaScript

Public course materials for the **Practical JavaScript** specialization
by Steve Oney, University of Michigan.

## What is here

[`presentation-code/`](presentation-code/) - the source code written during the lecture
videos. 192 folders across 4 courses; 172 of them are code
typed on camera during a specific video, and each folder's lesson README names
that video and links to it.

[`assignments/`](assignments/) - the 180 assignment problems, across
59 Coursera assignments. Every problem folder holds the starter code you are
given in the course lab and its description as that folder's README. The
44 practice assignments also publish their solutions; the
15 graded ones do not, and no autograder tests are published.

[`notebooks/`](notebooks/) - the 214 interactive lesson
notebooks (`.webnb`), exactly as they appear pre-loaded in each course's lab.
They are plain text and readable on GitHub; the
[notebook index](notebooks/README.md) explains how to view them
fully rendered.

Paths in all three follow the course structure:

```
presentation-code/course-<n>/module-<n>/lesson-<n>/<sample>/
assignments/Course <n>/Module <n>/<assignment>/<problem>/
notebooks/Course <n>/Module <n> - <title>/<NN - notebook>.webnb
```

so `presentation-code/course-1/module-1/lesson-2/introduction-to-html/` is the
code from Course 1, Module 1, Lesson 2, and
`assignments/Course 1/Module 1/Lesson 2/Lesson 2.1/` is the first problem of
that lesson's practice assignment. The assignment paths are the ones you see in
the course lab, unchanged, so a description that says "Edit
`Lesson 2.1/index.html`" names the folder it is sitting in.

Start at the [code index](presentation-code/README.md) or the
[assignment index](assignments/README.md) to browse everything in course
order.

## Running the samples

Most are single HTML files - open them in a browser. Folders with a
`package.json` are Node projects: `npm install` then `npm start`.

A few samples call third-party APIs and ship with the key replaced by a
placeholder such as `YOUR_OMDB_API_KEY`. Get your own (they are free) and drop
it in. Nothing here contains a working credential.
