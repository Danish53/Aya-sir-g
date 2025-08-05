"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./hero.css";
import Dropdown from "react-bootstrap/Dropdown";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/userContext";

export default function Hero() {
  const router = useRouter();
  const { apiCategory2, setapiCategories2, cities, setCities, locations, setLocations, getCities, getLocations } = useContext(UserContext);

  const cityDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [categoryError, setCategoryError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [locationError, setLocationError] = useState(false);

  const [categoryId, setCategoryId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [locationId, setLocationId] = useState();

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://staging.hylanmaterialsupply.com";

  const getCategories = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/category-list`);
      const data = await res.json();
      setapiCategories2(data.data);
    } catch (error) {
      console.log("Error while fetching categories");
    }
  };

  const handleCategorySelect = async (eventKey) => {
    const [name, id] = eventKey.split("||");
    setSelectedCategory(name);

    if (id === "any") {
      setCategoryId(null);
    } else {
      setCategoryId(id);
      await getCities(id); // Cities will update if needed but city & location selection remain
    }
  };

  const handleCitySelect = async (eventKey) => {
    const [name, id] = eventKey.split("||");
    setSelectedCity(name);

    if (id === "any") {
      setCityId(null);
      setSelectedLocation("Any Location");
      setLocationId(null);
      setLocations([]);
    } else {
      setCityId(id);
      await getLocations(id); 
    }
  };


  const handleLocationSelect = (eventKey) => {
    const [name, id] = eventKey.split("||");
    setSelectedLocation(name);

    if (id === "any") {
      setLocationId(null);
    } else {
      setLocationId(id);
    }
  };
  const handleSearch = () => {
    let hasError = false;

    if (!categoryId && selectedCategory !== "Any") {
      setCategoryError(true);
      hasError = true;
    } else {
      setCategoryError(false);
    }

    if (!cityId && selectedCity !== "Any") {
      setCityError(true);
      hasError = true;
    } else {
      setCityError(false);
    }

    if (!selectedLocation || (locationId === null && selectedLocation !== "Any Location")) {
      setLocationError(true);
      hasError = true;
    } else {
      setLocationError(false);
    }

    if (!hasError) {
      let query = `/compnies?role=handyman`;

      if (categoryId) query += `&category_id=${categoryId}`;
      if (cityId) query += `&city=${cityId}`;
      if (locationId) query += `&area_code=${locationId}`;

      router.push(query);
    }
  };


  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="hero_section mb-5 d-flex flex-column justify-content-center align-items-center">
      <div className="position-relative text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <h1 className="hero_heading">From chowks to clicks, Pakistan’s LinkedIn </h1>
              <h1 className="hero_heading">for blue-collar workers.</h1>
              <p className="fw-medium my-5">Whether you are searching for work or looking to hire, this is the platform you can trust.</p>
            </div>
          </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="dropdown_parent d-flex justify-content-center align-items-center position-relative">
              {/* Category Dropdown */}
              <div className="position-relative w-100 px-lg-0 px-md-0 px-2">
                {categoryError && (
                  <div className="text-danger fw-semibold mb-1 error_class">Please select a category</div>
                )}
                <Dropdown onSelect={handleCategorySelect} className="services_dropdown category">
                  <Dropdown.Toggle className={selectedCategory ? "selected_black" : "text-muted"}>
                    {selectedCategory || "Select Category"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="list_menu">
                    <Dropdown.Item eventKey={"Any||any"}>Any Category</Dropdown.Item>
                    {apiCategory2.map((cat) => (
                      <Dropdown.Item key={cat.id} eventKey={`${cat.name}||${cat.id}`}>
                        {cat.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* City Dropdown - always show */}
              <div className="position-relative w-100 px-lg-0 px-md-0 px-2">
                {cityError && (
                  <div className="text-danger fw-semibold mb-1 error_class">Please select a city</div>
                )}
                {/* <Dropdown onSelect={handleCitySelect} className="services_dropdown category">
              <Dropdown.Toggle ref={cityDropdownRef} className={selectedCity ? "selected_black" : "text-muted"}>
                {selectedCity || "Select City"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="list_menu">
                {cities.length > 0 ? (
                  cities.map((city) => (
                    <Dropdown.Item key={city.id} eventKey={`${city.name}||${city.id}`}>
                      {city.name}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item disabled>No cities found</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown> */}
                <Dropdown onSelect={handleCitySelect} className="services_dropdown category">
                  <Dropdown.Toggle ref={cityDropdownRef} className={selectedCity ? "selected_black" : "text-muted"}>
                    {selectedCity || "Select City"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="list_menu">
                    <Dropdown.Item eventKey={"Any||any"}>Any City</Dropdown.Item>
                    {cities?.length > 0 ? (
                      cities?.map((city) => (
                        <Dropdown.Item
                          key={city.id}
                          eventKey={`${city.name}||${city.id}`}
                          disabled={city.name.toLowerCase() !== "lahore"} // 🔥 Only enable Lahore
                        >
                          {city.name}
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item disabled>No cities found</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>

              </div>

              {/* Location Dropdown - always show */}
              <div className="position-relative w-100 px-lg-0 px-md-0 px-2">
                {locationError && (
                  <div className="text-danger fw-semibold mb-1 error_class">Please select a location</div>
                )}
                <Dropdown onSelect={handleLocationSelect} className="services_dropdown category">
                  <Dropdown.Toggle
                    ref={locationDropdownRef}
                    className={selectedLocation ? "selected_black" : "text-muted"}
                  >
                    {selectedLocation || "Select Location"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="list_menu">
                    {locations.length > 0 ? (
                      <>
                        <Dropdown.Item key="any-location" eventKey={"Any Location||any"}>
                          Any Location
                        </Dropdown.Item>
                        {locations.map((location) => (
                          <Dropdown.Item key={location.id} eventKey={`${location.name}||${location.id}`}>
                            {location.name}
                          </Dropdown.Item>
                        ))}
                      </>
                    ) : (
                      <Dropdown.Item disabled>No locations found</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>

              </div>

              <div className="w-100 px-lg-0 px-md-0 px-2">
                <button className="search_btn" onClick={handleSearch}>
                  <IoSearch className="search_icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}