"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm">
      {/* Left - Title */}
      <h5 className="fw-bold">Dashboard</h5>

      <div className="d-flex align-items-center">
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
              <Link className="dropdown-item" href="/portfolio/settings">
                Settings
              </Link>
            </li>
          </ul>
        </div>
        <FaSignOutAlt
          className="fs-4 ms-3 text-danger"
          role="button"
          title="Logout"
          onClick={() => signOut()}
        />
      </div>
    </nav>
  );
}

export default Navbar;
