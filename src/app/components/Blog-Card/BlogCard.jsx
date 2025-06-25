"use client";
import React from "react";
import "./blog_card.css";
import Link from "next/link";

export default function BlogCard({ content }) {
  const getWords = (str) => {
    return (
      str.split(" ").slice(0, 6).join(" ") +
      (str.split(" ").length > 6 ? "" : "")
    );
  };
  const getWordsTitle = (str) => {
    const words = str.split(" ");
    return words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");
  };
  // console.log("content is ", content);

  return (
    <section className="blog_card">
      <div className="img_div">
        <img src="/assets/blog_img.jpg" alt="blog image" />
      </div>

      <div className="body">
        <h3>{getWords(content.title)}</h3>
        <p className="mb-3">{getWordsTitle(content.description)}</p>
        <Link href={`/blogdetails/${content.id}`}>Continue reading</Link>
      </div>
    </section>
  );
}
