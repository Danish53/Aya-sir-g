// "use client";
// import React, { useContext, useState, useEffect } from "react";
// import "./filter_bar.css";
// import { IoFilter } from "react-icons/io5";
// import { UserContext } from "@/app/userContext";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function Filter_bar() {
//   const { apiCategory2, cities } = useContext(UserContext);
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [filters, setFilters] = useState({
//     gender: searchParams.get("gender") || "",
//     age: searchParams.get("age") || "",
//     city: searchParams.get("city") || "",
//     category_id: searchParams.get("category_id") || "",
//   });

//   const [showAll, setShowAll] = useState(false);
//   const visibleCities = showAll ? cities : cities.slice(0, 10);

//   const updateURL = (newFilters) => {
//     const params = new URLSearchParams(searchParams.toString());

//     Object.entries(newFilters).forEach(([key, value]) => {
//       // if (value) params.set(key, value);
//       if (value) {
//         params.set(key, value);
//       } else {
//         params.delete(key); // remove if value is empty
//       }
//     });

//     router.push(`?${params.toString()}`);
//   };

//   const handleSingleSelect = (type, value) => {
//     setFilters((prev) => {
//       const updated = { ...prev, [type]: prev[type] === value ? "" : value };
//       updateURL(updated);
//       return updated;
//     });
//   };

//   return (
//     <section className="filter_bar">
//       <p id="filter_heading" className="p-2 filter_small">
//         <IoFilter />
//         Filters
//       </p>

//       <p id="filter_heading" className="p-2 filter_greater">Filters</p>
//       <div className="boxes_parent_div">
//         {/* Gender Filter */}
//         <div className="box py-2 px-3">
//           <h3>Gender</h3>
//           {["male", "female"].map((g) => (
//             <div className="form_div" key={g}>
//               <input
//                 type="checkbox"
//                 id={`gender_${g}`}
//                 checked={filters.gender === g}
//                 onChange={() => handleSingleSelect("gender", g)}
//               />
//               <label htmlFor={`gender_${g}`}>{g.charAt(0).toUpperCase() + g.slice(1)}</label>
//             </div>
//           ))}
//         </div>

//         {/* Age Filter */}
//         <div className="box py-2 px-3">
//           <h3>Age</h3>
//           {["20-35", "35-50", "50+"].map((ageRange) => (
//             <div className="form_div" key={ageRange}>
//               <input
//                 type="checkbox"
//                 id={`age_${ageRange}`}
//                 checked={filters.age === ageRange}
//                 onChange={() => handleSingleSelect("age", ageRange)}
//               />
//               <label htmlFor={`age_${ageRange}`}>{ageRange} Years</label>
//             </div>
//           ))}
//         </div>

//         {/* Category Filter */}
//         <div className="box py-2 px-3">
//           <h3>Categories</h3>
//           {apiCategory2?.map((cat) => (
//             <div className="form_div" key={cat.id}>
//               <input
//                 type="checkbox"
//                 id={`category_${cat.id}`}
//                 checked={filters.category_id === String(cat.id)}
//                 onChange={() => handleSingleSelect("category_id", String(cat.id))}
//               />
//               <label htmlFor={`category_${cat.id}`}>{cat.name}</label>
//             </div>
//           ))}
//         </div>

//         {/* City Filter */}
//         <div className="box py-2 px-3">
//           <h3>City</h3>
//           {visibleCities.map((city) => (
//             <div className="form_div" key={city.id}>
//               <input
//                 type="checkbox"
//                 id={`city_${city.name}`}
//                 checked={filters.city === city.name}
//                 onChange={() => handleSingleSelect("city", city.name)}
//               />
//               <label htmlFor={`city_${city.name}`}>{city.name}</label>
//             </div>
//           ))}

//           {cities.length > 10 && (
//             <button
//               className="see-more-btn"
//               onClick={() => setShowAll((prev) => !prev)}
//             >
//               {showAll ? "See Less" : "See More"}
//             </button>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";
import React, { useContext, useState, useEffect } from "react";
import "./filter_bar.css";
import { IoFilter } from "react-icons/io5";
import { UserContext } from "@/app/userContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function Filter_bar() {
  const { apiCategory2, cities } = useContext(UserContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    gender: searchParams.get("gender") || "",
    age: searchParams.get("age") || "",
    city: searchParams.get("city") || "",
    category_id: searchParams.get("category_id") || "",
  });

  const [showAll, setShowAll] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // <-- 📌 Add mobile sidebar toggle

  const visibleCities = showAll ? cities : cities.slice(0, 10);

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
        <div style={{ textAlign: "right" }}>
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
          {["male", "female"].map((g) => (
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
          {["20-35", "35-50", "50+"].map((ageRange) => (
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
          {apiCategory2?.map((cat) => (
            <div className="form_div" key={cat.id}>
              <input
                type="checkbox"
                id={`category_${cat.id}`}
                checked={filters.category_id === String(cat.id)}
                onChange={() =>
                  handleSingleSelect("category_id", String(cat.id))
                }
              />
              <label htmlFor={`category_${cat.id}`}>{cat.name}</label>
            </div>
          ))}
        </div>

        {/* City Filter */}
        <div className="box py-2 px-3 city">
          <h3>City</h3>
          {visibleCities.map((city) => (
            <div className="form_div" key={city.id}>
              <input
                type="checkbox"
                id={`city_${city.name}`}
                checked={filters.city === city.name}
                onChange={() => handleSingleSelect("city", city.name)}
              />
              <label htmlFor={`city_${city.name}`}>{city.name}</label>
            </div>
          ))}

          {cities.length > 10 && (
            <button
              className="see-more-btn"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "See Less" : "See More"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
