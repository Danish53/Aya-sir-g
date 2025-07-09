"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import "./login.css";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "@/app/userContext";

export default function page() {
  const { userInfo, setUserInfo, fetchUserProfile } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://staging.hylanmaterialsupply.com";
  const login = async () => {
    setLoader(true);
    try {
      const loginUrl = `${baseUrl}/api/login`;
      const res = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();
      // console.log("data is ,", data);
      toast.success("Login Successful!");
      localStorage.setItem("token", JSON.stringify(data.data));
      setUserInfo(data.data);
      await fetchUserProfile(data.data.api_token);

      router.push("/");
    } catch (error) {
      console.log("Error while login ::", error);
      toast.error("Error While Login ");
    } finally {
      setLoader(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <section className="auth_bg login ">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 left_div p-3">
            <h1 className="login_heading ">Login</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="label_auth">
                  Email Address
                </label>
                <br />
                <input
                  type="text"
                  className="input_auth"
                  placeholder="Email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
                <br />
              </div>
              <div>
                <label htmlFor="" className="label_auth">
                  Password
                </label>
                <br />

                <input
                  type="password"
                  className="input_auth"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                />
                <br />
              </div>
              <button className="sign_in" type="submit" disabled={loader}>
                {loader ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sign In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
              <div className="check_forget mt-2">
                <div className="checkbox_field">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" className="custom-checkbox">
                    Remember Me
                  </label>
                </div>
                <Link href="/forgot-password" passHref id="forget">
                  <p id="forgot">Forgot Password</p>
                </Link>
              </div>
              <div className="create_new_account">
                <hr />
                <Link href="/sign-up" id="sign_p">
                  <p className="text-center mt-2">Sign Up for a New Account</p>
                </Link>
                <hr />
              </div>
              <div className="logo_div mt-3">
                <img src="/assets/Frame.png" alt="" className="logo" />
                {/* <p id="head">AYA SIR G!</p>
                <p id="descri">YOUR TRUSTED EVERYWHERE</p> */}
              </div>
            </form>
          </div>
          <div className="col-lg-6 right_div welcom_div">
            <h1 className="welcom_heading">Welcome to Login</h1>
            <div className="btn_div">
              <p id="account">Don’t have an account?</p>

              <Link href="/sign-up" id="a_sign_up" passHref>
                <Button variant="outline-danger" className="sign_up mt-3">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
}
