"use client";
import { useEffect } from "react";
import Script from "next/script";

export default function TranslateWrapper() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.googleTranslateElementInit = function () {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,ur",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };
    }
  }, []);

  return (
    <>
      <div id="google_translate_element" />
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}
