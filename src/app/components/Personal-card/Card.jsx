"use client";
import React, { useContext, useEffect, useState } from "react";
import "./card.css";
import { FaRegHeart } from "react-icons/fa";
import { RiStarSFill } from "react-icons/ri";
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

  const { userInfo } = useContext(UserContext);

  const isLiked = !!data?.can_like;
  const onLikeClick = () => {
    onLike(data.id, !!isLiked);
  };


  return (
    <section className="personal_card">
      <div className="card_div py-3 px-4">
        <img src={data?.profile_picture || "/assets/person_img.png"} alt="person" />
        <p className="title">{data?.username || "No Name"}</p>

        <div className="heart_div position-relative">
          <p className="person_info">
            {data?.gender || "Gender"}, {data?.age || "Age"} years old
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
            : "N/A"}</p>
          {
            data?.address ? <p>Current Address: {data?.user_city || "N/A"}</p> : ""
          }
        </div>

        <div className="rating_div">
          <p>Ratings</p>
          <div className="star_respons_div">
            <div className="stars_div">
              {Array.from({ length: data?.rating || 5 }).map((_, index) => (
                <RiStarSFill key={index} className="star" />
              ))}
            </div>
            <p id="respons">{data?.responses || 0} Responses</p>
          </div>
        </div>

        <div className="verified_div mt-4 mb-2">
          {data && (
            <button className="verified_btn">
              Verified <FaCheck className="tik_icon" />
            </button>
          )}
          <Link href={`/profile-details/${data?.id}`} className="verified_btn card_btn_background">More Details</Link>
        </div>
      </div>
    </section>
  );
}
