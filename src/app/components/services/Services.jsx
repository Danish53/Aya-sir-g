import React from "react";
import "./service.css";
import Image from "next/image";

export default function Services() {
  return (
    <section className="Services">
      <div className="container">
        <h1 className="section_heading text-center">
          Your Perfect Service <span className="red_title">in Just 4 Steps</span>
        </h1>
        <div className="row mb-3 mt-5  ">
          <div className="col-lg-3 col-sm-6 margin_top" data-aos="fade-right">
            <div className="card p-3 col_height">
              <Image src="/assets/card_img1.png" width={100} height={100} alt="" />
              <p id="heading">Step 1</p>
              <p id="heading">Choose Your Service</p>
              <p id="description">
                Browse categories like maids, drivers, security guards, plumbers, and more.
              </p>
            </div>
          </div>
          <div
            className="col-lg-3 col-sm-6 margin_top mt_top"
            data-aos="fade-up"
          >
            <div className="card p-3 col_height" data-aos="fade-down">
              <Image src="/assets/card_img2.png" width={100} height={100} alt="" />
              <p id="heading">Step 2</p>
              <p id="heading">Sign Up Easily</p>
              <p id="description">
                Register with your phone number and provide basic details to access providers.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 margin_top" data-aos="fade-up">
            <div className="card p-3 col_height">
              <Image src="/assets/card_img3.png" width={100} height={100} alt="" />
              <p id="heading">Step 3</p>
              <p id="heading">Compare & Select</p>
              <p id="description">
                Use filters such as ratings, reviews, experience, and location to shortlist.
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 margin_top mt_top" >
            <div className="card p-3 col_height">
              <Image src="/assets/card_img3.png" width={100} height={100} alt="" />
              <p id="heading">Step 4</p>
              <p id="heading">Connect & Hire</p>
              <p id="description">
                View contact details and directly call or message the provider to finalize.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
