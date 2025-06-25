"use client";
import React, { useContext, useEffect, useState } from "react";
import "./sign-up.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function page() {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    contact_number: "",
    email: "",
    password: "",
    city: "",
    address: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://staging.hylanmaterialsupply.com";

  const api = `${baseUrl}/api/register`;
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

      if (!res.ok) {
        throw new Error("Failed to register");
      }
      const data = await res.json();
      console.log("Response after regestraion ", data);

      toast("Registered Successfully");
      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        contact_no: "",
        email: "",
        password: "",
        city: "",
        address: "",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error("Error:", error.message);
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
            <input
              type="password"
              className="input_auth"
              placeholder="Create Password"
              name="password"
              id="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <input
              type="text"
              className="input_auth"
              placeholder="Phone Number"
              name="contact_number"
              id="contact_no"
              onChange={handleChange}
              value={formData.contact_number}
              required
            />
          </div>
          <div className="input_one_row">
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
          </div>
          <button className="sign_in" type="submit" disabled={loader}>
            {loader ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing Up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="checkbox_field mt-1">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="custom-checkbox">
              I agree with the
              <span className="terms">Terms & Conditions </span>
              of Clarity
            </label>
          </div>
          <p>or</p>
          <p onClick={handleClick} className="register_comp">
            Want to register as Individual or Company?
          </p>
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
