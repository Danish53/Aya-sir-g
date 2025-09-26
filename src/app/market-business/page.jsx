// import React from "react";
// import "./market_business.css";
// import Advartisement from "../components/AdvertisementBar/Advartisement";

// export default function page() {
//     return (
//         <section className="our_mission margin_navbar">
//             <div className="container py-3">
//                 <div className="row">
//                     <div className="col-lg-3 ad_bar p-0 hide_bar">
//                         <Advartisement />
//                     </div>
//                     <div className="col-lg-9">
//                         <h3>Market Your Business with Aya Sir G!</h3>
//                         <p>
//                             Welcome to Aya Sir G! We are delighted you are exploring how to market your business effectively with us.
//                         </p>
//                         <p>
//                             At Aya Sir G!, we offer a unique platform for companies like yours to reach a highly engaged audience. Our primary focus is connecting with household women who are actively seeking new products and services. This includes everything from exciting new restaurants and beauty products to luxury items, branded bags, and jewelry. Our audience has the purchasing power and interest to become your next loyal customers.
//                         </p>
//                         <p>
//                             By choosing to market on Aya Sir G!, you not only expand your reach to millions of eager Pakistani consumers, but you also contribute directly to our mission: empowering Pakistan's blue-collar community. Your marketing investment helps create vital opportunities and uplifts deserving individuals.
//                         </p>
//                         <p>
//                             Let us help you market your products and services to a receptive audience, while also making a meaningful social impact.
//                         </p>
//                         <p>
//                             Connect with us today to learn more!
//                         </p>
//                         <ul>
//                             <li>Phone: +923098574093</li>
//                             <li>Email: marketing@ayasirg.com </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

import React from "react";
import "./market_business.css";
import Advartisement from "../components/AdvertisementBar/Advartisement";

export default function Page() {
  return (
    <section className="market_business margin_navbar">
      <div className="container py-2">
        <div className="row">
          {/* Left Sidebar - Ads */}
          <div className="col-lg-3 ad_bar p-0 hide_bar">
            <Advartisement />
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            <div className="content p-2">
              <h2 className="fw-bold mb-3">
                Market Your Business <span>with Aya Sir G!</span>
              </h2>
              <p>
                Welcome to <b>Aya Sir G!</b> We are delighted you are exploring
                how to market your business effectively with us.
              </p>

              <div className="row  g-lg-4 g-3">
                <div className="col-md-12">
                  <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
                    <h4 className="fw-bold ps-3 mb-2 border_color">
                      Reach an Engaged Audience
                    </h4>
                    <p>
                      At Aya Sir G!, we offer a unique platform for companies
                      like yours to reach a highly engaged audience. Our primary
                      focus is connecting with household women who are actively
                      seeking new products and services. This includes
                      everything from exciting new restaurants and beauty
                      products to luxury items, branded bags, and jewelry. Our
                      audience has the purchasing power and interest to become
                      your next loyal customers.
                    </p>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
                    <h4 className="fw-bold ps-3 mb-2 border_color">
                      Support a Greater Cause
                    </h4>
                    <p>
                      By choosing to market on Aya Sir G!, you not only expand
                      your reach to millions of eager Pakistani consumers, but
                      you also contribute directly to our mission: empowering
                      Pakistan's blue-collar community. Your marketing
                      investment helps create vital opportunities and uplifts
                      deserving individuals.
                    </p>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
                    <h4 className="fw-bold ps-3 mb-2 border_color">
                      Why Partner with Us?
                    </h4>
                    <p>
                      Let us help you market your products and services to a
                      receptive audience, while also making a meaningful social
                      impact. With Aya Sir G!, your business is not just
                      promoting itself—it is contributing to a positive change
                      in society.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="contact_box shadow-sm mt-3 p-lg-4 p-3 rounded-3">
                <h5 className="fw-bold mb-2 ps-3 border_color">
                  Connect with Us Today!
                </h5>
                <p className="mb-2">For marketing inquiries, reach us at:</p>
                <ul className="list-unstyled">
                  <li>
                    <b>Phone:</b> +92 309 8574093
                  </li>
                  <li>
                    <b>Email:</b> marketing@ayasirg.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

