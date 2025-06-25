import React from "react";
import "./service.css";

export default function Services() {
  return (
    <section className="Services">
      <div className="container">
        <h1 className="section_heading text-center">
          Your Perfect Service in Just 4 Steps
        </h1>
        <div className="row mb-3 mt-5  ">
          <div className="col-lg-3 col-sm-6 margin_top" data-aos="fade-right">
            <div className="card p-3 col_height">
              <img src="/assets/card_img1.png" alt="" />
              <p id="heading">Step 1</p>
              <p id="heading">Choose Your Service</p>
              <p id="description">
                Browse from a wide range of services including maids, drivers,
                security guards, and more to find what you need.
              </p>
            </div>
          </div>
          <div
            className="col-lg-3 col-sm-6 margin_top mt_top"
            data-aos="fade-up"
          >
            <div className="card p-3 col_height" data-aos="fade-down">
              <img src="/assets/card_img2.png" alt="" />
              <p id="heading">Step 2</p>
              <p id="heading">Create Your Profile</p>
              <p id="description">
                Sign up with your phone number and provide basic details to
                access service providers.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6" data-aos="fade-up">
            <div className="card p-3 col_height">
              <img src="/assets/card_img3.png" alt="" />
              <p id="heading">Step 3</p>
              <p id="heading">Search & Compare</p>
              <p id="description">
                Use filters like rating, experience, and location to compare and
                shortlist the best service providers.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 margin_top mt_top" >
            <div className="card p-3 col_height">
              <img src="/assets/card_img3.png" alt="" />
              <p id="heading">Step 4</p>
              <p id="heading">Connect & Hire</p>
              <p id="description">
                View contact details and directly call the provider to finalize
                your hiring process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
