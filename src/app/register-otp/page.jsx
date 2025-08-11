"use client";
import React, { useState } from "react";
import "./otp.css";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";

export default function page() {
  const router = useRouter();

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loader, setLoader] = useState(false);

  const phoneNumber = typeof window !== "undefined" ? localStorage.getItem("phone_number_signUp") : null;

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== 6 || !phoneNumber) {
      return toast.error("Enter all 6 digits of OTP.");
    }

    setLoader(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact_number: phoneNumber,
          otp: code,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("OTP verified User register succesfully!");

        setTimeout(() => {
          router.push("/login");
        }, 1500);
        localStorage.removeItem("phone_number_signUp")
      } else {
        toast.error(result.message || "Invalid OTP.");
      }
    } catch (error) {
      // console.error("OTP Verify Error:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <section className="otp auth_bg">
      <div className="container p-4 bg_white">
        <h1 className="auth_heading">OTP Authentication</h1>
        <p className="auth_para my-2">
          Enter the 6 digit OTP sent to your {phoneNumber ? `+92 ${phoneNumber}` : "number"}
        </p>
        <form onSubmit={handleSubmit}>
          <br />
          <div className="input_group">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                className="input_box"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            ))}
          </div>

          <br />
          <button type="submit" className="sign_in mt-5" disabled={loader}>
            {/* {loading ? "Verifying..." : "Verify Code"} */}
            {loader ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </button>
        </form>

        <div className="widd">
          <div className="logo_div mt-3">
          <Link href={'/'}>
            <img src="/assets/logo_aya_sir_g.png" alt="logo" className="logo" /></Link>
          {/* <p id="head">Aya Sir G!</p>
          <p id="descri">YOUR TRUSTED EVERYWHERE</p> */}
        </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
