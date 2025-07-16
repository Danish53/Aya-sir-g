import React from "react";
import "./wishlistcard.css";
import Link from "next/link";

export default function WishlistComponent({data}) {
  return (
    <div className="wishlistcard py-3 mb-3">
      <div className="info_div">
        <img src={data?.profile_image || "/assets/raza.png"} alt="" />
        <h2>{data?.username || ""}</h2>
        <p>{data?.gender || ""}, {data?.age || ""} years old</p>
      </div>
      <div className="details_div">
        <div className="single_div">
          <p className="field">Field</p>
        </div>
        <div className="single_div">
          <p className="field">Interested Location:</p>
        </div>
        <div className="single_div">
          <p className="field">Current Address: {data?.user_city || ""}</p>
        </div>
        {/* <Link href={`/profile-details/${data?.id}`}>
        </Link> */}
        <div className="verified_div mt-4 mb-2">
          {data && (
            <button className="verified_btn">
              Verified <FaCheck className="tik_icon" />
            </button>
          )}
          <Link href={`/profile-details/${data?.id}`} className="verified_btn card_btn_background">More Details</Link>
        </div>
      </div>
    </div>
  );
}
