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

  const handleDropdownItemClick = (callback) => {
    showuserDetailss(false); // dropdown close
    if (callback && typeof callback === "function") {
      callback(); // jo bhi action hai usay chalao
    }
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

  const gotoEcenters = () => {
    router.push("/register-yourself");
  };

  const gotoEcentersRecords = () => {
    router.push("/ecenter-record");
  };

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.clear();
    showuserDetailss(false);
    router.push("/login");
  };

  // const handleClick = (type) => {
  //   setSelectedType(type);
  // };
  const handleClick = (type) => {
    if (selectedType === type) {
      setSelectedType(null);
      setTimeout(() => {
        setSelectedType(type);
      }, 50);
    } else {
      setSelectedType(type);
    }
  };

  return (
    <section className="navbar">
      <div className="container">
        <nav className="nav">
          <div className="logo_div">
            <img src="/assets/Aya-sir.png" alt="" className="logo" />
            {/* <p id="head" className="d-flex gap-1"><p style={{letterSpacing:"-2px"}}>AYA</p> SIR G!</p>
            <p id="descri">YOUR TRUSTED EVERYWHERE</p> */}
          </div>
          <div className="nav_items d-flex ">
            <ul className={`list-unstyled list ${myNavbar ? "active" : ""}`}>
              <li>
                <Link href="/" className={pathname === "/" ? "active" : ""}>
                  Home
                </Link>
              </li>
              <li>
                {/* <a href="#">About Us</a> */}
                <Link href="/about-us" className={pathname === "/about-us" ? "active" : ""}>
                  About Us
                </Link>
              </li>
              {userDetails?.user_type == "e-center" ? (
                ""
              ) : (<li>
                <Link
                  href="/register-yourself"
                  className={pathname === "/register-yourself" ? "active" : ""}
                >
                  Register Yourself
                </Link>
              </li>)}
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
                {userToken ? (
                  <Link href={'/user-wishlist'}><IoIosHeartEmpty className="icon_hearth ml_2" /></Link>
                ) : (
                  <Link href={'/login'}><IoIosHeartEmpty className="icon_hearth ml_2" /></Link>
                )
                }
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
                  className={`user_details ${userDetailss ? "show_user_details" : ""
                    }`}
                >
                  <li onClick={() => handleDropdownItemClick(gotoProfile)}>Profile</li>
                  {
                    userDetails?.user_type == "e-center" ? (
                      <li onClick={() => handleDropdownItemClick(gotoEcentersRecords)}>E-center Records</li>
                    ) : (
                      <li onClick={() => handleDropdownItemClick(gotoEcenters)}>E-centers</li>
                    )
                  }
                  {userDetails?.user_type == "handyman" && (
                    <li onClick={() => handleDropdownItemClick(() => handleClick("handyman"))}>
                      Individuals
                    </li>
                  )}

                  {userDetails?.user_type == "provider" && (
                    <li onClick={() => handleDropdownItemClick(() => handleClick("provider"))}>
                      Companies
                    </li>
                  )}

                  {userDetails?.user_type == "e-center" && (
                    <>
                      <li onClick={() => handleDropdownItemClick(() => handleClick("handyman"))}>
                        Individuals
                      </li>
                      <li onClick={() => handleDropdownItemClick(() => handleClick("provider"))}>
                        Companies
                      </li>
                    </>
                  )}
                  <li onClick={() => handleDropdownItemClick(handleLogout)}>Logout</li>
                </ul>
              )}
            </div>
          </div>
        </nav>
        <div className="display_form">
          {selectedType && <Myform openedFrom={selectedType} setSelectedType={setSelectedType} />}
        </div>
      </div>
    </section>
  );
}
