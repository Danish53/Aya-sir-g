"use client";
import React, { useContext, useEffect, useState } from "react";
import "./custom_navbar.css";
import { CiGlobe } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import Dropdown from "react-bootstrap/Dropdown";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/userContext";
import Myform from "../Myform/Myform";

export default function CustomNavbar() {
  const [selectedType, setSelectedType] = useState(null);

  const router = useRouter();
  const [userDetailss, showuserDetailss] = useState(false);
  const [myNavbar, setMyNavbar] = useState(false);
  const { userInfo, setUserInfo, loadingUser, userDetails } = useContext(UserContext);
  const pathname = usePathname();

  if (loadingUser) return null;

  const userToken = userInfo?.api_token;

  const handleuserDetailss = () => {
    showuserDetailss(!userDetailss);
  };
  const handleNavbar = () => {
    setMyNavbar(!myNavbar);
  };
  const gotoLogin = () => {
    router.push("/login");
  };

  const gotoProfile = () => {
    router.push("/user-profile");
  };

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("token");
    showuserDetailss(false);
    router.push("/login");
  };

  const handleClick = (type) => {
    setSelectedType(type);
  };

  return (
    <section className="navbar">
      <div className="container">
        <nav className="nav">
          <div className="logo_div">
            <img src="/assets/logo_header.png" alt="" className="logo" />
            <p id="head">AYA SIR G!</p>
            <p id="descri">YOUR TRUSTED EVERYWHERE</p>
          </div>
          <div className="nav_items d-flex ">
            <ul className={`list-unstyled list ${myNavbar ? "active" : ""}`}>
              <li>
                <Link href="/" className={pathname === "/" ? "active" : ""}>
                  Home
                </Link>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <Link
                  href="/register-yourself"
                  className={pathname === "/register-yourself" ? "active" : ""}
                >
                  Register Yourself
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className={pathname === "/blogs" ? "active" : ""}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className={pathname === "/faq" ? "active" : ""}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className={pathname === "contact-us" ? "active" : ""}
                >
                  Contact Us
                </Link>
              </li>
            </ul>

            <Dropdown className="dropdown_language">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {
                  <span>
                    <CiGlobe className="web_globe_icon" /> EN
                    <IoIosArrowDown className="drop_arrow" />
                  </span>
                }
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                  <span>
                    Urdu
                    <img src="/assets/pak_flag.png" alt="" />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  <span>
                    Pashto
                    <img src="/assets/afg_flag.png" alt="" />
                  </span>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div className="info_div">
              <div className="head_section d-flex align-items-center gap-2">
                <IoIosHeartEmpty className="icon_hearth ml_2" />
                <IoPersonCircle
                  className="icon_person"
                  onClick={handleuserDetailss}
                />
                <div className="name_div" onClick={handleuserDetailss}>
                  {userToken ? (
                    <p>{userDetails?.username}</p>
                  ) : (
                    <p onClick={gotoLogin}>Login</p>
                  )}
                </div>
                <div className="bars" onClick={handleNavbar}>
                  <FaBars className="icon_bars" />
                </div>
              </div>
              {userToken && (
                <ul
                  className={`user_details ${
                    userDetailss ? "show_user_details" : ""
                  }`}
                >
                  <li onClick={gotoProfile}>Profile</li>
                  {/* <li>Address</li> */}
                  <li onClick={() => handleClick("e-centers")}>E-centers</li>
                  <li onClick={() => handleClick("individual")}>Individuals</li>
                  <li onClick={() => handleClick("companies")}>Companies</li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </div>
          </div>
        </nav>
        <div className="display_form">
          {selectedType && <Myform openedFrom={selectedType} />}
        </div>
      </div>
    </section>
  );
}
