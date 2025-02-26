"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTags,
} from "react-icons/fa";
import React from "react";
import { useFetchBusiness } from "@/hooks/business/actions";
import LoadingSpinner from "../dashboard/LoadingSpinner";

function Sidebar({ slug }) {
  const pathname = usePathname();

  const {
    isLoading: isLoadingBusiness,
    data: business,
    isError: isErrorBusiness,
    refetch: refetchBusiness,
  } = useFetchBusiness(slug);

  if (isLoadingBusiness) {
    return <LoadingSpinner />;
  }

  const menuItems = [
    {
      name: "Dashboard",
      href: `/business/${slug}`,
      icon: <FaTachometerAlt />,
    },
    {
      name: "Warehouses",
      href: `/business/${slug}/warehouses`,
      icon: <FaShoppingCart />,
    },
    // { name: "Employees", href: `/business/${slug}/employees`, icon: <FaUsers /> },
    {
      name: "Products & Inventory",
      href: `/business/${slug}/products`,
      icon: <FaBox />,
    },
    {
      name: "Categories",
      href: `/business/${slug}/categories`,
      icon: <FaTags />,
    },
    {
      name: "Stock Movement",
      href: `/business/${slug}/stock-movement`,
      icon: <FaMoneyBillWave />,
    },
    { name: "Settings", href: `/business/${slug}/settings`, icon: <FaCog /> },
  ];

  return (
    <div className="d-flex flex-column p-3 vh-100">
      <h5 className="fw-bold">{business?.name}</h5>
      <ul className="nav flex-column">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link
              href={item.href}
              className={`nav-link d-flex align-items-center p-2 ${
                pathname === item.href
                  ? "active bg-primary text-white"
                  : "text-dark"
              }`}
            >
              <span className="me-2">{item.icon}</span> {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <Link
          href="/portfolio/dashboard"
          className="nav-link text-danger d-flex align-items-center p-2"
        >
          <FaSignOutAlt className="me-2" /> Exit
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
