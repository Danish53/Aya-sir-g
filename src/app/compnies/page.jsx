"use client";
import React from "react";
import "./individuals.css";
import Filterbar from "../components/Filter-bar/Filter-bar";
import Card from "../components/Personal-card/Card";
import ButtonComp from "../components/Button-component/ButtonComp";

export default function page() {
  return (
    <section className="individuals margin_navbar ">
      <div className="container content pt-5 pb-5">
        <div className="row">
          <div className="col-lg-4 col_filter">
            <Filterbar />
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 ">
            <ButtonComp />
          </div>
        </div>
      </div>
    </section>
  );
}
