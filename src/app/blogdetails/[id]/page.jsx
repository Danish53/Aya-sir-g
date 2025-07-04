"use client";
import React, { use, useEffect, useState } from "react";
import "./blogdetails.css";
import { FaCalendarAlt } from "react-icons/fa";
import { LuBookOpenText } from "react-icons/lu";

export default function page({ params }) {
  const { id } = use(params);
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const [blogData, setBlogData] = useState(null);

  console.log("ID from parms is ", id);

  const fetchBlogDetails = async () => {
    try {
      const res = await fetch(
        `${base_url}/api/blog-detail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blog_id: id }),
        }
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setBlogData(data.blog_detail);
    } catch (err) {
      console.error("Failed to fetch:", err);
      setBlogData(null);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  console.log("Blog data is ", blogData);
  if (!blogData) {
    return <h1>loading please wait</h1>;
  }

  return (
    <section className="blog_details margin_navbar">
      <div className="img_div ">
        <img src={blogData.attchments[0]} />
      </div>
      <div className="container py-3">
        <div className="content">
          <div className="heading_div">
            <h2 className="heading">{blogData.title}</h2>
            <div className="flex_div_parent">
              <div className="img_name flex_div">
                <img src={blogData.author_image} alt="" />
                <p>{blogData.author_name || "Demo Name"}</p>
              </div>
              <div className="date_div flex_div">
                <FaCalendarAlt />
                <p>October 6, 2023</p>
              </div>
              <div className="read_div flex_div">
                <LuBookOpenText />
                <p>5 Min Read</p>
              </div>
            </div>
          </div>
          <p className="description">{blogData.description}</p>
        </div>
      </div>
    </section>
  );
}
