// import React from "react";
// import "./register-yourself.css";
// import Advartisement from "../components/AdvertisementBar/Advartisement";

// export default function page() {
//   return (
//     <section className="register_yourself margin_navbar">
//       <div className="container py-3 ">
//         <div className="row">
//           <div className="col-lg-3 ad_bar p-0 hide_bar">
//             <Advartisement />
//           </div>
//           <div className="col-lg-9 ">
//             <div className="content">
//               <h2>Join Aya Sir G! — Empowering Handyman Services in Lahore</h2>
//               <p>
//                 Are you a skilled individual, a growing company, or an aspiring E-center looking to thrive in the handyman service industry? Aya Sir G! is your dedicated platform for growth, visibility, and expanding your client base in Lahore.
//                 Explore the categories below to discover how we can help you expand your reach and elevate your service-based business. Our team is ready to assist you every step of the way.
//               </p>

//               <br />
//               <h4>How You Can Partner with Aya Sir G!
//               </h4>
//               <h3>
//                 For E-centers: Become a Community Hub</h3>
//               <p>
//                 Earn daily by becoming an Aya Sir G! E-center. You'll play a vital role in connecting your local community to reliable handyman services by helping individuals and companies register and utilize our platform. We compensate E-centers for each individual they successfully register, with a special focus on supporting blue-collar workers who may need help creating their profiles on our website. It's a rewarding way to contribute to local economic growth while building your own income stream.
//               </p>
//               <br />
//               <h3>For Individuals: Showcase Your Expertise</h3>
//               <p>
//                 Are you a talented handyman eager to find consistent work and highlight your unique skills? Register with Aya Sir G! to connect directly with clients seeking your specific talents. Build a strong professional reputation through verified jobs and client feedback, ensuring your skills are recognized and rewarded.</p>
//               <br />
//               <h3>For Companies: Scale Your Service Business</h3>
//               <p>
//                 If you're a handyman service company, Aya Sir G! is your strategic partner for sustainable growth. Our robust rating and review system helps you build invaluable client trust, enhance your brand's reputation, and attract more clients through authentic, positive feedback. Leverage our platform to reduce reliance on expensive commercial spaces like shops and warehouses; a strong profile here will be your primary source for new orders. Join us to expand your market presence and streamline your service delivery, embracing technology as the key to future growth.</p>            </div>

//             <h3 className="mt-3">Ready to Get Started?</h3>
//               <p>For personalized assistance or to begin your registration, please don't hesitate to reach out.
//             </p>
//             <div className="card_1 mt-3 mb-2 p-3">
//               <div className="flex_div d-flex align-items-center">
//                 <h3 className="m-0">For E-center Registration:</h3>
//                 <p>Ecenter@ayasirg.com</p>
//               </div>
//               {/* <div className="flex_div d-flex align-items-center">
//                 <h3>Contact us:</h3>
//                 <p>help@ayasirg.com</p>
//               </div> */}
//               <div className="flex_div d-flex align-items-center mt-3">
//                 <h3 className="m-0">Call Us Directly:</h3>
//                 <p>03292927474</p>
//               </div>
//             </div>
//             <button className="btn btn_primary_btn">Send a Message or Voice Note
//                {/* (Mention if you have a specific platform for this, e.g., WhatsApp, or if it's via a website contact form) <br/>
//               Our team at 15-C NFC Phase 1, Lahore, will reach out to you at the earliest convenience. */}
//               </button>
//             {/* <div className="card_1 mt-3 mb-2 mb-2 p-3">
//               <div className="flex_div d-flex align-items-baseline">
//                 <h3 className="yellow_color">Individual:</h3>
//                 <p>
//                   If you wanna register yourself and want a job without any
//                   hassle.
//                 </p>
//               </div>
//               <div className="flex_div d-flex align-items-center">
//                 <h3 className="yellow_color">Contact us:</h3>
//                 <p>Ecenter_registration@ayasirg.com </p>
//               </div>
//               <div className="flex_div d-flex align-items-center">
//                 <h3 className="yellow_color">Phone Number:</h3>
//                 <p>+92 3********* </p>
//               </div>
//             </div>
//             <div className="card_1 mt-3 mb-2 mb-2 p-3 ">
//               <div className="flex_div d-flex align-items-center">
//                 <h3 className="sky_color">E-centers:</h3>
//                 <p>Become E-center and earn daily. </p>
//               </div>
//               <div className="flex_div d-flex align-items-center">
//                 <h3 className="sky_color">Contact us:</h3>
//                 <p>Ecenter_registration@ayasirg.com </p>
//               </div>
//               <div className="flex_div d-flex align-items-center">
//                 <h3 className="sky_color">Phone Number:</h3>
//                 <p>+92 3********* </p>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


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

