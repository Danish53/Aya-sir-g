"use client";
import React, { useContext, useEffect, useState } from "react";
import "./wishlist.css";
import WishlistComponent from "../components/wishlist/WishlistComponent"
import { UserContext } from "../userContext";

export default function page() {

  const { userInfo } = useContext(UserContext);

  console.log(userInfo?.api_token, "token")
  const [likedUser, setLikedUser] = useState("");
  console.log(likedUser, "......ok")

  const getLikedUsers = async () => {
    if (!userInfo?.api_token) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/i-liked`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.api_token}`,
        },
      });

      console.log(res, "ddddddatatatat")
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
      <div className="container ">
        <div className="wishlist_card_div py-5">
          {likedUser.length > 0 ? (
            likedUser.map((user) => (
              <WishlistComponent key={user.id} data={user} />
            ))
          ) : (
            <p>No liked users found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
