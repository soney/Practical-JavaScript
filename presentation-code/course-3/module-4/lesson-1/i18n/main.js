import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

// Initialize i18next
i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .init(
    {
      fallbackLng: "en",
      debug: true,
      backend: {
        loadPath: "/locales/{{lng}}/{{ns}}.json",
      },
    },
    function (err, t) {
      if (err) return console.error(err);
      updateContent();
    },
  );

// Function to translate the page content
function updateContent() {
  // Translate elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.innerHTML = i18next.t(key);
  });

  // Translate dynamic content or variables
  document.getElementById("dynamic-content").innerHTML = i18next.t(
    "main.dynamic",
    { count: 3 },
  );

  // Update document language
  document.documentElement.lang = i18next.language;
}

// Ensure changeLanguage is globally available for inline onclick handlers
window.changeLanguage = (lng) => {
  i18next.changeLanguage(lng, (err, t) => {
    if (err) return console.error("Error changing language:", err);
    updateContent();
  });
};

// Listen for language changes that might occur from detector
i18next.on("languageChanged", () => {
  updateContent();
});
