'use client';
// export const dynamic = "force-dynamic";

import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCloudUploadAlt, FaEdit, FaEye, FaEyeSlash, FaFileAudio, FaMicrophone, FaPause, FaUpload } from "react-icons/fa";
import { MdDelete, MdPause, MdPlayArrow } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import "./e-center.css";
import { UserContext } from "../userContext";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import Select from "react-select";
// import { Modal } from 'bootstrap';
import axios from "axios";
import dynamic from "next/dynamic";


export default function MyFormPage() {
    //   const searchParams = useSearchParams();
    //   const userType = searchParams.get("type");
    const searchParams = useSearchParams();
    const [userType, setUserType] = useState(null);
    const router = useRouter();
    const inputRefs = useRef([]);
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [loading, setLoading] = useState(false);

    // // Input change handler
    // const handleChangeOtp = (element, index) => {
    //     if (!isNaN(element.value)) {
    //         const newOtp = [...otp];
    //         newOtp[index] = element.value;
    //         setOtp(newOtp);

    //         // Move to next input automatically
    //         if (element.value && index < 5) {
    //             if (typeof window !== 'undefined' && inputRefs.current[index + 1]) {
    //                 inputRefs.current[index + 1].focus();
    //             }
    //         }
    //     }
    // };

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };



    useEffect(() => {
        const type = searchParams.get("type");
        setUserType(type);
    }, [searchParams]);
    const [loader, setLoader] = useState(false);

    const {
        apiCategory2,
        cities,
        locations,
        getLocations,
        ecenterAdd,
        userInfo,
        ecenterInfo
    } = useContext(UserContext);
    // console.log(userInfo, "ecenter console...")

    const [imagePerview, setImagePreview] = useState("");
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioURL, setAudioURL] = useState();
    const [isRecording, setIsRecording] = useState();
    const [eCenterOtp, setEcenterOtp] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const fileInputRef = useRef(null);

    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

    const [formErrors, setFormErrors] = useState({});
    const [selectedCityId, setSelectedCityId] = useState("");
    const [selectedAreaId, setSelectedAreaId] = useState("");
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedFields, setSelectedFields] = useState([]);
    // console.log(selectedCityId, "city id")

    const [formData, setFormData] = useState({
        profile_image: "",
        // first_name: "",
        // last_name: "",
        username: "",
        contact_number: "",
        email: "",
        address: "",
        gender: "",
        // user_city: "",
        cnic: "",
        age: "",
        cnic_scan: "",
        billing_address_scan: "",
        interested_locations: [],
        fields_of_interest: [],
        description: "",
        disability_status: "",
        experience: "",
        audio_sample_blob: "",
        picture: "",
        password: "",
        e_center_id: ""
        // city_id: ""
    });

    // console.log(formData, "form data print")

    const validateForm = () => {
        const currentRole = (userType || "").toLowerCase();
        const requiredFields = [
            "profile_image",
            "username",
            // "email",
            "contact_number",
            "address",
            "gender",
            "city_id",
            "cnic",
            "age",
            "fields_of_interest",
            // "description",
            ...(currentRole === "handyman" ? ["interested_locations", "area_id"] : []),
            // "billing_address_scan",
            "cnic_scan",
            "picture",
            "audio_sample_blob",
            "password"
        ];

        const errors = {};
        requiredFields.forEach((field) => {
            console.log("Checking field:", field, "Value:", formData[field]);
            if (!formData[field] || String(formData[field]).trim() === "") {
                errors[field] = "This field is required.";
            }
        });


        if (!cnicRegex.test(formData.cnic)) {
            errors.cnic = "CNIC must be in format xxxxx-xxxxxxx-x";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const formatCNIC = (value) => {
        const cleaned = value.replace(/\D/g, "");
        const part1 = cleaned.slice(0, 5);
        const part2 = cleaned.slice(5, 12);
        const part3 = cleaned.slice(12, 13);
        return [part1, part2, part3].filter(Boolean).join("-");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleChangeCnic = (e) => {
        const formatted = formatCNIC(e.target.value);
        setFormData((prev) => ({ ...prev, cnic: formatted }));
    };

    useEffect(() => {
        if (userInfo?.id) {
            setFormData(prev => ({
                ...prev,
                e_center_id: userInfo.id,
            }));
        }
    }, [userInfo]);

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     if (!file) return;
    //     const reader = new FileReader();
    //     reader.onloadend = () => setImagePreview(reader.result);
    //     reader.readAsDataURL(file);
    //     setFormData((prev) => ({ ...prev, profile_image: file }));
    // };

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

    const handleRemoveImage = () => {
        setImagePreview(null);
        setFormData((prev) => ({ ...prev, profile_image: null }));
        fileInputRef.current.value = ""; // reset file input
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFormData((prev) => ({ ...prev, [e.target.name]: file }));
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

    const handleFieldsChange = (selected) => {
        setSelectedFields(selected);
        const ids = selected.map((opt) => opt.value);
        setFormData((prev) => ({ ...prev, fields_of_interest: ids }));
    };

    const handleLocationChange = (selected) => {
        setSelectedLocation(selected);
        const ids = selected.map((opt) => opt.value);
        setFormData((prev) => ({ ...prev, interested_locations: ids }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fill all required fields.");
            return;
        }

        const form = new FormData();

        // Append static fields
        form.append("role", userType);
        form.append("city_id", selectedCityId);
        form.append("area_id", selectedAreaId);

        // Append dynamic fields with checks for files, blobs, arrays
        for (const key in formData) {
            const value = formData[key];

            if (userType === "provider" && (key === "disability_status" || key === "interested_locations")) {
                continue;
            }

            if (key === "profile_image" || key === "cnic_scan" || key === "picture" || key === "billing_address_scan") {
                if (value instanceof File) form.append(key, value);
                continue;
            }

            if (key === "audio_sample_blob") {
                if (typeof value === "string") {
                    form.append(key, value);
                } else if (value instanceof Blob || value instanceof File) {
                    const base64 = await blobToBase64(value);
                    form.append(key, base64);
                }
                continue;
            }

            if (Array.isArray(value)) {
                value.forEach(v => form.append(`${key}[]`, v));
            } else {
                form.append(key, value);
            }
        }

        try {
            setLoader(true);
            const response = await ecenterAdd(form);
            console.log("API response:", response);

            if (response.success === false && response.result?.status === false && response.result?.errors) {
                // Validation errors hain
                const apiErrors = response.result.errors;
                const firstErrorKey = Object.keys(apiErrors)[0];
                const firstErrorMsg = apiErrors[firstErrorKey][0];
                toast.error(firstErrorMsg);

                const mappedErrors = {};
                Object.keys(apiErrors).forEach(field => {
                    mappedErrors[field] = apiErrors[field][0];
                });
                setFormErrors(mappedErrors);
                return;
            }


            if (response && (response.success === true || response.success === "true" || response.success === 1)) {
                setEcenterOtp(response.result);
                toast.success(response.result.message || "Profile successfully created!");
                setFormData({
                    profile_image: "",
                    username: "",
                    contact_number: "",
                    email: "",
                    address: "",
                    gender: "",
                    cnic: "",
                    age: "",
                    cnic_scan: "",
                    billing_address_scan: "",
                    interested_locations: [],
                    fields_of_interest: [],
                    description: "",
                    disability_status: "",
                    experience: "",
                    audio_sample_blob: "",
                    picture: "",
                    password: "",
                });
                setFormErrors({});
                router.push("/")
            } else {
                toast.error(response.result?.message || "Something went wrong.");
            }
        } catch (err) {
            console.error("Catch error:", err);
            toast.error("Something went wrong.");
        } finally {
            setLoader(false);
        }


    };



    useEffect(() => {
        if (selectedCityId) getLocations(selectedCityId);
    }, [selectedCityId]);

    useEffect(() => {
        if (selectedAreaId) getLocations(selectedAreaId);
    }, [selectedAreaId]);

    const options = apiCategory2.map((cat) => ({
        label: cat.name,
        value: cat.id,
    }));

    const optionsLocation = locations.map((loc) => ({
        label: loc.name,
        value: loc.id,
    }));

    const optionsCity = cities.map((loc) => ({
        label: loc.name,
        value: loc.id,
    }));


    // useEffect(() => {
    //     if (modalRef.current) {
    //         const modalInstance = new Modal(modalRef.current, {
    //             backdrop: "static", // optional
    //             keyboard: false     // optional
    //         });
    //         modalInstance.show();
    //     }
    // }, []);

    // const handleVerify = async () => {
    //     const otpCode = otp.join("");

    //     if (otpCode.length !== 6) {
    //         toast.error("Please enter 6-digit OTP.");
    //         return;
    //     }

    //     setLoading(true);
    //     try {
    //         const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/verify-otp-submit`, {
    //             temp_id: eCenterOtp?.otp_id,
    //             otp: otpCode,
    //         });

    //         const resData = response?.data;

    //         if (response.status === 200 && resData?.status === true) {
    //             toast.success(resData?.message || "OTP verified successfully!");
    //             setOtp(["", "", "", "", "", ""]);
    //             // modalInstance.close();
    //         } else {
    //             toast.error(resData?.message || "Invalid OTP. Please try again.");
    //         }
    //     } catch (error) {
    //         console.error("OTP verification failed", error);
    //         const errorMessage = error?.response?.data?.message || "Server error occurred.";
    //         toast.error(errorMessage);
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    return (
        <section className="Form_section">
            <div className="container myform_page">
            <h2>Add New {userType == "handyman" ? "Individual" : userType == "provider" ? "Company" : ""}</h2>
            <form onSubmit={handleSubmit}>
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
                            capture="user"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            style={{ display: "none" }}
                        />
                    </div>
                    {formErrors.profile_image && <small style={{ color: "red" }}>{formErrors.profile_image}</small>}
                </div>


                {/* First and Last Name */}
                <div className="row input_one_row">
                    {/* <div className="col-lg-6">
                        <label htmlFor="first_name">First Name</label>
                        <input name="first_name" placeholder="First Name" onChange={handleChange} />
                        {formErrors.first_name && <small style={{ color: "red" }}>{formErrors.first_name}</small>}
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="last_name">Last Name</label>
                        <input name="last_name" placeholder="Last Name" onChange={handleChange} />
                        {formErrors.last_name && <small style={{ color: "red" }}>{formErrors.last_name}</small>}
                    </div> */}

                    <div className="col-lg-6">
                        <label htmlFor="username">Username</label>
                        <input name="username" placeholder="Username" value={formData.username || ""} onChange={handleChange} />
                        {formErrors.username && <small style={{ color: "red" }}>{formErrors.username}</small>}
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="email">Email</label>
                        <input name="email" placeholder="Email" type="email" onChange={handleChange} />
                        {/* {formErrors.email && <small style={{ color: "red" }}>{formErrors.email}</small>} */}
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="password">Password</label>
                        <div className="w-100" style={{ position: "relative" }}>
                            <input
                                name="password"
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                onChange={handleChange}
                                style={{ paddingRight: "40px" }}
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                style={{
                                    position: "absolute",
                                    right: "32px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {formErrors.password && (
                            <small style={{ color: "red" }}>{formErrors.password}</small>
                        )}
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="contact_number">Contact Number</label>
                        <input name="contact_number" placeholder="03009900999" type="number" onChange={handleChange} />
                        {formErrors.contact_number && <small style={{ color: "red" }}>{formErrors.contact_number}</small>}
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="address">Address</label>
                        <input name="address" placeholder="Address" onChange={handleChange} />
                        {formErrors.address && <small style={{ color: "red" }}>{formErrors.address}</small>}
                    </div>

                    <div className="col-lg-6">
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" onChange={handleChange}>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            {/* <option value="others">Others</option> */}
                        </select>
                        {formErrors.gender && <small style={{ color: "red" }}>{formErrors.gender}</small>}
                    </div>

                    <div className="input_select col-lg-6">
                        <label htmlFor="">Fields of Interest</label>
                        <MultiSelect options={options} hasSelectAll={false} value={selectedFields} onChange={handleFieldsChange} labelledBy="Select Fields" />
                        {formErrors.fields_of_interest && <small style={{ color: "red" }}>{formErrors.fields_of_interest}</small>}
                    </div>

                    <div className="col-lg-6">
                        <label htmlFor="cnic">CNIC</label>
                        <input name="cnic" accept="image/*" value={formData.cnic} placeholder="CNIC e.g. 12345-1234567-1" onChange={handleChangeCnic} />
                        {formErrors.cnic && <small style={{ color: "red" }}>{formErrors.cnic}</small>}
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="age">Age</label>
                        <input name="age" placeholder="Age" type="number" onChange={handleChange} />
                        {formErrors.age && <small style={{ color: "red" }}>{formErrors.age}</small>}
                    </div>

                    <div className="col-lg-6">
                        <label htmlFor="cnic_scan">CNIC Scan Copy</label>
                        <input type="file" name="cnic_scan" accept="image/*"
                            capture="environment" onChange={handleImageChange} />
                        {formErrors.cnic_scan && <small style={{ color: "red" }}>{formErrors.cnic_scan}</small>}
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="billing_address_scan">Billing Address Scan</label>
                        <input type="file" name="billing_address_scan" accept="image/*"
                            capture="environment" onChange={handleImageChange} />
                        {/* {formErrors.billing_address_scan && <small style={{ color: "red" }}>{formErrors.billing_address_scan}</small>} */}
                    </div>

                    <div className="col-lg-6">
                        <label htmlFor="city">City</label>
                        <Select
                            id="city"
                            options={optionsCity}
                            value={options.find(opt => opt.value === parseInt(selectedCityId))}
                            onChange={(selectedOption) => {
                                const cityId = selectedOption ? selectedOption.value : "";
                                setSelectedCityId(cityId);
                                setFormData(prev => ({ ...prev, city_id: cityId }));
                            }}
                            placeholder="Select City"
                            isClearable
                            isSearchable
                        />
                        {formErrors.city_id && <small style={{ color: "red" }}>{formErrors.city_id}</small>}
                    </div>


                    {userType !== "provider" && (
                        <div className="col-lg-6">
                            <label htmlFor="area">Area</label>
                            <Select
                                id="area"
                                options={optionsLocation}
                                value={options.find(opt => opt.value === parseInt(selectedAreaId))}
                                onChange={(selectedOption) => {
                                    const areaId = selectedOption ? selectedOption.value : "";
                                    setSelectedAreaId(areaId);
                                    setFormData(prev => ({ ...prev, area_id: areaId }));
                                }}
                                placeholder="Select Area"
                                isClearable
                                isSearchable
                            />
                            {formErrors.area_id && <small style={{ color: "red" }}>{formErrors.area_id}</small>}
                        </div>
                    )}

                    {userType !== "provider" && (
                        <div className="input_select col-lg-6">
                            <><label htmlFor="">Interested Locations</label>
                                <MultiSelect options={optionsLocation} hasSelectAll={false} value={selectedLocation} onChange={handleLocationChange} labelledBy="Interested Locations" /></>
                            {formErrors.interested_locations && <small style={{ color: "red" }}>{formErrors.interested_locations}</small>}
                        </div>
                    )}


                    {userType !== "provider" && (
                        <div className="col-lg-6">
                            <label htmlFor="description">Description</label>
                            <input name="description" placeholder="Description" onChange={handleChange} />
                            {formErrors.description && <small style={{ color: "red" }}>{formErrors.description}</small>}
                        </div>
                    )}


                    {userType !== "provider" && (
                        <div className="col-lg-6">
                            <><label htmlFor="disability_status">Disability Status</label>
                                <input name="disability_status" placeholder="Disability Status" onChange={handleChange} /></>
                            {/* {formErrors.disability_status && <small style={{ color: "red" }}>{formErrors.disability_status}</small>} */}
                        </div>
                    )}

                    {userType !== "provider" && (
                        <div className="col-lg-6">
                            <label htmlFor="experience">Experience</label>
                            <input name="experience" placeholder="Experience" type="number" onChange={handleChange} />
                            {formErrors.experience && <small style={{ color: "red" }}>{formErrors.experience}</small>}
                        </div>
                    )}

                    <div className="col-lg-6">
                        <label htmlFor="picture">Police Verification</label>
                        <input type="file" name="picture" accept="image/*" onChange={handleImageChange} />
                        {formErrors.picture && <small style={{ color: "red" }}>{formErrors.picture}</small>}
                    </div>

                </div>

                {/* Audio Sample */}
                <div className="w-100">
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

                    {formErrors.audio_sample_blob && (
                        <small style={{ color: "red" }}>{formErrors.audio_sample_blob}</small>
                    )}
                </div>


                {/* Submit */}
                <div className="form-footer mt-4 text-center w-100">
                    <button type="submit" className="btn btn_primary w-lg-25 w-50" style={{ color: "white" }}>
                        {loader ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Submit...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </form>
            {/* <ToastContainer /> */}

            {/* <div
                className="modal fade"
                id="otpModal"
                tabIndex="-1"
                aria-labelledby="otpModalLabel"
                aria-hidden="true"
                ref={modalRef}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="otpModalLabel">Enter OTP</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body text-center">
                            <p>Please enter the 6-digit OTP.</p>
                            <div className="d-flex justify-content-center gap-2">
                                {otp.map((data, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        ref={(el) => inputRefs.current[index] = el}
                                        className="form-control text-center"
                                        style={{ width: "40px", height: "40px", fontSize: "1.5rem" }}
                                        value={otp[index]}
                                        onChange={(e) => handleChangeOtp(e.target, index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn_primary w-100 text-white"
                                onClick={handleVerify}
                                disabled={loading}
                            >
                                {loading ? "Verifying..." : "Verify OTP"}
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

        </div>
        </section>
    );
}
