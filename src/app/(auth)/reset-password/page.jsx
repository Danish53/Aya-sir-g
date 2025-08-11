"use client";

import React, { useState } from "react";
import "./reset-password.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function page() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordConfirm = () => {
    setShowPasswordConfirm((prev) => !prev);
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setloader] = useState(false);

  const phoneNumber = typeof window !== "undefined" ? localStorage.getItem("forgot_phone") : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("Please fill in both fields.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    if (!phoneNumber) {
      return toast.error("Phone number missing. Try the process again.");
    }

    setloader(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forgot-password/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber,
          password: password,
          password_confirmation: confirmPassword,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Password reset successful!");
        localStorage.removeItem("forgot_phone");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(result.message || "Reset failed.");
      }
    } catch (error) {
      // console.error("Reset error:", error);
      toast.error("Something went wrong.");
    } finally {
      setloader(false);
    }
  };

  return (
    <section className="reset_password auth_bg">
      <div className="container p-4 bg_white">
        <h1 className="auth_heading">Reset Password</h1>
        <p className="auth_para mt-3">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="label_auth">New Password</label>
            <br />
            {/* <input
              type="password"
              className="input_auth"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            <div className="password-wrapper" style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="input_auth"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              // name="password"
              // id="password"
              // onChange={handleChange}
              // value={formData.password}
              // required
              />
              <span
                onClick={togglePassword}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#888",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <br />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="label_auth">Confirm Password</label>
            <br />
            {/* <input
              type="password"
              className="input_auth"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            /> */}
            <div className="password-wrapper" style={{ position: "relative" }}>
              <input
                type={showPasswordConfirm ? "text" : "password"}
                className="input_auth"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              // name="password"
              // id="password"
              // onChange={handleChange}
              // value={formData.password}
              // required
              />
              <span
                onClick={togglePasswordConfirm}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#888",
                }}
              >
                {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <br />
          </div>

          <button type="submit" className="sign_in mt-3" disabled={loader}>
            {loader ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>

        <div className="logo_div mt-3">
          <Link href={'/'}><img src="/assets/logo_aya_sir_g.png" alt="" className="logo" /></Link>
          {/* <p id="head">AYA SIR G!</p>
          <p id="descri">YOUR TRUSTED EVERYWHERE</p> */}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
