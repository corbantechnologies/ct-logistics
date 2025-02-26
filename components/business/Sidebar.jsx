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
} from "react-icons/fa";

function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/portfolio/dashboard",
      icon: <FaTachometerAlt />,
    },
    // {
    //   name: "Orders & Sales",
    //   href: "/portfolio/orders",
    //   icon: <FaShoppingCart />,
    // },
    // { name: "Customers", href: "/portfolio/customers", icon: <FaUsers /> },
    // {
    //   name: "Products & Inventory",
    //   href: "/portfolio/products",
    //   icon: <FaBox />,
    // },
    // { name: "Payments", href: "/portfolio/payments", icon: <FaMoneyBillWave /> },
    // { name: "Reports", href: "/portfolio/reports", icon: <FaChartBar /> },
    { name: "Settings", href: "/portfolio/settings", icon: <FaCog /> },
  ];

  return (
    <div className="d-flex flex-column p-3 vh-100">
      <h4 className="fw-bold">Personal</h4>
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
        <button
          onClick={() => signOut()}
          className="nav-link text-danger d-flex align-items-center p-2"
        >
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
