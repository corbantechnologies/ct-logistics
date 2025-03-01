"use client";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { useFetchProduct } from "@/hooks/products/actions";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

function ProductEditPage() {
  const params = useParams();
  const slug = params?.slug;
  const prodSlug = params?.prodSlug;

  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  const {
    isLoading: isLoadingProduct,
    data: product,
    refetch: refetchProduct,
  } = useFetchProduct(prodSlug);

  if (isLoadingProduct) {
    return <LoadingSpinner />;
  }

  return <div>ProductEditPage</div>;
}

export default ProductEditPage;
