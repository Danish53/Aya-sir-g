"use client";
import React, { useContext, useState } from "react";
import "./companycard.css";
import { RiStarFill, RiStarHalfFill, RiStarLine, RiStarSFill } from "react-icons/ri";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import Link from "next/link";
import { UserContext } from "@/app/userContext";
import 'tippy.js/dist/tippy.css';
import Tippy from "@tippyjs/react";
import Image from "next/image";

export default function CompanyCard({ data, onLike, router }) {
  // console.log(data, "data user ind.")
  const { userInfo } = useContext(UserContext);

  const [loading, setLoading] = useState(true);

  const src = data?.profile_image;

  const isLiked = !!data?.can_like;
  const onLikeClick = () => {
    onLike(data.id, !!isLiked);
  };

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
        <Link href={`/compnies-details/${data?.id}`}>
          <div className="parent_div">
            <div className="d-flex flex-lg-row flex-column align-items-center gap-3 w-100">
              <div className="first_div">
                {/* <img src={data?.profile_image ? data?.profile_image : "/assets/hazar.png"} alt="" /> */}
                <div
                  className="position-relative img_div overflow-hidden"
                // style={{ width: "130px", height: "100px" }}
                >
                  {loading && (
                    <div className="skeleton-loader-image"></div>
                  )}

                  <Image
                    src={src || "/assets/person_img.png"}
                    alt="person"
                    // width={189}
                    fill
                    unoptimized
                    className={`transition-opacity ${loading ? "opacity-0" : "opacity-100"}`}
                    onLoadingComplete={() => setLoading(false)}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="two_div">
                <div className="content_div">
                  <div className="heading_div">
                    <h3>{data?.username}</h3>
                    <div className="star_respons_div">
                      <div className="stars_div d-flex gap-1">{stars}</div>
                      {/* <p id="respons">{data?.responses || 0} Responses</p> */}
                    </div>
                  </div>

                  <h4 id="city">{data?.city_name || "city"} </h4>
                  <p id="details">{data?.description || fullText}</p>
                </div>
              </div>
            </div>
            <div className="third_div">
              <div className="verified_div ">
                <div className="heart_button" onClick={(e) => {
                  e.stopPropagation();
                }}>
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

                  {data?.verification === "Non Verified" ? (
                    // <button className="verified_btn">
                    //   {data?.verification}
                    // </button>
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
                </div>

                <div className="heart_button" onClick={(e) => {
                  e.stopPropagation();
                }}>
                  <a href={`tel:${data?.contact_number}`}>
                    <IoCall className="phone_icon" />
                  </a>
                  <Link href={`/compnies-details/${data?.id}`} className="verified_btn card_btn_background">
                    More Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
