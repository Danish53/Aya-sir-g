"use client";
import React, { useContext, useEffect, useState } from "react";
import "./sign-up.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function page() {
  const [loader, setLoader] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    contact_number: "",
    email: "",
    password: ""
  });

  const isValidPhone = (number) => {
  return /^\+92[0-9]{10}$/.test(number);
};


  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://staging.hylanmaterialsupply.com";

  const api = `${baseUrl}/api/register/send-otp`;
  const postData = async () => {
    setLoader(true);

    try {
      const res = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // always read response body

      if (!res.ok) {
        // Handle 422 validation error
        if (res.status === 422 && data?.errors) {
          const errorMessages = Object.values(data.errors).flat();
          errorMessages.forEach((msg) => toast.error(msg));
        } else {
          // Generic server error
          toast.error(data?.message || "Something went wrong");
        }
        return;
      }

      localStorage.setItem("phone_number_signUp", formData.contact_number);

      // ✅ Success flow
      toast.success(data?.message);
      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        contact_no: "",
        email: "",
        password: ""
      });

      setTimeout(() => {
        router.push("/register-otp");
      }, 1500);
    } catch (error) {
      // JS-level error (e.g. network error)
      console.error("Error:", error);
      toast.error("Network error or unexpected issue occurred");
    } finally {
      setLoader(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
    console.log("form Data", formData);
  };
  const handleClick = () => {
    router.push("/register-service-provider");
  };

  return (
    <div className="sign_up auth_bg">
      <div className="container p-2 bg_white">
        <h1 className="auth_heading margin_bottom">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="input_one_row">
            <input
              type="text"
              className="input_auth"
              placeholder="First Name"
              id="first_name"
              name="first_name"
              onChange={handleChange}
              value={formData.first_name}
              required
            />
            <input
              type="text"
              className="input_auth"
              placeholder="Last Name"
              id="last_name"
              name="last_name"
              onChange={handleChange}
              value={formData.last_name}
              required
            />
          </div>
          <div className="input_one_row">
            <input
              type="text"
              className="input_auth"
              placeholder="User Name"
              id="username"
              name="username"
              onChange={handleChange}
              value={formData.username}
              required
            />
            <input
              type="text"
              className="input_auth"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div className="input_one_row">
            {/* <input
              type="password"
              className="input_auth"
              placeholder="Create Password"
              name="password"
              id="password"
              onChange={handleChange}
              value={formData.password}
              required
            /> */}
            <div className="password-wrapper" style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="input_auth"
                placeholder="Create Password"
                name="password"
                id="password"
                onChange={handleChange}
                value={formData.password}
                required
              />
              <span
                onClick={togglePassword}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "38%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#888",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {/* <input
              type="text"
              className="input_auth"
              placeholder="Phone Number"
              name="contact_number"
              id="contact_no"
              onChange={handleChange}
              value={formData.contact_number}
              required
            /> */}
            <div className="d-flex align-items-center">
              <span style={{ padding: '8px', marginBottom:"11px", borderRadius:"10px 0px 0px 10px", height:'44px', border: '1px solid #afafaf', boxShadow: "4px 4px 10px #00000040", borderRight: 'none' }}>+92</span>
              <input
                type="text"
                className="input_auth"
                placeholder="3001234567"
                name="contact_number"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    contact_number: `+92${e.target.value.replace(/^0+/, "")}`,
                  }))
                }
                value={formData.contact_number.replace("+92", "")}
                required
                style={{ flex: 1, borderRadius:"0px 10px 10px 0px" }}
              />
            </div>

          </div>
          {/* <div className="input_one_row">
            <input
              type="text"
              className="input_auth"
              placeholder="City"
              name="city"
              onChange={handleChange}
              value={formData.city}
              required
            />
            <input
              type="text"
              className="input_auth"
              placeholder="Address"
              name="address"
              onChange={handleChange}
              value={formData.address}
              required
            />
          </div> */}
          <div className="checkbox_field mt-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="custom-checkbox">
              I agree with the
              <span className="terms"> <Link style={{ color: "#B50000" }} href={"/privacy-policy"}>Privacy Policy</Link> </span>
              of Clarity
            </label>
          </div>
          <button className="sign_in" type="submit" disabled={loader}>
            {loader ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Sign Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
          <Link href="/login" id="sign_p" className="term" style={{ textDecoration: "none" }}>
            <p className="text-center mt-2 term" style={{ color: "#B50000" }}>Back to sign In</p>
          </Link>
          {/* <p>or</p>
          <p onClick={handleClick} className="register_comp">
            Want to register as Individual or Company?
          </p> */}
        </form>
        <ToastContainer />

        {/* <div className="logo_div mt-3">
          <img src="/assets/logo_header.png" alt="" className="logo" />
          <p id="head">AYA SIR G!</p>
          <p id="descri">YOUR TRUSTED EVERYWHERE</p>
        </div> */}
      </div>
    </div>
  );
}
