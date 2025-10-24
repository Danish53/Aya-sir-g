"use client";

import React, { useContext, useEffect, useState } from "react";
import "./otp.css";
import { usePathname, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { UserContext } from "@/app/userContext";
import Image from "next/image";

export default function page() {
  const router = useRouter();
  const pathname = usePathname();

  const { timer, setTimer, handleResend, resendLoading } = useContext(UserContext);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loader, setLoader] = useState(false);

  const phoneNumber = typeof window !== "undefined" ? localStorage.getItem("forgot_phone") : null;

  // Timer countdown
  useEffect(() => {
    if (pathname === "/otp") {
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

  const handleKeyDown = (index, e) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
    const prevInput = document.getElementById(`otp-${index - 1}`);
    if (prevInput) prevInput.focus();
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forgot-password/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber,
          otp: code,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "OTP verified!");

        setTimeout(() => {
          router.push("/reset-password");
        }, 1500);
      } else {
        toast.error(result.message || "Invalid OTP.");
      }
    } catch (error) {
      router.push("/error");
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
                type="number"
                maxLength={1}
                className="input_box"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            ))}
          </div>

          {/* Timer & Resend */}
          <div className="text-center mt-3">
            {timer > 0 ? (
              <p className="text-muted">
                OTP Expire in <b>{timer}s</b>
              </p>
            ) : (
              <button
                className="btn" style={{ outline: "none" }}
                onClick={() => handleResend(phoneNumber)}
                disabled={resendLoading}
              >
                {resendLoading ? "Resending..." : "Resend OTP"}
              </button>
            )}
          </div>
          <button type="submit" className="sign_in mt-2" disabled={loader}>
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

        <div className="logo_div mt-3">
          <Link href={'/'}><Image src="/assets/ayasirglogo.png" width={100} height={100} alt="" className="logo" /></Link>
          {/* <p id="head">AYA SIR G!</p>
          <p id="descri">YOUR TRUSTED EVERYWHERE</p> */}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </section>
  );
}
