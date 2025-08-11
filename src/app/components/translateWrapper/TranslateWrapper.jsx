"use client";
import { useEffect, useState } from "react";
import "./translateWrapper.css";

export default function TranslateWrapper() {
  const [isLoaded, setIsLoaded] = useState(false);

  const initialize = () => {
    if (window.google?.translate) {
      const el = document.getElementById("google_translate_element");
      if (el) el.innerHTML = ""; // clear old widget

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ur",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
      setIsLoaded(true);
    }
  };

  const loadScript = () => {
    const existingScript = document.getElementById("google-translate-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    } else {
      initialize();
    }
  };

  useEffect(() => {
    window.googleTranslateElementInit = initialize;
    loadScript();
  }, []);

  return (
    <div>
      {!isLoaded && <div className="skeleton-box"></div>}
      <div id="google_translate_element"></div>
    </div>
  );
}
