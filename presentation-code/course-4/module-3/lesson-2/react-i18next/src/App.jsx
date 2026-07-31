import React from "react";
import i18next from "i18next";
import { initReactI18next, useTranslation, Trans } from "react-i18next";

i18next.use(initReactI18next).init({
  lng: "en",
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
});

export default function App() {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = React.useState("Alice");
  return <>
      <header>
        <button onClick={() => i18n.changeLanguage("en")}>English</button>
        <button onClick={() => i18n.changeLanguage("fr")}>French</button>
      </header>
      <h1>{t("greet_user", {user: username})}</h1>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <div>
        <Trans i18nKey="account_message">
        Visit <a href="/account">your account page</a> to change display name.
        </Trans>
      </div>
    </>;
}
