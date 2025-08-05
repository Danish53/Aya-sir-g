"use client";
import React from "react";
import "./faq.css";
import Accordion from "react-bootstrap/Accordion";

export default function Page() {
  return (
    <section className="faq_sec margin_navbar">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="content my-5">
              <h2 className="heading_main">Frequently asked questions</h2>
              <p className="sub_heading">
                Everything you need to know about us.
              </p>
              <Accordion defaultActiveKey="0" className="mt-5">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Join Aya Sir G! Empowering Handyman Services in Lahore
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Are you a skilled individual, a growing company, or an
                      aspiring E-center looking to thrive in the handyman
                      service industry? Aya Sir G! is your dedicated platform for
                      growth, visibility, and connecting with a wider client
                      base in Lahore.
                    </p>
                    <p>
                      Explore the categories below to discover how we can help
                      you expand your reach and elevate your service-based
                      business. Our team is ready to assist you every step of
                      the way.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    How You Can Partner with Aya Sir G!
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      <strong>For E-centers:</strong> Become a Community Hub
                    </p>
                    <p>
                      Earn daily by becoming an Aya Sir G! E-center. You'll play
                      a vital role in connecting your local community to
                      reliable handyman services by helping individuals and
                      companies register and utilize our platform. We will
                      compensate E-centers for each individual they successfully
                      register, especially supporting blue-collar workers who
                      may require assistance in creating their profiles on our
                      website. It's a rewarding way to contribute to local
                      economic growth while building your own income stream.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    For Individuals: Showcase Your Expertise
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Are you a talented handyman eager to find consistent work
                      and highlight your unique skills? Register with Aya Sir G!
                      to connect directly with clients seeking your specific
                      talents. Build a strong professional reputation through
                      verified jobs and client feedback, ensuring your skills
                      are recognized and rewarded.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    For Companies: Expand Your Reach
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Register your company on Aya Sir G! and get access to a
                      broader client base in Lahore. Our platform helps you
                      attract new business, track performance, and build
                      credibility through verified reviews.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>
                    For Companies: Scale Your Service Business
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      If you're a handyman service company, Aya Sir G! is your
                      strategic partner for sustainable growth. Our robust
                      rating and comment system helps you build invaluable
                      client trust, enhance your brand's reputation, and attract
                      more clients through authentic, positive feedback.
                      Leverage our platform to reduce reliance on expensive
                      commercial spaces like shops and warehouses; a strong
                      profile here will be your primary source for new orders.
                      Join us to expand your market presence and streamline your
                      service delivery, embracing technology as the key to
                      future growth.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>Ready to Get Started?</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      For personalized assistance or to begin your registration,
                      please don't hesitate to reach out.
                    </p>
                    <li>Email Us: help@ayasirg.com</li>
                    <li>For E-center Registration: E_center@ayasirg.com</li>
                    <li>Call Us Directly: +923098574093</li>
                    <li>
                      Send a Message or Voice Note: (Mention if you have a
                      specific platform for this, e.g., WhatsApp, or if it's via
                      a website contact form)
                    </li>
                    <p>
                      Our team in 15-C NFC Ph#1, Lahore, is committed to
                      reaching out to you at the earliest convenience.
                    </p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
