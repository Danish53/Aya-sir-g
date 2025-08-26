"use client";
import Button from "react-bootstrap/Button";
import Hero from "./components/Hero/hero";
import OurMission from "./components/Our-mission/OurMission";
import Services from "./components/services/Services";
import Work from "./components/Find-Work/Work";
import { useEffect } from "react";

export default function Home() {
  // Home page component me (ya layout me)
  useEffect(() => {
    sessionStorage.setItem("fromHome", "true");
  }, []);

  return (
    <>
      <div className="home_page margin_navbar">
        <Hero />
        <OurMission />
        <Services />
        <Work />
      </div>
    </>
  );
}
