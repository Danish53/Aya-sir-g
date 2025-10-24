import React from "react";
import "./wishlistcard.css";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";
import Tippy from "@tippyjs/react";
import 'tippy.js/dist/tippy.css';
import Image from "next/image";

export default function WishlistComponent({ data }) {
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
  return (
    <div className="wishlistcard py-3 mb-3 h-100">
      <div>
        <div className="info_div">
          <Image width={100} height={100} src={data?.profile_image || "/assets/raza.png"} alt="" />
          <h2>{data?.username || ""}</h2>
          <p>{data?.gender === "male" ? "Male" : data?.gender === "female" ? "Female" : ""}, {data?.age || ""} years old</p>
        </div>
        <div className="details_div">
          <div className="single_div">
            <p className="field">Field: {Array.isArray(data?.fields_of_interest) && data.fields_of_interest.length > 0
              ? data.fields_of_interest.map(item => item.name).join(", ")
              : ""}</p>
          </div>
          <div className="single_div">
            <p className="field">Current Location: {data?.area_name}, {data?.city_name}</p>
          </div>
          <div className="rating_div">
            <p className="field">Ratings</p>
            <div className="star_respons_div">
              <div className="stars_div d-flex gap-1">{stars}</div>
              {/* <p id="respons">{data?.responses || 0} Responses</p> */}
            </div>
          </div>
        </div>
      </div>
      {/* <Link href={`/profile-details/${data?.id}`}>
        </Link> */}
      <div className="verified_div mt-4 mb-2">
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
        <Link href={`/profile-details/${data?.id}`} className="verified_btn card_btn_background">More Details</Link>
      </div>
    </div>
  );
}
