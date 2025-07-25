import React from "react";
import "./register-yourself.css";
import Advartisement from "../components/AdvertisementBar/Advartisement";

export default function page() {
  return (
    <section className="register_yourself margin_navbar">
      <div className="container py-5 ">
        <div className="row">
          <div className="col-lg-3 ad_bar p-0 hide_bar">
            <Advartisement />
          </div>
          <div className="col-lg-9 ">
            <div className="content">
              <h2>Join Aya-Sir-G: Empowering Handyman Services in Lahore</h2>
              <p>
                Are you a skilled individual, a growing company, or an aspiring E-center looking to thrive in the handyman service industry? Aya-Sir-G is your dedicated platform for growth, visibility, and connecting with a wider client base in Lahore.
                Explore the categories below to discover how we can help you expand your reach and elevate your service-based business. Our team is ready to assist you every step of the way.
              </p>
              <br />
              <h4>How You Can Partner with Aya-Sir-G:
              </h4>
              <h3>
                For E-centers: Become a Community Hub</h3>
              <p>
                Earn daily by becoming an Aya-Sir-G E-center. You'll play a vital role in connecting your local community to reliable handyman services by helping individuals and companies register and utilize our platform. We will compensate E-centers for each individual they successfully register, especially supporting blue-collar workers who may require assistance in creating their profiles on our website. It's a rewarding way to contribute to local economic growth while building your own income stream.
              </p>
              <br />
              <h3>For Individuals: Showcase Your Expertise</h3>
              <p>
                Are you a talented handyman eager to find consistent work and highlight your unique skills? Register with Aya-Sir-G to connect directly with clients seeking your specific talents. Build a strong professional reputation through verified jobs and client feedback, ensuring your skills are recognized and rewarded.</p>
              <br />
              <h3>For Companies: Scale Your Service Business</h3>
              <p>
                If you're a handyman service company, Aya-Sir-G is your strategic partner for sustainable growth. Our robust rating and comment system helps you build invaluable client trust, enhance your brand's reputation, and attract more clients through authentic, positive feedback. Leverage our platform to reduce reliance on expensive commercial spaces like shops and warehouses; a strong profile here will be your primary source for new orders. Join us to expand your market presence and streamline your service delivery, embracing technology as the key to future growth.</p>            </div>

            <h3 className="mt-3">Ready to Get Started?</h3>
              <p>For personalized assistance or to begin your registration, please don't hesitate to reach out.
            </p>
            <div className="card_1 mt-3 mb-2 p-3">
              <div className="flex_div d-flex align-items-center">
                <h3 className="m-0">For E-center Registration:</h3>
                <p>E_center@ayasirg.com</p>
              </div>
              {/* <div className="flex_div d-flex align-items-center">
                <h3>Contact us:</h3>
                <p>help@ayasirg.com</p>
              </div> */}
              <div className="flex_div d-flex align-items-center mt-3">
                <h3 className="m-0">Call Us Directly:</h3>
                <p>03292927474</p>
              </div>
            </div>
            <p>Send a Message or Voice Note: (Mention if you have a specific platform for this, e.g., WhatsApp, or if it's via a website contact form) <br/>
              Our team in 15-C NFC Ph#1, Lahore, is committed to reaching out to you at the earliest convenience.</p>
            {/* <div className="card_1 mt-3 mb-2 mb-2 p-3">
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
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
