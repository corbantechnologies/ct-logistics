"use client";
import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm">
      {/* Left - Title */}
      <h5 className="fw-bold">Dashboard</h5>

      {/* Right - Notifications & Profile */}
      <div className="d-flex align-items-center">
        <FaBell className="fs-4 me-3 text-primary" role="button" />
        <div className="dropdown">
          <button
            className="btn btn-outline-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            <FaUserCircle className="fs-4" />
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link className="dropdown-item" href="/business/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item text-danger" href="/logout">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
