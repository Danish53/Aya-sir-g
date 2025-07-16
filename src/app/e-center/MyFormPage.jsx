// "use client";
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { FaEdit, FaMicrophone } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { MultiSelect } from "react-multi-select-component";
// import { toast, ToastContainer } from "react-toastify";
// import { useSearchParams } from "next/navigation";
// import "react-toastify/dist/ReactToastify.css";
// import "./e-center.css";
// import { UserContext } from "../userContext";

// export default function MyFormPage() {
//     const searchParams = useSearchParams();
//     const userType = searchParams.get("type");
//     const [loader, setLoader] = useState();

//     const {
//         apiCategory2,
//         cities,
//         locations,
//         getLocations,
//         updateUserProfile,
//     } = useContext(UserContext);

//     const [imagePerview, setImagePreview] = useState("/assets/person_img.png");
//     const [isRecording, setIsRecording] = useState(false);
//     const [audioURL, setAudioURL] = useState(null);
//     const mediaRecorderRef = useRef(null);
//     const audioChunksRef = useRef([]);
//     const fileInputRef = useRef(null);

//     const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

//     const [formErrors, setFormErrors] = useState({});
//     const [selectedCityId, setSelectedCityId] = useState("");
//     const [selectedLocation, setSelectedLocation] = useState([]);
//     const [selectedFields, setSelectedFields] = useState([]);

//     const [formData, setFormData] = useState({
//         profile_picture: "",
//         first_name: "",
//         last_name: "",
//         username: "",
//         contact_number: "",
//         email: "",
//         address: "",
//         gender: "",
//         user_city: "",
//         cnic: "",
//         age: "",
//         cnic_scan: "",
//         billing_address_scan: "",
//         interested_locations: [],
//         fields_of_interest: [],
//         description: "",
//         disability_status: "",
//         experience: "",
//         audio_sample: "",
//     });

//     const validateForm = () => {
//         const requiredFields = [
//             "first_name",
//             "last_name",
//             "username",
//             "email",
//             "contact_number",
//             "address",
//             "gender",
//             "user_city",
//             "cnic",
//             "age",
//             "description",
//             "experience",
//         ];

//         const errors = {};
//         requiredFields.forEach((field) => {
//             if (!formData[field]) errors[field] = "This field is required.";
//         });

//         if (!cnicRegex.test(formData.cnic)) {
//             errors.cnic = "CNIC must be in format xxxxx-xxxxxxx-x";
//         }

//         setFormErrors(errors);
//         return Object.keys(errors).length === 0;
//     };

