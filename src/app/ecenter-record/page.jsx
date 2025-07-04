"use client";
import React, { useState } from "react";
import "./all_ecenter.css";
import { IoFilter } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import IndividualCard from "../components/e-center-cards/IndividualCard";

export default function page() {
  const [dispaly, setDisplay] = useState(true);
  const handleAcitive = () => {
    setDisplay(!dispaly);
  };

  return (
    <section className="all_center_page margin_navbar">
      <div className="container py-3">
        <div className="row relative_div">
          <div className="col-lg-4 ">
            <div className="filters_div">
              <h2>Filters</h2>
            </div>
            {/* <div className={dispaly ? "small_div active" : "hide_small"}> */}
            <div className={dispaly ? "small_div active" : "hide_small"}>
              <div className="box py-2 px-3">
                <h3>Date</h3>
                <div className="form_div">
                  <input type="checkbox" id="filter_today" name="date" />
                  <label htmlFor="filter_today">Today</label>
                </div>
                <div className="form_div">
                  <input type="checkbox" id="filter_month" name="date" />
                  <label htmlFor="filter_month">This Month</label>
                </div>
                <div className="form_div">
                  <input type="checkbox" id="filter_year" name="date" />
                  <label htmlFor="filter_year">This Year</label>
                </div>
                <p className="my-2 fw-bold">Custom Date Range</p>

                <div className="form_div date_div">
                  <label htmlFor="start_date">From:</label>
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    className="start_date"
                  />
                </div>
                <div className="form_div date_div mt-2">
                  <label htmlFor="end_date">To:</label>
                  <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    className="end_date"
                  />
                </div>
              </div>

              <div className="box py-2 px-3">
                <h3>Companies</h3>
                <div className="form_div">
                  <input type="checkbox" id="filter_company" name="type" />
                  <label htmlFor="filter_company">Companies</label>
                </div>
                <div className="form_div">
                  <input type="checkbox" id="filter_individual" name="type" />
                  <label htmlFor="filter_individual">Individual</label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="all_ecenter_flex">
              <IndividualCard />
            </div>
            <IoMdMenu className="menu_icon" onClick={handleAcitive} />
          </div>
        </div>
        <div className="pagination_div">
          <p> Prev</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>Next</p>
        </div>
      </div>
    </section>
  );
}
