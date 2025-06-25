"use client";
import React, { useContext, useEffect, useState } from "react";
import "./hero.css";
import Dropdown from "react-bootstrap/Dropdown";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { IoLocationOutline } from "react-icons/io5";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "@/app/userContext";

export default function Hero() {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const { apiCategory2, setapiCategories2 } = useContext(UserContext);
  // Removed local apiCategory state
  const [apiServices, setapiServices] = useState([]);

  const [selectedServices, setSelectedServices] = useState("Services");
  const [selectedCategory, setSelectedCategory] = useState("Categories");

  const [showServices, setShowServices] = useState(false);
  const [showCities, setShowCities] = useState(false);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://staging.hylanmaterialsupply.com";
  const categoryApi = `${baseUrl}/api/category-list`;

  const getCategories = async () => {
    try {
      const res = await fetch(categoryApi);
      const data = await res.json();
      setapiCategories2(data.data);
    } catch (error) {
      console.log("Error while fetching categories");
    }
  };

  const getServices = async (categoryId) => {
    try {
      const res = await fetch(
        `https://staging.hylanmaterialsupply.com/api/service-list?category_id=${categoryId}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setapiServices(data.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // code for location
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState("");

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setError("");
        },
        (err) => {
          setError("Permission denied or error getting location");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
    setShow(false);
  };

  const handleSelectedCategory = async (eventKey, event) => {
    const selectedCat = apiCategory2.find(
      (cat) => `${cat.name} ${cat.id}` === eventKey
    );
    setSelectedCategory(selectedCat?.name || "Categories");
    setSelectedServices("Services");
    setShowServices(true);
    setShowCities(false);
    if (selectedCat) {
      await getServices(selectedCat.id);
    }
  };

  const handleSelectedServices = (eventKey) => {
    setSelectedServices(eventKey);
    setShowServices(false);
    setShowCities(true);
  };

  const handleSearch = () => {
    const selectedCat = apiCategory2.find(
      (cat) => cat.name === selectedCategory
    );
    const categoryId = selectedCat?.id || "";
    router.push(`/compnies?categoryId=${categoryId}`);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <section className="hero_section mb-5 d-flex flex-column justify-content-center align-items-center">
      <div className="position-relative text-center">
        <h1 className="hero_heading" data-aos="fade-right">
          A Better Path to More
        </h1>
        <h1 className="hero_heading" data-aos="fade-right">
          Opportunity!
        </h1>
        <p className="fw-medium my-5" data-aos="fade-up">
          Changing the Way Working People Find Work
        </p>

        <div
          className="dropdown_parent d-flex justify-content-center align-items-center"
          data-aos="fade-up"
        >
          <Dropdown
            className="services_dropdown category"
            onSelect={handleSelectedCategory}
          >
            <Dropdown.Toggle
              variant="success"
              id="dropdown-category"
              className={
                selectedCategory !== "Categories" ? "selected_black" : ""
              }
            >
              {selectedCategory}
            </Dropdown.Toggle>
            <Dropdown.Menu className="list_menu">
              {apiCategory2.map((item) => (
                <Dropdown.Item
                  key={item.id}
                  eventKey={`${item.name} ${item.id}`}
                >
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown
            className="services_dropdown services"
            show={showServices}
            onToggle={(isOpen) => setShowServices(isOpen)}
            onSelect={handleSelectedServices}
          >
            <Dropdown.Toggle
              variant="success"
              id="dropdown-services"
              className={
                selectedServices !== "Services" ? "selected_black" : ""
              }
            >
              {selectedServices}
            </Dropdown.Toggle>
            <Dropdown.Menu className="list_menu">
              {apiServices.length > 0 ? (
                apiServices.map((service, idx) => (
                  <Dropdown.Item key={idx} eventKey={service.name}>
                    {service.name}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item disabled>No services found</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>

          <div className="icon_div " onClick={handleShow}>
            <IoLocationOutline className="location_icon" />
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Get Nearest Services</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Discover and find services available to your current area.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className="padding_2"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="padding_2"
                onClick={getUserLocation}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>

          <button className="search_btn" onClick={handleSearch}>
            <IoSearch className="search_icon" />
          </button>
        </div>
      </div>
    </section>
  );
}
