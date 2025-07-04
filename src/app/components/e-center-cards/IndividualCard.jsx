import React from "react";
import "./individual.css";

export default function individualcard() {
  return (
    <div className="wishlistcard py-3 mb-3">
      <div className="info_div">
        <img src="/assets/raza.png" alt="" />
        <h2>Muhammad Raza</h2>
        <p>Male, 30 years old</p>
      </div>
      <div className="details_div">
        <div className="single_div">
          <p className="field">Field</p>
        </div>
        <div className="single_div">
          <p className="field">Interested Location:</p>
        </div>
        <div className="single_div">
          <p className="field">Current Address:</p>
        </div>
        <div className="single_div">
          <p className="field">Ratings</p>
        </div>
      </div>
    </div>
  );
}
