"use client";
import React, { useEffect, useState } from "react";
import "./blogdetails.css";
import { FaCalendarAlt, FaShare } from "react-icons/fa";
import { LuBookOpenText } from "react-icons/lu";
import DOMPurify from "dompurify";
import { useParams } from "next/navigation";
import BlogCard from "@/app/components/Blog-Card/BlogCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { IoCopyOutline, IoShareSocial } from "react-icons/io5";
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from "react-share";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const [blogData, setBlogData] = useState(null);
  // console.log(blogData, "blog detail")
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);


  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success("Link copied to clipboard!")
  };


  const fetchBlogDetails = async () => {
    try {
      const res = await fetch(`${base_url}/api/blog-detail/${slug}`);

      if (!res.ok) throw new Error(`Error: ${res.status}`);

      const data = await res.json();
      setBlogData(data.blog_detail);
    } catch (err) {
      router.push("/error");
      console.error("Failed to fetch:", err);
      setBlogData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [slug]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSafeHTML = (description) => {
    if (!description) return "";

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;

    // Agar outermost wrapper <p> hai, unwrap it
    if (tempDiv.children.length === 1 && tempDiv.firstChild.tagName.toLowerCase() === "p") {
      const innerHTML = tempDiv.firstChild.innerHTML;
      tempDiv.innerHTML = innerHTML;
    }

    // Convert all <oembed> to iframe
    tempDiv.querySelectorAll("oembed").forEach((oembed) => {
      const url = oembed.getAttribute("url");
      const ytRegex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/;
      const match = url.match(ytRegex);
      if (match) {
        const iframe = document.createElement("iframe");
        iframe.width = "100%";
        iframe.height = "400px";
        iframe.src = `https://www.youtube.com/embed/${match[1]}`;
        iframe.frameBorder = "0";
        iframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;

        // Replace figure or oembed
        if (oembed.parentNode.tagName.toLowerCase() === "figure") {
          oembed.parentNode.replaceWith(iframe);
        } else {
          oembed.replaceWith(iframe);
        }
      }
    });

    return DOMPurify.sanitize(tempDiv.innerHTML, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "src", "width", "height"],
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

  const item = [
    {
      id: 1,
      title: "Blogs related",
      description: "description"
    },
    {
      id: 2,
      title: "Blogs related",
      description: "description"
    },
    {
      id: 3,
      title: "Blogs related",
      description: "description"
    },
    {
      id: 4,
      title: "Blogs related",
      description: "description"
    },
    {
      id: 5,
      title: "Blogs related",
      description: "description"
    }
  ]

  const XIcon = ({ size = 40, round = false }) => (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: round ? "50%" : "0%",
        background: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size * 0.6}
        height={size * 0.6}
        fill="white"
        viewBox="0 0 24 24"
      >
        <path d="M18.244 2H21l-6.53 7.47L22 22h-6.69l-4.69-6.37L5.56 22H2l7.11-8.13L2 2h6.82l4.34 5.91L18.244 2z" />
      </svg>
    </div>
  );

  return (
    <section className="container margin_navbar">
      <div className="row py-3">
        <div className="col-md-12 img_div">
          <img src={blogData?.attchments[0]} alt={blogData?.title} />
        </div>
        <div className="col-md-12">
          <div className="flex_div_parent">
            <div className="flex_div">
              <img src={blogData?.author_image} className="rounded_circle" alt="" />
              <h4>{blogData?.author_name || ""}</h4>
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
            <div className="read_div flex_div cursor-pointer" style={{ cursor: "pointer" }}>
              <div className="rounded_circle"
                onClick={() => setShowShare(true)}>
                {/* <FaShare style={{ color: "white", fontSize: "22px" }} /> */}
                <IoShareSocial
                  className="share icon"
                  style={{ cursor: "pointer", fontSize: "22px", color: "white" }}
                />

                {showShare && (
                  <div
                    className="modal-overlay"
                    onClick={() => setShowShare(false)}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      zIndex: 1000,
                    }}
                  >
                    <div
                      className="modal-content"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        background: "#fff",
                        width: "100%",
                        maxWidth: 500,
                        margin: "10% auto",
                        padding: 24,
                        borderRadius: 12,
                        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                        textAlign: "center",
                      }}
                    >
                      <h3>Share Link</h3>
                      <div style={{ display: "flex", marginTop: 12, gap: 8 }}>
                        <input
                          type="text"
                          value={currentUrl}
                          readOnly
                          style={{ width: "100%", padding: 8, borderRadius: 6, color: "#3c3c3c", border: "1px solid #ccc" }}
                        />
                        <button
                          onClick={handleCopy}
                          style={{
                            padding: "8px 12px",
                            background: "#B50000",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            cursor: "pointer",
                          }}
                        >
                          <IoCopyOutline size={18} />
                        </button>
                      </div>

                      <div
                        style={{
                          marginTop: 20,
                          display: "flex",
                          justifyContent: "center",
                          gap: 12,
                        }}
                      >
                        <FacebookShareButton url={currentUrl}>
                          <FacebookIcon size={40} round />
                        </FacebookShareButton>
                        <TwitterShareButton url={currentUrl}>
                          {/* <TwitterIcon size={40} round /> */}
                          <XIcon size={40} round />
                        </TwitterShareButton>
                        <WhatsappShareButton url={currentUrl}>
                          <WhatsappIcon size={40} round />
                        </WhatsappShareButton>
                        <LinkedinShareButton url={currentUrl}>
                          <LinkedinIcon size={40} round />
                        </LinkedinShareButton>
                        <TelegramShareButton url={currentUrl}>
                          <TelegramIcon size={40} round />
                        </TelegramShareButton>
                      </div>

                      <button
                        onClick={() => setShowShare(false)}
                        style={{
                          marginTop: 16,
                          background: "transparent",
                          border: "none",
                          color: "#888",
                          cursor: "pointer",
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <h4>Share Blog</h4>
            </div>
          </div>
        </div>
      </div>
      <div className=" pb-3">
        <div className="content">
          <div className="heading_div">
            <h2 className="heading">{blogData.title}</h2>
          </div>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: getSafeHTML(blogData.description) }}
          ></div>
        </div>
      </div>

      <div className="w-full my-5">

        <h2 className="mb-3 heading ms-2">Related Blogs</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            320: { slidesPerView: 1 }, // Mobile
            640: { slidesPerView: 2 }, // Tablet
            1024: { slidesPerView: 4 }, // Desktop
          }}
        >
          {item.map((item) => (
            <SwiperSlide key={item}>
              <div key={item.id} className="px-2">
                <BlogCard content={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
}
