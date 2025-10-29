"use client";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./hero.css";
import Dropdown from "react-bootstrap/Dropdown";
import { IoSearch } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
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

  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [cityQuery, setCityQuery] = useState("");
  const [cityMenuOpen, setCityMenuOpen] = useState(false);

  const [locationQuery, setLocationQuery] = useState("");
  const [locationMenuOpen, setLocationMenuOpen] = useState(false);


  // 🔎 Filtered list
  const filteredCategories = useMemo(() => {
    if (!query) return apiCategory2;
    return apiCategory2.filter((cat) =>
      cat.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, apiCategory2]);

  const filteredCities = useMemo(() => {
    if (!cityQuery) return cities;
    return cities.filter((c) =>
      c.name.toLowerCase().includes(cityQuery.toLowerCase())
    );
  }, [cityQuery, cities]);

  const filteredLocations = useMemo(() => {
    if (!locationQuery) return locations;
    return locations.filter((l) =>
      l.name.toLowerCase().includes(locationQuery.toLowerCase())
    );
  }, [locationQuery, locations]);


  // ✅ Handle selection
  const handleSelect = async (eventKey) => {
    const [name, id] = eventKey.split("||");
    setSelectedCategory(name);
    setQuery(""); // reset search text
    setMenuOpen(false); // dropdown close

    if (id === "any") {
      setCategoryId(null);
    } else {
      setCategoryId(id);
      await getCities(id);
    }
  };

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://admin.ayasirg.com";

  const getCategories = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/category-list`);
      const data = await res.json();
      setapiCategories2(data.data);
    } catch (error) {
      // router.push("/error");
      console.log("Error while fetching categories");
    }
  };

  // const handleCategorySelect = async (eventKey) => {
  //   const [name, id] = eventKey.split("||");
  //   setSelectedCategory(name);

  //   if (id === "any") {
  //     setCategoryId(null);
  //   } else {
  //     setCategoryId(id);
  //     await getCities(id); // Cities will update if needed but city & location selection remain
  //   }
  // };


  const handleCitySelect = async (eventKey) => {
    const [name, id] = eventKey.split("||");
    setSelectedCity(name);
    setCityQuery(""); // reset search text
    setCityMenuOpen(false); // dropdown close

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
    setLocationQuery(""); // reset search text
    setLocationMenuOpen(false);

    if (id === "any") {
      setLocationId(null);
    } else {
      setLocationId(id);
    }
  };
  const handleSearch = () => {
    let hasError = false;

    if (!categoryId && selectedCategory !== "Any Category") {
      setCategoryError(true);
      hasError = true;
    } else {
      setCategoryError(false);
    }

    if (!cityId && selectedCity !== "Any City") {
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
    <section className="hero_section mb-5 d-flex flex-column align-items-center">
      <div className="position-relative text-center">
        <div className="container">
          <div className="row section_margin">
            <div className="col-lg-12">
              <h1 className="hero_heading">From chowks to clicks, Pakistan’s LinkedIn </h1>
              <h1 className="hero_heading">for blue-collar workers.</h1>
              <p className="fw-medium my-4">Whether you are searching for work or looking to hire, this is the platform you can trust.</p>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="dropdown_parent d-flex justify-content-center align-items-center position-relative">
                {/* Category Dropdown */}
                <div className="position-relative w-100 px-lg-0 px-md-0 px-2 category">
                  {categoryError && (
                    <div className="text-danger fw-semibold mb-1 error_class">Please select a category</div>
                  )}
                  <Dropdown
                    onSelect={handleSelect}
                    show={menuOpen}
                    onToggle={(isOpen) => setMenuOpen(isOpen)}
                    className="services_dropdown"
                    drop="down"
                  >
                    <Dropdown.Toggle as="div" className="w-100 h-100 p-0 border-0 bg-transparent d-flex align-items-center">
                      <input
                        type="text"
                        placeholder="Select Category"
                        className="form-control h-100 border-0 outline-0"
                        value={query !== "" ? query : selectedCategory}
                        onChange={(e) => {
                          const val = e.target.value;
                          setQuery(val);
                          if (val === "") {
                            setSelectedCategory("");
                            setCategoryId(null);
                          }
                          setMenuOpen(true);
                        }}
                        onClick={() => setMenuOpen(true)}
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="list_menu" style={{ maxHeight: "250px", overflowY: "auto" }}>
                      <Dropdown.Item eventKey={"Any Category||any"}>Any Category</Dropdown.Item>

                      {filteredCategories.length > 0 ? (
                        filteredCategories.map((cat) => (
                          <Dropdown.Item key={cat.id} eventKey={`${cat.name}||${cat.id}`}>
                            {cat.name}
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item disabled>No results found</Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                {/* City Dropdown - always show */}
                <div className="position-relative w-100 px-lg-0 px-md-0 px-2 category">
                  {cityError && (
                    <div className="text-danger fw-semibold mb-1 error_class">Please select a city</div>
                  )}
                  <Dropdown
                    onSelect={handleCitySelect}
                    show={cityMenuOpen}
                    onToggle={(isOpen) => setCityMenuOpen(isOpen)}
                    className="services_dropdown "
                  >
                    <Dropdown.Toggle as="div" className="w-100 h-100 p-0 border-0 bg-transparent d-flex align-items-center">
                      <input
                        type="text"
                        placeholder="Select City"
                        className="form-control h-100 border-0 outline-0"
                        value={cityQuery !== "" ? cityQuery : selectedCity}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCityQuery(val);
                          if (val === "") {
                            setSelectedCity("");
                            setCityId(null);
                          }
                          setCityMenuOpen(true);
                        }}
                        onClick={() => setCityMenuOpen(true)}
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="list_menu" style={{ maxHeight: "250px", overflowY: "auto" }}>
                      <Dropdown.Item eventKey={"Any City||any"}>Any City</Dropdown.Item>
                      {filteredCities.length > 0 ? (
                        // filteredCities.map((city) => (
                        //   <Dropdown.Item key={city.id} eventKey={`${city.name}||${city.id}`}>
                        //     {city.name}
                        //   </Dropdown.Item>
                        // ))
                          filteredCities?.map((city) => (
                            <Dropdown.Item
                              key={city.id}
                              eventKey={`${city.name}||${city.id}`}
                              disabled={city.name !== "Lahore"} // Lahore ke ilawa sab disable
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
                  <Dropdown
                    onSelect={handleLocationSelect}
                    show={locationMenuOpen}
                    onToggle={(isOpen) => setLocationMenuOpen(isOpen)}
                    className="services_dropdown"
                  >
                    <Dropdown.Toggle as="div" className="w-100 h-100 p-0 border-0 bg-transparent d-flex align-items-center">
                      <input
                        type="text"
                        placeholder="Select Location"
                        className="form-control h-100 border-0 outline-0"
                        value={locationQuery !== "" ? locationQuery : selectedLocation}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLocationQuery(val);
                          if (val === "") {
                            setSelectedLocation("");
                            setLocationId(null);
                          }
                          setLocationMenuOpen(true);
                        }}
                        onClick={() => setLocationMenuOpen(true)}
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="list_menu" style={{ maxHeight: "250px", overflowY: "auto" }}>
                      <Dropdown.Item eventKey={"Any Location||any"}>Any Location</Dropdown.Item>
                      {filteredLocations.length > 0 ? (
                        filteredLocations.map((loc) => (
                          <Dropdown.Item key={loc.id} eventKey={`${loc.name}||${loc.id}`}>
                            {loc.name}
                          </Dropdown.Item>
                        ))
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