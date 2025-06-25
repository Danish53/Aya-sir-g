import React from "react";
import "./comments.css";
import { AiOutlineLike } from "react-icons/ai";
import { LuMessageCircle } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";

export default function Comments() {
  return (
    <section className="comments_section p-3">
      {/* <div className="heading_sec my-3">
        <IoIosArrowBack className="arrow_icon" />
        <h3 className="heading">Comments</h3>
      </div> */}
      <div className="single_comment_parent_div ">
        <div className="pic_div">
          <img src="/assets/comment_pic.png" alt="" />
        </div>
        <div className="comment_div p-2">
          <p className="time mb-1">2 mins</p>
          <p className="comment">
            Lorem ipsum dolor sit amet, coetur adipiscing elit ut aliquam, purus
            sit amet luctus Lorem ipsum dolor sit amet aliquam, purus sit amet
            luctus
          </p>
          <div className="like_replay_div d-flex align-items-center">
            <div className="like_div d-flex align-items-center mt-2">
              <p className="like_text">15 Like</p>
              <AiOutlineLike />
            </div>
            <div className="reply_div d-flex align-items-center mt-2">
              <p className="like_text">6 Replies</p>
              <LuMessageCircle />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
