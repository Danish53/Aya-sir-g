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

  //   useEffect(() => {
  //   const updateLanguageLabel = () => {
  //     const firstSpan = document.querySelector(".goog-te-gadget span a span:nth-of-type(1)");
  //     const lang = document.querySelector(".goog-te-combo")?.value;

  //     if (firstSpan) {
  //       if (lang === "ur") {
  //         firstSpan.textContent = "اردو";
  //       } else {
  //         firstSpan.textContent = "ENGLISH";
  //       }
  //     }
  //   };

  //   const interval = setInterval(updateLanguageLabel, 1000);

  //   return () => clearInterval(interval);
  // }, []);

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
          <div className="logo_div">
            <Link href={'/'}><img src="/assets/logo_aya_sir_g.png" alt="Logo" className="logo" /></Link>
          </div>

          <div className="nav_items d-flex">
            <ul className={`list-unstyled list ${myNavbar ? "active" : ""}`}>
              <li onClick={() => { setMyNavbar(false); handleDropdownItemClick() }}><Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link></li>
              <li onClick={() => { setMyNavbar(false); handleDropdownItemClick() }}><Link href="/about-us" className={pathname === "/about-us" ? "active" : ""}>About Us</Link></li>
              {userDetails?.user_type !== "e-center" && (
                <li onClick={() => { setMyNavbar(false); handleDropdownItemClick() }}><Link href="/register-yourself" className={pathname === "/register-yourself" ? "active" : ""}>Register Yourself</Link></li>
              )}
              <li onClick={() => { setMyNavbar(false); handleDropdownItemClick() }}><Link href="/blogs" className={pathname === "/blogs" ? "active" : ""}>Blogs</Link></li>
              <li onClick={() => { setMyNavbar(false); handleDropdownItemClick() }}><Link href="/faq" className={pathname === "/faq" ? "active" : ""}>FAQ</Link></li>
              <li onClick={() => { setMyNavbar(false); handleDropdownItemClick() }}><Link href="/contact-us" className={pathname === "/contact-us" ? "active" : ""}>Contact Us</Link></li>
              <li className="d-block d-md-none" onClick={() => setMyNavbar(false)}>
                {
                  userToken ? (
                    <p><Link href={"/user-profile"}><img className="icon_person_pic" src={userInfo?.profile_image} alt="profile" />  {userDetails?.first_name}</Link></p>
                  ) : (
                    ""
                  )
                }
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

            <div className="info_div">
              <div className="head_section d-flex align-items-center gap-2">
                <Link onClick={() => { setMyNavbar(false); handleDropdownItemClick() }} href={userToken ? "/user-wishlist" : "/login"}>
                  <IoIosHeartEmpty className="icon_hearth ml_2" />
                </Link>
                {/* {userInfo && <IoPersonCircle className="icon_person" onClick={() => showuserDetailss(!userDetailss)} />} */}
                {userInfo && <img src={userInfo?.profile_image} className="icon_person_pic" onClick={() => showuserDetailss(!userDetailss)} alt="profile" />}
                <div className="name_div" onClick={() => showuserDetailss(!userDetailss)}>
                  {userToken ? <p>{userDetails?.first_name}</p> : <p onClick={gotoLogin}>Login</p>}
                </div>
                <div className="bars" onClick={handleNavbar}><FaBars className="icon_bars" /></div>
              </div>
              {userToken && (
                <ul className={`user_details ${userDetailss ? "show_user_details" : ""}`}>
                  <li onClick={() => handleDropdownItemClick(gotoProfile)}>Profile</li>
                  {userDetails?.user_type === "e-center" ? (
                    <li onClick={() => handleDropdownItemClick(gotoEcentersRecords)}>E-center Records</li>
                  ) : (
                    <li onClick={() => handleDropdownItemClick(gotoEcenters)}>E-centers</li>
                  )}
                  {userDetails?.user_type === "handyman" && (
                    <li onClick={() => handleDropdownItemClick(() => handleClick("handyman"))}>Individuals</li>
                  )}
                  {userDetails?.user_type === "provider" && (
                    <li onClick={() => handleDropdownItemClick(() => handleClick("provider"))}>Companies</li>
                  )}
                  {/* {userDetails?.user_type === "e-center" && (
                    <>
                      <li onClick={() => handleDropdownItemClick(() => handleClick("handyman"))}>Individuals</li>
                      <li onClick={() => handleDropdownItemClick(() => handleClick("provider"))}>Companies</li>
                    </>
                  )} */}
                  {userDetails?.user_type === "e-center" && (
                    <>
                      <li onClick={() => handleDropdownItemClick(() => handleClickPage("handyman"))}>Individuals</li>
                      <li onClick={() => handleDropdownItemClick(() => handleClickPage("provider"))}>Companies</li>
                    </>
                  )}
                  <li onClick={() => handleDropdownItemClick(handleLogout)}>Logout</li>
                </ul>
              )}
            </div>
          </div>
        </nav>
        {selectedType && <Myform openedFrom={selectedType} setSelectedType={setSelectedType} />}
      </div>
    </section>
  );
}
