"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEdit, FaMicrophone, FaPause } from "react-icons/fa";
import { MdDelete, MdPause, MdPlayArrow } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../userContext";
import "./myform.css";
import { MultiSelect } from "react-multi-select-component";
import { toast, ToastContainer } from "react-toastify";
import AudioPlayer from 'react-h5-audio-player';

export default function Myform({ openedFrom, setSelectedType }) {
  // console.log(openedFrom, setSelectedType, "role update");
  const {
    userDetails,
    updateUserProfile,
    loader,
    apiCategory2,
    cities,
    locations,
    getLocations
  } = useContext(UserContext);
  // console.log(userDetails, "user detail,.,.,.")
  const [imagePerview, setImagePreview] = useState(userDetails?.profile_image);
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(userDetails?.audio_sample);
  const [formErrors, setFormErrors] = useState({});
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);


  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedLocationIds, setSelectedLocationIds] = useState([]);
  // console.log(selectedLocationIds, "selected location idssss")
  const [intrestedLocationIds, setIntrestedLocationIds] = useState([]);

  const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
  const [cnicError, setCnicError] = useState("");

  const [formData, setFormData] = useState({
    profile_image: "",
    first_name: "",
    last_name: "",
    username: "",
    contact_number: "",
    email: "",
    address: "",
    gender: "",
    user_city: "",
    cnic: "",
    age: "",
    cnic_scan: "",
    billing_address_scan: "",
    interested_locations: "",
    fields_of_interest: "",
    description: "",
    disability_status: "",
    experience: "",
    audio_sample: "",
    role: ""
  });

  const validateForm = () => {
    const requiredFields = [
      "profile_image",
      "first_name",
      "last_name",
      "username",
      "email",
      "contact_number",
      "address",
      "gender",
      "user_city",
      "fields_of_interest",
      "cnic",
      "age",
      "description",
      "experience",
      "billing_address_scan",
      "cnic_scan",
      "audio_sample"
    ];

    const errors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) errors[field] = "This field is required.";
    });

    if (!cnicRegex.test(formData.cnic)) {
      errors.cnic = "CNIC must be in format xxxxx-xxxxxxx-x";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fileInputRef = useRef(null);
  const handleImageClick = () => fileInputRef.current.click();
  const [show, setShow] = useState(true);
  // const handleClose = () => setShow(false);
  const handleClose = () => {
    setShow(false);
    setSelectedType(null);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (openedFrom) handleShow(true);
  }, [openedFrom]);

  useEffect(() => {
    if (openedFrom) {
      setFormData((prev) => ({ ...prev, role: String(openedFrom) }));
    }
  }, [openedFrom]);


  const formatCNIC = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const part1 = cleaned.slice(0, 5);
    const part2 = cleaned.slice(5, 12);
    const part3 = cleaned.slice(12, 13);
    return [part1, part2, part3].filter(Boolean).join("-");
  };

  const handleChangeCnic = (e) => {
    const formatted = formatCNIC(e.target.value);
    setFormData((prev) => ({ ...prev, cnic: formatted }));
    if (!cnicRegex.test(formatted)) {
      setCnicError("CNIC must be in format xxxxx-xxxxxxx-x");
    } else {
      setCnicError("");
    }
  };



  useEffect(() => {
    if (userDetails) {
      setFormData((prev) => ({
        ...prev,
        profile_image: userDetails.profile_image || "",
        first_name: userDetails.first_name || "",
        last_name: userDetails.last_name || "",
        username: userDetails.username || "",
        contact_number: userDetails.contact_number || "",
        email: userDetails.email || "",
        address: userDetails.address || "",
        gender: userDetails.gender || "",
        user_city: userDetails.user_city || "",
        cnic: userDetails.cnic || "",
        age: userDetails.age || "",
        cnic_scan: "",
        billing_address_scan: "",
        interested_locations: intrestedLocationIds || "",
        fields_of_interest: userDetails.fields_of_interest || "",
        description: userDetails.description || "",
        disability_status: userDetails.disability_status || "",
        experience: userDetails.experience || "",
        audio_sample: userDetails.audio_sample || "",
        role: String(openedFrom) || userDetails.role || "",
      }));
    }
  }, [userDetails, openedFrom]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Show preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // 2. Save file to formData for API
    setFormData((prev) => ({
      ...prev,
      profile_image: file, // 👈 this will go in FormData later
    }));
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: file, // original file
    }));
  };

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
      let chunks = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setFormData((prev) => ({
          ...prev,
          audio_sample: blob, // ✅ Blob in webm format
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
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (sec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix errors in form.");
      return;
    }

    const form = new FormData();

    // Append basic non-array fields
    for (const key in formData) {
      if (
        key !== "interested_locations" &&
        key !== "fields_of_interest" &&
        formData[key] !== undefined &&
        formData[key] !== null
      ) {
        form.append(key, formData[key]);
      }
    }

    if (!form.has("role") && openedFrom) {
      form.append("role", String(openedFrom));
    }

    // ✅ Append zip codes as array
    intrestedLocationIds.forEach((zip) => {
      form.append("interested_locations[]", zip);
    });

    // ✅ Append fields of interest
    fieldsOfInterestIds.forEach((id) => {
      form.append("fields_of_interest[]", id);
    });

    const res = await updateUserProfile(form);
    // console.log(res, "update profile ho?")

    if (res.success) {
      handleClose();
      toast.success("Profile updated successfully!");
    } else {
      toast.error(res.message || "Update failed.");
    }
  };


  // zip-code
  // const [zipList, setZipList] = useState([]);
  // const [zipCode, setZipCode] = useState();
  // const inputRef = useRef(null);

  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter" && zipCode.trim() !== "") {
  //     e.preventDefault();
  //     if (!zipList.includes(zipCode.trim())) {
  //       setZipList([...zipList, zipCode.trim()]);
  //     }
  //     setZipCode("");
  //   } else if (e.key === "Backspace" && zipCode === "") {
  //     setZipList(zipList.slice(0, -1)); // Remove last ZIP on backspace
  //   }
  // };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      interested_locations: intrestedLocationIds,
    }));
  }, [intrestedLocationIds]);

  // const removeZip = (index) => {
  //   const newList = [...zipList];
  //   newList.splice(index, 1);
  //   setZipList(newList);
  // };

  // fileds of intrest
  const options = apiCategory2.map((cat) => ({
    label: cat.name,   // dikhne wala naam
    value: cat.id      // backend ko bhejne wala id
  }));

  const [selected, setSelected] = useState([]);
  const [fieldsOfInterestIds, setFieldsOfInterestIds] = useState([]);

  // Update formData when selected changes
  const handleChangefields = (selectedOptions) => {
    setSelected(selectedOptions);

    // Only get the IDs (value)
    const selectedIds = selectedOptions.map((opt) => opt.value);
    setFieldsOfInterestIds(selectedIds);

    // Optional: if you're storing in formData
    setFormData({ ...formData, fields_of_interest: selectedIds });
  };

  // intrested locations
  const optionsLocation = locations.map((loc) => ({
    label: loc.name,   // dikhne wala naam
    value: loc.id      // backend ko bhejne wala id
  }));

  const [selectedLocation, setSelectedLocation] = useState([]);
  // console.log(intrestedLocationIds, "ids location")

  // Update formData when selected changes
  const handleChangefieldsLocation = (selectedOptions) => {
    setSelectedLocation(selectedOptions);
    // console.log(selectedOptions, "opppppp select")

    // Only get the IDs (value)
    const selectedlocationIds = selectedOptions.map((opt) => opt.value);
    setIntrestedLocationIds(selectedlocationIds);

    // Optional: if you're storing in formData
    setFormData({ ...formData, interested_locations: selectedlocationIds });
  };

  useEffect(() => {
    if (selectedCityId) {
      getLocations(selectedCityId);
    }
  }, [selectedCityId]);



  return (
    <div className="container">
      <div className="myform_profile">
        <Modal
          className="user_update_model"
          show={show}
          onHide={handleClose}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Information</Modal.Title>
          </Modal.Header>

          <Modal.Body className="model_body d-flex justify-content-center w-100">
            <form onSubmit={handleSubmit}>
              <div className="image_div" onClick={handleImageClick} style={{ cursor: "pointer" }}>
                <img src={imagePerview} alt="Profile" className="w-32 h-32 rounded-full object-cover" style={{ border: '2px solid #B50000', borderRadius: "50%" }} />
                <FaEdit className="edit_icon" />
              </div>
              <input type="file" name="profile_image" accept="image/*"
                capture="user" onChange={handleFileChange} ref={fileInputRef} style={{ display: "none" }} />
              {formErrors.profile_image && <small style={{ color: "red" }}>{formErrors.profile_image}</small>}
              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="first_name">First Name</label>
                  <input type="text" className="input_auth" name="first_name" onChange={handleChange} value={formData.first_name} />
                  {formErrors.first_name && <small style={{ color: "red" }}>{formErrors.first_name}</small>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="last_name">Last Name</label>
                  <input type="text" className="input_auth" name="last_name" onChange={handleChange} value={formData.last_name} />
                  {formErrors.last_name && <small style={{ color: "red" }}>{formErrors.last_name}</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="input_auth" name="username" onChange={handleChange} value={formData.username} />
                  {formErrors.username && <small style={{ color: "red" }}>{formErrors.username}</small>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="input_auth" name="email" onChange={handleChange} value={formData.email} />
                  {formErrors.email && <small style={{ color: "red" }}>{formErrors.email}</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="contact_number">Contact Number</label>
                  <input type="text" className="input_auth" name="contact_number" placeholder="03009900999" onChange={handleChange} value={formData.contact_number} />
                  {formErrors.contact_number && <small style={{ color: "red" }}>{formErrors.contact_number}</small>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="address">Address</label>
                  <input type="text" className="input_auth" name="address" onChange={handleChange} value={formData.address} />
                  {formErrors.address && <small style={{ color: "red" }}>{formErrors.address}</small>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="gender">Gender</label>
                  <select className="input_auth" name="gender" onChange={handleChange} value={formData.gender}>
                    <option value="">-- Select --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    {/* <option value="others">Others</option> */}
                  </select>
                  {formErrors.gender && <small style={{ color: "red" }}>{formErrors.gender}</small>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="fields_of_interest">Fields of Interest</label>
                  <MultiSelect
                    className="input_auth"
                    options={options}
                    value={selected}
                    onChange={handleChangefields}
                    labelledBy="Select"
                    hasSelectAll={true}
                  />
                  {formErrors.fields_of_interest && <small style={{ color: "red" }}>{formErrors.fields_of_interest}</small>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="cnic">CNIC</label>
                  <input
                    type="text"
                    className="input_auth"
                    name="cnic"
                    onChange={handleChangeCnic}
                    value={formData.cnic}
                    placeholder="e.g. 12345-1234567-1"
                  />
                  {formErrors.cnic && <small style={{ color: "red" }}>{formErrors.cnic}</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="age">Age</label>
                  <input type="number" className="input_auth" name="age" onChange={handleChange} value={formData.age} />
                  {formErrors.age && <small style={{ color: "red" }}>{formErrors.age}</small>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="cnic_scan">CNIC Scan Copy</label>
                  <input className="input_auth pad" type="file" name="cnic_scan" accept="image/*"
                    onChange={handleImageChange} />
                  {formErrors.cnic_scan && <small style={{ color: "red" }}>{formErrors.cnic_scan}</small>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="billing_address_scan">Billing Address Scan</label>
                  <input className="input_auth pad" type="file" name="billing_address_scan" accept="image/*"
                    onChange={handleImageChange} />
                  {formErrors.billing_address_scan && <small style={{ color: "red" }}>{formErrors.billing_address_scan}</small>}
                </div>

                <div className="col-md-6">
                  <label htmlFor="city">City</label>
                  <select
                    className="input_auth pad"
                    name="user_city"
                    onChange={(e) => {
                      const selectedCityId = e.target.value;
                      const selectedCity = cities.find((city) => city.id === parseInt(selectedCityId));
                      const selectedCityName = selectedCity?.name || "";

                      setSelectedCityId(selectedCityId);
                      setSelectedLocationIds([]);
                      setFormData((prev) => ({
                        ...prev,
                        user_city: selectedCityName, // ✅ city ka name bhejna
                      }));
                    }}
                    value={selectedCityId || ""}
                  >

                    <option value="">Select a City</option>
                    {cities?.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {formErrors.user_city && <small style={{ color: "red" }}>{formErrors.user_city}</small>}
                </div>

                {openedFrom === "handyman" && (
                  <div className="col-md-6">
                    <label htmlFor="interested_locations">Interested Locations</label>
                    <MultiSelect
                      className="input_auth"
                      options={optionsLocation}
                      value={selectedLocation}
                      onChange={handleChangefieldsLocation}
                      labelledBy="Select"
                      hasSelectAll={true}
                      isDisabled={!locations.length}
                    />
                  </div>
                )
                }

                <div className="col-md-6">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="input_auth" name="description" onChange={handleChange} value={formData.description} />
                  {formErrors.description && <small style={{ color: "red" }}>{formErrors.description}</small>}
                </div>
                {openedFrom === "handyman" && (
                  <div className="col-md-6">
                    <label htmlFor="disability_status">Disability Status</label>
                    <input type="text" className="input_auth" name="disability_status" onChange={handleChange} value={formData.disability_status} />
                  </div>
                )
                }

                <div className="col-md-6">
                  <label htmlFor="experience">Experience</label>
                  <input type="number" className="input_auth" name="experience" onChange={handleChange} value={formData.experience} />
                  {formErrors.experience && <small style={{ color: "red" }}>{formErrors.experience}</small>}
                </div>
              </div>

              <div className="w-100">
                <div className="audio-recorder-container">
                  {!audioURL && (
                    <div className="recorder-box">
                      <div className={`mic-button ${isRecording ? "recording" : ""}`} onClick={isRecording ? handleStopRecording : handleStartRecording}>
                        {
                          !isRecording ? (
                            <FaMicrophone />
                          ) : (<FaPause />)
                        }
                      </div>
                      {!isRecording && <div><p style={{ fontWeight: "600", marginRight: "10px" }}>Record Voice</p></div>}
                      {isRecording &&
                        <div className="bars-animation">
                          {Array.from({ length: 25 }).map((_, index) => (
                            <div key={index} style={{ animationDelay: `${index * 0.05}s` }}></div>
                          ))}
                        </div>
                      }

                      {isRecording && <div className="timer">{formatTime(timer)}</div>}
                    </div>
                  )}

                  {audioURL && (
                    <div className="audio-bubble-container right">
                      <div className="play-icon-with-bars" onClick={() => {
                        if (audioRef.current.paused) {
                          audioRef.current.play();
                          setIsPlaying(true);
                        } else {
                          audioRef.current.pause();
                          setIsPlaying(false);
                        }
                      }}>
                        {isPlaying ? <div className="play-icon"><MdPause /></div> : <div className="play-icon"><MdPlayArrow /></div>}

                        <div className={`bars-animation-m ${isPlaying ? 'playing' : ''}`}>
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

                {formErrors.audio_sample && <small style={{ color: "red" }}>{formErrors.audio_sample}</small>}
              </div>



              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button className="btn_primary" type="submit">{loader ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Updated...
                  </>
                ) : (
                  "Update"
                )}</Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}
