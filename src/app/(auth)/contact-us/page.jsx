import React from "react";
import "./contact-us.css";
import Button from "react-bootstrap/Button";
import { FaClock, FaEnvelope, FaMap, FaPhone } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import Link from "next/link";

export default function page() {
  return (
    <>
      <section className="auth_bg contact-us margin_navbar">
        <div className="container">
          <div className="row reverse_sec">
            <div className="col-lg-6 left_div p-3">
              {/* <h1 className="login_heading ">Helpdesk Information</h1> */}
              <form>
                {/* <div>
                  <label htmlFor="email" className="label_auth">
                    Phone
                  </label>
                  <br />
                  <input
                    type="number"
                    className="input_auth"
                    placeholder="03009900999"
                    id="email"
                    name="email"
                  />
                  <br />
                </div> */}
                <div>
                  {/* <label htmlFor="" className="label_auth">
                    Email
                  </label>
                  <br />

                  <input
                    type="text"
                    className="input_auth"
                    placeholder="Email"
                  />
                  <br /> */}
                  <h1 className="login_heading mt-3">Helpdesk Information</h1>
                  <label htmlFor="" className="label_auth text-center w-100">
                    E-Center Registration
                  </label>
                  <input
                    type="text"
                    className="input_auth"
                    placeholder="ecenter@ayasirg.com  "
                  />
                </div>
                <button className="sign_in">Continue</button>

                {/* <div className="create_new_account">
                  <hr />
                  <p className="text-center mt-2">Sign Up for a New Account</p>
                  <hr />
                </div> */}
                <div className="w-100 text-center d-flex justify-content-center">
                  <div className="logo_div mt-3 text-center">
                    <Link href={'/'} className="text-center"><img src="/assets/ayasirglogo.png" alt="" className="logo" /></Link>
                    {/* <p id="head">AYA SIR G!</p>
                  <p id="descri">YOUR TRUSTED EVERYWHERE</p> */}
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-6 py-2 py-md-4 py-sm-2 right_div d-flex justify-content-center align-items-center">
              {/* <h1 className="welcom_heading">Contact Us</h1> */}
              <div className="row justify-content-center align-items-center px-lg-5 px-md-2 px-sm-0">
                <div className="col-lg-6 col-md-6 col-sm-6 mb-3 sm_two p-lg-2 p-md-2 p-1">
                  <Link href="tel:+923098574093" style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="card py-4 d-flex justify-content-center align-items-center" style={{ cursor: "pointer" }}>
                      <FaPhoneVolume style={{ fontSize: "26px" }} />
                      <h5 className="mt-1">Phone Number</h5>
                      <p className="ps-1">+923098574093</p>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 mb-3 sm_two p-lg-2 p-md-2 p-1">
                  <Link href="mailto:help@ayasirg.com" style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="card py-4 d-flex justify-content-center align-items-center" style={{ cursor: "pointer" }}>
                      <FaEnvelope style={{ fontSize: "26px" }} />
                      <h5 className="mt-1">Email</h5>
                      <p className="ps-1">help@ayasirg.com</p>
                    </div>
                  </Link>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 mb-3 sm_two p-lg-2 p-md-2 p-1">
                  <a
                    href="https://www.google.com/maps?q=Aya-Sir-G!+(pvt)+Limited,+15C,+Commercial,+NFC#1,+Lahore,+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="card py-3 py-lg-4 d-flex justify-content-center align-items-center">
                      <FaMap style={{ fontSize: "26px" }} />
                      <h5 className="mt-1">Location</h5>
                      <p className="ps-1 text-center">
                        Aya Sir G! (pvt) Limited, 15C, Commercial, NFC#1, Lahore, Pakistan
                      </p>
                    </div>
                  </a>

                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 mb-3 sm_two p-lg-2 p-md-2 p-1">
                  <div className="card py-4 d-flex justify-content-center align-items-center" style={{ cursor: "pointer" }}>
                    <FaClock style={{ fontSize: "26px" }} />
                    <h5 className="mt-1">Working Hours</h5>
                    <div className="ps-1">
                      <p>Monday To Saturday</p>
                      <p>09:00AM To 06:00PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
