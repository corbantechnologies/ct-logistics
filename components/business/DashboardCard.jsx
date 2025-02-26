import React from "react";

function DashboardCard({ icon, title, subtitle }) {
  return (
    <>
      <div className="card shadow-sm p-3 d-flex align-items-start">
        {icon}
        <h4>{title}</h4>
        <p className="text-muted">{subtitle}</p>
      </div>
    </>
  );
}

export default DashboardCard;
