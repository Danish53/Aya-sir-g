"use client";
import React, { Suspense } from "react";
import "./individuals.css";
import Filterbar from "../components/Filter-bar/Filter-bar";
import Card from "../components/Personal-card/Card";
import ButtonComp from "../components/Button-component/ButtonComp";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function page() {
  return (
    <section className="individuals margin_navbar ">
      <div className="container content pt-5 pb-5">
        <div className="row">
          <div className="col-lg-4 col_filter">
            <Filterbar />
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12 ">
            <Suspense
              fallback={
                <div className="d-flex flex-wrap gap-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="card_div py-3 px-4 skeleton_card">
                      <Skeleton circle height={100} width={100} />
                      <Skeleton height={20} width={`60%`} className="mt-3" />
                      <Skeleton height={15} width={`40%`} className="mt-2" />
                      <Skeleton height={15} width={`80%`} className="mt-2" />
                      <Skeleton height={15} width={`50%`} className="mt-2" />
                      <Skeleton height={15} width={`70%`} className="mt-2" />
                      <Skeleton height={30} width={`100%`} className="mt-3" />
                    </div>
                  ))}
                </div>
              }
            >
              <ButtonComp />
            </Suspense>

          </div>
        </div>
      </div>
    </section>
  );
}
