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
              Aya Sir G is an E-commerce platform connecting job seekers with
              users needing helpers. While all individuals and companies listed
              are verified, we are not responsible for any scams or incidents.
              In case of issues, we can provide verified details ( e.g.,
              address, CNIC, Phone number, and Profile picture) through proper
              legal channels. We strongly advise users not to transfer advance
              payment or travel expenses before directly communicating with the
              selected individual or company to ensure a safe experience!
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
