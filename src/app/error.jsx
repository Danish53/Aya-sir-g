"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GlobalError({ error, reset }) {
  const router = useRouter();

  useEffect(() => {
    console.error("App Error:", error);
    // redirect to custom error page
    router.push(`/error?pageError=true`);
  }, [error, router]);

  return null;
}
