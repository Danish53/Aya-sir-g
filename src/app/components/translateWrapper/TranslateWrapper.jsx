"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import "./translateWrapper.css";

export default function TranslateWrapper() {
  const [isLoaded, setIsLoaded] = useState(false);

  const initializeTranslate = () => {
    if (
      typeof window !== "undefined" &&
      window.google &&
      window.google.translate &&
      typeof window.google.translate.TranslateElement === "function"
    ) {
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.googleTranslateElementInit = initializeTranslate;
    }
  }, []);

  return (
    <>
      {!isLoaded && (
        <div className="translate-loader">
          <div className="skeleton-box"></div>
        </div>
      )}
      <div id="google_translate_element" />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
        onLoad={() => {
          // Force init in case cb doesn't work due to some caching
          if (typeof window !== "undefined" && window.googleTranslateElementInit) {
            window.googleTranslateElementInit();
          }
        }}
      />
    </>
  );
}
