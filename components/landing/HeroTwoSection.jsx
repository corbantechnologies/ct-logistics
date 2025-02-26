"use client";
import React from "react";

function HeroSectionTwoColumns() {
  return (
    <section className="hero-section-two py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side: Text Content */}
          <div className="col-lg-6 text-center text-lg-start">
            <h1 className="display-4 fw-bold">
              Powering Smart Logistics & Inventory
            </h1>
            <p className="lead">
              Manage multiple warehouses, track stock movements, and optimize
              delivery routes seamlessly.
            </p>
            <div className="mt-4">
              <a href="/signup" className="btn btn-primary btn-lg me-3">
                Get Started
              </a>
              <button className="btn btn-outline-primary btn-lg">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="col-lg-6 text-center">
            <img
              src="/warehouse.png"
              alt="Logistics Management"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSectionTwoColumns;
