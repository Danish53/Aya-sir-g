import React from "react";
import "./contact-us.css";
import Button from "react-bootstrap/Button";

export default function page() {
  return (
    <>
      <section className="auth_bg contact-us margin_navbar">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 left_div p-3">
              <h1 className="login_heading ">Helpdesk Information</h1>
              <form>
                <div>
                  <label htmlFor="email" className="label_auth">
                    Phone
                  </label>
                  <br />
                  <input
                    type="text"
                    className="input_auth"
                    placeholder="+92 3*********"
                    id="email"
                    name="email"
                  />
                  <br />
                </div>
                <div>
                  <label htmlFor="" className="label_auth">
                    Email
                  </label>
                  <br />

                  <input
                    type="text"
                    className="input_auth"
                    placeholder="dummytext@gmail.com  "
                  />
                  <br />
                  <h1 className="login_heading mt-3">Helpdesk Information</h1>
                  <h2 className="small_heading">E-Center Registration</h2>
                  <input
                    type="text"
                    className="input_auth"
                    placeholder="ecenter_registration@ayasirg.com  "
                  />
                </div>
                <button className="sign_in">Continue</button>

                {/* <div className="create_new_account">
                  <hr />
                  <p className="text-center mt-2">Sign Up for a New Account</p>
                  <hr />
                </div> */}
                <div className="logo_div mt-3">
                  <img src="/assets/Frame.png" alt="" className="logo" />
                  {/* <p id="head">AYA SIR G!</p>
                  <p id="descri">YOUR TRUSTED EVERYWHERE</p> */}
                </div>
              </form>
            </div>
            <div className="col-lg-6 right_div welcom_div">
              <h1 className="welcom_heading">Contact Us</h1>
              <div className="btn_div">
                <p id="account">We're Here to Help!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
