"use client";
export const dynamic = "force-dynamic"; // ⬅️ Prevents prerender build error

import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEdit, FaMicrophone, FaPause } from "react-icons/fa";
import { MdDelete, MdPause, MdPlayArrow } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import "./e-center.css";
import { UserContext } from "../userContext";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";


export default function MyFormPage() {
    //   const searchParams = useSearchParams();
    //   const userType = searchParams.get("type");
    const searchParams = useSearchParams();
    const [userType, setUserType] = useState(null);
    const router = useRouter();

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
        ecenterInfo
    } = useContext(UserContext);
    // console.log(ecenterInfo, "ecenter console...")

    const [imagePerview, setImagePreview] = useState("");
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioURL, setAudioURL] = useState();
    const [isRecording, setIsRecording] = useState();

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const fileInputRef = useRef(null);

    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

    const [formErrors, setFormErrors] = useState({});
    const [selectedCityId, setSelectedCityId] = useState("");
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedFields, setSelectedFields] = useState([]);
    console.log(selectedCityId, "city id")

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
        interested_locations: [],
        fields_of_interest: [],
        description: "",
        disability_status: "",
        experience: "",
        audio_sample: "",
        picture: "",
        password: "",
        city_id: ""
    });

    console.log(formData, "form data print")

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
            "cnic",
            "age",
            "description",
            "experience",
            "billing_address_scan",
            "cnic_scan",
            "picture",
            "audio_sample",
            "password"
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

    const formatCNIC = (value) => {
        const cleaned = value.replace(/\D/g, "");
        const part1 = cleaned.slice(0, 5);
        const part2 = cleaned.slice(5, 12);
        const part3 = cleaned.slice(12, 13);
        return [part1, part2, part3].filter(Boolean).join("-");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChangeCnic = (e) => {
        const formatted = formatCNIC(e.target.value);
        setFormData((prev) => ({ ...prev, cnic: formatted }));
    };

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

    // const handleStartRecording = async () => {
    //     try {
    //         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //         mediaRecorderRef.current = new MediaRecorder(stream);
    //         mediaRecorderRef.current.ondataavailable = (event) => {
    //             if (event.data.size > 0) audioChunksRef.current.push(event.data);
    //         };
    //         mediaRecorderRef.current.onstop = () => {
    //             const audioBlob = new Blob(audioChunksRef.current, {
    //                 type: "audio/webm",
    //             });
    //             setAudioURL(URL.createObjectURL(audioBlob));
    //             setFormData((prev) => ({ ...prev, audio_sample: audioBlob }));
    //             audioChunksRef.current = [];
    //         };
    //         mediaRecorderRef.current.start();
    //         setIsRecording(true);
    //     } catch {
    //         alert("Microphone permission denied.");
    //     }
    // };

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
                    audio_sample: blob, // ✅ Add this line
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
            toast.error("Please fix errors in form.");
            return;
        }

        const form = new FormData();

        for (const key in formData) {
            if (userType === "provider" && key === "disability_status") continue;
            if (userType === "provider" && key === "interested_locations") continue;

            if (Array.isArray(formData[key])) {
                formData[key].forEach((val) => form.append(`${key}[]`, val));
            } else {
                form.append(key, formData[key]);
            }
        }

        form.append("role", userType);
        form.append("city_id", selectedCityId);

        try {
            setLoader(true);
            const response = await ecenterAdd(form);
            if (response.success) toast.success("Profile has been successfully Created!");
            else toast.error(response.message || "Form submit failed.");

            // router.push("ecenter-record")
        } catch (err) {
            console.error("Update error:", err);
            toast.error(err.errors[0].message ||"Something went wrong during update.");
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (selectedCityId) getLocations(selectedCityId);
    }, [selectedCityId]);

    const options = apiCategory2.map((cat) => ({
        label: cat.name,
        value: cat.id,
    }));

    const optionsLocation = locations.map((loc) => ({
        label: loc.name,
        value: loc.id,
    }));

    return (
        <div className="container myform_page">
            <h2>Add New {userType == "handyman" ? "Individual" : userType == "provider" ? "Company" : ""}</h2>
            <form onSubmit={handleSubmit}>
                <div
                    className="image_div cursor-pointer relative w-32 h-32"
                    onClick={() => !imagePerview && fileInputRef.current.click()}
                >
                    <img
                        src={
                            imagePerview ||
                            "/assets/person_img.png"
                        }
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
                    {formErrors.profile_image && <small style={{ color: "red" }}>{formErrors.profile_image}</small>}
                </div>


                {/* First and Last Name */}
                <div className="row input_one_row">
                    <div className="col-lg-6">
                        <label htmlFor="first_name">First Name</label>
                        <input name="first_name" placeholder="First Name" onChange={handleChange} />
                        {formErrors.first_name && <small style={{ color: "red" }}>{formErrors.first_name}</small>}
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="last_name">Last Name</label>
                        <input name="last_name" placeholder="Last Name" onChange={handleChange} />
                        {formErrors.last_name && <small style={{ color: "red" }}>{formErrors.last_name}</small>}
                    </div>

                    <div className="col-lg-6">
                        <label htmlFor="username">Username</label>
                        <input name="username" placeholder="Username" onChange={handleChange} />
                        {formErrors.username && <small style={{ color: "red" }}>{formErrors.username}</small>}
                    </div>
                    <div className="col-lg-6">
                        <label htmlFor="email">Email</label>
                        <input name="email" placeholder="Email" type="email" onChange={handleChange} />
                        {formErrors.email && <small style={{ color: "red" }}>{formErrors.email}</small>}
                    </div>

                    <div className="col-lg-6">
                        <label htmlFor="password">Password</label>
                        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
                        {formErrors.password && <small style={{ color: "red" }}>{formErrors.password}</small>}
                    </div>

                    <div className="col-lg-6">
                        <label htmlFor="contact_number">Contact Number</label>
                        <input name="contact_number" placeholder="Contact Number" onChange={handleChange} />
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
                            <option value="others">Others</option>
                        </select>
                        {formErrors.gender && <small style={{ color: "red" }}>{formErrors.gender}</small>}
                    </div>

                    <div className="input_select col-lg-6">
                        <label htmlFor="">Fields of Interest</label>
                        <MultiSelect options={options} hasSelectAll={false} value={selectedFields} onChange={handleFieldsChange} labelledBy="Select Fields" />
                    </div>

                    <div className="col-lg-6">
                        <label htmlFor="cnic">CNIC</label>
                        <input name="cnic" value={formData.cnic} placeholder="CNIC e.g. 12345-1234567-1" onChange={handleChangeCnic} />
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
                        {formErrors.billing_address_scan && <small style={{ color: "red" }}>{formErrors.billing_address_scan}</small>}
                    </div>

                    <div className="col-lg-6">
                        <label htmlFor="city">City</label>
                        <select
                            onChange={(e) => {
                                const cityId = e.target.value;
                                const selectedCity = cities.find((city) => city.id === parseInt(cityId));
                                setSelectedCityId(cityId);
                                setFormData((prev) => ({ ...prev, user_city: selectedCity?.name || "", city_id: cityId }));
                            }}
                            value={selectedCityId}
                        >
                            <option value="">Select City</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                        {formErrors.user_city && <small style={{ color: "red" }}>{formErrors.user_city}</small>}
                    </div>

                    {userType !== "provider" && (
                        <div className="input_select col-lg-6">
                            <><label htmlFor="">Interested Locations</label>
                                <MultiSelect options={optionsLocation} hasSelectAll={false} value={selectedLocation} onChange={handleLocationChange} labelledBy="Interested Locations" /></>
                        </div>
                    )}

                    <div className="col-lg-6">
                        <label htmlFor="description">Description</label>
                        <input name="description" placeholder="Description" onChange={handleChange} />
                        {formErrors.description && <small style={{ color: "red" }}>{formErrors.description}</small>}
                    </div>


                    {userType !== "provider" && (
                        <div className="col-lg-6">
                            <><label htmlFor="disability_status">Disability Status</label>
                                <input name="disability_status" placeholder="Disability Status" onChange={handleChange} /></>

                        </div>
                    )}

                    <div className="col-lg-6">
                        <label htmlFor="experience">Experience</label>
                        <input name="experience" placeholder="Experience" type="number" onChange={handleChange} />
                        {formErrors.experience && <small style={{ color: "red" }}>{formErrors.experience}</small>}
                    </div>

                    <div className="col-lg-6">
                        <label htmlFor="experience">Police Verification</label>
                        <input type="file" name="picture" onChange={handleImageChange} />
                        {formErrors.picture && <small style={{ color: "red" }}>{formErrors.picture}</small>}
                    </div>

                </div>

                {/* Audio Sample */}
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

                {/* Submit */}
                <div className="form-footer mt-4 text-center w-100">
                    <button type="submit" className="btn btn_primary w-25" style={{ color: "white" }}>
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
            <ToastContainer />
        </div>
    );
}
