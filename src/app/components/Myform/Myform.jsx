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

export default function Myform({ openedFrom }) {
  const [imagePerview, setImagePreview] = useState("/assets/person_img.png");
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const {
    userDetails,
    updateUserProfile,
    loader,
    apiCategory2
  } = useContext(UserContext);

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
    role: "handyman"
  });

  // console.log(formData, "form data,,,")

  const fileInputRef = useRef(null);
  const handleImageClick = () => fileInputRef.current.click();
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (openedFrom) handleShow(true);
  }, [openedFrom]);

  useEffect(() => {
    if (userDetails) {
      setFormData({
        ...formData,
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
        interested_locations: zipList || "",
        fields_of_interest: userDetails.fields_of_interest || "",
        description: userDetails.description || "",
        disability_status: userDetails.disability_status || "",
        experience: userDetails.experience || "",
        audio_sample: userDetails.audio_sample || "",
      });
    }
  }, [userDetails]);

  // if (!userDetails) return <h1>Loading...</h1>;

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
    setFormData((prev) => ({ ...prev, voice: "" }));
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

    // ✅ Append zip codes as array
    zipList.forEach((zip) => {
      form.append("interested_locations[]", zip);
    });

    // ✅ Append fields of interest
    fieldsOfInterestIds.forEach((id) => {
      form.append("fields_of_interest[]", id);
    });

    // 👇 Optional: for debugging, check payload before sending
    // for (let pair of form.entries()) console.log(pair[0] + ': ' + pair[1]);

    const res = await updateUserProfile(form);

    // console.log(res, "resssssssss prooooo")

    if (res.success) {
      toast.success("Profile updated successfully!");
      handleClose();
    } else {
      toast.error(res.message || "Update failed.");
    }
  };


  // zip-code
  const [zipList, setZipList] = useState([]);
  const [zipCode, setZipCode] = useState();
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && zipCode.trim() !== "") {
      e.preventDefault();
      if (!zipList.includes(zipCode.trim())) {
        setZipList([...zipList, zipCode.trim()]);
      }
      setZipCode("");
    } else if (e.key === "Backspace" && zipCode === "") {
      setZipList(zipList.slice(0, -1)); // Remove last ZIP on backspace
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      interested_locations: zipList,
    }));
  }, [zipList]);

  const removeZip = (index) => {
    const newList = [...zipList];
    newList.splice(index, 1);
    setZipList(newList);
  };

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
                <div>
                  <label htmlFor="city">City</label>
                  <input type="text" className="input_auth" name="city" onChange={handleChange} value={formData.city} />
                </div>
              </div>

              <div className="input_one_row">
                <div>
                  <label htmlFor="cnic">CNIC</label>
                  <input type="text" className="input_auth" name="cnic" onChange={handleChange} value={formData.cnic} />
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
                  <label htmlFor="interested_locations">Interested Locations</label>
                  <input
                    type="text"
                    className="input_auth"
                    name="interested_locations"
                    placeholder="Enter ZIP code and press Enter"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />

                  <div className="zip-tags">
                    {zipList.map((zip, index) => (
                      <span key={index} className="zip-tag">
                        {zip}
                        <button onClick={() => removeZip(index)}>&times;</button>
                      </span>
                    ))}
                  </div>

                  {/* Hidden input to include in formData */}
                  <input type="hidden" name="interested_locations" value={zipList.join(",")} />
                </div>

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

                <div>
                  <label htmlFor="description">Description</label>
                  <input type="text" className="input_auth" name="description" onChange={handleChange} value={formData.description} />
                </div>
                <div>
                  <label htmlFor="disability_status">Disability Status</label>
                  <input type="text" className="input_auth" name="disability_status" onChange={handleChange} value={formData.disability_status} />
                </div>
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
                <Button variant="primary" type="submit">{loader ? (
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
