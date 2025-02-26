"use client";
import DashboardCard from "@/components/business/DashboardCard";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";
import { useFetchBusiness } from "@/hooks/business/actions";
import React from "react";
import { FaTags, FaBox, FaWarehouse } from "react-icons/fa";
import { useParams } from "next/navigation";

function BusinessDetail() {
  const params = useParams();
  const slug = params?.slug;

  const {
    isLoading: isLoadingBusiness,
    data: business,
    refetch: refetchBusiness,
  } = useFetchBusiness(slug);

  if (isLoadingBusiness) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Business Dashboard</h2>

      {/* Summary Stats */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3 col-sm-12">
          <DashboardCard
            href={`/business/${slug}/categories`}
            title={business?.categories?.length}
            subtitle="Categories"
            icon={<FaTags className="fs-1 text-primary mb-2" />}
          />
        </div>

        <div className="col-md-4 mb-3 col-sm-12">
          <DashboardCard
            href={`/business/${slug}/warehouses`}
            title={business?.warehouses?.length}
            subtitle="Warehouses"
            icon={<FaWarehouse className="fs-1 text-success mb-2" />}
          />
        </div>

        <div className="col-md-4 mb-3 col-sm-12">
          <DashboardCard
            href={`/business/${slug}/products`}
            title={business?.products?.length}
            subtitle="Products"
            icon={<FaBox className="fs-1 text-danger mb-2" />}
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessDetail;
