import React from "react";
import "./footer.css";
import { BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function MyFooter() {
  return (
    <footer className="text-white py-4 footer">
      <div className="container">
        <div className="row footer-row text_center">
          <div className="col-lg-3 col-md-6 col-sm-12">
            <p className="footer_heading ">COMPANY</p>
            <ul className="list-unstyled ">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12">
            <p className="footer_heading">SUPPORT</p>
            <ul className="list-unstyled">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
            <p className="footer_heading">BUSINESS</p>
            <ul className="list-unstyled">
              <li>
                <a href="#">Advertise with Us</a>
              </li>
              <li>
                <a href="#">Investor Relations</a>
              </li>
              <li>
                <a href="#">Aya Sir G Updates</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <p className="footer_heading">
              Be the first to know about new jobs
            </p>
            <form>
              <div className="input_div">
                <input
                  type="email"
                  className="px-2"
                  placeholder="Your email address?"
                />
                <button>Get Invite!</button>
              </div>
            </form>
            <p id="terms">
              By clicking “Get Invite” button you agree to our Terms and
              Conditions and that you have read our Data Use Policy.
            </p>
          </div>
        </div>
        <hr className="my-4" />
        <div className="margin_top flex-wrap social-div d-flex align-items-center justify-content-center gap-3 mx-auto">
          <div className="social_inner d-flex align-items-center gap-2">
            <BsYoutube className="social_icon" />
            <p>YouTube</p>
          </div>
          <div className="social_inner d-flex align-items-center gap-2">
            <FaFacebook className="social_icon" />
            <p>Facebook</p>
          </div>
          <div className="social_inner d-flex align-items-center gap-2">
            <FaInstagram className="social_icon" />
            <p>Instagram</p>
          </div>
          <div className="social_inner d-flex align-items-center gap-2">
            <AiFillTikTok className="social_icon" />
            <p>TikTok</p>
          </div>
          <div className="social_inner d-flex align-items-center gap-2">
            <FaTwitter className="social_icon" />
            <p>Twitter</p>
          </div>
          <div className="social_inner d-flex align-items-center gap-2">
            <FaLinkedin className="social_icon" />
            <p>LinkedIn</p>
          </div>
        </div>
      </div>
    </footer>

  );
}
