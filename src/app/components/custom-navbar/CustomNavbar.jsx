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
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/app/userContext";
import Myform from "../Myform/Myform";
import dynamic from "next/dynamic";

const TranslateWrapper = dynamic(() => import("../translateWrapper/TranslateWrapper"), { ssr: false });

export default function CustomNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { userInfo, setUserInfo, loadingUser, userDetails } = useContext(UserContext);
  // console.log(userInfo, "pic....")

  const [selectedType, setSelectedType] = useState(null);
  const [userDetailss, showuserDetailss] = useState(false);
  const [myNavbar, setMyNavbar] = useState(false);
  const [isTranslateLoaded, setTranslateLoaded] = useState(false);

  const userToken = userInfo?.api_token;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // mobile threshold
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (type) => {
    if (selectedType === type) {
      setSelectedType(null);
      setTimeout(() => setSelectedType(type), 50);
    } else {
      setSelectedType(type);
    }
  };

  const handleDropdownItemClick = (callback) => {
    showuserDetailss(false);
    if (callback && typeof callback === "function") callback();
  };

  const handleNavbar = () => setMyNavbar(!myNavbar);

  const gotoLogin = () => router.push("/login");
  const gotoContactUs = () => router.push("/contact-us");
  const gotoProfile = () => router.push("/user-profile");
  const gotoEcenters = () => router.push("/register-yourself");
  const gotoEcentersRecords = () => router.push("/ecenter-record");

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.clear();
    showuserDetailss(false);
    router.push("/login");
    setMyNavbar(false)
  };


  useEffect(() => {
    const observer = new MutationObserver(() => {
      const translateCombo = document.querySelector(".goog-te-combo");
      if (translateCombo) {
        setTranslateLoaded(true);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);


  if (loadingUser) return null;

  const handleClickPage = (type) => {
    router.push(`/e-center?type=${type}`);
  };



  return (
    <section className="navbar notranslate">
      <div className="container">
        <nav className="nav">
          <div className="logo_div" onClick={() => { setMyNavbar(false) }}>
            <Link href={'/'}><img src="/assets/ayasirglogo.png" alt="Logo" className="logo" /></Link>
          </div>

          <div className="nav_items d-flex align-items-center">
            <ul className={`list-unstyled list ${myNavbar ? "active" : ""}`}>
              <li onClick={() => { setMyNavbar(false); handleDropdownItemClick() }}><Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link></li>
              <li onClick={() => { setMyNavbar(false); handleDropdownItemClick() }}><Link href="/about-us" className={pathname === "/about-us" ? "active" : ""}>About Us</Link></li>
              {!["handyman", "e-center", "provider"].includes(userDetails?.user_type) && (
                <li onClick={() => { setMyNavbar(false); handleDropdownItemClick() }}><Link href="/register-yourself" className={pathname === "/register-yourself" ? "active" : ""}>Register Yourself</Link></li>
              )}
              <li onClick={() => { setMyNavbar(false); handleDropdownItemClick() }}><Link href="/blogs" className={pathname === "/blogs" ? "active" : ""}>Blogs</Link></li>
              <li onClick={() => { setMyNavbar(false); handleDropdownItemClick() }}><Link href="/faq" className={pathname === "/faq" ? "active" : ""}>FAQ</Link></li>
              {
                userToken ? "" : <li onClick={() => { setMyNavbar(false); handleDropdownItemClick() }}><Link href="/contact-us" className={pathname === "/contact-us" ? "active" : ""}>Contact Us</Link></li>
              }
              <li className="d-block d-md-none" onClick={() => setMyNavbar(false)}>
                {userToken && (
                  <Link href="/user-profile" className="d-flex align-items-center">
                    <img
                      className="icon_person_pic"
                      src={userInfo?.profile_image}
                      alt="profile"
                      style={{ width: "32px", height: "32px", borderRadius: "50%", marginRight: "8px" }}
                    />
                    <span>{userDetails?.first_name}</span>
                  </Link>
                )}
              </li>

              <li className="d-block d-md-none">
                {userToken ? (
                  <p onClick={() => handleDropdownItemClick(handleLogout)}><Link href={'/login'}>Logout</Link></p>
                ) : (
                  <p onClick={gotoLogin}><Link href={'/login'}>Login</Link></p>
                )}
              </li>

            </ul>

            {/* <Dropdown>
              <Dropdown.Toggle>
                <CiGlobe /> Language <IoIosArrowDown />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => changeLanguage("en")} >English</Dropdown.Item>
                <Dropdown.Item onClick={() => changeLanguage("ur")} >Urdu</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}

            <TranslateWrapper onClick={() => { setMyNavbar(false); handleDropdownItemClick() }} />
            {/* <div style={{ border: "1px solid gray" }}>
              <div id="google_translate_element"></div> 
            </div> */}
            {/* <GlobalTranslate /> */}

            <Link
              onClick={() => {
                setMyNavbar(false);
                handleDropdownItemClick();
              }}
              className="me-2"
              href={userToken ? "/user-wishlist" : "/login"}
            >
              <IoIosHeartEmpty className="icon_hearth ml_2" />
            </Link>

            <div
              className="info_div"
              onMouseEnter={() => showuserDetailss(true)}
              onMouseLeave={() => showuserDetailss(false)}
            >
              <div className="head_section d-flex align-items-center gap-2">


                {userInfo && (
                  <img onClick={(e) => {
                    if (isMobile) {
                      e.stopPropagation();
                      showuserDetailss(!userDetailss);
                      setMyNavbar(false)
                    }
                  }}

                    src={userInfo?.profile_image}
                    className="icon_person_pic"
                    alt="profile"
                  />
                )}

                <div className="name_div">
                  {userToken ? (
                    <p>{userDetails?.first_name}</p>
                  ) : (
                    // <p onClick={gotoLogin}>Login</p>
                    <button className="btn btn_primary_btn" onClick={gotoLogin}>Login</button>
                  )}
                </div>

                <div className="bars" onClick={handleNavbar}>
                  <FaBars onClick={() => {
                    setMyNavbar(false);
                    handleDropdownItemClick();
                  }} className="icon_bars" />
                </div>
              </div>

              {userToken && (
                <ul className={`user_details ${userDetailss ? "show_user_details" : ""}`}>
                  <li onClick={() => handleDropdownItemClick(gotoProfile)}>Profile</li>
                  {userDetails?.user_type === "e-center" ? (
                    <li onClick={() => handleDropdownItemClick(gotoEcentersRecords)}>
                      E-center Records
                    </li>
                  ) : (
                    !["handyman", "e-center", "provider"].includes(userDetails?.user_type) && (
                      <li onClick={() => handleDropdownItemClick(gotoEcenters)}>
                        E-centers
                      </li>
                    )
                  )}
                  {userDetails?.user_type === "handyman" && (
                    <li onClick={() => handleDropdownItemClick(() => handleClick("handyman"))}>
                      Individuals
                    </li>
                  )}
                  {userDetails?.user_type === "provider" && (
                    <li onClick={() => handleDropdownItemClick(() => handleClick("provider"))}>
                      Companies
                    </li>
                  )}
                  {userDetails?.user_type === "e-center" && (
                    <>
                      <li onClick={() => handleDropdownItemClick(() => handleClickPage("handyman"))}>
                        Individuals
                      </li>
                      <li onClick={() => handleDropdownItemClick(() => handleClickPage("provider"))}>
                        Companies
                      </li>
                    </>
                  )}
                  <li onClick={() => handleDropdownItemClick(handleLogout)}>Logout</li>
                </ul>
              )}
            </div>

            {
              userToken? <button className="btn btn_primary_btn ms-3" onClick={gotoContactUs}>Contact us</button> : ""
            }

          </div>
        </nav>
        {selectedType && <Myform openedFrom={selectedType} setSelectedType={setSelectedType} />}
      </div>
    </section>
  );
}
