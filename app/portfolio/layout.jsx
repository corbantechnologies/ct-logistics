import Navbar from "@/components/business/Navbar";
import Sidebar from "@/components/business/Sidebar";
import React from "react";

function BusinessLayout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2 d-none d-lg-block bg-light border-end position-fixed vh-100 overflow-auto">
          <Sidebar />
        </div>
        <div className="col-lg-10 offset-lg-2 col-sm-12 vh-100 overflow-auto">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
}

export default BusinessLayout;
