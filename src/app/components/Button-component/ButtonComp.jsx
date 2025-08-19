"use client";
import React, { useContext, useEffect, useState } from "react";
import "./button_comp.css";
import Card from "../Personal-card/Card";
import CompanyCard from "../compnies-card/CompanyCard";
import { UserContext } from "@/app/userContext";
import { useSearchParams, useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ButtonComp({ searchParamdata }) {
  const { gender, age_range, verified_status } = searchParamdata;
  const { filteredUsers, getFilteredUsers, loader, toggleLike } = useContext(UserContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role") || "handyman";
  const category_id = searchParams.get("category_id") || "";
  const city = searchParams.get("city") || "";
  const area_code = searchParams.get("area_code") || "";

  const [individual, setIndividual] = useState(role !== "provider");
  const [filtersChanged, setFiltersChanged] = useState(false);

  const usersPerPage = 6;
  const getPageKey = (r) => `${r}_page`;

  const [currentPage, setCurrentPage] = useState(1);

  // Load role and page from URL/localStorage
  useEffect(() => {
    setIndividual(role !== "provider");

    const urlPage = parseInt(searchParams.get("page"));
    const savedPage = parseInt(localStorage.getItem(getPageKey(role)));

    if (!isNaN(urlPage)) {
      setCurrentPage(urlPage);
    } else if (!isNaN(savedPage)) {
      setCurrentPage(savedPage);
    } else {
      setCurrentPage(1);
    }
  }, [role, searchParams]);

  // City/category/area change → reset to page 1
  useEffect(() => {
    if (filtersChanged) {
      setCurrentPage(1);
    } else {
      setFiltersChanged(true); // skip first run
    }
  }, [category_id, city, area_code, verified_status, age_range, gender]);

  // Always fetch filtered users
  useEffect(() => {
    getFilteredUsers({ role, category_id, city, area_code });
  }, [role, category_id, city, area_code]);

  // Save to localStorage + update URL
  useEffect(() => {
    localStorage.setItem(getPageKey(role), currentPage.toString());

    const params = new URLSearchParams(searchParams.toString());
    if (currentPage === 1) {
      params.delete("page");
    } else {
      params.set("page", currentPage.toString());
    }
    router.push(`?${params.toString()}`);
  }, [currentPage]);

  const handleToggle = (targetRole) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("role", targetRole);

    const savedPage = parseInt(localStorage.getItem(getPageKey(targetRole))) || 1;
    newParams.set("page", savedPage.toString());

    router.push(`?${newParams.toString()}`);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil((filteredUsers?.length || 0) / usersPerPage);

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
      <div className="pagination d-flex gap-2 justify-content-center mt-4 align-items-center">
        {currentPage > 1 && (
          <button className="page-btn" onClick={() => setCurrentPage(currentPage - 1)}>
            <FaArrowLeft />
          </button>
        )}
        {visiblePages.map((page) => (
          <button
            key={page}
            className={`page-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button className="page-btn" onClick={() => setCurrentPage(currentPage + 1)}>
            <FaArrowRight />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <div className="button_comp">
        {/* Tabs */}
        <div className="mb-3 btn_div d-flex align-items-center justify-content-center gap-3 py-3 px-4">
          <div
            className={`single_btn py-2 px-3 individual ${individual ? "active" : ""}`}
            onClick={() => handleToggle("handyman")}
          >
            <h3>Individuals</h3>
          </div>
          <div
            className={`single_btn companies py-2 px-3 ${!individual ? "active" : ""}`}
            onClick={() => handleToggle("provider")}
          >
            <h3>Companies</h3>
          </div>
        </div>

        {/* Loader & Cards */}
        {loader ? (
          <div className="card_wrapper_div d-flex flex-wrap gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="card_div py-3 px-4 skeleton_card">
                <Skeleton circle height={100} width={100} />
                <Skeleton height={20} width="60%" className="mt-3" />
                <Skeleton height={15} width="40%" className="mt-2" />
                <Skeleton height={15} width="80%" className="mt-2" />
                <Skeleton height={15} width="50%" className="mt-2" />
                <Skeleton height={15} width="70%" className="mt-2" />
                <Skeleton height={30} width="100%" className="mt-3" />
              </div>
            ))}
          </div>
        ) : currentUsers?.length > 0 ? (
          <>
            {individual ? (
              <div className="card_wrapper_div row">
                {currentUsers.map((user) => (
                  <Card key={user.id} data={user} onLike={toggleLike} />
                ))}
              </div>
            ) : (
              <div>
                {currentUsers.map((user) => (
                  <CompanyCard key={user.id} data={user} onLike={toggleLike} />
                ))}
              </div>
            )}
            {renderPagination()}
          </>
        ) : (
          <h4 className="not_found_design">
            No {individual ? "individual" : "company"} profiles found.
          </h4>
        )}
      </div>
    </div>
  );
}
