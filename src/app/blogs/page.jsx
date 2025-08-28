"use client";

import { useEffect, useRef, useState } from "react";
import BlogCard from "../components/Blog-Card/BlogCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./blogs.css";
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState(["All Blogs"]);
  // console.log(categories, "categories")
  const [activeCategory, setActiveCategory] = useState("All Blogs");

  const scrollRef = useRef(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(8);

  // ---- Scroll buttons ----
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // ---- Fetch Blogs ----
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const link = process.env.NEXT_PUBLIC_BASE_URL;

      let api = "";

      if (activeCategory === "All Blogs") {
        // All blogs
        api = `${link}/api/blog-list?page=${page}`;
      } else {
        // Category wise
        api = `${link}/api/blogs/category/${encodeURIComponent(
          activeCategory
        )}?page=${page}`;
      }

      const res = await fetch(api, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch blogs");

      const result = await res.json();
      // console.log(result, "blogsss all")
      setData(result.data || []);
      setPage(result.pagination.current_page);
      setTotalPages(result.pagination.total_pages);
      setPerPage(result.pagination.per_page);
    } catch (error) {
      console.error("Error while fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ---- Fetch Categories ----
  const fetchCategories = async () => {
    try {
      const link = process.env.NEXT_PUBLIC_BASE_URL;
      const api = `${link}/api/blog-categories`;
      const res = await fetch(api, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch categories");

      const result = await res.json();
      console.log(result, "cate")

      // API se categories + sabse pehle "All"
      setCategories([
        { id: 0, name: "All Blogs", slug: "all" }, // 👈 Default option
        ...(result?.data || [])
      ]);
    } catch (error) {
      console.error("Error while fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBlogs();
    // page/category change per scroll top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, activeCategory]);

  // --- Pagination Buttons logic ---
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages.map((p, index) =>
      p === "..." ? (
        <span key={index} className="px-2">
          ...
        </span>
      ) : (
        <button
          key={index}
          className={`small-btn py-2 px-3 border ${page === p ? "active btn_primary text-white" : ""
            }`}
          onClick={() => setPage(p)}
        >
          {p}
        </button>
      )
    );
  };

  return (
    <section className="blogs margin_navbar">
      <div className="container py-3">
        {/* Category Slider */}
        <div className="category-slider d-flex align-items-center justify-content-center mt-2 mb-3">
          <button className="arrow-btn" onClick={() => scroll("left")}>
            <FaChevronLeft />
          </button>
          <div className="category-container" ref={scrollRef}>
            {categories.map((cat, index) => (
              <button
                key={index}
                className={`btn mx-2 category-btn ${activeCategory === cat.name
                    ? "btn_primary text-white"
                    : "btn_outline_primary"
                  }`}
                onClick={() => {
                  setActiveCategory(cat.name);
                  setPage(1);
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <button className="arrow-btn" onClick={() => scroll("right")}>
            <FaChevronRight />
          </button>
        </div>

        {/* Blog Cards */}
        <div className="card_div py-3">
          {loading
            ? Array.from({ length: perPage || 8 }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <Skeleton height={200} />
                <Skeleton height={30} style={{ marginTop: 10 }} />
                <Skeleton height={20} width="80%" />
              </div>
            ))
            : data?.map((item) => <BlogCard key={item.id} content={item} />)}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="pagination w-100 text-center d-flex justify-content-center mb-3">
            <button
              style={{ background: "transparent", border: "none" }}
              className="p-2"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <FaArrowLeft />
            </button>

            {renderPageNumbers()}

            <button
              style={{ background: "transparent", border: "none" }}
              className="p-2"
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
