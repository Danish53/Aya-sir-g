"use client";
import React from "react";
import "./blog_card.css";
import Link from "next/link";
import DOMPurify from "dompurify";

export default function BlogCard({ content }) {
  // console.log(content, "content blogs")

  const getWords = (str = "") => {
    const words = str?.split(" ") || [];
    return words.slice(0, 6).join(" ") + (words.length > 6 ? "..." : "");
  };

  const truncateHTMLWithNewLines = (html, wordLimit) => {
    // Block tags ke baad newline insert karein
    const htmlWithNewLines = html?.replace(
      /<\/(p|div|h[1-6]|br)>/gi,
      "</$1>\n"
    );

    // Temporary element for stripping text while counting words
    const tempDiv = typeof window !== "undefined"
      ? document.createElement("p")
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


  return (
    <section className="blog_card">
      <Link href={`/blog-detail/${content?.slug}`}>
        <div className="img_div">
          <img src={content?.attchments || "/assets/blog_img.jpg"} alt="blog  image" />
        </div>

        <div className="body">
          <h3>{getWords(content?.title)}</h3>
          <p
            className="mb-3"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                truncateHTMLWithNewLines(content?.description, 35)
              ),
            }}>
          </p>
          <Link href={`/blog-detail/${content?.slug}`}>Continue reading</Link>
        </div>
      </Link>
    </section>
  );
}
