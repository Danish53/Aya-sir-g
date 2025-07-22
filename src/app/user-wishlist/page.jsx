"use client";
import React, { useContext, useEffect, useState } from "react";
import "./wishlist.css";
import WishlistComponent from "../components/wishlist/WishlistComponent"
import { UserContext } from "../userContext";
import Advartisement from "@/app/components/AdvertisementBar/Advartisement";

export default function page() {

  const { userInfo } = useContext(UserContext);
  const [likedUser, setLikedUser] = useState("");
  // console.log(likedUser, "......ok")

  const getLikedUsers = async () => {
    if (!userInfo?.api_token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/i-liked`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.api_token}`,
        },
      });

      const data = await res.json();
      setLikedUser(data?.i_liked)

    } catch (err) {
      console.error("Error fetching liked users", err);
    }
  };

  useEffect(() => {
    getLikedUsers();
  }, [userInfo]);


  return (
    <section className="wishlist margin_navbar">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3 ad_bar p-0 hide_bar">
            <Advartisement />
          </div>
          <div className="col-lg-9">
            <div className="row">
              {likedUser.length > 0 ? (
                likedUser.map((user) => (
                  <div className="col-lg-4">
                    <WishlistComponent key={user.id} data={user} />
                  </div>
                ))
              ) : (
                <p>No liked users found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
