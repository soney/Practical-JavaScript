// LOCALIZATION with the i18next library.
//
// index.html loads i18next from a <script> tag before this file, so the global
// `i18next` object is already available here. In a project with a bundler you
// would import it instead:
//   import i18next from "i18next";
// There is no build step here (i18next is pre-packaged), so we use the global.

// 1. Translation resources, grouped by locale (all provided for you).
//    Keys ending in _one / _other let i18next pick the right plural form.
const resources = {
  'en-US': {
    translation: {
      welcome: 'Hello, {{name}}!',
      tagline: 'Welcome to your travel dashboard.',
      points_one: '{{count}} point',
      points_other: '{{count}} points'
    }
  },
  'de-DE': {
    translation: {
      welcome: 'Hallo, {{name}}!',
      tagline: 'Willkommen in deinem Reise-Dashboard.',
      points_one: '{{count}} Punkt',
      points_other: '{{count}} Punkte'
    }
  },
  'es-ES': {
    translation: {
      welcome: '¡Hola, {{name}}!',
      tagline: 'Bienvenido a tu panel de viajes.',
      points_one: '{{count}} punto',
      points_other: '{{count}} puntos'
    }
  },
  'fr-FR': {
    translation: {
      welcome: 'Bonjour, {{name}} !',
      tagline: 'Bienvenue sur votre tableau de bord de voyage.',
      points_one: '{{count}} point',
      points_other: '{{count}} points'
    }
  },
  'ja-JP': {
    translation: {
      welcome: 'こんにちは、{{name}}さん！',
      tagline: '旅行ダッシュボードへようこそ。',
      points_one: '{{count}} ポイント',
      points_other: '{{count}} ポイント'
    }
  }
};

// 2. The data we want to display.
const userData = {
  name: 'Alex',
  points: 5
};

// 3. i18next is initialized for you with the resources and a default
//    language of 'en-US'. render() runs once initialization finishes.
i18next.init(
  {
    lng: 'en-US',
    resources: resources
  },
  render
);

// 4. Read the current translations from i18next and write them into the page.
function render() {
  // TODO: set document.documentElement.lang to i18next.language.
  // TODO: set #welcome using i18next.t('welcome', { name: userData.name }).
  // TODO: set #tagline using i18next.t('tagline').
  // TODO: set #points-label using i18next.t('points', { count: userData.points }).
}

// 5. changeLanguage(locale) is provided for you. It switches the active
//    language and then re-renders, and stays global (window.changeLanguage)
//    so the language buttons in index.html can call it.
function changeLanguage(locale) {
  i18next.changeLanguage(locale, render);
}
window.changeLanguage = changeLanguage;
