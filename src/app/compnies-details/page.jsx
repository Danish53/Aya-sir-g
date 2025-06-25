import React from "react";
import "./compnies-details.css";
import { FaRegHeart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { IoIosMic } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { RiStarSFill } from "react-icons/ri";
import Advartisement from "../components/AdvertisementBar/Advartisement";
import Comments from "../components/Comments/Comments";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function page() {
  return (
    <section className="compnies-details margin_navbar">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3 ad_bar py-2 hide_bar">
            {/* <p className="advertiment">
              A<br />d<br />v<br />e<br />r<br />t<br />i<br />s<br />e<br />m
              <br />e
              <br />n
              <br />t
            </p> */}
            <Advartisement />
          </div>
          <div className="col-lg-9 ">
            <div className="red_bar"></div>

            <div className="left p-4">
              <div className="heart_button">
                <FaRegHeart className="icon" />
                <button className="verified_btn">
                  Verified
                  <FaCheck className="tik_icon" />
                </button>
                <IoShareSocial className="share icon" />
              </div>
              <div className="flex_div">
                <div className="left_div ">
                  <h3 className="name_heading">Hazir Janab!</h3>
                  <div className="recording mt-1 mb-3">
                    <IoIosMic className="mic_icon" />
                  </div>
                  <div className="info">
                    <h4>Field</h4>
                    <h4>Interested Location:</h4>
                    <h4>
                      Current Address: <span> (Only City Name)</span>
                    </h4>

                    <textarea
                      name="text_area"
                      id=""
                      placeholder="Details"
                    ></textarea>
                  </div>
                </div>
                <div className="right">
                  <div className="img_div">
                    <img src="/assets/hazar_2.png" alt="" />
                  </div>
                </div>
              </div>
              <div className="flex_parent mt-2">
                <div className="col_1">
                  <div className="phone_num">
                    <FaPhoneAlt className="phone_icon" />
                    <div className="number">
                      <p className="number">03**67*****</p>
                      <p className="show_num"> Show Phone Number</p>
                    </div>
                  </div>
                </div>
                <div className="col_1 col_absoulte">
                  <h4>Last time updated: 14/01/2025</h4>
                </div>
                <div className="col_1">
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
              </div>
            </div>
            <div className="comments_div mt-3 pb-3">
              <div className="heading_sec p-3">
                <IoIosArrowBack className="arrow_icon" />
                <h3 className="heading">Comments</h3>
              </div>
              <Comments />
              <div className="all_comments p-3 d-flex">
                <p>View all 124 comments</p>
                <IoIosArrowDown />
              </div>
              <Comments />
              <div className="input_div px-3">
                <input type="text" placeholder="Start typing..." />
                <button>
                  <img src="/assets/Icon.png" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
