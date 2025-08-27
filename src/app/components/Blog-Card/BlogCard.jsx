"use client";
import React from "react";
import "./blog_card.css";
import Link from "next/link";
import DOMPurify from "dompurify";

export default function BlogCard({ content }) {

  const getWords = (str = "") => {
    const words = str?.split(" ") || [];
    return words.slice(0, 6).join(" ") + (words.length > 6 ? "..." : "");
  };
  // const getWords = (str) => {
  //   return (
  //     str?.split(" ").slice(0, 6).join(" ") +
  //     (str.split(" ")?.length > 6 ? "" : "")
  //   );
  // };

  const truncateHTMLWithNewLines = (html, wordLimit) => {
    // Block tags ke baad newline insert karein
    const htmlWithNewLines = html?.replace(
      /<\/(p|div|h[1-6]|br)>/gi,
      "</$1>\n"
    );

    // Temporary element for stripping text while counting words
    const tempDiv = typeof window !== "undefined"
      ? document.createElement("div")
      : { innerHTML: "", innerText: "" };

    tempDiv.innerHTML = htmlWithNewLines;
    let words = tempDiv.innerText.split(/\s+/);
    let truncatedText = words.slice(0, wordLimit).join(" ");

    if (words.length > wordLimit) {
      truncatedText += "...";
    }

    // Replace text content back inside safe HTML
    return truncatedText.replace(/\n/g, "<br/>");
  };

  const getWordsTitle = (str) => {
    const words = str.split(" ");
    return words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");
  };
  // console.log(content, "blogs")

  return (
    <section className="blog_card">
      <div className="img_div">
        <img src={content?.attchments || "/assets/blog_img.jpg"} alt="blog  image" />
      </div>

      <div className="body">
        <h3>{getWords(content?.title)}</h3>
        <div
          className="mb-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              truncateHTMLWithNewLines(content?.description, 28)
            ),
          }}
        />
        <Link href={`/blogdetails/${content?.id}`}>Continue reading</Link>
      </div>
    </section>
  );
}
