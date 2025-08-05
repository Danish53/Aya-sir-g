"use client";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  // console.log(userInfo?.id, "get profile")

  const [apiCategory2, setapiCategories2] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const categoryApi = `${baseUrl}/api/category-list`;

  const getCategories = async () => {
    try {
      const res = await fetch(categoryApi, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setapiCategories2(data.data);
    } catch (error) {
      console.log("Error while fetching categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) {
      setLoadingUser(false);
      return;
    }
    try {
      const parsed = JSON.parse(token);
      setUserInfo(parsed);
    } catch (err) {
      console.error("Failed to parse token:", err);
    } finally {
      setLoadingUser(false);
    }
  }, []);

  //code for user profile
  const [userDetails, setUserDetails] = useState(null);
  console.log(userDetails, "fetch profile data");

  const [loader, setLoader] = useState(false);
  const token = userInfo?.api_token;
  // console.log("token is ", token);

  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://staging.hylanmaterialsupply.com";
  const profileUrl = `${base}/api/update-profile`;

  // const base =
  //   process.env.NEXT_PUBLIC_BASE_URL ||
  //   "https://staging.hylanmaterialsupply.com";
  // const url_profile = `${base}/api/update-profile`;
  // const profileUrl =
  //   url_profile || "https://staging.hylanmaterialsupply.com/api/update-profile";
  // const apiUrl = `${baseUrl}/api/update-profile`;

  // const fetchData = async () => {
  //   try {
  //     const res = await fetch(profileUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({}),
  //     });
  //     const data = await res.json();
  //     setUserDetails(data.data);
  //   } catch (error) {
  //     console.error("Error posting token:", error);
  //   }
  // };

  // 🔹 Fetch Profile Info
  const fetchUserProfile = async (id) => {
    if (!userInfo?.api_token) return;
    setLoader(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-detail/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.api_token}`,
        },
      });

      const data = await res.json();
      if (data?.data) {
        setUserDetails(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setLoader(false);
    }
  };

  // 🔹 Update Profile Info
  const updateUserProfile = async (formData) => {
    if (!userInfo?.api_token) return;
    setLoader(true);
    try {
      const res = await fetch(profileUrl, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          // "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.api_token}`,
        },
        body: formData,
      });

      const result = await res.json();
      // console.log(result, "profile update")
      if (res.ok) {
        await fetchUserProfile(userInfo?.id);
        setUserDetails(result.data);
        const updatedUserInfo = {
          ...userInfo,
          ...result.data,
        };
        // Step 3: Update Context + LocalStorage
        setUserInfo(updatedUserInfo);
        localStorage.setItem("token", JSON.stringify(updatedUserInfo));
        return { success: true };
      } else {
        return { success: false, message: result.message || "Update failed." };
      }
    } catch (error) {
      // console.error("Update failed:", error);
      return { success: false, message: "Something went wrong." };
    } finally {
      setLoader(false);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [userInfo]);

  useEffect(() => {
    if (userInfo?.api_token) {
      fetchUserProfile(userInfo?.id);
    }
  }, [userInfo?.api_token]);


  // get cities
  const [cities, setCities] = useState([]);
  const getCities = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/city-list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state_id: 2728 }),
      });

      const data = await res.json();
      // console.log(data, "city list")
      setCities(data.data || []);

      // setTimeout(() => {
      //   if (cityDropdownRef.current) {
      //     cityDropdownRef.current.click();
      //   }
      // }, 100);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
  };
  useEffect(() => {
    getCities()
  }, [])
  // locations zipcode
  const [locations, setLocations] = useState([]);
  const getLocations = async (cityId) => {
    try {
      const res = await fetch(`${baseUrl}/api/area-list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city_id: cityId }),
      });

      const data = await res.json();
      setLocations(data.data || []);

      // if (data.data && data.data.length > 0) {
      //   setTimeout(() => {
      //     if (locationDropdownRef.current) {
      //       locationDropdownRef.current.click();
      //     }
      //   }, 100);
      // }
    } catch (error) {
      console.error("Error fetching areas:", error);
      setLocations([]);
    }
  };

  useEffect(() => {
    getLocations()
  }, [])


  // filter api users/ companies
  const [filteredUsers, setFilteredUsers] = useState([]);

  const getFilteredUsers = async (params) => {
    setLoader(true);
    try {
      const response = await axios.get(
        `${baseUrl}/api/users/filter`, {
        params,
        headers: userInfo?.api_token
          ? {
            Authorization: `Bearer ${userInfo.api_token}`,
          }
          : {},
      }
      );

      // setFilteredUsers(response.data.data || []);
      if (response?.data) {
        const updatedData = (response.data.data || []).map((user) => ({
          ...user,
          can_like: !!user.can_like,
        }));
        setFilteredUsers(updatedData);
      } else {
        setFilteredUsers([]);
      }
    } catch (error) {
      console.error("Filter API error", error);
    } finally {
      setLoader(false);
    }
  };

  // likes api
  const [likedUsers, setLikedUsers] = useState([]);

  const toggleLike = async (userId, can_like) => {
    try {
      const res = await fetch(`${baseUrl}/api/users/${userId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.api_token}`,
        },
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      setLikedUsers((prev) => {
        if (can_like) {
          return [...prev, userId];
        } else {
          return prev.filter((id) => id !== userId);
        }
      });

      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId
            ? { ...user, can_like: !user.can_like }
            : user
        )
      );

      if (!can_like) {
        toast.success("You liked this user!");
      } else {
        toast.error("You disliked this user.");
      }

    } catch (error) {
      console.error("Error liking/disliking:", error);
    }
  };

  // const isUserLiked = (userId, can_like) => {
  //   return !can_like || likedUsers.includes(userId);
  // }


  const [banners, setServices] = useState([]);

  const getAllBanners = async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${baseUrl}/api/slider-list`);
      if (res?.data?.data) {
        setServices(res.data.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoader(false);
    }
  };


  // e-center 
  const [ecenterInfo, setEcenterInfo] = useState();
  const ecenterAdd = async (formData) => {
    if (!userInfo?.api_token) return;
    setLoader(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/send-otp`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          // "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.api_token}`,
        },
        body: formData,
      });

      const result = await res.json();
      // console.log(result, "profile update")
      if (res.ok) {
        setEcenterInfo(result);
        return { result };
      } else {
        return { success: false, message: result.message || "add failed." };
      }
    } catch (error) {
      // console.error("Update failed:", error);
      return { success: false, message: "Something went wrong." };
    } finally {
      setLoader(false);
    }
  };

  // rating/reviews
  const [reviews, setReviews] = useState();
  const addReviews = async (formData) => {
    if (!userInfo?.api_token) return;
    setLoader(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/save-handyman-rating`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          // "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.api_token}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setReviews(result);
        return { success: true };
      } else {
        return { success: false, message: result.message || "add failed." };
      }
    } catch (error) {
      return { success: false, message: "Something went wrong." };
    } finally {
      setLoader(false);
    }
  };


  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        apiCategory2,
        setapiCategories2,
        loadingUser,
        userDetails,
        setUserDetails,
        updateUserProfile,
        fetchUserProfile,
        loader,
        setCities,
        cities,
        setLocations,
        locations,
        getLocations,
        getCities,
        getFilteredUsers,
        filteredUsers,
        toggleLike,
        getAllBanners,
        banners,
        ecenterAdd,
        ecenterInfo,
        reviews,
        addReviews
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
