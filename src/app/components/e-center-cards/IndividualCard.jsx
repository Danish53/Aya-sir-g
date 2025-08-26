"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./individual.css";
import { FaRegHeart } from "react-icons/fa";
import { RiStarFill, RiStarHalfFill, RiStarLine, RiStarSFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { toast } from "react-toastify";
// import { Modal } from "bootstrap";
import axios from "axios";
import { UserContext } from "@/app/userContext";
import { usePathname } from "next/navigation";

export default function individualcard({ data, fetchData }) {
  const pathname = usePathname();
  const { timer, setTimer, handleResend, resendLoading } = useContext(UserContext);
  // Timer countdown
  // useEffect(() => {
  //   setTimer(120);
  // }, [setTimer]);
  // Timer countdown
  useEffect(() => {
    if (pathname === "/ecenter-record") {
      setTimer(120);
    }
  }, [pathname, setTimer]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);
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


  const [showFullFields, setShowFullFields] = useState(false);

  const fieldsText =
    Array.isArray(data?.fields_of_interest) && data.fields_of_interest.length > 0
      ? data.fields_of_interest.map(item => item.name).join(", ")
      : "N/A";

  // const locationsText =
  //   Array.isArray(data?.interested_locations) && data.interested_locations.length > 0
  //     ? data.interested_locations.map(item => item.name).join(", ")
  //     : "N/A";

  // Limit for initial display
  const charLimit = 45;

  const modalRef = useRef(null);
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [otpId, setOtpId] = useState();
  // Input change handler
  const handleChangeOtp = (element, index) => {
    if (!isNaN(element.value)) {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Move to next input automatically
      if (element.value && index < 5) {
        if (typeof window !== 'undefined' && inputRefs.current[index + 1]) {
          inputRefs.current[index + 1].focus();
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // agar current input me value hai → pehle usko clear kar do
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // agar empty hai → focus previous input par
        inputRefs.current[index - 1]?.focus();
      }
    }
  };


  // send otp
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    setLoading(true);

    let token = "";
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("token");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser.api_token || "";
        } catch (e) {
          console.error("Error parsing token from localStorage", e);
        }
      }
    }

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${data?.id}/send-otp`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const json = await res.json();
      // console.log(json, "otp response")
      if (res.ok) {
        setOtpId(json.data?.id);
        toast.success("OTP sent successfully!");
        if (modalRef.current) {
          // Dynamically import Bootstrap Modal only in browser
          const { Modal } = await import("bootstrap");
          const modalInstance = new Modal(modalRef.current, {
            backdrop: "static",
            keyboard: false
          });
          modalInstance.show();
        }
      } else {
        toast.error(json.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Error sending OTP:", err);
      toast.error("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // handle verify otp
  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      toast.error("Please enter 6-digit OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${otpId}/verify-otp`, {
        otp: otpCode,
      });

      const resData = response?.data;

      if (response.status === 200) {
        toast.success(resData?.message || "OTP verified successfully!");
        setOtp(["", "", "", "", "", ""]);
        if (modalRef.current) {
          const { Modal } = await import("bootstrap");
          const modalInstance = Modal.getInstance(modalRef.current)
            || new Modal(modalRef.current);

          modalInstance.hide(); // ✅ close modal after success
        }
        fetchData();
      } else {
        toast.error(resData?.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification failed", error);
      const errorMessage = error?.response?.message || "Server error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="personal_card col-lg-6 mb-3">
      <div className="card_div py-3 px-4">
        <div className="d-flex justify-content-center align-items-center flex-column w-100">
          <img src={data?.profile_image || "/assets/person_img.png"} alt="person" />
          <p className="title">{data?.username || "No Name"}</p>

          <div className="heart_div position-relative">
            <p className="person_info">
              {data?.gender || "Gender"}, {data?.age || "Age"} years old
            </p>
          </div>

          <div className="details_div mt-3">
            <p>
              Field:{showFullFields || fieldsText.length <= charLimit
                ? fieldsText
                : fieldsText.slice(0, charLimit) + "..."}
              {fieldsText.length > charLimit && (
                <button
                  onClick={() => setShowFullFields(prev => !prev)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#B50000",
                    cursor: "pointer",
                    marginLeft: "5px",
                    fontSize: "16px"
                  }}
                >
                  {showFullFields ? "Less" : "More"}
                </button>
              )}
            </p>
            <p>Current Location: {data?.city_name}</p>
          </div>

          <div className="rating_div">
            <p>Ratings</p>
            <div className="star_respons_div">
              <div className="stars_div d-flex gap-1">{stars}</div>
              {/* <p id="respons">{data?.responses || 0} Responses</p> */}
            </div>
          </div>
        </div>

        <div className="verified_div mt-4 mb-2">
          {data?.verification === "Non Verified" ? (
            <button className="verified_btn" onClick={handleSendOtp}
              disabled={loading}>
              Make it Verified
            </button>
          ) : (<button className="verified_btn bg-success">
            Verified
            <FaCheck className="tik_icon" />
          </button>)}
          <Link href={`/profile-details/${data?.id}`} className="verified_btn card_btn_background">More Details</Link>
        </div>
      </div>

      <div
        className="modal fade"
        id="otpModal"
        tabIndex="-1"
        aria-labelledby="otpModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="otpModalLabel">Enter OTP</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p>Please enter the 6-digit OTP.</p>
              <div className="d-flex justify-content-center gap-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="number"
                    maxLength="1"
                    ref={(el) => inputRefs.current[index] = el}
                    className="form-control text-center"
                    style={{ width: "40px", height: "40px", fontSize: "1.5rem", padding: "0px" }}
                    value={otp[index]}
                    onChange={(e) => handleChangeOtp(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </div>
              {/* Timer & Resend */}
              <div className="text-center my-2">
                {timer > 0 ? (
                  <p className="text-muted">
                    OTP Expire in <b>{timer}s</b>
                  </p>
                ) : (
                  <button
                    className="btn" style={{ outline: "none" }}
                    onClick={() => handleResend(data.contact_number)}
                    disabled={resendLoading}
                  >
                    {resendLoading ? "Resending..." : "Resend OTP"}
                  </button>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn_primary w-100 text-white"
                onClick={handleVerify}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
