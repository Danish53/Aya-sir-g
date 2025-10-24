
"use client";
import React from "react";
import "./register-yourself.css";
import Advartisement from "../components/AdvertisementBar/Advartisement";
import { useRouter } from "next/navigation";

export default function page() {

  const router = useRouter();

  const gotoContactUs = () => router.push("/contact-us");

  return (
    <section className="register_yourself margin_navbar">
      <div className="container py-3">
        <div className="row">
          {/* Left Sidebar - Ads */}
          <div className="col-lg-3 ad_bar p-0 hide_bar">
            <Advartisement />
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="content p-2">
              <h2 className="fw-bold mb-3">
                Join Aya Sir G! — <span>The Handyman Services Platform in Lahore</span>
              </h2>
              <p>Whether you are a skilled professional, a growing service company, or an aspiring E-center, Aya Sir G! is the trusted platform to grow your business, increase visibility, and connect with more clients in Lahore.</p>
              <p>
                Explore the categories below to see how Aya Sir G! can help you reach more clients, grow your handyman services, and strengthen your business in Lahore. Our support team is here to guide you every step of the way.
              </p>

              {/* Grid Layout for Sections */}
              <div className="row g-lg-4 g-3 mt-1">
                <div className="col-md-7">
                  <div className="shadow-sm p-lg-4 p-3 h-100 rounded-3">
                    <h4 className="fw-semibold ps-3 mb-2 border_color">
                      For E-centers: Become a Community Hub
                    </h4>
                    <p>Earn a steady income by becoming an Aya Sir G! E-center. You’ll play a vital role in connecting your community to trusted handyman services by helping individuals and companies register and use our platform.
                    </p>
                    <p>E-centers are compensated for every individual they register, with special support for blue-collar workers who may need help creating profiles. This is a rewarding way to contribute to local economic growth while building your own income stream.</p>
                  </div>
                </div>

                <div className="col-md-5">
                  <div className=" shadow-sm p-lg-4 p-3 h-100 rounded-3">
                    <h4 className="fw-semibold ps-3 mb-2 border_color">
                      For Individuals: Showcase Your Expertise
                    </h4>
                    <p>
                      Are you a skilled handyman looking for consistent work in Lahore? Register with Aya Sir G! to connect directly with clients who need your services. Build your professional reputation through verified jobs and client feedback, ensuring your skills are recognized and fairly rewarded.</p>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className=" shadow-sm p-lg-4 p-3 h-100 rounded-3">
                    <h4 className="fw-semibold ps-3 mb-2 border_color">
                      For Companies: Scale Your Service Business
                    </h4>
                    <p>
                      If you run a handyman service company, Aya Sir G! is your trusted partner for sustainable growth. Our verified rating and review system builds client trust, strengthens your reputation, and attracts more customers through authentic feedback.</p>
                    <p>With Aya Sir G!, you can reduce dependence on costly physical spaces like shops and warehouses. Instead, your online profile becomes the primary source for new orders. Join us to expand your market presence, streamline service delivery, and embrace technology as the future of your business.</p>
                  </div>
                </div>
                <div className="col-md-12">
                  {/* Contact Section */}
                  <div className="shadow-sm p-lg-4 p-3 h-100 rounded-3">
                    <h3 className="fw-semibold ps-3 mb-2 border_color">Ready to Get Started?</h3>
                    <p>
                      Contact us today for personalized assistance or to begin your registration process.
                    </p>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h5 className="m-0">For E-center Registration:</h5>
                      <p className="m-0">Ecenter@ayasirg.com</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <h5 className="m-0">Call Us Directly:</h5>
                      <p className="m-0">03292927474</p>
                    </div>

                    <button onClick={gotoContactUs} className="btn btn_primary_btn mt-4" style={{ width: "fitcontent" }}>
                      Send a Message or Voice Note
                    </button>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

