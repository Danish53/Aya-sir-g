"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import "./login.css";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "@/app/userContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function page() {
  const { userInfo, setUserInfo, fetchUserProfile } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState("");

  if(userInfo?.api_token){
    router.push("/");
  }

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [formData, setformData] = useState({
    phone: "",
    password: "",
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://admin.ayasirg.com";
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

      // if (!res.ok) {
      //   throw new Error("Login failed");
      // }

      const data = await res.json();
      // console.log("data is ,", data);
      if (res.ok) {
        toast.success(data.message || "Login Successful!");
        localStorage.setItem("token", JSON.stringify(data.data));
        setUserInfo(data.data);
        await fetchUserProfile(data.data.api_token);

        router.push("/");
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log("Error while login:", error.data.message);
      toast.error(error.message || "Error While Login failed to fetch");
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
                <label htmlFor="phone" className="label_auth">
                  Phone Number
                </label>
                <br />
                <input
                  type="number"
                  className="input_auth"
                  placeholder="03*********"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                />
                <br />
              </div>
              <div>
                <label htmlFor="" className="label_auth">
                  Password
                </label>
                <br />

                {/* <input
                  type="password"
                  className="input_auth"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                /> */}
                <div className="password-wrapper" style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input_auth"
                    placeholder="Enter Password"
                    name="password"
                    // id="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                  <span
                    onClick={togglePassword}
                    style={{
                      position: "absolute",
                      right: "48px",
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
                <div>
                  <div className="checkbox_field">
                    <input type="checkbox" id="remember" checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)} />
                    <label htmlFor="remember" >
                      Remember Me
                    </label>
                  </div>
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
              <div className="logo_div mt-5">
                <Link href={'/'}><img src="/assets/ayasirglogo.png" alt="" className="logo" /></Link>
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
        {/* <ToastContainer /> */}
      </div>
    </section>
  );
}
