"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import "./translateWrapper.css";

export default function TranslateWrapper() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Avoid redefining on every render
    if (typeof window !== "undefined" && !window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
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
          if (typeof window.google !== "undefined" && window.googleTranslateElementInit) {
            window.googleTranslateElementInit();
          }
        }}
      />
    </>
  );
}
