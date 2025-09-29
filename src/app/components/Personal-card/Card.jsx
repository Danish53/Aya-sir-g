"use client";
import React, { useContext, useEffect, useState } from "react";
import "./card.css";
import { FaRegHeart } from "react-icons/fa";
import { RiStarFill, RiStarHalfFill, RiStarLine, RiStarSFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { UserContext } from "@/app/userContext";
import 'tippy.js/dist/tippy.css';
import Tippy from "@tippyjs/react";
import Image from "next/image";

export default function Card({ data, onLike, router }) {
  console.log(data, "user data");
  // console.log(data, "data user ind.")
  // const [isLiked, setLiked] = useState(false);
  // const handleLiked = () => {
  //   setLiked(!isLiked);
  // };
  const [loading, setLoading] = useState(true);

  const src = data?.profile_image;

  // rating
  const ratingView = data?.handyman_rating || 0;
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

  const { userInfo } = useContext(UserContext);

  const isLiked = !!data?.can_like;
  const onLikeClick = () => {
    onLike(data.id, !!isLiked);
  };

  // location more button
  const [showFullFields, setShowFullFields] = useState(false);
  // const [showFullLocations, setShowFullLocations] = useState(false);

  const fieldsText =
    Array.isArray(data?.fields_of_interest) && data.fields_of_interest.length > 0
      ? data.fields_of_interest.map(item => item.name).join(", ")
      : "N/A";

  const toggleShow2 = () => setShowFullFields(!showFullFields);

  // const locationsText =
  //   Array.isArray(data?.interested_locations) && data.interested_locations.length > 0
  //     ? data.interested_locations.map(item => item.name).join(", ")
  //     : "N/A";

  // Limit for initial display
  const charLimit = 45;

  const [showFull, setShowFull] = useState(false);

  const toggleShow = () => setShowFull(!showFull);

  // max characters for preview
  const limit = 30;
  const location =
    Array.isArray(data?.adress) && data.address.length > 0
      ? data.address.map(item => item.name).join(", ")
      : "N/A";


  return (
    <section className=" col-lg-6 col-md-6 col-sm-12 mb-lg-4 mb-3">
      <div className="personal_card h-100">
        <Link href={`/profile-details/${data?.id}`} >
          <div className="card_div py-3 px-4 h-100" style={{
            height: showFullFields || showFull ? "auto" : "",
            overflow: "hidden",
            transition: "0.3s ease"
          }} onClick={() => router.push(`/profile-details/${data?.id}`)}>
            <div className="d-flex justify-content-center flex-column align-items-center w-100">
              {/* <img src={data?.profile_image || "/assets/person_img.png"} alt="person" /> */}
              <div
                className="position-relative rounded-circle overflow-hidden"
                // style={{ width: 189, height: 189 }}
              >
                {loading && (
                  <div className="skeleton-loader-image rounded-circle"></div>
                )}

                <Image
                  src={src || "/assets/person_img.png"}
                  alt="person"
                  width={189}
                  height={189}
                  unoptimized
                  className={`rounded-circle object-fit-cover transition-opacity ${loading ? "opacity-0" : "opacity-100"}`}
                  onLoadingComplete={() => setLoading(false)}
                  loading="lazy"
                />
              </div>
              <p className="title">{data?.username || "No Name"}</p>

              <div className="heart_div position-relative">
                <p className="person_info">
                  {data?.gender === "male" ? "Male" : data?.gender === "female" ? "Female" : ""}, {data?.age || "Age"} years old
                </p>
                {userInfo ? (
                  isLiked ? (
                    <FaHeart className="icon" onClick={(e) => {
                      e.stopPropagation();
                      onLikeClick();
                    }} />
                  ) : (
                    <FaRegHeart className="icon" onClick={(e) => {
                      e.stopPropagation();
                      onLikeClick();
                    }} />
                  )
                ) : (
                  <Link href="/login" onClick={(e) => {
                    e.stopPropagation();
                  }}>
                    <FaRegHeart className="icon" />
                  </Link>
                )}

              </div>

              <div className="details_div mt-3">
                <p>
                  <strong>Field: </strong>
                  <span className="data_pro">{showFullFields || fieldsText.length <= charLimit
                    ? fieldsText
                    : fieldsText.slice(0, charLimit) + "..."}
                    {fieldsText.length > charLimit && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleShow2();
                        }}
                        // onClick={() => setShowFullFields(prev => !prev)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#B50000",
                          cursor: "pointer",
                          marginLeft: "5px",
                          fontSize: "16px"
                        }}
                        type="button"
                      >
                        {showFullFields ? "Less" : "More"}
                      </button>
                    )}</span>
                </p>

                {/* <p>
            <strong>Interested Location: </strong>
            {showFullLocations || locationsText.length <= charLimit
              ? locationsText
              : locationsText.slice(0, charLimit) + "..."}
            {locationsText.length > charLimit && (
              <button
                onClick={() => setShowFullLocations(prev => !prev)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#B50000",
                  cursor: "pointer",
                  marginLeft: "5px",
                }}
              >
                {showFullLocations ? "Less" : "More"}
              </button>
            )}
          </p> */}
                {data?.address && (
                  <div>
                    <p>
                      <strong>Current Location: </strong>
                      <span className="data_pro">{data?.area_name}, {data?.city_name}
                        {/* {location.length > limit && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleShow();
                            }}
                            style={{
                              background: "none",
                              border: "none",
                              color: "#B50000",
                              cursor: "pointer",
                              marginLeft: "5px",
                              fontSize: "16px"
                            }}
                          >
                            {showFull ? "Less" : "More"}
                          </button>
                        )} */}
                        </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="rating_div mt-2">
              <p><strong>Ratings</strong></p>
              <div className="star_respons_div">
                <div className="stars_div d-flex gap-1">{stars}</div>
                {/* <p id="respons">{data?.responses || 0} Responses</p> */}
              </div>
            </div>
            <div className="verified_div mt-2 mb-2" onClick={(e) => {
              e.stopPropagation();
            }}>
              {data?.verification === "Non Verified" ? (
                <Tippy content="This profile has not been verified by Aya Sir G!. The details may not be authenticated.">
                  <button className="verified_btn">
                    {data?.verification}
                  </button>
                </Tippy>
              ) : (
                <button className="verified_btn bg-success">
                  {data?.verification}
                  <FaCheck className="tik_icon" />
                </button>
              )
              }
              <Link href={`/profile-details/${data?.id}`} className="verified_btn card_btn_background">More Details</Link>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
