"use client";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  console.log(userInfo, "get profile")

  const [apiCategory2, setapiCategories2] = useState([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const categoryApi = `${baseUrl}/api/category-list`;

  const getCategories = async () => {
    try {
      const res = await fetch(categoryApi);
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
  const fetchUserProfile = async () => {
    if (!userInfo?.api_token) return;
    setLoader(true);
    try {
      const res = await fetch(profileUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.api_token}`,
        },
        body: JSON.stringify({role: "handyman"}),
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
        await fetchUserProfile();
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
      fetchUserProfile();
    }
  }, [userInfo?.api_token]);

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
        loader
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
