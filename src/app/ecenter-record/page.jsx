"use client";
import React, { useState, useEffect, useContext } from "react";
import "./all_ecenter.css";
import IndividualCard from "../components/e-center-cards/IndividualCard";
import { UserContext } from "../userContext";
import { useSearchParams, useRouter } from "next/navigation";

export default function Page() {
  const { userInfo } = useContext(UserContext);
  const router = useRouter();
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    user_type: "individual", // default selected
    date_filter: "",
    date_from: "",
    date_to: "",
  });

  const [data, setData] = useState([]);
  // console.log(data, "data ,,,,,")

  const handleActive = () => {
    setDisplay(!display);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
    }));
    setDisplay(false);
  };

  const handleDateChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

      const mappedUserType =
        filters.user_type === "individual"
          ? "handyman"
          : filters.user_type === "company"
          ? "provider"
          : "";

      const params = new URLSearchParams();
      if (mappedUserType) params.set("user_type", mappedUserType);
      if (filters.date_filter) params.set("date_filter", filters.date_filter);
      if (filters.date_from && filters.date_to) {
        params.set("date_from", filters.date_from);
        params.set("date_to", filters.date_to);
      }

      const newUrl = `/ecenter-record?${params.toString()}`;
      router.push(newUrl);

      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/e-center/users?${params.toString()}`;

      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.api_token}`,
          },
        });
        const json = await res.json();
        setData(json.data || []);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  return (
    <section className="all_center_page margin_navbar">
      <div className="container py-lg-5 py-4">
        <div className="row relative_div">
          <div className="col-lg-4 p-0 bg_filter mb-2">
            <div className="filters_div" onClick={handleActive}>
              <h2>Filters</h2>
            </div>

            <div className={`small_div ${display ? "active" : "hide_small"}`}>
              <button className="close_sidebar_btn" onClick={handleActive}>
                ✕
              </button>

              <div className="box py-2 px-3">
                <h3>Date</h3>
                {["today", "this_month", "this_year"].map((filter) => (
                  <div className="form_div" key={filter}>
                    <input
                      type="checkbox"
                      id={`filter_${filter}`}
                      checked={filters.date_filter === filter}
                      onChange={() => handleFilterChange("date_filter", filter)}
                    />
                    <label htmlFor={`filter_${filter}`}>
                      {filter.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </label>
                  </div>
                ))}

                <p className="mt-4 fw-bold">Custom Date Range</p>
                <div className="form_div date_div">
                  <label htmlFor="start_date">From:</label>
                  <input
                    type="date"
                    id="start_date"
                    className="start_date styled_date_input"
                    value={filters.date_from}
                    onChange={(e) => handleDateChange("date_from", e.target.value)}
                  />
                </div>
                <div className="form_div date_div my-3">
                  <label htmlFor="end_date">To:</label>
                  <input
                    type="date"
                    id="end_date"
                    className="end_date styled_date_input"
                    value={filters.date_to}
                    onChange={(e) => handleDateChange("date_to", e.target.value)}
                  />
                </div>
              </div>

              <div className="box py-2 px-3">
                <h3 className="mt-4">User Type</h3>
                {["individual", "company"].map((type) => (
                  <div className="form_div" key={type}>
                    <input
                      type="checkbox"
                      id={`filter_${type}`}
                      checked={filters.user_type === type}
                      onChange={() => handleFilterChange("user_type", type)}
                    />
                    <label htmlFor={`filter_${type}`}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="all_ecenter_flex">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div className="skeleton_card" key={i}>
                    <div className="skeleton_img"></div>
                    <div className="skeleton_line short"></div>
                    <div className="skeleton_line"></div>
                  </div>
                ))
              ) : data.length > 0 ? (
                data.map((item, index) => <IndividualCard key={index} data={item} />)
              ) : (
                <h4 className="p-5">No data found.</h4>
              )}
            </div>
          </div>
        </div>

        {/* <div className="pagination_div">
          <p>Prev</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>Next</p>
        </div> */}
      </div>
    </section>
  );
}
