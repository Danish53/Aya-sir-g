"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./compnies-details.css";
import { FaMicrophone, FaMusic, FaRegHeart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoArrowDown, IoCopyOutline, IoShareSocial } from "react-icons/io5";
import { IoIosArrowForward, IoIosMic } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { RiStarFill, RiStarHalfFill, RiStarLine, RiStarSFill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Comments from "@/app/components/Comments/Comments";
import Advartisement from "@/app/components/AdvertisementBar/Advartisement";
import { useParams } from "next/navigation";
import { UserContext } from "@/app/userContext";
import axios from "axios";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import 'tippy.js/dist/tippy.css';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import Tippy from "@tippyjs/react";

export default function page() {

  const params = useParams();
  const { id } = params;
  const [company, setCompany] = useState(null);
  // console.log(company, "company response")
  const [reviewsRating, setReviewsRating] = useState();
  const reviewCount = reviewsRating?.length;
  const { userInfo, addReviews } = useContext(UserContext)
  // console.log(userInfo, "userInfo,,,,,,")
  const [showShare, setShowShare] = useState(false);
  // const currentUrl = window.location.href;
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  const [reloadUserData, setReloadUserData] = useState(false);
  const [loading, setloading] = useState(false);

  const [visibleCount, setVisibleCount] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5); 
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    const formData = new FormData();
    formData.append("handyman_id", id);
    formData.append("customer_id", userInfo?.id);
    formData.append("rating", rating);
    formData.append("review", review);

    // console.log("formData okkkk", formData);

    const response = await addReviews(formData);

    if (response?.success) {
      toast.success(response?.message || "Review/Rating added!");
      setReview("");
      setRating(0);
      setReloadUserData(prev => !prev); // trigger user re-fetch
    } else {
      toast.error(response?.message || "Something went wrong.");
    }

    setloading(false); // move outside of if/else to always stop loading
  };

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-detail/${id}`)
        .then((res) => {
          setCompany(res.data.data);
          setReviewsRating(res.data.handyman_rating_review);
        })
        .catch((err) => console.error("Error loading user:", err));
    }
  }, [id, reloadUserData]);


  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };



  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const onEnded = () => {
      // console.log("✅ Audio ended");
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [company?.audio_sample]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success("Link copied to clipboard!")
  };


  const ratingView = company?.handyman_rating || 0;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (ratingView >= i) {
      stars.push(<RiStarFill key={i} className="star text-warning" />);
    } else if (ratingView >= i - 0.5) {
      stars.push(<RiStarHalfFill key={i} className="star text-warning" />);
    } else {
      stars.push(<RiStarLine key={i} className="star text-warning" />);
    }
  }


  if (!company) {
    return (
      <section className="profile_section margin_navbar">
        <div className="container py-3">
          <div className="row">
            <div className="col-lg-3 ad_bar py-2 hide_bar">
              <div className="skeleton skeleton-text" style={{ height: "200px" }} />
            </div>
            <div className="col-lg-9">
              <div className="red_bar mb-3 skeleton" style={{ height: "10px", width: "100%" }} />
              <div className="p-4">
                <div className="d-flex gap-3 align-items-center mb-3">
                  <div className="skeleton skeleton-img" />
                  <div className="w-100">
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" />
                  </div>
                </div>
                <div className="skeleton skeleton-text" style={{ width: "70%" }} />
                <div className="skeleton skeleton-text" style={{ width: "50%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="compnies-details margin_navbar">
      <div className="container py-3">
        <div className="row">
          <div className="col-lg-3 ad_bar p-0 hide_bar">
            {/* <p className="advertiment">
              A<br />d<br />v<br />e<br />r<br />t<br />i<br />s<br />e<br />m
              <br />e
              <br />n
              <br />t
            </p> */}
            <Advartisement />
          </div>
          <div className="col-lg-9 ">
            <div className="red_bar"></div>
            <div className="left px-lg-4 py-lg-4 px-3 py-4">
              <div className="row direction_ltr">
                <div className="col-md-7 col-sm-12 info order-2 order-md-1">

                  <div className="heart_button mb-3">
                    {/* <FaRegHeart className="icon" /> */}
                    {company?.verification === "Non Verified" ? (
                      // <button className="verified_btn">
                      //   {company?.verification}
                      // </button>
                      <Tippy content="This profile has not been verified by Aya Sir G!. The details may not be authenticated.">
                        <button className="verified_btn">
                          {company?.verification}
                        </button>
                      </Tippy>
                    ) : (
                      <button className="verified_btn bg-success">
                        {company?.verification}
                        <FaCheck className="tik_icon" />
                      </button>
                    )
                    }
                    <div>
                      {/* Share Icon */}
                      <IoShareSocial
                        className="share icon"
                        onClick={() => setShowShare(true)}
                        style={{ cursor: "pointer", fontSize: 24 }}
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
                                style={{ padding: 8, borderRadius: 6, color: "#3c3c3c", border: "1px solid #ccc", width: "100%" }}
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
                                <TwitterIcon size={40} round />
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
                  </div>
                  <h3 className="name_heading">{company?.username}</h3>
                  <div className="recording mt-1 mb-3">
                    {/* <IoIosMic className="mic_icon" /> */}

                    {company?.audio_sample ? (
                      <div className="d-flex flex-column w-100">
                        {/* <p className="me-2">Taaruf</p> */}
                        <div
                          className="custom-audio-player"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#ecececff",
                            padding: "8px 0px 8px 12px",
                            borderRadius: "5px",
                            maxWidth: "265px",
                            height: "65px",
                            width: "100%"
                          }}
                        >
                          <div className="d-flex flex-column w-100">
                            <div className="d-flex gap-2 align-items-center">
                              {isPlaying ? <FaPause onClick={handlePlayPause} /> : <FaPlay onClick={handlePlayPause} />}
                              <audio ref={audioRef} src={company.audio_sample} preload="auto" />
                              <div className="wave-animation-container ms-3" style={{ marginRight: "10px" }}>
                                {isPlaying ? (
                                  <div className="wave-animation">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                  </div>
                                ) : (
                                  <div className="wave-animation-light">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="w-100 mt-2">
                              <p style={{ fontSize: "12px" }}>
                                {formatTime(currentTime)}
                              </p>
                            </div>
                          </div>

                          <div className="d-flex align-items-center">
                            <img className="mic_icon" src="/assets/taaruf.jpg" alt="" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p style={{ fontSize: "14px" }}></p>
                    )}

                  </div>
                  <div className="info">
                    <div className="d-flex align-items-start gap-2 me-lg-2 ">
                      <h4>
                        Field: <span className="data_com">{Array.isArray(company?.fields_of_interest)
                          ? company.fields_of_interest.map((item) => item.name).join(", ")
                          : "N/A"}</span>
                      </h4>
                    </div>
                    <hr />

                    <div className="d-flex align-items-start gap-2 me-lg-2 "><h4>
                      Current Address: <span className="data_com">{company?.address || ""}</span>
                    </h4>
                    </div>
                    <hr />

                    <div className="d-flex align-items-start gap-2 me-lg-2 "><h4>
                      Description: <span className="data_com">{company?.description || ""}</span>
                    </h4>
                    </div>
                    <hr />

                    {
                      userInfo?.api_token ? <div className="" style={{ maxWidth: "600px" }}>

                        <form onSubmit={handleSubmit}>
                          <div className="mb-2">
                            <textarea
                              className="form-control"
                              rows="4"
                              placeholder="Write your review here..."
                              value={review}
                              onChange={(e) => setReview(e.target.value)}
                              required
                            />
                          </div>

                          <div className="mb-3 d-flex align-items-center gap-2">
                            {[...Array(5)].map((_, index) => {
                              const fullValue = (index + 1);
                              const halfValue = index + 0.5;

                              return (
                                <span key={index} style={{ cursor: "pointer", fontSize: "1.8rem", color: "#f1c40f" }}>
                                  {hover >= fullValue || rating >= fullValue ? (
                                    <RiStarFill onClick={() => handleRating(fullValue)} onMouseEnter={() => setHover(fullValue)} onMouseLeave={() => setHover(0)} />
                                  ) : hover >= halfValue || rating >= halfValue ? (
                                    <RiStarHalfFill onClick={() => handleRating(halfValue)} onMouseEnter={() => setHover(halfValue)} onMouseLeave={() => setHover(0)} />
                                  ) : (
                                    <RiStarLine onClick={() => handleRating(halfValue)} onMouseEnter={() => setHover(halfValue)} onMouseLeave={() => setHover(0)} />
                                  )}
                                </span>
                              );
                            })}
                            {/* <span className="ms-2 text-muted">{rating} Star{rating !== 1 ? "s" : ""}</span> */}
                          </div>

                          {
                            review ? <button className="btn btn_primary text-white" type="submit" disabled={rating === 0}>
                              {
                                !loading ? "Submit Review" : "Submit Review..."
                              }
                            </button> : ("")
                          }
                        </form>
                      </div> : ""
                    }

                  </div>
                </div>
                <div className="col-md-5 col-sm-12 text-right order-1 order-md-2 mb-md-0 mb-2">
                  <div className="img_div">
                    <img src={company?.profile_image || "/assets/hazar_2.png"} alt="" />
                  </div>
                </div>
              </div>
              <div className="flex_parent mt-2">
                <div className="col_1">
                  {
                    userInfo?.api_token ? (
                      <Link href={`tel:${company?.contact_number}`} className="phone_num" style={{ textDecoration: "none" }}>
                        <FaPhoneAlt className="phone_icon" />
                        <div className="number">
                          <p className="number">{company?.contact_number}</p>
                          <p className="show_num">Show Phone Number</p>
                        </div>
                      </Link>
                    ) : (
                      <Link href={"/login"} className="phone_num" style={{ textDecoration: "none" }}>
                        <FaPhoneAlt className="phone_icon" />
                        <div className="number">
                          <p className="number">{"03**67*****"}</p>
                          <p className="show_num">Show Phone Number</p>
                        </div>
                      </Link>
                    )
                  }
                </div>
                {/* <div className="col_1 col_absoulte">
                  <h4>Last time updated: {company?.updated_at?.slice(0, 10)}</h4>
                </div> */}
                <div className="col_1">
                  <div className="star_respons_div">
                    <div className="stars_div">
                      <div className="stars_div d-flex gap-1" style={{ fontSize: "1.8rem" }}>{stars}</div>
                    </div>
                    {
                      reviewCount > 0 ? <p id="respons">{reviewCount} Responses</p> : <p id="respons">No reviews yet</p>
                    }
                  </div>
                </div>
              </div>
            </div>

            {userInfo ? (
              <div className="comments_div mt-3 pb-3">
                <div className="heading_sec p-3">
                  <h3 className="heading">Comments</h3>
                </div>

                <div className="comments_list_wrapper">
                  {reviewsRating?.slice(0, visibleCount).map((item) => (
                    <Comments key={item.id} item={item} />
                  ))}

                  {/* Load More Button */}
                  {visibleCount < reviewsRating.length && (
                    <div className="text-center my-3">
                      <button
                          onClick={handleLoadMore}
                          className="btn btn-sm text-white d-flex align-items-center justify-content-center gap-1 mx-auto"
                        >
                          <span className="arrows ms-2">
                            <IoArrowDown className="arrow arrow-1" />
                          </span>
                        </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ""
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
