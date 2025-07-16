"use client";
import React from "react";
import { usePathname } from "next/navigation";
import MyFooter from "./components/Footer/MyFooter";
import MyNavbar from "./components/custom-navbar/CustomNavbar";

export default function SiteChrome({ position }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    // pathname === "/contact-us" ||
    pathname === "/forgot-password" ||
    // pathname === "/sign-up" ||
    pathname === "/otp" ||
    pathname === "/register-service-provider" ||
    pathname === "/reset-password" ||
    pathname === "/register-otp"

  pathname.startsWith("/auth");

  if (isAuthPage) return null;

  if (position === "top") return <MyNavbar />;
  if (position === "bottom") return <MyFooter />;

  return null;
}
