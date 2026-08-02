// This file uses Lodash, which index.html loads from a CDN <script> tag, so the
// Lodash global `_` is available here. In a project with a bundler you would
// import it instead:
//   import _ from "lodash";
// There is no build step here (Lodash is pre-packaged from a CDN), so we use the
// global.

const heading = document.querySelector('#result');
heading.textContent = _.upperFirst('hello from lodash');
