// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import "./button_comp.css";
// import Card from "../Personal-card/Card";
// import CompanyCard from "../compnies-card/CompanyCard";
// import { UserContext } from "@/app/userContext";
// import { useSearchParams, useRouter } from "next/navigation";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { FaArrowRightArrowLeft } from "react-icons/fa6";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


// export default function ButtonComp() {
//   const { filteredUsers, getFilteredUsers, loader, toggleLike } = useContext(UserContext);
//   // console.log(filteredUsers, "filter users...")
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   // Get params from URL
//   // const role = searchParams.get("role") || (individual ? "handyman" : "company");
//   const role = searchParams.get("role");
//   const category_id = searchParams.get("category_id") || "";
//   const city = searchParams.get("city") || "";
//   const area_code = searchParams.get("area_code") || "";


//   const [individual, setIndividual] = useState(role !== "provider");

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 6;

//   useEffect(() => {
//     setIndividual(role !== "provider"); // handyman = true, provider = false
//   }, [role]);

//   useEffect(() => {
//     const params = {
//       role,
//       category_id,
//       city,
//       area_code,
//     };

//     getFilteredUsers(params);
//   }, [role, category_id, city, area_code]);

//   // const handleToggle = () => {
//   //   setIndividual((prev) => !prev);
//   // };

//   const handleToggle = (targetRole) => {
//     const newParams = new URLSearchParams(searchParams.toString());
//     newParams.set("role", targetRole);
//     router.push(`?${newParams.toString()}`);
//   };

//   // Pagination logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
//   // console.log(currentUsers, "users get..")
//   const totalPages = Math.ceil((filteredUsers?.length || 0) / usersPerPage);

//   const renderPagination = () => {
//     if (totalPages <= 1) return null;

//     const maxVisiblePages = 5;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = startPage + maxVisiblePages - 1;

//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);


//     return (
//       <div className="pagination d-flex gap-2 justify-content-center mt-4 align-items-center">
//         {/* Prev Arrow */}
//         {currentPage > 1 && (
//           <button
//             className="page-btn"
//             onClick={() => setCurrentPage(currentPage - 1)}
//           >
//             <FaArrowLeft />
//           </button>
//         )}

//         {/* Page Numbers */}
//         {visiblePages.map((page) => (
//           <button
//             key={page}
//             className={`page-btn ${currentPage === page ? "active" : ""}`}
//             onClick={() => setCurrentPage(page)}
//           >
//             {page}
//           </button>
//         ))}

//         {/* Next Arrow */}
//         {currentPage < totalPages && (
//           <button
//             className="page-btn"
//             onClick={() => setCurrentPage(currentPage + 1)}
//           >
//             <FaArrowRight />
//           </button>
//         )}
//       </div>
//     );
//   };


//   useEffect(() => {
//     setCurrentPage(1); // Reset to page 1 when filters change
//     const params = { role, category_id, city, area_code };
//     getFilteredUsers(params);
//   }, [role, category_id, city, area_code]);



//   return (
//     <div className="container">
//       <div className="button_comp">
//         <div className="mb-3 btn_div d-flex align-items-center justify-content-center gap-3 py-3 px-4">
//           <div
//             className={`single_btn py-2 px-3 individual ${individual ? "active" : ""}`}
//             onClick={() => handleToggle("handyman")}
//           >
//             <h3>Individuals</h3>
//           </div>
//           <div
//             className={`single_btn companies py-2 px-3 ${!individual ? "active" : ""}`}
//             onClick={() => handleToggle("provider")}
//           >
//             <h3>Companies</h3>
//           </div>
//         </div>
//         {loader ? (
//           <div className="card_wrapper_div d-flex flex-wrap gap-3">
//             {Array.from({ length: 4 }).map((_, index) => (
//               <div key={index} className="card_div py-3 px-4 skeleton_card">
//                 <Skeleton circle height={100} width={100} />
//                 <Skeleton height={20} width={`60%`} className="mt-3" />
//                 <Skeleton height={15} width={`40%`} className="mt-2" />
//                 <Skeleton height={15} width={`80%`} className="mt-2" />
//                 <Skeleton height={15} width={`50%`} className="mt-2" />
//                 <Skeleton height={15} width={`70%`} className="mt-2" />
//                 <Skeleton height={30} width={`100%`} className="mt-3" />
//               </div>
//             ))}
//           </div>
//         ) : individual ? (
//           currentUsers?.length > 0 ? (
//             <>
//               <div className="card_wrapper_div">
//                 {currentUsers.map((user) => (
//                   <Card key={user.id} data={user} onLike={toggleLike} />
//                 ))}
//               </div>
//               {renderPagination()}
//             </>
//           ) : (
//             <h4 className="not_found_design">No individual profiles found.</h4>
//           )
//         ) : (
//           currentUsers?.length > 0 ? (
//             <>
//               <div>
//                 {currentUsers.map((user) => (
//                   <CompanyCard key={user.id} data={user} onLike={toggleLike} />
//                 ))}
//               </div>
//               {renderPagination()}
//             </>
//           ) : (
//             <h4 className="not_found_design">
//               No Company profiles found.
//             </h4>
//           )
//         )}
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import "./button_comp.css";
import Card from "../Personal-card/Card";
import CompanyCard from "../compnies-card/CompanyCard";
import { UserContext } from "@/app/userContext";
import { useSearchParams, useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ButtonComp() {
  const { filteredUsers, getFilteredUsers, loader, toggleLike } = useContext(UserContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  const role = searchParams.get("role") || "handyman";
  const category_id = searchParams.get("category_id") || "";
  const city = searchParams.get("city") || "";
  const area_code = searchParams.get("area_code") || "";

  const [individual, setIndividual] = useState(role !== "provider");

  const usersPerPage = 6;
  const getPageKey = (r) => `${r}_page`;

  // ✅ Page state per role
  const [currentPage, setCurrentPage] = useState(1);

  // Set correct tab and currentPage from localStorage or URL
  useEffect(() => {
    setIndividual(role !== "provider");

    const urlPage = parseInt(searchParams.get("page"));
    if (!isNaN(urlPage)) {
      setCurrentPage(urlPage);
    } else {
      const saved = parseInt(localStorage.getItem(getPageKey(role)));
      setCurrentPage(saved || 1);
    }
  }, [role, searchParams]);

// ✅ Role change par data load ho, page reset na ho
useEffect(() => {
  getFilteredUsers({ role, category_id, city, area_code });
}, [role]);

// ✅ City/category/area change ho to page 1 par le jaye
useEffect(() => {
  setCurrentPage(1);
  getFilteredUsers({ role, category_id, city, area_code });
}, [category_id, city, area_code]);


  // Save to localStorage + URL
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

  // 🔁 Switch tab and load saved page for that tab
  const handleToggle = (targetRole) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("role", targetRole);

    const savedPage = parseInt(localStorage.getItem(getPageKey(targetRole))) || 1;
    newParams.set("page", savedPage.toString());

    router.push(`?${newParams.toString()}`);
  };

  // Pagination logic
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
              <div className="card_wrapper_div">
                {currentUsers.map((user) => (
                  <Card key={user.id} data={user} onLike={toggleLike} />
                ))}
              </div>
            ) : (
              currentUsers.map((user) => (
                <CompanyCard key={user.id} data={user} onLike={toggleLike} />
              ))
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





