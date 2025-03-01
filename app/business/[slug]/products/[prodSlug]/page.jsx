"use client";
import { useParams } from "next/navigation";
import React from "react";

function ProductDetail() {
  const params = useParams();
  const slug = params?.slug;
  const prodSlug = params?.prodSlug;

  return <div>ProductDetail</div>;
}

export default ProductDetail;
