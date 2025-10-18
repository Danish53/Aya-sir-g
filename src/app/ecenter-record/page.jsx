"use client";
import React, { useState, useEffect, useContext, useRef, Suspense } from "react";
import "./all_ecenter.css";
import IndividualCard from "../components/e-center-cards/IndividualCard";
import { UserContext } from "../userContext";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaEdit, FaFileAudio, FaMicrophone, FaPause } from "react-icons/fa";
import Select from "react-select";
import { MdDelete, MdPause, MdPlayArrow } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
      <EcenterInnerPage />
    </Suspense>
  );
}

function EcenterInnerPage() {
  const { userInfo, area } = useContext(UserContext);
  const router = useRouter();
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [userType, setUserType] = useState(null);
  const [imagePerview, setImagePreview] = useState("");
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioURL, setAudioURL] = useState();
  const [isRecording, setIsRecording] = useState();
  const [selectedAreaId, setSelectedAreaId] = useState("");

  const [filters, setFilters] = useState({
    user_type: "individual",
    date_filter: "",
    date_from: "",
    date_to: "",
  });

  const [formData, setFormData] = useState({
    id: "",
    area_id: "",
    address: "",
    description: "",
    profile_image: null,
    audio_sample_blob: null,
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

  // edit model
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const type = searchParams.get("user_type");
    setUserType(type);
  }, [searchParams]);

  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    setFormData((prev) => ({
      ...prev,
      profile_image: file,
    }));
  };

  const optionsAreas = area?.map((loc) => ({
    label: loc.name,
    value: loc.id,
  }));

  useEffect(() => {
    if (selectedItem && optionsAreas.length > 0) {
      setSelectedAreaId(selectedItem.area_id?.toString() || "");
    }
  }, [optionsAreas, selectedItem]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const modalRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      let chunks = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/mp3" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setFormData((prev) => ({
          ...prev,
          audio_sample_blob: blob,
        }));
      };


      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setTimer(0);

      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access denied", err);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleDeleteAudio = () => {
    setAudioURL("");
    setIsRecording(false);
    clearInterval(timerRef.current);
    setTimer(0);
    setFormData(prev => ({ ...prev, audio_sample_blob: null }));
  };

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioURL(url);
      setIsRecording(false);
      setIsPlaying(false);

      // Yeh file hi blob hota hai
      setFormData((prev) => ({
        ...prev,
        audio_sample_blob: file, // ✅ file as blob
      }));

    }
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (sec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // ✅ Open modal with pre-filled data
  const handleOpenModal = (item) => {
    // Find the matching area by name (since API gives area_name)
    const matchedArea = area?.find(
      (a) => a.name.toLowerCase() === item?.area_name?.toLowerCase()
    );

    const matchedAreaId = matchedArea ? matchedArea.id.toString() : "";

    setSelectedItem(item);
    setFormData({
      id: item?.id || "",
      user_id: item?.id || "",
      area_id: matchedAreaId, // ✅ Set area_id for API submission
      address: item?.address || "",
      description: item?.description || "",
      profile_image: null,
      audio_sample_blob: null,
    });

    setImagePreview(item?.profile_image ? `${item.profile_image}` : "/assets/person_img.png");

    setSelectedAreaId(matchedAreaId); // ✅ Set select default
    setAudioURL(item?.audio_sample || "");
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
    setImagePreview("");
    setAudioURL("");
    setFormData({
      id: "",
      area_id: "",
      address: "",
      description: "",
      profile_image: null,
      audio_sample_blob: null,
    });
  };

  const [loader, setLoader] = useState();
  // ✅ Update API Call
  const handleUpdateSubmit = async () => {
    let token = "";
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("token");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          token = parsedUser.api_token || "";
        } catch (e) { }
      }
    }

    const form = new FormData();
    form.append("user_id", formData.user_id || "");
    form.append("area_id", formData.area_id || "");
    form.append("address", formData.address || "");
    form.append("description", formData.description || "");
    if (formData.profile_image) form.append("profile_image", formData.profile_image);
    if (formData.audio_sample_blob)
      form.append("audio_sample", formData.audio_sample_blob);

    try {
      setLoader(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/update-profile-data`,
        {
          method: "POST", // or PUT if API supports it
          // headers: { Authorization: token ? `Bearer ${token}` : "" },
          body: form,
        }
      );
      const json = await res.json();
      if (res.ok && json.data) {
        toast.success(json.message || "Profile updated successfully!");
        fetchData();
        handleCloseModal();
      } else {
        toast.error(json.message || "Update failed!");
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setLoader(false);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    setFormData((prev) => ({ ...prev, profile_image: null }));
  };


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
                  <IndividualCard key={index} data={item} fetchData={fetchData} onEditClick={() => handleOpenModal(item)} />
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

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4">
              <div className="modal-header">
                <h5 className="modal-title">Edit Information</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div
                        className="image_div cursor-pointer relative w-32 h-32"
                        onClick={() => !imagePerview && fileInputRef.current.click()}
                      >
                        <div className="position-relative">
                          <img
                            src={
                              imagePerview ||
                              "/assets/person_img.png"
                            }
                            accept="image/*"
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover"
                          />

                          {/* Show Edit Icon if no image */}
                          {!imagePerview && (
                            <FaEdit className="edit_icon absolute bottom-2 right-2 text-white bg-gray-800 p-1 rounded-full" />
                          )}

                          {/* Show Cross Icon if image selected */}
                          {imagePerview && (
                            <IoMdClose
                              className="edit_icon absolute top-2 right-2 text-white bg-red-600 p-1 rounded-full"
                              onClick={handleRemoveImage}
                            />
                          )}

                          <input
                            type="file"
                            name="profile_image"
                            accept="image/*"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>
                    </div>
                    {userType == "provider" && (
                      <div className="col-md-12 input_one_row mb-2">
                        <label htmlFor="description">Description</label>
                        <input name="description" placeholder="Description" value={formData.description}
                          onChange={handleChange}
                        />
                      </div>
                    )}

                    {userType !== "provider" && (
                      <div className="col-md-12 input_one_row mb-2">
                        <>
                          <label htmlFor="area">Current Area</label>
                          <Select
                            id="area"
                            options={optionsAreas}
                            value={optionsAreas.find(opt => opt.value.toString() === selectedAreaId)}
                            onChange={(selectedOption) => {
                              const areaId = selectedOption ? selectedOption.value.toString() : "";
                              setSelectedAreaId(areaId);
                              setFormData(prev => ({ ...prev, area_id: areaId }));
                            }}
                            placeholder="Select Area"
                            isClearable
                            isSearchable
                          />


                        </>
                      </div>
                    )}
                    <div className="col-md-12 input_one_row mb-2">
                      <label htmlFor="address">Address</label>
                      <input name="address" placeholder="Address" value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="my-2 w-100">
                      <div className="audio-recorder-container">

                        {/* Recorder Section */}
                        {!audioURL && (
                          <div className="recorder-box">
                            <div
                              className={`mic-button ${isRecording ? "recording" : ""}`}
                              onClick={isRecording ? handleStopRecording : handleStartRecording}
                            >
                              {!isRecording ? <FaMicrophone /> : <FaPause />}
                            </div>
                            {!isRecording && (
                              <div>
                                <p style={{ fontWeight: "600", marginRight: "10px" }}>Record Voice</p>
                              </div>
                            )}
                            {/* Audio File Upload */}
                            {!audioURL && !isRecording && (
                              <div className="p-2">
                                <input
                                  type="file"
                                  accept="audio/*"
                                  id="audioUpload"
                                  onChange={handleAudioUpload}
                                  style={{ display: "none" }}
                                />
                                <label htmlFor="audioUpload" className="upload-label">
                                  <FaFileAudio size={22} style={{ color: "gray" }} />
                                  <span className="tooltip-text">Upload audio file</span>
                                </label>
                              </div>
                            )}
                            {isRecording && (
                              <div className="bars-animation">
                                {Array.from({ length: 25 }).map((_, index) => (
                                  <div key={index} style={{ animationDelay: `${index * 0.05}s` }}></div>
                                ))}
                              </div>
                            )}
                            {isRecording && <div className="timer">{formatTime(timer)}</div>}
                          </div>
                        )}

                        {/* Playback Section */}
                        {audioURL && (
                          <div className="audio-bubble-container right">
                            <div
                              className="play-icon-with-bars"
                              onClick={() => {
                                if (audioRef.current.paused) {
                                  audioRef.current.play();
                                  setIsPlaying(true);
                                } else {
                                  audioRef.current.pause();
                                  setIsPlaying(false);
                                }
                              }}
                            >
                              {isPlaying ? <div className="play-icon"><MdPause /></div> : <div className="play-icon"><MdPlayArrow /></div>}
                              <div className={`bars-animation-m ${isPlaying ? "playing" : ""}`}>
                                {[...Array(16)].map((_, i) => <span key={i}></span>)}
                              </div>
                            </div>

                            <MdDelete className="delete-icon" onClick={handleDeleteAudio} />
                            <audio
                              ref={audioRef}
                              src={audioURL}
                              onEnded={() => setIsPlaying(false)}
                              className="custom-audio-player"
                            ></audio>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button className="btn btn_primary text-white" onClick={handleUpdateSubmit}>
                  {loader ? "Update..." : "Update"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>

  );
}
