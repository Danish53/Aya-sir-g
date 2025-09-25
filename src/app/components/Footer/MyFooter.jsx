import React, { useContext } from "react";
import "./footer.css";
import Link from "next/link";
import { FaFacebook, FaFacebookF, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { UserContext } from "@/app/userContext";
import { FaXTwitter } from "react-icons/fa6";

export default function MyFooter() {
  const { userDetails } = useContext(UserContext);
  return (
    <footer className="text-white py-4 footer">
      <div className="container">
        <div className="row footer-row text_center">
          <div className="col-lg-2 col-md-6 col-sm-12">
            <p className="footer_heading ">COMPANY</p>
            <ul className="list-unstyled ">
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/our-mission">Our Mission</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12">
            <p className="footer_heading">SUPPORT</p>
            <ul className="list-unstyled">
              {/* <li>
                <a href="#">Help Center</a>
              </li> */}
              <li>
                <Link href="/contact-us">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 col-sm-12">
            <p className="footer_heading">BUSINESS</p>
            <ul className="list-unstyled">
              {!["handyman", "e-center", "provider"].includes(userDetails?.user_type) && (
                <li>
                  <Link href="/register-yourself">Register Yourself</Link>
                </li>
              )}
              <li>
                <Link href="/market-business">Market Yourself</Link>
              </li>
              {/* <li>
                <a href="#">Advertise with Us</a>
              </li>
              <li>
                <a href="#">Investor Relations</a>
              </li>
              <li>
                <a href="#">Aya Sir G Updates</a>
              </li> */}
            </ul>
          </div>
          {/* <div className="col-lg-3 col-md-6 col-sm-12">
            
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
          </div> */}
        </div>
        <hr className="my-4" />
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className=" flex-wrap social-div d-flex align-items-center justify-content-center gap-3 mx-auto">

              {/* YouTube */}
              <Link className="social_inner d-flex align-items-center gap-2" href={'https://www.youtube.com/@AyaSirG'} target="_blank">
                <FaYoutube />
              </Link>

              {/* Facebook */}
              <Link className="social_inner d-flex align-items-center gap-2" href={'https://www.facebook.com/profile.php?id=61577785319983'} target="_blank">
                <FaFacebookF />
              </Link>

              {/* Instagram */}
              <Link className="social_inner d-flex align-items-center gap-2" href={'https://www.instagram.com/ayasirg_official/?igsh=MXJldGk5ODJqODI2NA%3D%3D#'} target="_blank">
                <FaInstagram />
              </Link>

              {/* TikTok */}
              <Link className="social_inner d-flex align-items-center gap-2" href={'https://www.tiktok.com/@ayasirg?is_from_webapp=1&sender_device=pc'} target="_blank">
                <FaTiktok />
              </Link>

              {/* Twitter (X) */}
              <Link className="social_inner d-flex align-items-center gap-2" href={'https://x.com/Aya_Sir_G'} target="_blank">
                <FaXTwitter />
              </Link>

              {/* LinkedIn */}
              <Link className="social_inner d-flex align-items-center gap-2" href={'https://www.linkedin.com/company/ayasirg/?viewAsMember=true'} target="_blank">
                <FaLinkedin />
              </Link>

            </div>
            <div className="footer_bottom">
              <p>The data and content provided on this website are intended solely for personal and authorized use. Copying, reusing, or redistributing any information without our consent is not allowed. © 2025 - 2035 AYASIRG (Pvt) Ltd. - All Rights Reserved.</p>
              <p><Link href={'/'}>Terms of Service</Link> | <Link href={'/privacy-policy'}>Privacy Policy</Link></p>
              {/* <p>Reproduction of material from any ayasirg.com pages without permission is strictly prohibited.</p> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
