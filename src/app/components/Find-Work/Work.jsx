import React from "react";
import "./work.css";

export default function Work() {
  return (
    <section className="work mt-5 mb-5">
      <div className="container">
        <p className="section_heading mb-3">
          Changing the Way Working <span className="red_title">People Find Work</span>
        </p>
        <div className="row mb-3">
          <div className="col-lg-7">
            <div className="left_div d-flex gap-3 " data-aos="fade-right">
              <div className="col_1 mt-4">
                <h3 className="heading">Find Trusted Professionals</h3>
                <p>
                  Easily discover skilled Aya Sir G! workers for your needs. Our
                  platform connects you with verified service providers across
                  various industries.
                </p>
              </div>
              <div className="col_1 mt-4">
                <h3 className="heading">Hire with Confidence</h3>
                <p>
                  Browse worker profiles, check reviews, and select the best
                  professional based on experience, ratings, and availability.
                </p>
              </div>
            </div>
            <div className="right_div d-flex gap-3" data-aos="fade-up">
              <div className="col_1 mt-4">
                <h3 className="heading ">Reliable & Efficient Services</h3>
                <p>
                  Get quality work done on time. Whether it's home maintenance,
                  repairs, or specialized services, hire professionals who meet
                  your requirements with  ease.
                </p>
              </div>
              <div className="col_1 mt-4">
                <h3 className="heading">Reliable & Efficient Services</h3>
                <p>
                  Get quality work done on time. Whether it's home maintenance,
                  repairs, or specialized services, hire professionals who meet
                  your requirements with  ease.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-5 img_col " data-aos="fade-bottom">
            <img src="/assets/staffs.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
