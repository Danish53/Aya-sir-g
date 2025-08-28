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
        <div className="row mt-3">
          <div className="left_div col-lg-5 ">
            <p id="para">
              Welcome to “Aya Sir G!” <br />
              At “Aya Sir G!” we are committed to creating opportunities for individuals who are eager to work, believe in their abilities, and embrace self-reliance. Inspired by the timeless principle, "Allah helps those who help themselves," we empower people to take initiative and strive for a better future.
            </p>
            <p  id="para" className="my-2">Having deep roots in Pakistan, we recognize the untapped potential of
              our youth and workforce, who are talented and hardworking but often
              lack access to the right platforms for growth. We noticed a gap in the
              market where users, households, families, and commercial industries
              struggle to find reliable maids, drivers, guards, and helpers for
              their domestic and commercial needs. Meanwhile, many blue-collar
              workers face challenges such as limited education and the inability to
              showcase their skills effectively, further compounded by a growing
              trust deficit in today’s hiring practices.</p>
            {/* <Button className="my-3" variant="outline-danger">
              Hire an Employee <FaArrowRight />
            </Button> */}
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
