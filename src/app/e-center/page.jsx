import React, { Suspense } from "react";
import MyFormPage from "./MyFormPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <MyFormPage />
    </Suspense>
  );
}
