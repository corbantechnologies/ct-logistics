import React from "react";
import Link from "next/link";

function DashboardCard({ icon, title, subtitle, href }) {
  return (
    <Link href={href} className="text-decoration-none">
      <div className="card shadow-sm p-3 d-flex align-items-start hover-card">
        {icon}
        <h4>{title}</h4>
        <p className="text-muted">{subtitle}</p>
      </div>
    </Link>
  );
}

export default DashboardCard;
