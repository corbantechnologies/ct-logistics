"use client";
import React from "react";

function HeroSection() {
  return (
    <section className="hero-section text-center text-white d-flex align-items-center justify-content-center">
      <div className="container">
        <h1 className="display-4 fw-bold">
          Seamless Logistics & Warehouse Management
        </h1>
        <p className="lead">
          Optimize your supply chain with real-time tracking, inventory
          management, and route optimization.
        </p>
        <div className="mt-4">
          <a href="/signup" className="btn btn-primary btn-lg me-3">
            Get Started
          </a>
          <button className="btn btn-outline-light btn-lg">Watch Demo</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
