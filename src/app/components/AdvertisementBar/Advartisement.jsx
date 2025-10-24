

"use client";
import React, { useContext, useEffect, useState } from "react";
import "./advertisement.css";
import { UserContext } from "@/app/userContext";
import Link from "next/link";
import Image from "next/image";

export default function Advertisement() {
  const [currentImage, setCurrentImage] = useState(0);
  const { getAllBanners, banners } = useContext(UserContext);

  useEffect(() => {
    getAllBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // clean up
  }, [banners]);

  if (!banners || banners.length === 0) return null; // no banners to show

  return (
    <section className="advertisementBar">
      <Link href={banners[currentImage]?.description || "#"} target="_blank">
        <Image
          width={100} height={100}
          src={banners[currentImage]?.slider_image}
          alt={banners[currentImage]?.title || `banner-${currentImage}`}
        />
      </Link>
    </section>
  );
}
