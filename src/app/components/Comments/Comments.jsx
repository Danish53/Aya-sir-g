import React from "react";
import "./comments.css";
import { AiOutlineLike } from "react-icons/ai";
import { LuMessageCircle } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { RiStarFill, RiStarHalfFill, RiStarLine } from "react-icons/ri";

export default function Comments({ reviewPass, image, ratingPass }) {

  const ratingView = ratingPass || 0;
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
    <section className="comments_section p-3">
      {/* <div className="heading_sec my-3">
        <IoIosArrowBack className="arrow_icon" />
        <h3 className="heading">Comments</h3>
      </div> */}
      <div className="single_comment_parent_div ">
        <div className="pic_div">
          <img style={{borderRadius:"50%", border: "1px solid gray", width:"30px", height:"30px"}} src={image || "/assets/comment_pic.png"} alt="" />
        </div>
        <div className="comment_div p-2">
          {/* <p className="time mb-1">2 mins</p> */}
          <p className="comment">
            {reviewPass}
             <div className="stars_div d-flex gap-1 mt-1">{stars}</div>
          </p>
          {/* <div className="like_replay_div d-flex align-items-center">
            <div className="like_div d-flex align-items-center mt-2">
              <p className="like_text">15 Like</p>
              <AiOutlineLike />
            </div>
            <div className="reply_div d-flex align-items-center mt-2">
              <p className="like_text">6 Replies</p>
              <LuMessageCircle />
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
