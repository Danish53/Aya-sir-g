"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import "./translateWrapper.css";

export default function TranslateWrapper() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const initializeGoogleTranslate = () => {
    if (window.google && window.google.translate) {
      const element = document.getElementById("google_translate_element");
      if (element) {
        element.innerHTML = ""; // 💥 clear previous content
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,ur",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );

      window.googleTranslateAlreadyInitialized = true;
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!window.googleTranslateAlreadyInitialized) {
        window.googleTranslateElementInit = initializeGoogleTranslate;
      } else if (scriptLoaded) {
        // ✅ Re-render translate widget if already initialized
        initializeGoogleTranslate();
      }
    }
  }, [scriptLoaded]);

  return (
    <>
      {!isLoaded && (
        <div className="translate-loader">
          <div className="skeleton-box"></div>
        </div>
      )}
      <div id="google_translate_element" />
      {
        !window.googleTranslateAlreadyInitialized && (
          <Script
            src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            strategy="afterInteractive"
            onLoad={() => setScriptLoaded(true)}
          />
        )
      }
      {
        window.googleTranslateAlreadyInitialized && !scriptLoaded && (
          <Script
            src="https://translate.google.com/translate_a/element.js"
            strategy="afterInteractive"
            onLoad={() => setScriptLoaded(true)}
          />
        )
      }
    </>
  );
}
