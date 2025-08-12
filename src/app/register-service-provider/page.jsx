"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register-provider.css";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    contact_number: "",
    email: "",
    password: "",
    user_type: "",
    designation: "",
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://staging.hylanmaterialsupply.com";
  const api = `${baseUrl}/api/register`;

  const handleRegisterion = async () => {
    const res = await fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error("Registration Failed");
    }
    const data = await res.json();
    toast.success("Service Provider Registered Successfully");
    localStorage.setItem("service_provider_token", data);
    router.push("/");
  };

  //handyman
  //provider
  const handleChange = (e) => {
    const { name, value } = e.target;

    const mappedValue =
      name === "user_type"
        ? value === "individual"
          ? "handyman"
          : value === "company"
          ? "provider"
          : ""
        : value;

    setFormData((prev) => ({
      ...prev,
      [name]: mappedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form Submitted:", formData);
    handleRegisterion(); // Call the API on submit
  };

  return (
    <div className="register_provider auth_bg">
      <div className="container p-2 bg_white">
        <h1 className="auth_heading margin_bottom">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="input_one_row">
            <input
              type="text"
              className="input_auth"
              placeholder="First Name"
              name="first_name"
              onChange={handleChange}
              value={formData.first_name}
              required
            />
            <input
              type="text"
              className="input_auth"
              placeholder="Last Name"
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
              name="username"
              onChange={handleChange}
              value={formData.username}
              required
            />
            <input
              type="email"
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
              onChange={handleChange}
              value={formData.password}
              required
            />
            <input
              type="text"
              className="input_auth"
              placeholder="Phone Number"
              name="contact_number"
              onChange={handleChange}
              value={formData.contact_number}
              required
            />
          </div>

          <div className="input_one_row">
            {/* <select
              className="input_auth"
              name="user_type"
              onChange={handleChange}
              value={
                formData.user_type === "provider"
                  ? "individual"
                  : formData.user_type === "handyman"
                  ? "company"
                  : ""
              }
              required
            >
              <option value="">Select User Type</option>
              <option value="individual">Individual</option>
              <option value="company">Company</option>
            </select> */}
            <select
              className="input_auth"
              name="user_type"
              onChange={handleChange}
              value={
                formData.user_type === "handyman"
                  ? "individual"
                  : formData.user_type === "provider"
                  ? "company"
                  : ""
              }
              required
            >
              <option value="">Select User Type</option>
              <option value="individual">Individual</option>
              <option value="company">Company</option>
            </select>

            <input
              type="text"
              className="input_auth"
              placeholder="Designation"
              name="designation"
              onChange={handleChange}
              value={formData.designation}
              required
            />
          </div>

          <button className="sign_in" type="submit">
            Sign Up
          </button>

          <div className="checkbox_field mt-1">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="custom-checkbox">
              I agree with the
              <span className="terms"> Terms & Conditions </span>
              of Clarity
            </label>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
}