//     const formatCNIC = (value) => {
//         const cleaned = value.replace(/\D/g, "");
//         const part1 = cleaned.slice(0, 5);
//         const part2 = cleaned.slice(5, 12);
//         const part3 = cleaned.slice(12, 13);
//         return [part1, part2, part3].filter(Boolean).join("-");
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleChangeCnic = (e) => {
//         const formatted = formatCNIC(e.target.value);
//         setFormData((prev) => ({ ...prev, cnic: formatted }));
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         const reader = new FileReader();
//         reader.onloadend = () => setImagePreview(reader.result);
//         reader.readAsDataURL(file);
//         setFormData((prev) => ({ ...prev, profile_picture: file }));
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         setFormData((prev) => ({ ...prev, [e.target.name]: file }));
//     };

//     const handleStartRecording = async () => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             mediaRecorderRef.current = new MediaRecorder(stream);
//             mediaRecorderRef.current.ondataavailable = (event) => {
//                 if (event.data.size > 0) audioChunksRef.current.push(event.data);
//             };
//             mediaRecorderRef.current.onstop = () => {
//                 const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
//                 setAudioURL(URL.createObjectURL(audioBlob));
//                 setFormData((prev) => ({ ...prev, audio_sample: audioBlob }));
//                 audioChunksRef.current = [];
//             };
//             mediaRecorderRef.current.start();
//             setIsRecording(true);
//         } catch {
//             alert("Microphone permission denied.");
//         }
//     };

//     const handleStopRecording = () => {
//         mediaRecorderRef.current?.stop();
//         setIsRecording(false);
//     };

//     const handleDeleteAudio = () => {
//         setAudioURL(null);
//         setFormData((prev) => ({ ...prev, audio_sample: "" }));
//     };

//     const handleFieldsChange = (selected) => {
//         setSelectedFields(selected);
//         const ids = selected.map((opt) => opt.value);
//         setFormData((prev) => ({ ...prev, fields_of_interest: ids }));
//     };

//     const handleLocationChange = (selected) => {
//         setSelectedLocation(selected);
//         const ids = selected.map((opt) => opt.value);
//         setFormData((prev) => ({ ...prev, interested_locations: ids }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) {
//             toast.error("Please fix errors in form.");
//             return;
//         }

//         const form = new FormData();

//         for (const key in formData) {
//             if (userType === "provider" && key === "disability_status") continue;
//             if (userType === "provider" && key === "interested_locations") continue;

//             if (Array.isArray(formData[key])) {
//                 formData[key].forEach((val) => form.append(`${key}[]`, val));
//             } else {
//                 form.append(key, formData[key]);
//             }
//         }

//         form.append("role", userType);

//         try {
//             setLoader(true)
//             const response = await updateUserProfile(form);
//             if (response.success) toast.success("Form submitted successfully!");
//             else toast.error(response.message || "Form submit failed.");
//         } catch (err) {
//             console.error("Update error:", err);
//             toast.error("Something went wrong during update.");
//         }finally{
//             setLoader(false)
//         }
//     };

//     useEffect(() => {
//         if (selectedCityId) getLocations(selectedCityId);
//     }, [selectedCityId]);

//     const options = apiCategory2.map((cat) => ({ label: cat.name, value: cat.id }));
//     const optionsLocation = locations.map((loc) => ({ label: loc.name, value: loc.id }));

//     return (
//         <div className="container myform_page">
//             <form onSubmit={handleSubmit}>
//                 <div className="image_div" onClick={() => fileInputRef.current.click()}>
//                     <img src={imagePerview} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
//                     <FaEdit className="edit_icon" />
//                 </div>
//                 <input type="file" name="profile_picture" accept="image/*" onChange={handleFileChange} ref={fileInputRef} style={{ display: "none" }} />

//                 <div className="input_one_row">
//                     <input name="first_name" placeholder="First Name" onChange={handleChange} />
//                     {formErrors.first_name && <small style={{ color: "red" }}>{formErrors.first_name}</small>}
//                     <input name="last_name" placeholder="Last Name" onChange={handleChange} />
//                     {formErrors.last_name && <small style={{ color: "red" }}>{formErrors.last_name}</small>}
//                 </div>

//                 <div className="input_one_row">
//                     <input name="username" placeholder="Username" onChange={handleChange} />
//                     {formErrors.username && <small style={{ color: "red" }}>{formErrors.username}</small>}
//                     <input name="email" placeholder="Email" type="email" onChange={handleChange} />
//                     {formErrors.email && <small style={{ color: "red" }}>{formErrors.email}</small>}
//                 </div>

//                 <div className="input_one_row">
//                     <input name="contact_number" placeholder="Contact Number" onChange={handleChange} />
//                     {formErrors.contact_number && <small style={{ color: "red" }}>{formErrors.contact_number}</small>}
//                     <input name="address" placeholder="Address" onChange={handleChange} />
//                     {formErrors.address && <small style={{ color: "red" }}>{formErrors.address}</small>}
//                 </div>

//                 <div className="input_one_row">
//                     <select name="gender" onChange={handleChange}>
//                         <option value="">Select Gender</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="others">Others</option>
//                     </select>
//                     {formErrors.gender && <small style={{ color: "red" }}>{formErrors.gender}</small>}

//                     <MultiSelect options={options} value={selectedFields} onChange={handleFieldsChange} labelledBy="Select Fields" />
//                 </div>

//                 <div className="input_one_row">
//                     <input name="cnic" value={formData.cnic} placeholder="CNIC e.g. 12345-1234567-1" onChange={handleChangeCnic} />
//                     {formErrors.cnic && <small style={{ color: "red" }}>{formErrors.cnic}</small>}
//                     <input name="age" placeholder="Age" type="number" onChange={handleChange} />
//                     {formErrors.age && <small style={{ color: "red" }}>{formErrors.age}</small>}
//                 </div>

//                 <div className="input_one_row">
//                     <input type="file" name="cnic_scan" onChange={handleImageChange} />
//                     <input type="file" name="billing_address_scan" onChange={handleImageChange} />
//                 </div>

//                 <div className="input_one_row">
//                     <select
//                         onChange={(e) => {
//                             const cityId = e.target.value;
//                             const selectedCity = cities.find((city) => city.id === parseInt(cityId));
//                             setSelectedCityId(cityId);
//                             setFormData((prev) => ({ ...prev, user_city: selectedCity?.name || "" }));
//                         }}
//                         value={selectedCityId}
//                     >
//                         <option value="">Select City</option>
//                         {cities.map((city) => (
//                             <option key={city.id} value={city.id}>{city.name}</option>
//                         ))}
//                     </select>
//                     {formErrors.user_city && <small style={{ color: "red" }}>{formErrors.user_city}</small>}

//                     {userType !== "provider" && (
//                         <MultiSelect options={optionsLocation} value={selectedLocation} onChange={handleLocationChange} labelledBy="Interested Locations" />
//                     )}
//                 </div>

//                 <div className="input_one_row">
//                     <input name="description" placeholder="Description" onChange={handleChange} />
//                     {formErrors.description && <small style={{ color: "red" }}>{formErrors.description}</small>}

//                     {userType !== "provider" && (
//                         <input name="disability_status" placeholder="Disability Status" onChange={handleChange} />
//                     )}
//                 </div>

//                 <div className="input_one_row">
//                     <input name="experience" placeholder="Experience" type="number" onChange={handleChange} />
//                     {formErrors.experience && <small style={{ color: "red" }}>{formErrors.experience}</small>}
//                 </div>

//                 <div className="input_row_full">
//                     <div className="audio_class">
//                         <div className="d-flex gap-3">
//                             <FaMicrophone className="audio_icon" />
//                             {!isRecording ? (
//                                 <button type="button" className="btn btn-primary" onClick={handleStartRecording}>
//                                     Start Recording
//                                 </button>
//                             ) : (
//                                 <button type="button" className="btn btn-secondary" onClick={handleStopRecording}>
//                                     Stop Recording
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="form-footer mt-4">
//                     <button type="submit" className="btn btn-primary">{loader ? (
//                   <>
//                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                     Submit...
//                   </>
//                 ) : (
//                   "Submit"
//                 )}</button>
//                 </div>
//             </form>
//             <ToastContainer />
//         </div>
//     );
// }


"use client";
export const dynamic = "force-dynamic"; // ⬅️ Prevents prerender build error

import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEdit, FaMicrophone } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import "./e-center.css";
import { UserContext } from "../userContext";

