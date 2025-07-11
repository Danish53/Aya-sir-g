"use client";
import React, { useContext } from "react";
import "./companycard.css";
import { RiStarSFill } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import Link from "next/link";
import { UserContext } from "@/app/userContext";

export default function CompanyCard({ data, onLike }) {

  const { userInfo } = useContext(UserContext);

  const isLiked = !!data?.can_like;
  const onLikeClick = () => {
    onLike(data.id, !!isLiked);
  };

  const fullText =
    "Hazir Jnab, we work as a group of highly skilled and experienced " +
    "professionals. For us, no project is too big or too small.";

  const wordClamp = (text, max = 15) => {
    const words = text.trim().split(/\s+/);
    return words.length > max ? words.slice(0, max).join(" ") + "…" : text;
  };

  const shortText = wordClamp(fullText);

  return (
    <section className="company_card">
      <div className="container">
        <div className="parent_div">
          <div className="d-lg-flex gap-3">
            <div className="first_div">
              <div className="img_div">
                <img src={data?.profile_image ? data?.profile_image : "/assets/hazar.png"} alt="" />
              </div>
            </div>
            <div className="two_div">
              <div className="content_div">
                <div className="heading_div">
                  <h3>{data?.username}</h3>
                  {/* <div className="star_respons_div">
                  <div className="stars_div">
                    <RiStarSFill className="star" />
                    <RiStarSFill className="star" />
                    <RiStarSFill className="star" />
                    <RiStarSFill className="star" />
                    <RiStarSFill className="star" />
                  </div>
                  <p id="respons">34 Responses</p>
                </div> */}
                </div>

                <h4 id="city">{data?.user_city || "city"}, {data?.address || "address"} </h4>
                <p id="details">{data?.description || fullText}</p>
              </div>
            </div>
          </div>
          <div className="third_div">
            <div className="verified_div ">
              <div className="heart_button">
                {/* <FaRegHeart className="icon" /> */}
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

                <button className="verified_btn">
                  Verified
                  <FaCheck className="tik_icon" />
                </button>
              </div>

              <div className="heart_button">
                <IoCall className="phone_icon" />
                <Link href={`/compnies-details/${data?.id}`} className="verified_btn card_btn_background">
                  More Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
