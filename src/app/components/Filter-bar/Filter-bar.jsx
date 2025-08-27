
"use client";
import React, { useContext, useState, useEffect } from "react";
import "./filter_bar.css";
import { IoFilter } from "react-icons/io5";
import { UserContext } from "@/app/userContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filter_bar({ dataSearch }) {
  const { role, gender, age_range, city, category_id, area_code, verified_status, rating } = dataSearch;
  const { apiCategory2, cities, locations, getLocations, getFilteredUsers } = useContext(UserContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    role,
    gender,
    age_range,
    city,
    category_id,
    area_code,
    verified_status,
    rating
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

  useEffect(() => {
    setFilters({
      role,
      gender: "",
      age_range: "",
      city: "",
      category_id: "",
      area_code: "",
      verified_status: "",
      rating: ""
    });
  }, [role]);

  useEffect(() => {
    const role = searchParams.get("role") || "handyman";
    const gender = searchParams.get("gender");
    const age_range = searchParams.get("age_range");
    const city = searchParams.get("city");
    const category_id = searchParams.get("category_id");
    const area_code = searchParams.get("area_code");
    const verified_status = searchParams.get("verified_status");
    const rating = searchParams.get("rating");

    getFilteredUsers({ role, gender, age_range, city, category_id, area_code, verified_status, rating });
  }, [searchParams]);

  useEffect(() => {
    const category_id = searchParams.get("category_id");
    const city = searchParams.get("city");
    const area_code = searchParams.get("area_code");

    if (category_id || city || area_code) {
      setFilters((prev) => ({
        ...prev,
        category_id: category_id || prev.category_id,
        city: city || prev.city,
        area_code: area_code || prev.area_code,
      }));
    }
  }, [searchParams]);




  return (
    <section className="filter_bar">
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

        {role === "provider" ? (
          <div className="box py-2 px-3">
            <h3>Ratings</h3>
            {["1", "2", "3", "4", "5"].map((r) => (
              <div className="form_div" key={r}>
                <input
                  type="checkbox"
                  id={`rating_${r}`}
                  checked={filters.rating === r}
                  onChange={() => handleSingleSelect("rating", r)}
                />
                <label htmlFor={`rating_${r}`}>{r} Stars & Up</label>
              </div>
            ))}
          </div>
        ) : (
          <>
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
                  <label htmlFor={`gender_${g}`}>{g.charAt(0).toUpperCase() + g.slice(1)}</label>
                </div>
              ))}
            </div>

            {/* Age Filter */}
            <div className="box py-2 px-3">
              <h3>Age</h3>
              {["18-35", "36-50", "50+", "all ages"].map((age) => (
                <div className="form_div" key={age}>
                  <input
                    type="checkbox"
                    id={`age_${age}`}
                    checked={filters.age_range === age}
                    onChange={() => handleSingleSelect("age_range", age)}
                  />
                  <label htmlFor={`age_${age}`}>
                    {age} {age !== "all ages" && "Years"}
                  </label>
                </div>
              ))}
            </div>
          </>
        )}

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
          {["Verified", "Non Verified"].map((g) => (
            <div className="form_div" key={g}>
              <input
                type="checkbox"
                id={`verified_status_${g}`}
                checked={filters.verified_status === g}
                onChange={() => handleSingleSelect("verified_status", g)}
              />
              <label htmlFor={`verified_status_${g}`}>
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
