"use client";
import React from "react";
import "./faq.css";
import Accordion from "react-bootstrap/Accordion";
import { RxCross2 } from "react-icons/rx";

export default function page() {
  return (
    <section className="faq_sec margin_navbar ">
      <div className="container ">
        <div className="row ">
          <div className="col-md-8">
            <div className="content my-5">
              <h2 className="heading_main">Frequently asked questions</h2>
              <p className="sub_heading">
                Everything you need to know about us.
              </p>
              <Accordion defaultActiveKey="0" className="mt-5">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Are the workers verified?</Accordion.Header>
                  <Accordion.Body>
                    Yes, we verify service providers to ensure quality
                    and reliability.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    What is this platform about?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes, we verify service providers to ensure quality
                    and reliability.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    What is this platform about?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes, we verify service providers to ensure quality
                    and reliability.
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
