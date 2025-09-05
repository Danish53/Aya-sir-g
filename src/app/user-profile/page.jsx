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
import axios from "axios";

export default function Page() {

  const { userInfo, userDetails, updateUserProfile } = useContext(UserContext);
  // console.log(userInfo, "oooooo");
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

  // profiles all
  const [accounts, setAccounts] = useState();
  const accountsAssociate = async () => {
    try {
      let token = "";
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("token");
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            token = parsedUser.api_token || "";
          } catch (e) {
            console.error("Error parsing token from localStorage", e);
          }
        }
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/associate-accounts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      // console.log(data, "profilessss")
      setAccounts(data.data.accounts);
    } catch (error) {
      console.log("Error while fetching accounts");
    }
  };

  useEffect(() => {
    accountsAssociate();
  }, []);

  return (
    <section className="user_profile margin_navbar">
      <div className="container py-3">
        <div className="row profile_flex">
          <div className="col-lg-9 text-center">
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
        <div className="row my-3">
          {
            accounts?.length !== 0 && (
              <h3 className="mb-3 text-center">Associated Accounts</h3>
            )
          }
          {
            accounts?.map((data) => {
              return (
                <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
                  <div className="profile_card h-100">
                    <div className="card_div py-3 px-4 h-100" style={{
                      height: "auto",
                      overflow: "hidden",
                      transition: "0.3s ease"
                    }}>
                      <div className="d-flex justify-content-center flex-column align-items-center w-100">
                        <img src={data?.profile_image || "/assets/person_img.png"} alt="person" />
                        <p className="person_info">{data?.username || "No Name"}</p>

                        <div className="heart_div position-relative">
                          <p className="person_info">
                            {data?.gender === "male" ? "Male" : data?.gender === "female" ? "Female" : ""}, {data?.age || "Age"} years old
                          </p>
                          <p className="person_info text-center mt-1">
                            {data?.contact_number}
                          </p>

                        </div>

                        {/* <div className="details_div mt-3">
                        {data?.address && (
                          <div>
                            <p>
                              <strong>Interested Location:</strong>{" "}
                              <span className="data_pro">
                              </span>
                            </p>
                          </div>
                        )}
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
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
                  type="number"
                  className="input_auth"
                  placeholder="03009900999"
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
      {/* <ToastContainer /> */}
    </section>
  );
}
