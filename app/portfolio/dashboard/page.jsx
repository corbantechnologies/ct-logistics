"use client";
import { useFetchProfile } from "@/hooks/accounts/actions";
import React from "react";
import { FaBuilding, FaWarehouse, FaBox } from "react-icons/fa";
import Link from "next/link";
import LoadingSpinner from "@/components/dashboard/LoadingSpinner";

function Dashboard() {
  const {
    isLoading: isLoadingProfile,
    data: profile,
    refetch: refetchProfile,
  } = useFetchProfile();

  if (isLoadingProfile) {
    return <LoadingSpinner />;
  }

  // Extract business data
  const businesses = profile?.businesses || [];
  const totalBusinesses = businesses.length;
  const totalWarehouses = businesses.reduce(
    (sum, b) => sum + b.warehouses.length,
    0
  );
  const totalProducts = businesses.reduce(
    (sum, b) => sum + b.products.length,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Business Dashboard</h2>

      {/* Summary Stats */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3 col-sm-12">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaBuilding className="fs-1 text-primary mb-2" />
            <h5>{totalBusinesses}</h5>
            <p className="text-muted">Businesses</p>
          </div>
        </div>
        <div className="col-md-4 mb-3 col-sm-12">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaWarehouse className="fs-1 text-success mb-2" />
            <h5>{totalWarehouses}</h5>
            <p className="text-muted">Warehouses</p>
          </div>
        </div>
        <div className="col-md-4 mb-3 col-sm-12">
          <div className="card shadow-sm p-3 d-flex align-items-center">
            <FaBox className="fs-1 text-warning mb-2" />
            <h5>{totalProducts}</h5>
            <p className="text-muted">Products</p>
          </div>
        </div>
      </div>

      {/* Businesses Table */}
      <div className="card shadow-sm p-4">
        <h5 className="mb-3">Your Businesses</h5>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Business Name</th>
              <th>Reference</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((business, index) => (
              <tr key={business.id}>
                <td>{index + 1}</td>
                <td>{business.name}</td>
                <td>{business.reference}</td>
                <td>{new Date(business.created_at).toLocaleDateString()}</td>
                <td>
                  <Link href={`/business/${business?.slug}`}>
                    <button className="btn btn-sm btn-primary">View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
