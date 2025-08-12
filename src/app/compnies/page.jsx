// "use client";
// import React, { Suspense } from "react";
// import "./individuals.css";
// // import Filterbar from "../components/Filter-bar/Filter-bar";
// // import ButtonComp from "../components/Button-component/ButtonComp";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import dynamic from "next/dynamic";
// import { useSearchParams } from "next/navigation";

// const ButtonComp = dynamic(() => import("../components/Button-component/ButtonComp"), {
//   ssr: false,
// });

// const Filterbar = dynamic(() => import("../components/Filter-bar/Filter-bar"), {
//   ssr: false,
// });


// export default function Page() {

//   const searchParams = useSearchParams();
//   const role = searchParams.get("role") || "handyman";
//   const gender = searchParams.get("gender") || "";
//   const age_range = searchParams.get("age_range") || "";
//   const city = searchParams.get("city") || "";
//   const category_id = searchParams.get("category_id") || "";
//   const area_code = searchParams.get("area_code") || "";
//   const verified_status = searchParams.get("verified_status") || "";

//   return (
//     <section className="individuals margin_navbar">
//       <div className="container content pt-5 pb-5">
//         <div className="row">
//           <div className="col-lg-4 col_filter">
//             <Suspense fallback={<div>Loading Filters...</div>}>
//               <Filterbar dataSearch={{ role, gender, age_range, city, category_id, area_code, verified_status }} />
//             </Suspense>
//           </div>
//           <div className="col-lg-8 col-md-12 col-sm-12">
//             <Suspense
//               fallback={
//                 <div className="d-flex flex-wrap gap-3">
//                   {Array.from({ length: 4 }).map((_, index) => (
//                     <div key={index} className="card_div py-3 px-4 skeleton_card">
//                       <Skeleton circle height={100} width={100} />
//                       <Skeleton height={20} width={`60%`} className="mt-3" />
//                       <Skeleton height={15} width={`40%`} className="mt-2" />
//                       <Skeleton height={15} width={`80%`} className="mt-2" />
//                       <Skeleton height={15} width={`50%`} className="mt-2" />
//                       <Skeleton height={15} width={`70%`} className="mt-2" />
//                       <Skeleton height={30} width={`100%`} className="mt-3" />
//                     </div>
//                   ))}
//                 </div>
//               }
//             >
//               <ButtonComp searchParamdata={{age_range, gender, verified_status}}/>
//             </Suspense>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";
import React, { Suspense } from "react";
import "./individuals.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const ButtonComp = dynamic(() => import("../components/Button-component/ButtonComp"), {
  ssr: false,
});

const Filterbar = dynamic(() => import("../components/Filter-bar/Filter-bar"), {
  ssr: false,
});

// Wrapper component that uses useSearchParams inside Suspense
function SearchParamsWrapper() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "handyman";
  const gender = searchParams.get("gender") || "";
  const age_range = searchParams.get("age_range") || "";
  const city = searchParams.get("city") || "";
  const category_id = searchParams.get("category_id") || "";
  const area_code = searchParams.get("area_code") || "";
  const verified_status = searchParams.get("verified_status") || "";

  return (
    <div className="row">
      <div className="col-lg-4 col_filter">
        <Filterbar
          dataSearch={{ role, gender, age_range, city, category_id, area_code, verified_status }}
        />
      </div>
      <div className="col-lg-8 col-md-12 col-sm-12">
        <ButtonComp
          searchParamdata={{ age_range, gender, verified_status }}
        />
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <section className="individuals margin_navbar">
      <div className="container content pt-5 pb-5">
        <Suspense
          fallback={
            <div className="d-flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="card_div py-3 px-4 skeleton_card">
                  <Skeleton circle height={100} width={100} />
                  <Skeleton height={20} width={`60%`} className="mt-3" />
                  <Skeleton height={15} width={`40%`} className="mt-2" />
                  <Skeleton height={15} width={`80%`} className="mt-2" />
                  <Skeleton height={15} width={`50%`} className="mt-2" />
                  <Skeleton height={15} width={`70%`} className="mt-2" />
                  <Skeleton height={30} width={`100%`} className="mt-3" />
                </div>
              ))}
            </div>
          }
        >
          <SearchParamsWrapper />
        </Suspense>
      </div>
    </section>
  );
}
