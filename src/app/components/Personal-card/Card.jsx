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


  return (
    <section className="personal_card">
      <div className="card_div py-3 px-4">
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
            Field:{" "}
            {Array.isArray(data?.fields_of_interest) && data.fields_of_interest.length > 0
              ? data.fields_of_interest.map(item => item.name).join(", ")
              : "N/A"}
          </p>
          <p>Interested Location: {Array.isArray(data?.interested_locations) && data.interested_locations.length > 0
            ? data.interested_locations.map(item => item.name).join(", ")
            : ""}</p>
          {
            data?.address ? <p>Current Address: {data?.user_city || "N/A"}</p> : ""
          }
        </div>

        <div className="rating_div">
          <p>Ratings</p>
          <div className="star_respons_div">
            <div className="stars_div d-flex gap-1">{stars}</div>
            <p id="respons">{data?.responses || 0} Responses</p>
          </div>
        </div>

        <div className="verified_div mt-4 mb-2">
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
