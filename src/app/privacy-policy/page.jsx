

import React from "react";
import "./privacy_policy.css";

export default function PrivacyPolicyPage() {
  return (
    <section className="privacy_policy margin_navbar">
      <div className="container py-3">
        {/* Page Header */}
        <div className="text-center mb-2">
          <h2 className="fw-bold">Aya Sir G! <span>Privacy Policy</span></h2>
          <p className="">
            Effective Date: <b>March 1, 2025</b>
          </p>
        </div>

        {/* Intro Section */}
        <div className="shadow-sm  p-lg-4 p-3 rounded-3 mb-4">
          <p>
            At <b>Aya Sir G!</b> your privacy is our priority. This Privacy Policy explains how we collect, use, and protect your personal data, along with your rights. This privacy statement applies to the information
            collected through our website and mobile application. Amendments to this
            policy will be updated at this URL and become effective upon posting. By
            continuing to use our services after updates, you confirm your acceptance
            of the amended terms.
          </p>
          <p>
            Please read this privacy policy carefully to understand how we handle
            your personal data, your privacy rights, and the legal protections
            available to you.
          </p>
        </div>

        {/* Grid Sections */}
        <div className="row g-lg-4 g-3">
          {/* Scope & Updates */}
          <div className="col-md-6">
            <div className="shadow-sm p-lg-4 p-3 rounded-3 h-100">
              <h4 className="fw-semibold ps-3 mb-2 border_color">Scope and Updates</h4>
              <p>
                This Privacy Policy applies to your use of the <b>Aya Sir G!</b> website, mobile application, and related services, regardless of the device or platform you use.
              </p>
            </div>
          </div>

          {/* Data Controller */}
          <div className="col-md-6">
            <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
              <h4 className="fw-semibold ps-3 mb-2 border_color">Data Controller</h4>
              <p>
                Your personal data is collected and processed by <b>Aya Sir G!</b> (Pvt) Limited, located at 15-C, Commercial, NFC #1, Lahore, Pakistan.
              </p>
            </div>
          </div>

          {/* Information Collection */}
          <div className="col-md-12">
            <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
              <h4 className="fw-semibold  ps-3 mb-2 border_color">
                Information We Collect and Process
              </h4>
              <p>
                We collect personal information such as: Account ID, full name, gender, age, phone number, email address (optional), residential address, and service-related details (through registrations, surveys, or E-centers).
              </p>
            </div>
          </div>

          {/* Purpose */}
          <div className="col-md-12">
            <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
              <h4 className="fw-semibold ps-3 mb-2 border_color">Purpose of Data Collection</h4>
              <p className="ps-3 mb-2">
                We use your data for the following purposes:
              </p>
              <ul className="ps-3">
                <li><strong>User verification and security</strong> – to confirm user identity and protect accounts.</li>
                <li><strong>Service updates and communication</strong> – to inform you about new services, products, and features.</li>
                <li><strong>Customer support</strong> – to respond to your queries, feedback, and complaints.</li>
                <li><strong>Surveys and marketing</strong> – to send optional surveys, promotional offers, or marketing materials.</li>
                <li><strong>Platform performance analysis</strong> – to monitor usage, fix issues, and improve the overall user experience.</li>
                <li><strong>Fraud and safety protection</strong> – to detect and prevent suspicious or illegal activity.</li>
                <li><strong>Customized experience</strong> – to deliver personalized content, ads, and recommendations.</li>
                <li><strong>Interactive features</strong> – to enable user engagement tools such as reviews, comments, or forums.</li>
                <li><strong>Legal and compliance purposes</strong> – to investigate security issues or fulfill regulatory requirements.</li>
                <li><strong>Aggregated insights</strong> – to share statistics and trends without revealing personal identity.</li>
              </ul>

            </div>
          </div>

          {/* Info Sharing */}
          <div className="col-md-6">
            <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
              <h4 className="fw-semibold ps-3 mb-2 border_color">Information Sharing</h4>
              <p>We may share your personal data with:</p>
              <ul>
                <li>Government or law enforcement agencies when required by law.</li>
                <li>Verified service providers assisting our operations.</li>
                <li>Third parties with your explicit consent. Some data may be processed outside Pakistan in compliance with legal safeguards.</li>
              </ul>
            </div>
          </div>

          {/* Cookies */}
          <div className="col-md-6">
            <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
              <h4 className="fw-semibold ps-3 mb-2 border_color">Cookies Usage</h4>
              <p>
                We use cookies to improve navigation, save your preferences, and enhance your browsing experience. Cookies may also help deliver personalized ads. Please note that third-party cookies (e.g., from advertisers) are beyond our control.
              </p>
            </div>
          </div>

          {/* Rights */}
          <div className="col-md-12">
            <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
              <h4 className="fw-semibold ps-3 mb-2 border_color">Your Rights</h4>
              <p>As a user, you have the right to:</p>
              <ul>
                <li>Access and review your personal data.</li>
                <li>Request corrections, updates, or deletions.</li>
                <li>Withdraw consent at any time.</li>
                <li>Request erasure of your data, subject to legal requirements.</li>
              </ul>
            </div>
          </div>

          {/* Security */}
          <div className="col-md-6">
            <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
              <h4 className="fw-semibold ps-3 mb-2 border_color">Security Measures</h4>
              <p>
                We implement industry-standard encryption and security protocols to protect your data. However, no method of transmission or storage is 100% secure. Aya Sir G! is not liable for force majeure events such as cyberattacks or natural disasters.
              </p>
            </div>
          </div>

          {/* Third-Party Links */}
          <div className="col-md-6">
            <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
              <h4 className="fw-semibold ps-3 mb-2 border_color">Third-Party Links</h4>
              <p>
                Our Services may include links to third-party websites or applications. Aya Sir G! is not responsible for their privacy practices. We recommend reviewing their policies before sharing any personal data.
              </p>
            </div>
          </div>

          {/* Public Forums */}
          <div className="col-md-6">
            <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
              <h4 className="fw-semibold ps-3 mb-2 border_color">Public Forums</h4>
              <p>
                Content shared in public forums, comments, or community boards on Aya Sir G! is visible to all users. Please exercise caution when posting personal information.
              </p>
            </div>
          </div>

          {/* Amendments */}
          <div className="col-md-6">
            <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
              <h4 className="fw-semibold ps-3 mb-2 border_color">Policy Amendments</h4>
              <p>
                <b>Aya Sir G!</b> reserves the right to revise this Privacy Policy at any time to reflect legal, regulatory, or operational changes. Updates will be posted on this page, and continued use of our Services constitutes acceptance of the revised terms.
              </p>
            </div>
          </div>

          {/* Contact Us */}
          <div className="col-md-12">
            <div className="shadow-sm  p-lg-4 p-3 rounded-3 h-100">
              <h4 className="fw-semibold ps-3 mb-2 border_color">Contact Us</h4>
              <p>
                If you have any questions, requests, or concerns regarding this Privacy Policy, please reach out through the Contact Us page on our website. We will respond promptly after verifying your identity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

