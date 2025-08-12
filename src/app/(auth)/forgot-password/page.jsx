"use client";
import React, { useState } from "react";
import "./forget-password.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

export default function Page() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      alert("Please enter your phone number.");
      return;
    }

    setLoader(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forgot-password/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ phone: phoneNumber }),
        }
      );

      const result = await response.json();
      // console.log("OTP API Response:", result);


      if (response.ok) {
        localStorage.setItem("forgot_phone", phoneNumber);
        toast.success(result.message);
        setTimeout(() => {
          router.push("/otp");
        }, 1500);
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (error) {
      toast.error("Something went wrong while sending OTP.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <section className="forget_password auth_bg">
      <div className="container p-4 bg_white">
        <div>
          <h1 className="auth_heading">Forgot your Password?</h1>
          <p className="auth_para mt-3">
            Enter your number so that we can send you password reset OTP
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="phone_num" className="label_auth">
                Phone Number
              </label>
            </div>
            <br />
            <input
              type="text"
              id="phone_num"
              placeholder="Phone Number"
              className="input_auth"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <br />
            <button type="submit" className="sign_in" disabled={loader}>
              {loader ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                "Continue"
              )}
            </button>
          </form>
        </div>

        <div className="logo_div mt-3">
          <Link href={'/'}><img src="/assets/logo_aya_sir_g.png" alt="" className="logo" /></Link>
          {/* <p id="head">AYA SIR G!</p>
          <p id="descri">YOUR TRUSTED EVERYWHERE</p> */}
        </div>
        {/* <ToastContainer /> */}
      </div>
    </section>
  );
}
