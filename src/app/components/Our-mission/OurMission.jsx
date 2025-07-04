"use client";
import React from "react";
import "./our_mission.css";
import Button from "react-bootstrap/Button";
import { FaArrowRight } from "react-icons/fa6";

export default function OurMission() {
  return (
    <section className="our_mission mb-5">
      <div className="container">
        <h3 className="section_heading">
          Our <span className="red_title">Mission</span>
        </h3>
        <div className="row mt-5">
          <div className="left_div col-lg-5 ">
            <p id="para">
              Welcome to “Aya Sir G” <br />
              At “Aya Sir G,” we are committed to creating opportunities for individuals who are eager to work, believe in their abilities, and embrace self-reliance. Inspired by the timeless principle, "Allah helps those who help themselves," we empower people to take initiative and strive for a better future.
              <br /> Our mission goes beyond mere connectivity; we aim to uplift Pakistan’s blue-collar workforce by providing them with a digital platform to showcase their skills, gain recognition, and secure better opportunities. In essence, “Aya Sir G” is like “LinkedIn” for the blue-collar community. We envision a future where workers no longer need to wait at street corners or main chowks for opportunities. Instead, we bring opportunities directly to them, ensuring their “rizq” (sustenance) reaches them with dignity.
            </p>
            <Button className="mb-3" variant="outline-danger">
              Hire an Employee <FaArrowRight />
            </Button>
          </div>
          <div className="right_div d-flex gap-4 col-lg-7">
            <div className="normal_div d-flex flex-column gap-4">
              <div
                className="Card text-center d-flex flex-column justify-content-center "
                data-aos="fade-right"
              >
                <h1 className="fw-bold">
                  5K <span className="pluse_icon">+</span>
                </h1>
                <p id="details">Jobs Posted</p>
              </div>
              <div
                className="Card text-center d-flex flex-column justify-content-center "
                data-aos="fade-up"
              >
                <h1 className="fw-bold">
                  80 <span className="pluse_icon">+</span>
                </h1>
                <p id="details">Employers</p>
              </div>
            </div>
            <div className="upper_div d-flex flex-column gap-4">
              <div
                className="Card text-center d-flex flex-column justify-content-center "
                data-aos="fade-down"
              >
                <h1 className="fw-bold">
                  200 <span className="pluse_icon">+</span>
                </h1>
                <p id="details">Happy Customer</p>
              </div>
              <div
                className="Card text-center d-flex flex-column justify-content-center "
                data-aos="fade-up"
              >
                <h1 className="fw-bold">
                  8K<span className="pluse_icon">+</span>
                </h1>
                <p id="details">Employees</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
