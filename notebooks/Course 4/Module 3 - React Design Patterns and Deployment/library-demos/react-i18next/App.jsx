// The internationalized page from the video: a greeting the user can switch
// between English and French, translated by i18next and its React bindings.
//
// There is no bundler here, so index.html loads the libraries as <script>
// tags and they arrive as globals: i18next (the engine) and ReactI18next
// (the React bindings). In the video's project, this file started with:
//
//     import i18next from "i18next";
//     import { initReactI18next, useTranslation, Trans } from "react-i18next";
//
// The video also kept the render call at the bottom of this file in a file of
// its own, src/main.jsx, which imported this one. The in-browser JSX compiler
// runs one component file per page, so that file's job is folded in here.

// #region bindings
const { initReactI18next, useTranslation, Trans } = ReactI18next;
// #endregion

// #region init
i18next.use(initReactI18next).init({
  lng: "en",
// #endregion
  // #region resources
  // In a real project, each of these usually lives in a file of its own.
  // The video typed them in directly, and this copy keeps that.
  resources: {
    en: {
      translation: {
        greeting: "Hello World",
        greet_user: "Hello, {{user}}",
        account_message: "Visit <1>your account page</1> to change the display name."
      }
    },
    fr: {
      translation: {
        greeting: "Bonjour le monde",
        greet_user: "Bonjour, {{user}}",
        account_message: "Visitez <1>votre page de compte</1> pour modifier le nom d'affichage."
      }
    }
  }
  // #endregion
});

// #region hook
function App() {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = React.useState("Alice");
// #endregion
  return <>
    {/* #region buttons */}
    <header>
      <button onClick={() => i18n.changeLanguage("en")}>English</button>
      <button onClick={() => i18n.changeLanguage("fr")}>French</button>
    </header>
    {/* #endregion */}
    {/* #region interpolation */}
    <h1>{t("greet_user", { user: username })}</h1>
    <input value={username} onChange={(e) => setUsername(e.target.value)} />
    {/* #endregion */}
    {/* #region trans */}
    <div>
      <Trans i18nKey="account_message">
        Visit <a href="/account">your account page</a> to change display name.
      </Trans>
    </div>
    {/* #endregion */}
  </>;
}

// In the video, this render call was the separate file src/main.jsx:
//
//     import reactDom from "react-dom/client";
//     import App from "./App";
//
// #region render
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
// #endregion
