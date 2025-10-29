"use client";
import React, { useContext, useEffect, useState } from "react";
import "./blogdetails.css";
import { FaCalendarAlt, FaFacebookF, FaInstagram, FaLinkedin, FaShare, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
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
import { UserContext } from "@/app/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";

export default function Page() {
    const { userInfo, addBlogComment, commentBlog } = useContext(UserContext);
    const [loadingImage, setLoadingImage] = useState(true);
    const router = useRouter();
    const params = useParams();
    const { slug } = params;
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;
    const [blogData, setBlogData] = useState(null);
    const [relatedData, setRelatedData] = useState();
    const [commentsData, setCommentsData] = useState();
    // console.log(blogData, "blog detail")
    const [loading, setLoading] = useState(true);
    const [showShare, setShowShare] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");
    const [comment, setComment] = useState("");

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
            // console.log(data, "blog detail data")
            setBlogData(data.blog_detail);
            setRelatedData(data.related_blogs);
            setCommentsData(data.comments);
        } catch (err) {
            // router.push("/error");
            console.error("Failed to fetch:", err);
            setBlogData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (slug) {
            fetchBlogDetails();
        }
    }, [slug]);

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

    // comments blogs
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            toast.error("Please write a comment before submitting.");
            return;
        }

        setLoading(true);

        const payload = {
            blog_id: blogData.id,
            comment: comment,
            user_id: userInfo?.id
        };;

        const response = await addBlogComment(payload);

        if (response?.success) {
            toast.success(response?.message || "Comment added!");
            setComment("");
            // setReloadUserData(prev => !prev);
            fetchBlogDetails();
        } else {
            toast.error(response?.message || "Something went wrong.");
        }

        setLoading(false);
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

    const src = blogData?.attchments[0];

    return (
        <section className="container margin_navbar blog_details">
            <div className="row py-3">
                {/* <img src={blogData?.attchments[0]} alt={blogData?.title} /> */}
                <div
                    className="col-md-12 position-relative img_div overflow-hidden"
                >
                    {loadingImage && (
                        <div className="skeleton-loader-image"></div>
                    )}

                    <Image
                        src={src || "/assets/blog_img.jpg"}
                        alt={blogData?.title}
                        width={100}
                        height={100}
                        unoptimized
                        className={`transition-opacity ${loadingImage ? "opacity-0" : "opacity-100"}`}
                        onLoadingComplete={() => setLoadingImage(false)}
                        loading="lazy"
                    />
                </div>
                <div className="col-md-12 d-lg-flex d-md-flex justify-content-between align-items-center mt-2">
                    <div className="flex_div_parent">
                        <div className="flex_div">
                            <img src={blogData?.author_image} className="rounded_circle" alt="" />
                            <h4>{blogData?.author_name || ""}</h4>
                        </div>
                        <div className="flex_div">
                            <div className="rounded_circle">
                                <FaCalendarAlt style={{ color: "white", fontSize: "18px" }} />
                            </div>
                            <h4>{formatDate(blogData?.created_at)}</h4>
                        </div>
                        <div className="read_div flex_div">
                            <div className="rounded_circle">
                                <LuBookOpenText style={{ color: "white", fontSize: "18px" }} />
                            </div>
                            <h4>{blogData?.total_views} Views</h4>
                        </div>
                        <div className="read_div flex_div cursor-pointer"
                            onClick={() => setShowShare(true)} style={{ cursor: "pointer" }}>
                            <div className="rounded_circle">
                                {/* <FaShare style={{ color: "white", fontSize: "22px" }} /> */}
                                <IoShareSocial
                                    className="share icon"
                                    style={{ cursor: "pointer", fontSize: "18px", color: "white" }}
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
                    <div className="flex_div_parent">
                        {
                            blogData?.tags.map((data) => {
                                return (
                                    <span class="badge" style={{ backgroundColor: "#F89C32", padding: "7px 8px", borderRadius: "12px" }}>#{data?.tag}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="pb-3">
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
            <div className="comments_blog mt-2">
                <div>
                    <h3>Leave a Comment:</h3>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write Your Comment:"
                    ></textarea>
                    <div className=" flex-wrap social-div d-flex align-items-center justify-content-center gap-3 mx-auto mt-1">

                        {/* YouTube */}
                        <Link className="social_inner d-flex align-items-center gap-2" href={'https://www.youtube.com/@AyaSirG'} target="_blank">
                            <FaYoutube />
                        </Link>

                        {/* Facebook */}
                        <Link className="social_inner d-flex align-items-center gap-2" href={'https://www.facebook.com/share/1BNgdCAE9L/'} target="_blank">
                            <FaFacebookF />
                        </Link>

                        {/* Instagram */}
                        <Link className="social_inner d-flex align-items-center gap-2" href={'https://www.instagram.com/ayasirg_official/?igsh=MXJldGk5ODJqODI2NA%3D%3D#'} target="_blank">
                            <FaInstagram />
                        </Link>

                        {/* TikTok */}
                        <Link className="social_inner d-flex align-items-center gap-2" href={'https://www.tiktok.com/@ayasirg?is_from_webapp=1&sender_device=pc'} target="_blank">
                            <FaTiktok />
                        </Link>

                        {/* Twitter (X) */}
                        <Link className="social_inner d-flex align-items-center gap-2" href={'https://x.com/Aya_Sir_G'} target="_blank">
                            <FaXTwitter />
                        </Link>

                        {/* LinkedIn */}
                        <Link className="social_inner d-flex align-items-center gap-2" href={'https://www.linkedin.com/company/ayasirg/?viewAsMember=true'} target="_blank">
                            <FaLinkedin />
                        </Link>

                    </div>
                    {userInfo?.api_token ? (
                        <button type="button" onClick={handleSubmit} className="btn btn_primary mt-2">Submit</button>
                    ) : (
                        <button type="button" className="btn btn_primary mt-2" onClick={() => router.push("/login")}>Login to add comment</button>
                    )}
                </div>
                <hr />
                {
                    userInfo?.api_token ? (
                        commentsData.length > 0 ? (
                            commentsData.map((item, index) => (
                                <div key={index} className="comments_list d-flex align-items-center gap-2 mt-3">
                                    <div>
                                        <img
                                            width={40}
                                            height={40}
                                            src={item?.user_image || "https://admin.ayasirg.com/storage/256/why_do_you_need.png"}
                                            alt={"alter"}
                                        />
                                    </div>
                                    <div>
                                        <p>{item.comment}</p>
                                        <p>{item.user_name}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            ""
                        )
                    ) : ("")
                }
            </div>
            <div className="w-full my-4">
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
                    {relatedData?.map((item) => (
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
