"use client";
import React, { useContext, useEffect, useState } from "react";
import "./card.css";
import { FaRegHeart } from "react-icons/fa";
import { RiStarFill, RiStarHalfFill, RiStarLine, RiStarSFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { UserContext } from "@/app/userContext";

export default function Card({ data, onLike }) {
  // console.log(data, "user data");
  // console.log(data, "data user ind.")
  // const [isLiked, setLiked] = useState(false);
  // const handleLiked = () => {
  //   setLiked(!isLiked);
  // };

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
  const [showFullLocations, setShowFullLocations] = useState(false);

  const fieldsText =
    Array.isArray(data?.fields_of_interest) && data.fields_of_interest.length > 0
      ? data.fields_of_interest.map(item => item.name).join(", ")
      : "N/A";

  // const locationsText =
  //   Array.isArray(data?.interested_locations) && data.interested_locations.length > 0
  //     ? data.interested_locations.map(item => item.name).join(", ")
  //     : "N/A";

  // Limit for initial display
  const charLimit = 54;

  const [showFull, setShowFull] = useState(false);

  const toggleShow = () => setShowFull(!showFull);

  // max characters for preview
  const limit = 35;
  const address = data?.address || "N/A";


  return (
    <section className="personal_card col-lg-6 col-md-6 col-sm-12 mb-lg-4 mb-3">
      <div className="card_div py-3 px-4" style={{
        height: showFullFields || showFull ? "auto" : "",
        overflow: "hidden",
        transition: "0.3s ease"
      }}>
        <img src={data?.profile_image || "/assets/person_img.png"} alt="person" />
        <p className="title">{data?.username || "No Name"}</p>

        <div className="heart_div position-relative">
          <p className="person_info">
            {data?.gender === "male" ? "Male" : data?.gender === "female" ? "Female" : ""}, {data?.age || "Age"} years old
          </p>
          {userInfo ? (
            isLiked ? (
              <FaHeart className="icon" onClick={onLikeClick} />
            ) : (
              <FaRegHeart className="icon" onClick={onLikeClick} />
            )
          ) : (
            <Link href="/login">
              <FaRegHeart className="icon" />
            </Link>
          )}

        </div>

        <div className="details_div mt-3">
          <p>
            <strong>Field: </strong>
            {showFullFields || fieldsText.length <= charLimit
              ? fieldsText
              : fieldsText.slice(0, charLimit) + "..."}
            {fieldsText.length > charLimit && (
              <button
                onClick={() => setShowFullFields(prev => !prev)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#B50000",
                  cursor: "pointer",
                  marginLeft: "5px",
                  fontSize: "16px"
                }}
              >
                {showFullFields ? "Less" : "More"}
              </button>
            )}
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
                <strong>Current Address:</strong>{" "}
                {showFull ? address : `${address.slice(0, limit)}${address.length > limit ? "..." : ""}`}


                {address.length > limit && (
                  <button
                    onClick={toggleShow}
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
                )}
              </p>
            </div>
          )}
        </div>

        <div className="rating_div mt-2">
          <p>Ratings</p>
          <div className="star_respons_div">
            <div className="stars_div d-flex gap-1">{stars}</div>
            {/* <p id="respons">{data?.responses || 0} Responses</p> */}
          </div>
        </div>
        <div className="verified_div mt-2 mb-2">
          {data?.verification === "Non Verified" ? (
            <button className="verified_btn">
              {data?.verification}
            </button>
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
    </section>
  );
}
