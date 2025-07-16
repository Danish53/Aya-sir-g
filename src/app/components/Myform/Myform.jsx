"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEdit, FaMicrophone } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../userContext";
import "./myform.css";
import { MultiSelect } from "react-multi-select-component";
import { toast, ToastContainer } from "react-toastify";

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
  const [imagePerview, setImagePreview] = useState("/assets/person_img.png");
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(userDetails?.audio_sample);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [selectedCityId, setSelectedCityId] = useState(null);
  const [selectedLocationIds, setSelectedLocationIds] = useState([]);
  // console.log(selectedLocationIds, "selected location idssss")
  const [intrestedLocationIds, setIntrestedLocationIds] = useState([]);

  const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
  const [cnicError, setCnicError] = useState("");

  const [formData, setFormData] = useState({
    profile_picture: "",
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


  // useEffect(() => {
  //   if (userDetails) {
  //     setFormData({
  //       ...formData,
  //       profile_picture: userDetails.profile_picture || "",
  //       first_name: userDetails.first_name || "",
  //       last_name: userDetails.last_name || "",
  //       username: userDetails.username || "",
  //       contact_number: userDetails.contact_number || "",
  //       email: userDetails.email || "",
  //       address: userDetails.address || "",
  //       gender: userDetails.gender || "",
  //       user_city: userDetails.user_city || "",
  //       cnic: userDetails.cnic || "",
  //       age: userDetails.age || "",
  //       cnic_scan: userDetails.cnic_scan || "",
  //       billing_address_scan: userDetails.billing_address_scan || "",
  //       interested_locations: intrestedLocationIds || "",
  //       fields_of_interest: userDetails.fields_of_interest || "",
  //       description: userDetails.description || "",
  //       disability_status: userDetails.disability_status || "",
  //       experience: userDetails.experience || "",
  //       audio_sample: userDetails.audio_sample || ""
  //     });
  //   }
  // }, [userDetails]);

  // if (!userDetails) return <h1>Loading...</h1>;

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
        profile_picture: userDetails.profile_picture || "",
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
        cnic_scan: userDetails.cnic_scan || "",
        billing_address_scan: userDetails.billing_address_scan || "",
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
      profile_picture: file, // 👈 this will go in FormData later
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


  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setAudioURL(URL.createObjectURL(audioBlob));

        // 👇 Send this audio blob as audio_sample
        setFormData((prev) => ({
          ...prev,
          audio_sample: audioBlob,
        }));

        audioChunksRef.current = [];
      };


      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch {
      alert("Microphone permission denied.");
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleDeleteAudio = () => {
    setAudioURL(null);
    setFormData((prev) => ({ ...prev, audio_sample: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      toast.success("Profile updated successfully!");
      handleClose();
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
                <img src={imagePerview} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                <FaEdit className="edit_icon" />
              </div>
              <input type="file" name="profile_picture" accept="image/*" onChange={handleFileChange} ref={fileInputRef} style={{ display: "none" }} />

              <div className="input_one_row">
                <div>
                  <label htmlFor="first_name">First Name</label>
                  <input type="text" className="input_auth" name="first_name" onChange={handleChange} value={formData.first_name} />
                </div>
                <div>
                  <label htmlFor="last_name">Last Name</label>
                  <input type="text" className="input_auth" name="last_name" onChange={handleChange} value={formData.last_name} />
                </div>
              </div>

              <div className="input_one_row">
                <div>
                  <label htmlFor="username">Username</label>
                  <input type="text" className="input_auth" name="username" onChange={handleChange} value={formData.username} />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="email" className="input_auth" name="email" onChange={handleChange} value={formData.email} />
                </div>
              </div>

              <div className="input_one_row">
                <div>
                  <label htmlFor="contact_number">Contact Number</label>
                  <input type="text" className="input_auth" name="contact_number" onChange={handleChange} value={formData.contact_number} />
                </div>
                <div>
                  <label htmlFor="address">Address</label>
                  <input type="text" className="input_auth" name="address" onChange={handleChange} value={formData.address} />
                </div>
              </div>

              <div className="input_one_row">
                <div>
                  <label htmlFor="gender">Gender</label>
                  <select className="input_auth" name="gender" onChange={handleChange} value={formData.gender}>
                    <option value="">-- Select --</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                {/* <div>
                  <label htmlFor="city">City</label>
                  <input type="text" className="input_auth" name="city" onChange={handleChange} value={formData.city} />
                </div> */}
                <div>
                  <label htmlFor="fields_of_interest">Fields of Interest</label>
                  <MultiSelect
                    className="input_auth"
                    options={options}
                    value={selected}
                    onChange={handleChangefields}
                    labelledBy="Select"
                    hasSelectAll={true}
                  />
                </div>
              </div>

              <div className="input_one_row">
                {/* <div>
                  <label htmlFor="cnic">CNIC</label>
                  <input type="text" className="input_auth" name="cnic" onChange={handleChange} value={formData.cnic} />
                </div> */}
                <div>
                  <label htmlFor="cnic">CNIC</label>
                  <input
                    type="text"
                    className="input_auth"
                    name="cnic"
                    onChange={handleChangeCnic}
                    value={formData.cnic}
                    placeholder="e.g. 12345-1234567-1"
                  />
                  {cnicError && (
                    <small style={{ color: "red", fontSize: "12px" }}>{cnicError}</small>
                  )}
                </div>

                <div>
                  <label htmlFor="age">Age</label>
                  <input type="number" className="input_auth" name="age" onChange={handleChange} value={formData.age} />
                </div>
              </div>

              <div className="input_one_row">
                <div>
                  <label htmlFor="cnic_scan">CNIC Scan Copy</label>
                  <input className="input_auth pad" type="file" name="cnic_scan" accept="image/*" onChange={handleImageChange} />
                </div>
                <div>
                  <label htmlFor="billing_address_scan">Billing Address Scan</label>
                  <input className="input_auth pad" type="file" name="billing_address_scan" accept="image/*" onChange={handleImageChange} />
                </div>
              </div>

              <div className="input_one_row">

                {/* <div>
                  <label htmlFor="interested_locations">Interested Locations</label>
                  <input type="text" className="input_auth" name="interested_locations" onChange={handleChange} value={formData.interested_locations} />
                </div> */}
                <div>
                  <label htmlFor="city">City</label>
                  {/* <select
                    className="input_auth pad"
                    onChange={(e) => {
                      setSelectedCityId(e.target.value);
                      setSelectedLocationIds([]);
                    }}
                  > */}
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

                </div>

                {openedFrom === "handyman" && (
                    <div>
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


                {/* <div>
                  <label htmlFor="city">City</label>
                  <input type="text" className="input_auth" name="city" onChange={handleChange} value={formData.city} />
                </div> */}
              </div>

              <div className="input_one_row">

                <div>
                  <label htmlFor="description">Description</label>
                  <input type="text" className="input_auth" name="description" onChange={handleChange} value={formData.description} />
                </div>
                {openedFrom === "handyman" && (
                    <div>
                      <label htmlFor="disability_status">Disability Status</label>
                      <input type="text" className="input_auth" name="disability_status" onChange={handleChange} value={formData.disability_status} />
                    </div>
                  )
                }
              </div>

              <div className="input_one_row">

                <div>
                  <label htmlFor="experience">Experience</label>
                  <input type="number" className="input_auth" name="experience" onChange={handleChange} value={formData.experience} />
                </div>
              </div>

              <div className="input_row_full">
                <div className="audio_class">
                  <div>
                    <FaMicrophone className="audio_icon" />
                    {!isRecording ? (
                      <button type="button" className="btn btn-primary" onClick={handleStartRecording}>
                        Start Recording
                      </button>
                    ) : (
                      <button type="button" className="btn btn-secondary" onClick={handleStopRecording}>
                        Stop Recording
                      </button>
                    )}
                  </div>

                  {audioURL && (
                    <div className="mt-4 listen_audio" onClick={handleDeleteAudio}>
                      <audio controls src={audioURL}></audio>
                      <MdDelete className="audio_icon" />
                    </div>
                  )}
                </div>
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
      <ToastContainer />
    </div>
  );
}
