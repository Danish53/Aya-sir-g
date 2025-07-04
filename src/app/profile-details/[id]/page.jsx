// import React from "react";
// import "./profile-details.css";
// import Advartisement from "../components/AdvertisementBar/Advartisement";
// import { FaRegHeart } from "react-icons/fa";
// import { FaCheck } from "react-icons/fa6";
// import { IoShareSocial } from "react-icons/io5";
// import { IoIosMic } from "react-icons/io";
// import { FaPhoneAlt } from "react-icons/fa";
// import { RiStarSFill } from "react-icons/ri";

// import { IoIosArrowDown } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";
// import Comments from "../components/Comments/Comments";

// export default function page() {
//   return (
//     <section className="profile_section margin_navbar">
//       <div className="container py-5 ">
//         <div className="row">
//           <div className="col-lg-3 ad_bar py-2 hide_bar">
//             <Advartisement />
//           </div>
//           <div className="col-lg-9">
//             <div className="red_bar"></div>
//             <div className="p-4">
//               <div className="heart_button">
//                 <FaRegHeart className="icon" />
//                 <button className="verified_btn">
//                   Verified
//                   <FaCheck className="tik_icon" />
//                 </button>
//                 <IoShareSocial className="share icon" />
//               </div>
//               <h3 className="name_heading">Muhammad Raza</h3>
//               <p>Male, 30 years old</p>
//               <div className="flex_div">
//                 <div className="left_div ">
//                   <div className="recording mt-1 mb-3">
//                     <IoIosMic className="mic_icon" />
//                   </div>
//                   <div className="info">
//                     <h4>Field</h4>
//                     <h4>Interested Location:</h4>
//                     <h4>
//                       Current Address: <span> (Only City Name)</span>
//                     </h4>
//                     <h4>Experience:</h4>
//                     <h4>
//                       CNIC: <span className="cnic">**10**33**00**</span>
//                     </h4>
//                     <h4>Disability:</h4>
//                   </div>
//                 </div>
//                 <div className="right">
//                   <div className="img_div">
//                     <img src="/assets/person_img.png" alt="" />
//                   </div>
//                 </div>
//               </div>

//               <div className="flex_parent mt-2">
//                 <div className="col_1">
//                   <div className="phone_num">
//                     <FaPhoneAlt className="phone_icon" />
//                     <div className="number">
//                       <p className="number">03**67*****</p>
//                       <p className="show_num"> Show Phone Number</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col_1 col_absoulte">
//                   <h4>Last time updated: 14/01/2025</h4>
//                 </div>
//                 <div className="col_1">
//                   <div className="star_respons_div">
//                     <div className="stars_div">
//                       <RiStarSFill className="star" />
//                       <RiStarSFill className="star" />
//                       <RiStarSFill className="star" />
//                       <RiStarSFill className="star" />
//                       <RiStarSFill className="star" />
//                     </div>
//                     <p id="respons">34 Responses</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="comments_div mt-3 pb-3">
//               <div className="heading_sec p-3">
//                 <IoIosArrowBack className="arrow_icon" />
//                 <h3 className="heading">Comments</h3>
//               </div>
//               <Comments />
//               <div className="all_comments p-3 d-flex">
//                 <p>View all 124 comments</p>
//                 <IoIosArrowDown />
//               </div>
//               <Comments />
//               <div className="input_div px-3">
//                 <input type="text" placeholder="Start typing..." />
//                 <button>
//                   <img src="/assets/Icon.png" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


