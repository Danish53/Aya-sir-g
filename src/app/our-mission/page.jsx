// import React from "react";
// import "./our_mission.css";

// export default function page() {
//   return (
//     <section className="our_mission margin_navbar">
//       <div className="container py-3">
//         <h3>Our Mission</h3>
//         <h4>Welcome to Aya Sir G!</h4>
//         <p>
//           At <b>Aya Sir G!</b> we are committed to creating opportunities for
//           individuals who are eager to work, believe in their abilities, and
//           embrace self-reliance. Inspired by the timeless principle, "Allah
//           helps those who help themselves," we empower people to take initiative
//           and strive for a better future.
//         </p>
//         <p>
//           Having deep roots in Pakistan, we recognize the untapped potential of
//           our youth and workforce, who are talented and hardworking but often
//           lack access to the right platforms for growth. We noticed a gap in the
//           market where users, households, families, and commercial industries
//           struggle to find reliable maids, drivers, guards, and helpers for
//           their domestic and commercial needs. Meanwhile, many blue-collar
//           workers face challenges such as limited education and the inability to
//           showcase their skills effectively, further compounded by a growing
//           trust deficit in today’s hiring practices.
//         </p>
//         <p>
//           To bridge this gap, we launched <b>Aya Sir G!</b>—a comprehensive platform
//           connecting users with trustworthy workers without charging
//           unreasonable fees. With just one call, you can access the services you
//           need, bringing convenience and reliability to your doorstep.
//         </p>
//         <p>
//           Our mission goes beyond mere connectivity; we aim to uplift Pakistan’s
//           blue-collar workforce by providing them with a digital platform to
//           showcase their skills, gain recognition, and secure better
//           opportunities. In essence, Aya Sir G! is like “LinkedIn” for the
//           blue-collar community. We envision a future where workers no longer
//           need to wait at street corners or main chowks for opportunities.
//           Instead, we bring opportunities directly to them, ensuring their
//           “rizq” <span>(sustenance)</span> reaches them with dignity.
//         </p>
//         <p>
//           We consider this platform a form of Sadaqah Jariyah <span>(continuous
//           charity)</span>. If you know anyone in your circle who could benefit from
//           Aya Sir G! but hasn’t connected with us yet, please share their
//           contact details via the WhatsApp number below. Together, we can make a
//           meaningful impact on the lives of countless individuals.
//         </p>
//         <ul>
//           <li>0329-2927474</li>
//           <li>ecenter@ayasirg.com</li>
//         </ul>
//       </div>
//     </section>
//   );
// }



import React from "react";
import "./our_mission.css";

export default function page() {
  return (
    <section className="our_mission margin_navbar">
      <div className="container py-3">
        {/* Heading Section */}
        <div className="text-center mb-3">
          <h2 className="fw-bold mb-2">Our <span>Mission</span></h2>
          <h4 className="fw-semibold">Welcome to Aya Sir G!</h4>
        </div>

        {/* Grid Content */}
        <div className="row g-lg-4 g-3">
          <div className="col-md-6">
            <div className="shadow-sm p-lg-4 p-3 rounded-3 h-100">
              <p>
                At <b>Aya Sir G!</b> we are committed to creating opportunities
                for individuals who are eager to work, believe in their abilities,
                and embrace self-reliance. Inspired by the timeless principle,
                <span className="fw-semibold"> "Allah helps those who help themselves,"</span> 
                we empower people to take initiative and strive for a better future.
              </p>
              <p>
                Having deep roots in Pakistan, we recognize the untapped potential
                of our youth and workforce, who are talented and hardworking but
                often lack access to the right platforms for growth.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="shadow-sm p-lg-4 p-3 rounded-3 h-100">
              <p>
                We noticed a gap in the market where users, households, families,
                and industries struggle to find reliable maids, drivers, guards,
                and helpers for domestic and commercial needs. Meanwhile, many
                blue-collar workers face challenges such as limited education and
                the inability to showcase their skills effectively, further
                compounded by a growing trust deficit in today’s hiring practices.
              </p>
              <p>
                To bridge this gap, we launched <b>Aya Sir G!</b>—a comprehensive
                platform connecting users with trustworthy workers without charging
                unreasonable fees. With just one call, you can access the services
                you need, bringing convenience and reliability to your doorstep.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="shadow-sm p-lg-4 p-3 rounded-3 h-100">
              <p>
                Our mission goes beyond mere connectivity; we aim to uplift
                Pakistan’s blue-collar workforce by providing them with a digital
                platform to showcase their skills, gain recognition, and secure
                better opportunities.
              </p>
              <p>
                In essence, <b>Aya Sir G!</b> is like <span className="fw-semibold">“LinkedIn”</span> 
                for the blue-collar community. We envision a future where workers
                no longer need to wait at street corners or main chowks for
                opportunities. Instead, we bring opportunities directly to them,
                ensuring their <i>rizq</i> <span>(sustenance)</span> reaches them with dignity.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="shadow-sm p-lg-4 p-3 rounded-3 h-100">
              <p>
                We consider this platform a form of 
                <span className="fw-semibold"> Sadaqah Jariyah </span>
                <span>(continuous charity)</span>. 
                If you know anyone in your circle who could benefit from Aya Sir G!
                but hasn’t connected with us yet, please share their contact details
                via the WhatsApp number below. Together, we can make a meaningful
                impact on countless lives.
              </p>
              <ul className="list-unstyled mt-3">
                <li className="fw-semibold">0329-2927474</li>
                <li className="fw-semibold">ecenter@ayasirg.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
