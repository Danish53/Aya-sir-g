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
    <section className="about_us margin_navbar py-4" style={{ background: "#f9fafb" }}>
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Left Side - Content */}
          <div className="col-lg-6 col-md-12">
            <div className="p-4 bg-white rounded-4 shadow-sm">
              <h2 className="fw-bold mb-3" style={{ fontSize: "2rem" }}>
                Slogan: Your <span>Trusted</span> Help, Everywhere
              </h2>

              <p>
                <b>Aya Sir G!</b> is a platform designed to connect blue-collar job seekers
                with users in need of various services, including maids, helpers,
                plumbers, chefs, drivers, security guards, carpenters, and more. Our
                mission is to provide a user-friendly platform that facilitates the
                hiring of trusted individuals for domestic and commercial services.
              </p>

              <h4 className="fw-semibold mt-3 mb-2 ps-3 border_color">
                About Aya Sir G!
              </h4>

              <p>
                At Aya Sir G!, we understand the importance of trust when inviting
                someone into your home. Therefore, we prioritize the verification of
                all service providers on our platform. Each individual undergoes a
                thorough verification process that includes CNIC{" "}
                <span className="fw-semibold">(Computerized National Identity Card)</span>,
                photographs, addresses, and registered contact numbers.
              </p>

              <p>
                In addition to individual service providers, our platform also
                features companies offering a range of services like car washing,
                party decoration, catering and more. Our goal is to provide a seamless
                experience, enabling users to find reliable help without hassle.
              </p>

              <p>
                We are committed to helping blue-collar job seekers showcase their
                skills and find reasonable employment opportunities. By allowing
                users to register based on their availability, we enable them to earn
                money on an hourly or daily basis.
              </p>

              <p>
                Our slogan, <b>"Your Trusted Help, Anywhere,"</b> encapsulates our
                dedication to providing reliable services at your convenience.
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="col-lg-6 col-md-12 text-center">
            <img
              src="https://img.freepik.com/free-vector/professions-people-concept_23-2148643680.jpg"
              alt="About Aya Sir G!"
              className="img-fluid rounded-4 shadow-lg hover-scale"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

