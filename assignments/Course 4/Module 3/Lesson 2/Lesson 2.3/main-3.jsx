// ===== YOUR TASK =====
// Edit this file to complete the assignment (see the problem description).
// The spots to change are marked with TODO comments below. Leave the rest as-is.
// =====================

// React and ReactDOM are loaded by index.html from <script> tags, so they are
// available here as globals. In a project with a build step (a bundler) you would
// import them instead:
//   import React from "react";
//   import ReactDOM from "react-dom/client";
// This project has no bundler -- it uses a pre-packaged React -- so we use the
// globals directly instead of importing.

// i18next and react-i18next are loaded by index.html as globals (window.i18next
// and window.ReactI18next) from <script> tags. In a project with a bundler you
// would import them instead:
//   import i18next from "i18next";
//   import { I18nextProvider, useTranslation } from "react-i18next";
// There is no build step here, so we use the i18next global directly and
// destructure the react-i18next pieces off its global. This line is provided for you.
const { I18nextProvider, useTranslation } = ReactI18next;

// TODO: Create an i18next instance with i18next.createInstance().
// TODO: Call i18n.init(...) with lng "en" and a `resources` object that holds an
//       `en` and an `es` `translation` with `heading` and `message` keys.

function Planner() {
  // TODO: Read `t` and `i18n` from useTranslation().
  // TODO: Use t("heading") and t("message") for the translated text.
  // TODO: Make each button call i18n.changeLanguage(...) with "en" or "es".
  return (
    <main className="assignment-shell" data-testid="app-ready">
      {/* TODO: show t("heading") here instead of the hard-coded "Course Planner" */}
      <h1>Course Planner</h1>
      <div className="button-row">
        {/* TODO: give each button an onClick that calls i18n.changeLanguage("en") or i18n.changeLanguage("es"), and set its class to "active" when i18n.language matches, otherwise "secondary" */}
        <button className="active">English</button>
        <button className="secondary">Espanol</button>
      </div>
      {/* TODO: show t("message") here instead of the hard-coded "Choose a lesson to begin." */}
      <p className="status-line">Choose a lesson to begin.</p>
      {/* TODO: show the current i18n.language here instead of the hard-coded "en" */}
      <p className="subtle">Current language: en</p>
    </main>
  );
}

function App() {
  // TODO: Wrap Planner in an I18nextProvider that receives your i18n instance.
  return <Planner />;
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
