"use client";
import React, { useEffect, useState } from "react";
import "./blogdetails.css";
import { FaCalendarAlt } from "react-icons/fa";
import { LuBookOpenText } from "react-icons/lu";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const { id } = params;
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogDetails = async () => {
    try {
      const res = await fetch(`${base_url}/api/blog-detail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blog_id: id }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const data = await res.json();
      setBlogData(data.blog_detail);
    } catch (err) {
      console.error("Failed to fetch:", err);
      setBlogData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="container margin_navbar">
        <div className="row py-3">
          <div className="col-md-9">
            <div className="skeleton skeleton-img" />
          </div>
          <div className="col-md-3">
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-text" />
          </div>
        </div>
        <div className="container py-3">
          <div className="skeleton skeleton-heading" />
          <div className="skeleton skeleton-desc" />
          <div className="skeleton skeleton-desc" />
          <div className="skeleton skeleton-desc" />
        </div>
      </section>
    );
  }

  return (
    <section className="container margin_navbar">
      <div className="row py-3">
        <div className="col-md-12 img_div">
          <img src={blogData.attchments[0]} alt={blogData.title} />
        </div>
        <div className="col-md-12">
          <div className="flex_div_parent">
            <div className="flex_div">
              <img src={blogData.author_image} className="rounded_circle" alt="" />
              <h4>{blogData.author_name || "Author"}</h4>
            </div>
            <div className="flex_div">
              <div className="rounded_circle">
                <FaCalendarAlt style={{ color: "white", fontSize: "22px" }} />
              </div>
              <h4>{formatDate(blogData?.created_at)}</h4>
            </div>
            <div className="read_div flex_div">
              <div className="rounded_circle">
                <LuBookOpenText style={{ color: "white", fontSize: "22px" }} />
              </div>
              <h4>{blogData?.total_views} Views</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="container pb-3">
        <div className="content">
          <div className="heading_div">
            <h2 className="heading">{blogData.title}</h2>
          </div>
          <p className="description" dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blogData.description),
          }}></p>
        </div>
      </div>
    </section>
  );
}
