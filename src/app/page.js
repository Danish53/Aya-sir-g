import Button from "react-bootstrap/Button";
import Hero from "./components/Hero/hero";
import OurMission from "./components/Our-mission/OurMission";
import Services from "./components/services/Services";
import Work from "./components/Find-Work/Work";

export default function Home() {
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
