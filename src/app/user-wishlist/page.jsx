"use client";
import React, { useContext, useEffect, useState } from "react";
import "./wishlist.css";
import WishlistComponent from "../components/wishlist/WishlistComponent";
import { UserContext } from "../userContext";
import Advartisement from "@/app/components/AdvertisementBar/Advartisement";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Skeleton Loader Component
function SkeletonCard() {
  return (
    <div className=" p-3 mb-3 skeleton" style={{ background: "lightgray", borderRadius: "6px" }}>
      <div className="info_div flex-column">
        <div className="img_skeleton skeleton-box"></div>
        <h2 className="text_skeleton skeleton-box"></h2>
        <p className="text_skeleton skeleton-box"></p>
      </div>
      <div className="details_div">
        <div className="single_div">
          <p className="text_skeleton skeleton-box"></p>
        </div>
        <div className="single_div">
          <p className="text_skeleton skeleton-box"></p>
        </div>
        <div className="single_div">
          <p className="text_skeleton skeleton-box"></p>
        </div>
        <div className="rating_div mt-2">
          <p className="text_skeleton skeleton-box"></p>
          <div className="star_respons_div mt-2">
            <div className="stars_div d-flex gap-1">
              <div className="star_skeleton skeleton-box"></div>
              <div className="star_skeleton skeleton-box"></div>
              <div className="star_skeleton skeleton-box"></div>
              <div className="star_skeleton skeleton-box"></div>
              <div className="star_skeleton skeleton-box"></div>
            </div>
          </div>
        </div>
        <div className="verified_div mt-4 mb-2">
          <div className="btn_skeleton skeleton-box"></div>
          <div className="btn_skeleton skeleton-box"></div>
        </div>
      </div>
    </div>
  );
}

export default function page() {
  const router = useRouter();
  const { userInfo } = useContext(UserContext);
  const [likedUser, setLikedUser] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;

  const getLikedUsers = async () => {
    if (!userInfo?.api_token) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/i-liked`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.api_token}`,
        },
      });

      const data = await res.json();
      setLikedUser(data?.i_liked || []);
    } catch (err) {
      router.push("/error");
      console.error("Error fetching liked users", err);
      setLikedUser([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLikedUsers();
  }, [userInfo]);

  // Pagination calculations
  const totalPages = Math.ceil(likedUser.length / cardsPerPage);

  // Generate page numbers array for buttons
  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Slice likedUser data for current page
  const currentCards = Array.isArray(likedUser)
    ? likedUser.slice(
      (currentPage - 1) * cardsPerPage,
      currentPage * cardsPerPage
    )
    : [];

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };


  return (
    <section className="wishlist margin_navbar">
      <div className="container py-3">
        <div className="row">
          <div className="col-lg-3 ad_bar p-0 hide_bar">
            <Advartisement />
          </div>
          <div className="col-lg-9">
            <div className="row align-items-stretch">
              {loading
                ? // Show skeleton loader cards
                [...Array(cardsPerPage)].map((_, i) => (
                  <div className="col-lg-4 h-100" key={i}>
                    <SkeletonCard />
                  </div>
                ))
                : currentCards.length > 0
                  ? currentCards.map((user) => (
                    <div className="col-lg-4 mb-3" key={user.id}>
                      <WishlistComponent data={user} />
                    </div>
                  ))
                  : <p>No liked users found.</p>
              }
            </div>

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="pagination_controls d-flex justify-content-center gap-3 my-3">
                <button
                  className="btn-sm btn_primary p-2 text-white"
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                >
                  <FaArrowLeft />
                </button>
                {visiblePages.map((page) => (
                  <button
                    key={page}
                    className={`page-btn ${currentPage === page ? "btn_primary text-white active px-3" : "btn_primary bg_gray px-3"}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="btn-sm btn_primary p-2 text-white"
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  <FaArrowRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
