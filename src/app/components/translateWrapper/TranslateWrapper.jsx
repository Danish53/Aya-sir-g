"use client";
import { useEffect, useState } from "react";
import "./translateWrapper.css";

export default function TranslateWrapper() {
  const [isLoaded, setIsLoaded] = useState(false);

  const cleanupGoogleWidget = () => {
    // Widget ka container clear
    const el = document.getElementById("google_translate_element");
    if (el) el.innerHTML = "";

    // Google ke hidden elements remove
    document
      .querySelectorAll("body > .skiptranslate, body > iframe")
      .forEach((node) => node.remove());

    // Body styles reset
    document.body.style.top = null;

    // Old script remove
    const oldScript = document.getElementById("google-translate-script");
    if (oldScript) oldScript.remove();

    // Purani init function clear
    delete window.googleTranslateElementInit;
    if (window.google && window.google.translate) {
      delete window.google.translate;
    }
  };

  const loadAndInit = () => {
    cleanupGoogleWidget();

    // Agar script pehle se loaded hai to dobara inject mat karo
    if (document.getElementById("google-translate-script")) {
      return;
    }

    // Init callback
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ur",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
      setIsLoaded(true);
    };

    // Naya script inject
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadAndInit();
  }, []);

  return (
    <div>
      {!isLoaded && <div className="skeleton-box"></div>}
      <div id="google_translate_element"></div>
    </div>
  );
}
