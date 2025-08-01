"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./compnies-details.css";
import { FaMicrophone, FaRegHeart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { IoIosMic } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { RiStarSFill } from "react-icons/ri";
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

import { FaPlay, FaPause } from "react-icons/fa";

export default function page() {

  const params = useParams();
  const { id } = params;
  const [company, setCompany] = useState(null);
  const { userInfo } = useContext(UserContext)
  // console.log(userInfo, "userInfo,,,,,,")

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-detail/${id}`)
        .then((res) => {
          setCompany(res.data.data);
        })
        .catch((err) => console.error("Error loading user:", err));
    }
  }, [id]);


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
      console.log("✅ Audio ended");
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

  if (!company) {
    return (
      <section className="profile_section margin_navbar">
        <div className="container py-5">
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
      <div className="container py-5">
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

            <div className="left p-4">
              <div className="heart_button">
                {/* <FaRegHeart className="icon" /> */}
                <button className="verified_btn">
                  Verified
                  <FaCheck className="tik_icon" />
                </button>
                <IoShareSocial className="share icon" />
              </div>
              <div className="flex_div">
                <div className="left_div ">
                  <h3 className="name_heading">{company?.username}</h3>
                  <div className="recording mt-1 mb-3">
                    {/* <IoIosMic className="mic_icon" /> */}

                    {company?.audio_sample ? (
                      <div
                        className="custom-audio-player"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          // background: "#e1ffc7",
                          // padding: "8px 12px",
                          // borderRadius: "20px",
                          // maxWidth: "240px",
                        }}
                      >
                        {/* <button
                                              onClick={handlePlayPause}
                                              style={{
                                                background: "#25d366",
                                                border: "none",
                                                borderRadius: "50%",
                                                width: "35px",
                                                height: "35px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#fff",
                                                marginRight: "10px",
                                                fontSize: "14px",
                                                cursor: "pointer",
                                              }}
                                            > */}
                        {isPlaying ? <FaPause className="mic_icon" onClick={handlePlayPause} /> : <FaMicrophone className="mic_icon" onClick={handlePlayPause} />}
                        {/* </button> */}

                        <audio ref={audioRef} src={company.audio_sample} preload="auto" />

                        <div className="wave-animation-container ms-3" style={{ marginRight: "10px" }}>
                          {isPlaying && (
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
                            </div>
                          )}
                        </div>

                        <span style={{ fontSize: "14px" }}>
                          {formatTime(currentTime)}
                        </span>
                      </div>
                    ) : (
                      <p style={{ fontSize: "14px" }}>No audio available</p>
                    )}
                  </div>
                  <div className="info">
                    <h4>
                      Field:{" "}
                      {Array.isArray(company?.fields_of_interest)
                        ? company.fields_of_interest.map((item) => item.name).join(", ")
                        : "N/A"}
                    </h4>

                    <h4>
                      Interested Location:{" "}
                      {Array.isArray(company?.interested_locations)
                        ? company.interested_locations.map((loc) => loc.name).join(", ")
                        : ""}
                    </h4>

                    <h4>
                      Current Address: <span>{company?.user_city || ""}</span>
                    </h4>

                    {/* <textarea
                      name="text_area"
                      id=""
                      placeholder="Details"
                    ></textarea> */}
                  </div>
                </div>
                <div className="right">
                  <div className="img_div">
                    <img src={company?.profile_image || "/assets/hazar_2.png"} alt="" />
                  </div>
                </div>
              </div>
              <div className="flex_parent mt-2">
                <div className="col_1">
                  {
                    userInfo?.api_token ? (
                      <Link href={`tel:${company?.phone}`} className="phone_num" style={{ textDecoration: "none" }}>
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
                <div className="col_1 col_absoulte">
                  <h4>Last time updated: {company?.updated_at?.slice(0, 10)}</h4>
                </div>
                <div className="col_1">
                  <div className="star_respons_div">
                    <div className="stars_div">
                      <RiStarSFill className="star" />
                      <RiStarSFill className="star" />
                      <RiStarSFill className="star" />
                      <RiStarSFill className="star" />
                      <RiStarSFill className="star" />
                    </div>
                    <p id="respons">34 Responses</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="comments_div mt-3 pb-3">
              <div className="heading_sec p-3">
                <IoIosArrowBack className="arrow_icon" />
                <h3 className="heading">Comments</h3>
              </div>
              <Comments />
              <div className="all_comments p-3 d-flex">
                <p>View all 124 comments</p>
                <IoIosArrowDown />
              </div>
              <Comments />
              <div className="input_div px-3">
                <input type="text" placeholder="Start typing..." />
                <button>
                  <img src="/assets/Icon.png" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