export default function MyFormPage() {
    //   const searchParams = useSearchParams();
    //   const userType = searchParams.get("type");
    const searchParams = useSearchParams();
    const [userType, setUserType] = useState(null);

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
        updateUserProfile,
    } = useContext(UserContext);

    const [imagePerview, setImagePreview] = useState("/assets/person_img.png");
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const fileInputRef = useRef(null);

    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

    const [formErrors, setFormErrors] = useState({});
    const [selectedCityId, setSelectedCityId] = useState("");
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedFields, setSelectedFields] = useState([]);

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
        interested_locations: [],
        fields_of_interest: [],
        description: "",
        disability_status: "",
        experience: "",
        audio_sample: "",
    });

    const validateForm = () => {
        const requiredFields = [
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
        setFormData((prev) => ({ ...prev, profile_picture: file }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFormData((prev) => ({ ...prev, [e.target.name]: file }));
    };

    const handleStartRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) audioChunksRef.current.push(event.data);
            };
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, {
                    type: "audio/webm",
                });
                setAudioURL(URL.createObjectURL(audioBlob));
                setFormData((prev) => ({ ...prev, audio_sample: audioBlob }));
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

        try {
            setLoader(true);
            const response = await updateUserProfile(form);
            if (response.success) toast.success("Form submitted successfully!");
            else toast.error(response.message || "Form submit failed.");
        } catch (err) {
            console.error("Update error:", err);
            toast.error("Something went wrong during update.");
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
            <form onSubmit={handleSubmit}>
                <div className="image_div" onClick={() => fileInputRef.current.click()}>
                    <img
                        src={imagePerview}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                    <FaEdit className="edit_icon" />
                </div>
                <input
                    type="file"
                    name="profile_picture"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                />

                {/* First and Last Name */}
                <div className="input_one_row">
                    <input name="first_name" placeholder="First Name" onChange={handleChange} />
                    {formErrors.first_name && <small style={{ color: "red" }}>{formErrors.first_name}</small>}
                    <input name="last_name" placeholder="Last Name" onChange={handleChange} />
                    {formErrors.last_name && <small style={{ color: "red" }}>{formErrors.last_name}</small>}
                </div>

                {/* Username + Email */}
                <div className="input_one_row">
                    <input name="username" placeholder="Username" onChange={handleChange} />
                    {formErrors.username && <small style={{ color: "red" }}>{formErrors.username}</small>}
                    <input name="email" placeholder="Email" type="email" onChange={handleChange} />
                    {formErrors.email && <small style={{ color: "red" }}>{formErrors.email}</small>}
                </div>

                {/* Contact + Address */}
                <div className="input_one_row">
                    <input name="contact_number" placeholder="Contact Number" onChange={handleChange} />
                    {formErrors.contact_number && <small style={{ color: "red" }}>{formErrors.contact_number}</small>}
                    <input name="address" placeholder="Address" onChange={handleChange} />
                    {formErrors.address && <small style={{ color: "red" }}>{formErrors.address}</small>}
                </div>

                {/* Gender + Fields */}
                <div className="input_one_row">
                    <select name="gender" onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                    {formErrors.gender && <small style={{ color: "red" }}>{formErrors.gender}</small>}

                    <MultiSelect options={options} value={selectedFields} onChange={handleFieldsChange} labelledBy="Select Fields" />
                </div>

                {/* CNIC + Age */}
                <div className="input_one_row">
                    <input name="cnic" value={formData.cnic} placeholder="CNIC e.g. 12345-1234567-1" onChange={handleChangeCnic} />
                    {formErrors.cnic && <small style={{ color: "red" }}>{formErrors.cnic}</small>}
                    <input name="age" placeholder="Age" type="number" onChange={handleChange} />
                    {formErrors.age && <small style={{ color: "red" }}>{formErrors.age}</small>}
                </div>

                {/* File Uploads */}
                <div className="input_one_row">
                    <input type="file" name="cnic_scan" onChange={handleImageChange} />
                    <input type="file" name="billing_address_scan" onChange={handleImageChange} />
                </div>

                {/* City + Locations */}
                <div className="input_one_row">
                    <select
                        onChange={(e) => {
                            const cityId = e.target.value;
                            const selectedCity = cities.find((city) => city.id === parseInt(cityId));
                            setSelectedCityId(cityId);
                            setFormData((prev) => ({ ...prev, user_city: selectedCity?.name || "" }));
                        }}
                        value={selectedCityId}
                    >
                        <option value="">Select City</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </select>
                    {formErrors.user_city && <small style={{ color: "red" }}>{formErrors.user_city}</small>}

                    {userType !== "provider" && (
                        <MultiSelect options={optionsLocation} value={selectedLocation} onChange={handleLocationChange} labelledBy="Interested Locations" />
                    )}
                </div>

                {/* Description + Disability */}
                <div className="input_one_row">
                    <input name="description" placeholder="Description" onChange={handleChange} />
                    {formErrors.description && <small style={{ color: "red" }}>{formErrors.description}</small>}

                    {userType !== "provider" && (
                        <input name="disability_status" placeholder="Disability Status" onChange={handleChange} />
                    )}
                </div>

                {/* Experience */}
                <div className="input_one_row">
                    <input name="experience" placeholder="Experience" type="number" onChange={handleChange} />
                    {formErrors.experience && <small style={{ color: "red" }}>{formErrors.experience}</small>}
                </div>

                {/* Audio Sample */}
                <div className="input_row_full">
                    <div className="audio_class">
                        <div className="d-flex gap-3">
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
                            {audioURL && (
                                <>
                                    <audio controls src={audioURL} />
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteAudio}>
                                        <MdDelete /> Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="form-footer mt-4">
                    <button type="submit" className="btn btn_primary" style={{ color: "white" }}>
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
