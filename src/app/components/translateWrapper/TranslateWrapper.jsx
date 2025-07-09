"use client";
import Script from "next/script";

export default function TranslateWrapper() {
  return (
    <>
      {/* Hidden Google Translate element */}
      <div id="google_translate_element" style={{ display: "none" }}></div>

      {/* Google Translate Script */}
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,ur',
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
          }

          window.changeLanguage = function(lang) {
            const select = document.querySelector(".goog-te-combo");
            if (select) {
              select.value = lang;
              select.dispatchEvent(new Event("change"));
            }
          }
        `}
      </Script>
    </>
  );
}
