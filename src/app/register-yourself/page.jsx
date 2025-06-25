import React from "react";
import "./register-yourself.css";
import Advartisement from "../components/AdvertisementBar/Advartisement";

export default function page() {
  return (
    <section className="register_yourself margin_navbar">
      <div className="container py-5 ">
        <div className="row">
          <div className="col-lg-3 ad_bar py-2 hide_bar">
            <Advartisement />
          </div>
          <div className="col-lg-9 ">
            <div className="content">
              <p>
                If you are looking to market yourself or expand your
                service-based business, explore the categories below and
                register with us. Oue team will reach out to you at the earliest
                convenience.
              </p>
              <br />
              <p>
                For assistance, you can send us a message, leave a voice note,
                or call us directly on the number provided below.
              </p>
            </div>
            <div className="card_1 mt-3 mb-2 p-3">
              <div className="flex_div d-flex align-items-center">
                <h3>E-centers:</h3>
                <p>Become E-center and earn daily. </p>
              </div>
              <div className="flex_div d-flex align-items-center">
                <h3>Contact us:</h3>
                <p>Ecenter_registration@ayasirg.com </p>
              </div>
              <div className="flex_div d-flex align-items-center">
                <h3>Phone Number:</h3>
                <p>+92 3********* </p>
              </div>
            </div>
            <div className="card_1 mt-3 mb-2 mb-2 p-3">
              <div className="flex_div d-flex align-items-baseline">
                <h3 className="yellow_color">Individual:</h3>
                <p>
                  If you wanna register yourself and want a job without any
                  hassle.
                </p>
              </div>
              <div className="flex_div d-flex align-items-center">
                <h3 className="yellow_color">Contact us:</h3>
                <p>Ecenter_registration@ayasirg.com </p>
              </div>
              <div className="flex_div d-flex align-items-center">
                <h3 className="yellow_color">Phone Number:</h3>
                <p>+92 3********* </p>
              </div>
            </div>
            <div className="card_1 mt-3 mb-2 mb-2 p-3 ">
              <div className="flex_div d-flex align-items-center">
                <h3 className="sky_color">E-centers:</h3>
                <p>Become E-center and earn daily. </p>
              </div>
              <div className="flex_div d-flex align-items-center">
                <h3 className="sky_color">Contact us:</h3>
                <p>Ecenter_registration@ayasirg.com </p>
              </div>
              <div className="flex_div d-flex align-items-center">
                <h3 className="sky_color">Phone Number:</h3>
                <p>+92 3********* </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
