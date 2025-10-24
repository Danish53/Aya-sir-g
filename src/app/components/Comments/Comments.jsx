import React from "react";
import "./comments.css";
import { AiOutlineLike } from "react-icons/ai";
import { LuMessageCircle } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";
import Image from "next/image";

export default function Comments({ item }) {

  const ratingView = item.rating || 0;
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
  // console.log(reviewPass, "check review")
  return (
    <section className="comments_section p-2">
      {/* <div className="heading_sec my-3">
        <IoIosArrowBack className="arrow_icon" />
        <h3 className="heading">Comments</h3>
      </div> */}
      <div className="single_comment_parent_div ">
        <div className="pic_div">
          <Image width={100} height={100} style={{ borderRadius: "50%", border: "1px solid gray", width: "30px", height: "30px" }} src={item.customer_profile_image || "/assets/comment_pic.png"} alt="" />
        </div>
        <div className="comment_div p-2">
          <p className="comment">
            {item.review}
            <div className="stars_div d-flex gap-1 mt-1">{stars}</div>
          </p>
          <p className="time mb-1 text-end mt-1">{item.created_at}</p>
        </div>
      </div>
    </section>
  );
}
