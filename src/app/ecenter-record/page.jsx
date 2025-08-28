"use client";
import React, { useState, useEffect, useContext } from "react";
import "./all_ecenter.css";
import IndividualCard from "../components/e-center-cards/IndividualCard";
import { UserContext } from "../userContext";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Page() {
  const { userInfo } = useContext(UserContext);
  const router = useRouter();
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    user_type: "individual",
    date_filter: "",
    date_from: "",
    date_to: "",
  });

  const [data, setData] = useState([]);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;

  // ✅ Temporary state for custom dates before pressing search
  const [tempDates, setTempDates] = useState({
    date_from: "",
    date_to: "",
  });

  const handleActive = () => {
    setDisplay(!display);
  };

  // ✅ Predefined date filter change
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? "" : value,
      date_from: "",
      date_to: "",
    }));
    setTempDates({ date_from: "", date_to: "" });
    setDisplay(false);
    setCurrentPage(1); // reset pagination
  };

  // ✅ Custom date change
  const handleTempDateChange = (key, value) => {
    setTempDates((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ✅ Search button click
  const applyDateRange = () => {
    if (tempDates.date_from && tempDates.date_to) {
      setFilters((prev) => ({
        ...prev,
        date_filter: "",
        date_from: tempDates.date_from,
        date_to: tempDates.date_to,
      }));
      setCurrentPage(1); // reset pagination
    } else {
      alert("Please select both From and To dates.");
    }
  };

  // ✅ Fetch data whenever filters change
  const fetchData = async () => {
    setLoading(true);

    let token = "";
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("token"); // make sure key is correct
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser.api_token || "";
        } catch (e) {
          console.error("Error parsing user from localStorage", e);
        }
      }
    }

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
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const json = await res.json();
      // console.log(json, "ecenter");
      setData(json.data || []);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [filters]);

  // ✅ Pagination calculations
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(data.length / cardsPerPage);

  return (
    <section className="all_center_page margin_navbar">
      <div className="container py-lg-3 py-3">
        <div className="row relative_div">
          {/* Sidebar */}
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
                      className="me-2 mt-1"
                      id={`filter_${filter}`}
                      checked={filters.date_filter === filter}
                      onChange={() =>
                        handleFilterChange("date_filter", filter)
                      }
                    />
                    <label htmlFor={`filter_${filter}`}>
                      {filter
                        .replace("_", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </label>
                  </div>
                ))}

                <p className="mt-4 fw-bold">Custom Date Range</p>
                <div className="d-lg-flex">
                  <div className="form_div date_div flex-column">
                    <label htmlFor="start_date">From:</label>
                    <input
                      type="date"
                      id="start_date"
                      className="start_date styled_date_input"
                      value={tempDates.date_from}
                      onChange={(e) =>
                        handleTempDateChange("date_from", e.target.value)
                      }
                    />
                  </div>
                  <div className="form_div date_div flex-column">
                    <label htmlFor="end_date">To:</label>
                    <input
                      type="date"
                      id="end_date"
                      className="end_date styled_date_input"
                      value={tempDates.date_to}
                      onChange={(e) =>
                        handleTempDateChange("date_to", e.target.value)
                      }
                    />
                  </div>
                  <div className="d-flex align-items-end justify-content-center justify-content-lg-start mb-2 w-100">
                    <button
                      className="btn btn_primary text-white ms-2 d-flex align-items-center"
                      style={{ height: "32px" }}
                      onClick={applyDateRange}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="box py-2 px-3 pb-4">
                <h3 className="mt-4">User Type</h3>
                {["individual", "company"].map((type) => (
                  <div className="form_div" key={type}>
                    <input
                      type="checkbox"
                      className="me-2 mt-1"
                      id={`filter_${type}`}
                      checked={filters.user_type === type}
                      onChange={() =>
                        setFilters((prev) => ({
                          ...prev,
                          user_type: prev.user_type === type ? "" : type,
                        }))
                      }
                    />
                    <label htmlFor={`filter_${type}`}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-8">
            <div className="all_ecenter_flex row">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div className="col-lg-6 mb-3">
                    <div className="skeleton_card" key={i}>
                    <div className="skeleton_img"></div>
                    <div className="skeleton_line short"></div>
                    <div className="skeleton_line"></div>
                  </div>
                  </div>
                ))
              ) : currentCards.length > 0 ? (
                currentCards.map((item, index) => (
                  <IndividualCard key={index} data={item} fetchData={fetchData} />
                ))
              ) : (
                <h4 className="p-5">No data found.</h4>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination_div mt-4 d-flex justify-content-center">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="btn btn-sm btn_primary text-white me-2"
                >
                  <FaArrowLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`btn btn-sm me-2 ${currentPage === i + 1
                        ? "btn_primary text-white"
                        : "btn-outline-secondary"
                      }`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="btn btn-sm btn_primary text-white"
                >
                  <FaArrowRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
