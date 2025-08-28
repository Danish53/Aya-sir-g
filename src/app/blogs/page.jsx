"use client";

import { useEffect, useState } from "react";
import BlogCard from "../components/Blog-Card/BlogCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./blogs.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const link = process.env.NEXT_PUBLIC_BASE_URL;
        const api = `${link}/api/blog-list`;

        const res = await fetch(api, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch blogs");

        const result = await res.json();
        setData(result.data || []);
      } catch (error) {
        console.error("Error while fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Pagination logic
  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <section className="blogs margin_navbar">
      <div className="container">
        <div className="card_div py-3">
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <Skeleton height={200} />
                <Skeleton height={30} style={{ marginTop: 10 }} />
                <Skeleton height={20} width="80%" />
              </div>
            ))
            : currentItems.map((item) => (
              <BlogCard key={item.id} content={item} />
            ))}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="pagination w-100 text-center d-flex justify-content-center mb-3">
            <button style={{background: "tranparent", border:"none"}} className="p-2"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <FaArrowLeft />
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`small-btn py-2 px-3 border ${page === index + 1 ? "active btn_primary text-white" : ""}`}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button style={{background: "tranparent", border:"none"}} className="p-2"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
