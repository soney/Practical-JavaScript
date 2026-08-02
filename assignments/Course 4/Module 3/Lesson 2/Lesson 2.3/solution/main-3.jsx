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

// SOLUTION: create and configure the i18n instance with en/es translations
const i18n = i18next.createInstance();
i18n.init({
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  resources: {
    en: {
      translation: {
        heading: "Course Planner",
        message: "Choose a lesson to begin.",
      },
    },
    es: {
      translation: {
        heading: "Planificador del curso",
        message: "Elige una leccion para comenzar.",
      },
    },
  },
});

function Planner() {
  // SOLUTION: read t and i18n from the hook and track the current language
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  // SOLUTION: use the translations and let each button switch language
  return (
    <main className="assignment-shell" data-testid="app-ready">
      <h1>{t("heading")}</h1>
      <div className="button-row">
        <button
          className={language === "en" ? "active" : "secondary"}
          onClick={() => i18n.changeLanguage("en")}
        >
          English
        </button>
        <button
          className={language === "es" ? "active" : "secondary"}
          onClick={() => i18n.changeLanguage("es")}
        >
          Espanol
        </button>
      </div>
      <p className="status-line">{t("message")}</p>
      <p className="subtle">Current language: {language}</p>
    </main>
  );
}

function App() {
  // SOLUTION: wrap Planner in the I18nextProvider
  return (
    <I18nextProvider i18n={i18n}>
      <Planner />
    </I18nextProvider>
  );
}

ReactDOM.createRoot(document.querySelector("#root")).render(<App />);