'use client';
import React, { useContext, useEffect, useRef, useState } from "react";
import "./profile-details.css";
import { FaRegHeart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import { IoIosMic } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { RiStarSFill } from "react-icons/ri";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import Advartisement from "@/app/components/AdvertisementBar/Advartisement";
import Comments from "@/app/components/Comments/Comments";
import { useParams } from "next/navigation";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { UserContext } from "@/app/userContext";
import Link from "next/link";

export default function page() {
  const params = useParams();
  const { id } = params;
  const [user, setUser] = useState(null);
  const { userInfo } = useContext(UserContext)
  // console.log(userInfo, "userInfo,,,,,,")

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-detail/${id}`)
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => console.error("Error loading user:", err));
    }
  }, [id]);

  // const audioRef = useRef(null);
  // const [duration, setDuration] = useState(0);
  // const [currentTime, setCurrentTime] = useState(0);

  // const formatTime = (time) => {
  //   const minutes = Math.floor(time / 60)
  //     .toString()
  //     .padStart(2, "0");
  //   const seconds = Math.floor(time % 60)
  //     .toString()
  //     .padStart(2, "0");
  //   return `${minutes}:${seconds}`;
  // };

  // useEffect(() => {
  //   if (audioRef.current) {
  //     const audio = audioRef.current;

  //     const handleLoadedMetadata = () => setDuration(audio.duration);
  //     const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

  //     audio.addEventListener("loadedmetadata", handleLoadedMetadata);
  //     audio.addEventListener("timeupdate", handleTimeUpdate);

  //     return () => {
  //       audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
  //       audio.removeEventListener("timeupdate", handleTimeUpdate);
  //     };
  //   }
  // }, []);

  if (!user) {
    return (
      <section className="profile_section margin_navbar">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-3 ad_bar py-2 hide_bar">
              <div className="skeleton skeleton-text" style={{ height: "200px" }} />
            </div>
            <div className="col-lg-9">
              <div className="red_bar mb-3 skeleton" style={{ height: "10px", width: "100%" }} />
              <div className="p-4">
                <div className="d-flex gap-3 align-items-center mb-3">
                  <div className="skeleton skeleton-img" />
                  <div className="w-100">
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" />
                  </div>
                </div>
                <div className="skeleton skeleton-text" style={{ width: "70%" }} />
                <div className="skeleton skeleton-text" style={{ width: "50%" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="profile_section margin_navbar">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3 ad_bar py-2 hide_bar">
            <Advartisement />
          </div>
          <div className="col-lg-9">
            <div className="red_bar"></div>
            <div className="p-4">
              <div className="heart_button">
                <FaRegHeart className="icon" />
                <button className="verified_btn">
                  Verified <FaCheck className="tik_icon" />
                </button>
                <IoShareSocial className="share icon" />
              </div>
              <h3 className="name_heading">{user?.username}</h3>
              <p>{user?.gender}, {user?.age} years old</p>

              <div className="flex_div">
                <div className="left_div">
                  <div className="recording mt-1 mb-3">
                    <IoIosMic className="mic_icon" />
                  </div>
                  {/* <div className="recording mt-1 mb-3" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <IoIosMic className="mic_icon" />

                    {user?.audio ? (
                      <div>
                        <audio ref={audioRef} controls style={{ display: "block" }}>
                          <source src={user.audio} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                        <p style={{ fontSize: "14px", marginTop: "4px" }}>
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </p>
                      </div>
                    ) : (
                      <p style={{ fontSize: "14px" }}>No audio available</p>
                    )}
                  </div> */}

                  <div className="info">
                    <h4>
                      Field:{" "}
                      {Array.isArray(user?.fields_of_interest)
                        ? user.fields_of_interest.map((item) => item.name).join(", ")
                        : "N/A"}
                    </h4>

                    <h4>
                      Interested Location:{" "}
                      {Array.isArray(user?.interested_locations)
                        ? user.interested_locations.map((loc) => loc.name).join(", ")
                        : ""}
                    </h4>

                    {
                      user?.city_name ? (
                        <h4>Current Address: <span>{user?.user_city || ""}</span></h4>
                      ) : (" ")
                    }
                    <h4>Experience: {user?.experience || ""}</h4>
                    <h4>CNIC: <span className="cnic"> {userInfo?.api_token ? user?.cnic : "*************"}</span></h4>
                    <h4>Disability: {user?.disability_status || "None"}</h4>
                  </div>
                </div>
                <div className="right">
                  <div className="img_div">
                    <img src={user?.profile_image || "/assets/person_img.png"} alt={user?.name} />
                  </div>
                </div>
              </div>

              <div className="flex_parent mt-2">
                <div className="col_1">
                  {
                    userInfo?.api_token ? (
                      <Link href={`tel:${user?.phone}`} className="phone_num" style={{ textDecoration: "none" }}>
                        <FaPhoneAlt className="phone_icon" />
                        <div className="number">
                          <p className="number">{user?.contact_number}</p>
                          <p className="show_num">Show Phone Number</p>
                        </div>
                      </Link>
                    ) : (
                      <Link href={"/login"} className="phone_num" style={{ textDecoration: "none" }}>
                        <FaPhoneAlt className="phone_icon" />
                        <div className="number">
                          <p className="number">{"03**67*****"}</p>
                          <p className="show_num">Show Phone Number</p>
                        </div>
                      </Link>
                    )
                  }
                </div>
                <div className="col_1 col_absoulte">
                  <h4>Last time updated: {user?.updated_at?.slice(0, 10)}</h4>
                </div>
                <div className="col_1">
                  <div className="star_respons_div">
                    <div className="stars_div">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <RiStarSFill key={i} className="star" />
                      ))}
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
                  <img src="/assets/Icon.png" alt="send" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

