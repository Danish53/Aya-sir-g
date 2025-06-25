"use client";
import React, { useState } from "react";
import "./card.css";
import { FaRegHeart } from "react-icons/fa";
import { RiStarSFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

export default function Card() {
  const [isLiked, setLiked] = useState(false);
  const handleLiked = () => {
    setLiked(!isLiked);
  };

  return (
    <section className="personal_card">
      <div className="card_div py-3 px-4">
        <img src="/assets/raza.png" alt="person image" />
        <p className="title">Muhammad Raza</p>
        <div className="heart_div position-relative">
          <p className="person_info">Male, 30 years old</p>
          {isLiked ? (
            <FaHeart className="icon" onClick={handleLiked} />
          ) : (
            <FaRegHeart className="icon" onClick={handleLiked} />
          )}
        </div>
        <div className="details_div mt-3">
          <p>Field</p>
          <p>Interested Location:</p>
          <p>Current Address:</p>
        </div>
        <div className="rating_div ">
          <p>Ratings</p>
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
        <div className="verified_div mt-4 mb-2">
          <button className="verified_btn">
            Verified
            <FaCheck className="tik_icon" />
          </button>
          <button className="verified_btn card_btn_background">
            More Details
          </button>
        </div>
      </div>
    </section>
  );
}
