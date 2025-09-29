// import React from "react";
// import "./about.css";

// export default function page() {
//   return (
//     <section className="about_us margin_navbar">
//       <div className="container py-3">
//         <h2>Slogan: Your Trusted Help, Everywhere</h2>
//         <p>
//           <b>Aya Sir G!</b> is a platform designed to connect blue-collar job seekers
//           with users in need of various services, including maids, helpers,
//           plumbers, chefs, drivers, security guards, carpenters, and more. Our
//           mission is to provide a user-friendly platform that facilitates the
//           hiring of trusted individuals for domestic and commercial services.
//         </p>
//         <h4>About Aya Sir G!</h4>
//         <p>
//           At Aya Sir G!, we understand the importance of trust when inviting
//           someone into your home. Therefore, we prioritize the verification of
//           all service providers on our platform. Each individual, regardless of gender, undergoes a thorough verification process that includes
//           essential data such as CNIC <span>(Computerized National Identity Card)</span>,
//           photographs, addresses, and registered contact numbers. This ensures
//           that users can confidently choose from verified profiles when seeking
//           assistance.
//         </p>
//         <p>
//           In addition to individual service providers, our platform also
//           features companies offering a range of services, including car
//           washing, party decoration, catering and many more. Our goal is to provide a seamless experience, enabling users to find reliable help without hassle.
//         </p>
//         <p>
//           We are committed to helping blue-collar job seekers or jobless
//           individuals showcase their skills and find reasonable employment
//           opportunities. By allowing users to register based on their
//           availability, we enable them to earn money on an hourly or daily
//           basis. We highly recommend utilizing verified profiles to ensure the
//           utmost trustworthiness of those working in your home.
//         </p>
//         <p>
//           Our slogan, <b>"Your Trusted Help, Anywhere,"</b> encapsulates our dedication
//           to providing reliable services at your convenience. We strive to be
//           the go-to platform where users can find trustworthy assistance from
//           verified professionals.
//         </p>
//       </div>
//     </section>
//   );
// }

import React from "react";
import "./about.css";

export default function AboutPage() {
  return (
    <section className="about_us margin_navbar py-3 bg-light">
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-3">
          <h2 className="fw-bold">
            Slogan: <span>Your Trusted Help, Everywhere</span>
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
                all service providers. Each individual undergoes a thorough process
                including CNIC <span className="fw-semibold">(Computerized National Identity Card)</span>, photographs, addresses,
                and registered contact numbers. This ensures
                that users can confidently choose from verified profiles when seeking
                assistance.
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="col-md-6">
            <div className="p-lg-4 p-3 bg-white h-100 shadow-sm rounded-3">
              <h4 className="fw-semibold ps-3 mb-2 border_color">
                Who We are
              </h4>
              <p>
                <b>Aya Sir G!</b> is a platform designed to connect blue-collar job
                seekers with users in need of various services, including maids,
                helpers, plumbers, chefs, drivers, security guards, carpenters, and
                more. Our mission is to provide a user-friendly platform that
                facilitates the hiring of trusted individuals for domestic and
                commercial services.
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
                In addition to individual service providers, our platform also features
                companies offering services like car washing, party decoration,
                catering, and more. Our goal is to provide a seamless experience,
                enabling users to find reliable help without hassle.
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
                We are committed to helping blue-collar job seekers or jobless
                individuals showcase their skills and find reasonable employment
                opportunities. By allowing users to register based on their
                availability, we enable them to earn money on an hourly or daily
                basis. We highly recommend utilizing verified profiles to ensure the
                utmost trustworthiness of those working in your home.
              </p>
            </div>
          </div>

          
        {/* Closing Slogan */}
        <div className="col-md-12">
          <div className="p-lg-4 p-3 bg-white h-100 shadow-sm rounded-3">
            <p className="text-center">
              Our slogan, <b>"Your Trusted Help, Anywhere,"</b> encapsulates our dedication
           to providing reliable services at your convenience. We strive to be
           the go-to platform where users can find trustworthy assistance from
           verified professionals.
            </p>
          </div>
        </div>
        </div>

      </div>
    </section>
  );
}

