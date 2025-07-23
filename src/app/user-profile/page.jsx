"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./user-profile.css";
import { FaEdit, FaMicrophone } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../userContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast, ToastContainer } from "react-toastify";

export default function Page() {

  const { userDetails, updateUserProfile } = useContext(UserContext);
  // console.log(userDetails?.profile_image, "oooooo");
  const [imagePerview, setImagePreview] = useState(userDetails?.profile_image);
  // console.log(imagePerview, "imagePerview");
  // console.log(userDetails, ",,..,");
  // const [isRecording, setIsRecording] = useState(false);
  // const [audioURL, setAudioURL] = useState(null);
  // const mediaRecorderRef = useRef(null);
  // const audioChunksRef = useRef([]);
  const [formData, setFormData] = useState({
    profile_image: "", first_name: "", last_name: "", username: "", contact_number: "",
    email: "", address: "", user_city: ""
  });

  const [loader, setLoader] = useState(false);

  const fileInputRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setFormData({
        first_name: userDetails.first_name || "",
        last_name: userDetails.last_name || "",
        username: userDetails.username || "",
        contact_number: userDetails.contact_number || "",
        email: userDetails.email || "",
        address: userDetails.address || "",
        user_city: userDetails.user_city || "",
      });
    }
  }, [userDetails]);

  const handleImageClick = () => fileInputRef.current.click();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    setLoader(true);

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("contact_number", formData.contact_number);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("user_city", formData.user_city);
    formDataToSend.append("role", userDetails?.user_type);

    if (fileInputRef.current?.files?.[0]) {
      formDataToSend.append("profile_image", fileInputRef.current.files[0]);
    }


    // // Profile image (if selected)
    // if (fileInputRef.current?.files?.[0]) {
    //   formDataToSend.append("profile_image", fileInputRef.current.files[0]);
    // }

    const result = await updateUserProfile(formDataToSend);
    if (result.success) {
      toast.success("Profile updated successfully!");
      handleClose();
    } else {
      toast.error(result.message || "Update failed.");
    }

    setLoader(false);
  };


  return (
    <section className="user_profile margin_navbar">
      <div className="container py-5">
        <div className="row profile_flex">
          <div className="col-lg-9">
            <div className="profile_img_div py-5">
              {userDetails ? (
                <>
                  <img
                    src={userDetails?.profile_image || "/assets/profile.png"}
                    alt="user"
                  />
                  <div className="name_div d-flex">
                    <h3>{userDetails?.username}</h3>
                    {
                      userDetails?.user_type == "e-center" ? (
                        ""
                      ) : (
                        <FaEdit className="edit_icon" onClick={handleShow} />
                      )
                    }
                  </div>
                  <p id="city">{userDetails?.user_city}</p>
                </>
              ) : (
                <>
                  <Skeleton height={100} width={100} circle />
                  <div className="name_div d-flex mt-3 mb-3">
                    <Skeleton width={150} height={30} />
                    <Skeleton width={30} height={30} style={{ marginLeft: "10px" }} />
                  </div>
                  <Skeleton width={120} height={30} />
                </>
              )}
            </div>

            <div className="flex_div mb-3 d-flex align-items-center">
              <h3>Email Address:</h3>
              {userDetails ? <p>{userDetails?.email}</p> : <Skeleton width={200} />}
            </div>

            <div className="flex_div mb-3 d-flex align-items-center">
              <h3>Phone Number: </h3>
              {userDetails ? <p>{userDetails?.contact_number}</p> : <Skeleton width={150} />}
            </div>

            <div className="flex_div mb-3 d-flex align-items-center">
              <h3>Current Address: </h3>
              {userDetails ? <p>{userDetails?.address}</p> : <Skeleton width={180} />}
            </div>
          </div>
        </div>
      </div>

      {/* Update Modal (unchanged) */}
      <Modal
        className="user_update_model"
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Information</Modal.Title>
        </Modal.Header>

        <Modal.Body className="model_body">
          <form onSubmit={handleSubmit}>
            <div
              className="image_div"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            >
              <img
                src={imagePerview || "/assets/profile.png"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover" style={{ borderRadius: "50%", border: "1px solid #B50000" }}
              />
              <FaEdit className="edit_icon" />
            </div>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            />

            <div className="input_one_row">
              <div>
                <label htmlFor="first_name">First Name</label>
                <input
                  type="text"
                  className="input_auth"
                  placeholder="First Name"
                  id="first_name"
                  name="first_name"
                  onChange={handleChange}
                  value={formData.first_name}
                />
              </div>

              <div>
                <label htmlFor="last_name">Last Name</label>
                <input
                  type="text"
                  className="input_auth"
                  placeholder="Last Name"
                  id="last_name"
                  name="last_name"
                  onChange={handleChange}
                  value={formData.last_name}
                />
              </div>
            </div>

            <div className="input_one_row">
              <div>
                <label htmlFor="username">User Name</label>
                <input
                  type="text"
                  className="input_auth"
                  placeholder="User Name"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  value={formData.username}
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="input_auth"
                  placeholder="Email Address"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>

            <div className="input_one_row">
              <div>
                <label htmlFor="contact_no">Contact Number</label>
                <input
                  type="text"
                  className="input_auth"
                  placeholder="Phone Number"
                  name="contact_number"
                  id="contact_no"
                  onChange={handleChange}
                  value={formData.contact_number}
                />
              </div>

              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="input_auth"
                  placeholder="Address"
                  name="address"
                  id="address"
                  onChange={handleChange}
                  value={formData.address}
                />
              </div>
            </div>

            <div className="input_one_row">

              <div>
                <label htmlFor="address">City</label>
                <input
                  type="text"
                  className="input_auth"
                  placeholder="City"
                  name="user_city"
                  id="user_city"
                  onChange={handleChange}
                  value={formData.user_city}
                />
              </div>
            </div>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose} disabled={loader}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loader}>
                {loader ? (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : null}
                {loader ? "Updating..." : "Update"}
              </Button >
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </section>
  );
}
