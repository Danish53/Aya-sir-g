import React from "react";
import "./about.css";

export default function AboutPage() {
  return (
    <section className="about_us margin_navbar py-3 bg-light">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-3">
          <h2 className="fw-bold">
            Slogan: <span>“Your Trusted Help, Anywhere.”</span>
          </h2>
          <p className="mt-2">
            Connecting people with reliable helpers and service providers.
          </p>
        </div>


        <div className="row g-lg-4 g-3">

          {/* About Section */}
          <div className="col-md-6">
            <div className="p-lg-4 p-3 bg-white h-100 shadow-sm rounded-3">
              <h4 className="fw-semibold ps-3 mb-2 border_color">
                About Aya Sir G!
              </h4>
              <p>
                At <b>Aya Sir G!</b>, we understand the importance of trust when inviting
                someone into your home. Therefore, we prioritize the verification of
                all service providers. Each individual undergoes a thorough verification process, including CNIC, photographs, permanent address, and registered contact numbers.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="col-md-6">
            <div className="p-lg-4 p-3 bg-white h-100 shadow-sm rounded-3">
              <h4 className="fw-semibold ps-3 mb-2 border_color">
                Our Mission
              </h4>
              <p>
                <b>Aya Sir G!</b> is a digital platform that connects blue-collar job seekers with users in need of reliable services.
              </p>
            </div>
          </div>

          {/* Services Section */}
          <div className="col-md-6">
            <div className="p-lg-4 p-3 bg-white h-100 shadow-sm rounded-3">
              <h4 className="fw-semibold ps-3 mb-2 border_color">
                Wide Range of Services
              </h4>
              <p>
                Our platform doesn’t just feature individuals, it also includes companies offering services like car washing, catering, and party decoration.
              </p>
            </div>
          </div>

          {/* Opportunities Section */}
          <div className="col-md-6">
            <div className="p-lg-4 p-3 bg-white h-100 shadow-sm rounded-3">
              <h4 className="fw-semibold ps-3 mb-2 border_color">
                Empowering Job Seekers
              </h4>
              <p>
                We are committed to empowering blue-collar workers and job seekers by helping them showcase their skills and access fair employment opportunities.
              </p>
            </div>
          </div>


          {/* Closing Slogan */}
          <div className="col-md-12">
            <div className="p-lg-4 p-3 bg-white h-100 shadow-sm rounded-3">
              <p className="text-center">
                Our slogan, <b>"Your Trusted Help, Anywhere."</b> reflects our dedication to providing convenient, secure, and reliable services for every household and business need.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

