"use client";
import { signOut } from "next-auth/react";
import React from "react";
import {
  FaBell,
  FaBriefcase,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import Link from "next/link";
import { useFetchBusiness } from "@/hooks/business/actions";
import LoadingSpinner from "../dashboard/LoadingSpinner";

function Navbar({ slug }) {
  const {
    isLoading: isLoadingBusiness,
    data: business,
    isError: isErrorBusiness,
    refetch: refetchBusiness,
  } = useFetchBusiness(slug);

  if (isLoadingBusiness) {
    return <LoadingSpinner />;
  }

  return (
    <nav className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm">
      {/* Left - Title */}
      <Link href={`/business/${slug}`} className="fw-bold text-decoration-none">
        {business?.name}
      </Link>

      <div className="d-flex align-items-center">
        <div className="dropdown">
          <button
            className="btn btn-outline-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            <FaBriefcase className="fs-4" />
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link
                className="dropdown-item"
                href={`/business/${slug}/warehouses`}
              >
                Warehouses
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                href={`/business/${slug}/products`}
              >
                Products & Inventory
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                href={`/business/${slug}/stock-movement`}
              >
                Stock Movement
              </Link>
            </li>
            <li>
              <Link
                className="dropdown-item"
                href={`/business/${slug}/settings`}
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
        <Link
          href="/portfolio/dashboard"
          className="nav-link text-danger d-flex align-items-center p-2"
        >
          <FaSignOutAlt className="me-2" /> Exit
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
