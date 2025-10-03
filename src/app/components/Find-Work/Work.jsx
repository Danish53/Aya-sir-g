import React from "react";
import "./work.css";

export default function Work() {
  return (
    <section className="work mt-5 mb-5">
      <div className="container">
        <div className="row mb-3">
          <div className="col-lg-6">
            <div className="right_div" data-aos="fade-right">
              <p className="section_heading mb-1">
                Revolutionizing How Blue-Collar <br /><span className="red_title">Workers Find Jobs in Pakistan</span>
              </p>
              <div className="col_1 mt-lg-5 mt-3">
                <h3 className="heading">Find Trusted Professionals</h3>
                <p>
                  Discover verified and skilled blue-collar professionals in Pakistan through Aya Sir G!, from home maintenance to personal assistance.
                </p>
              </div>
              <div className="col_1 mt-lg-5 mt-4">
                <h3 className="heading">Hire with Confidence</h3>
                <p>
                  Check detailed worker profiles, read genuine client reviews, and hire with confidence based on experience and ratings.
                </p>
              </div>
              <div className="col_1 mt-lg-5 mt-4">
                <h3 className="heading">Reliable & Efficient Services</h3>
                <p>
                  Get quality services delivered on time. From domestic help to technical repairs, Aya Sir G! ensures reliable and efficient solutions tailored to your needs.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 img_col mt-lg-0 mt-3" data-aos="fade-bottom">
            <img src="/assets/staffs.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
