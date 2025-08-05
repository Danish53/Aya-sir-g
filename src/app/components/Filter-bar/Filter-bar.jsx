
"use client";
import React, { useContext, useState, useEffect } from "react";
import "./filter_bar.css";
import { IoFilter } from "react-icons/io5";
import { UserContext } from "@/app/userContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filter_bar() {
  const { apiCategory2, cities, locations, getLocations, } = useContext(UserContext);
  console.log(locations, "location area")
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    gender: searchParams.get("gender") || "",
    age: searchParams.get("age") || "",
    city: searchParams.get("city") || "",
    category_id: searchParams.get("category_id") || "",
    area_code: searchParams.get("area_code") || "",
    verification_status: searchParams.get("verification_status") || "",
  });

  useEffect(() => {
    if (filters.city) {
      getLocations(filters.city);
    }
  }, [filters.city]);

  const [showAll, setShowAll] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const visibleCities = showAll ? cities : cities.slice(0, 6);

  const [showAllArea, setShowAllArea] = useState(false);

  const visibleArea = showAllArea ? locations : locations.slice(0, 6);

  const [showAllCat, setShowAllCat] = useState(false);

  // Toggle between showing first 5 and all categories
  const displayedCategories = showAllCat ? apiCategory2 : apiCategory2.slice(0, 6);

  const updateURL = (newFilters) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
  };

  const closeSidebar = () => {
    setMobileOpen(false);
  };


  const handleSingleSelect = (type, value) => {
    setFilters((prev) => {
      const updated = { ...prev, [type]: prev[type] === value ? "" : value };
      updateURL(updated);
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
      return updated;
    });
  };

  return (
    <section className="filter_bar">
      {/* Mobile filter icon */}
      <p
        id="filter_heading"
        className="p-2 filter_small"
        onClick={() => setMobileOpen(true)}
      >
        <IoFilter />
        Filters
      </p>

      {/* Desktop filter heading */}
      <p id="filter_heading" className="p-2 filter_greater">
        Filters
      </p>

      {/* Filters box parent - controlled by mobileOpen */}
      <div
        className={`boxes_parent_div ${mobileOpen ? "active" : ""}`}
      >
        {/* Close button for mobile */}
        <div className="d-flex justify-content-end">
          <button
            className="see-more-btn close_btn"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Gender Filter */}
        <div className="box py-2 px-3">
          <h3>Gender</h3>
          {["male", "female", "Both"].map((g) => (
            <div className="form_div" key={g}>
              <input
                type="checkbox"
                id={`gender_${g}`}
                checked={filters.gender === g}
                onChange={() => handleSingleSelect("gender", g)}
              />
              <label htmlFor={`gender_${g}`}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            </div>
          ))}
        </div>

        {/* Age Filter */}
        <div className="box py-2 px-3">
          <h3>Age</h3>
          {["18-35", "35-50", "50+"].map((ageRange) => (
            <div className="form_div" key={ageRange}>
              <input
                type="checkbox"
                id={`age_${ageRange}`}
                checked={filters.age === ageRange}
                onChange={() => handleSingleSelect("age", ageRange)}
              />
              <label htmlFor={`age_${ageRange}`}>{ageRange} Years</label>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="box py-2 px-3">
          <h3>Categories</h3>
          {displayedCategories?.map((cat) => (
            <div className="form_div" key={cat.id}>
              <input
                type="checkbox"
                id={`category_${cat.id}`}
                checked={filters.category_id === String(cat.id)}
                onChange={() => handleSingleSelect("category_id", String(cat.id))}
              />
              <label htmlFor={`category_${cat.id}`}>{cat.name}</label>
            </div>
          ))}

          {apiCategory2.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAllCat((prev) => !prev)}
              className="see-more-btn"
            >
              {showAllCat ? "See Less" : "See More"}
            </button>
          )}
        </div>

        {/* City Filter */}
        <div className="box py-2 px-3 city">
          <h3>City</h3>
          {visibleCities.map((city) => (
            <div className="form_div" key={city.id}>
              <input
                type="checkbox"
                id={`city_${city.id}`}
                checked={filters.city == city.id}
                onChange={() => handleSingleSelect("city", city.id)}
              />
              <label htmlFor={`city_${city.id}`}>{city.name}</label>
            </div>
          ))}

          {cities.length > 6 && (
            <button
              className="see-more-btn"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "See Less" : "See More"}
            </button>
          )}
        </div>

        {/* Area Filter */}
        {visibleArea?.length > 0 ? <div className="box py-2 px-3 city">
          <h3>Area</h3>
          {visibleArea.map((area) => (
            <div className="form_div" key={area.id}>
              <input
                type="checkbox"
                id={`area_code_${area.id}`}
                checked={filters.area_code == area.id}
                onChange={() => handleSingleSelect("area_code", area.id)}
              />
              <label htmlFor={`area_code_${area.id}`}>{area.name}</label>
            </div>
          ))}

          {locations.length > 6 && (
            <button
              className="see-more-btn"
              onClick={() => setShowAllArea((prev) => !prev)}
            >
              {showAllArea ? "See Less" : "See More"}
            </button>
          )}
        </div> : ("")}

        {/* verofication filter */}
        <div className="box py-2 px-3">
          <h3>Verification Status</h3>
          {["Verified", "Non-Verified"].map((g) => (
            <div className="form_div" key={g}>
              <input
                type="checkbox"
                id={`verification_status_${g}`}
                checked={filters.verification_status === g}
                onChange={() => handleSingleSelect("verification_status", g)}
              />
              <label htmlFor={`verification_status_${g}`}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
