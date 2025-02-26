"use client";
import React from "react";

const features = [
  {
    icon: "bi bi-building",
    title: "Multi-Warehouse Management",
    description: "Manage multiple warehouses seamlessly.",
  },
  {
    icon: "bi bi-arrow-left-right",
    title: "Smart Stock Movement",
    description: "Track stock transfers with real-time status.",
  },
  {
    icon: "bi bi-truck",
    title: "Route Optimization",
    description: "AI-powered delivery routing.",
  },
  {
    icon: "bi bi-graph-up",
    title: "Real-Time Tracking",
    description: "Monitor inventory & shipment updates.",
  },
];

function FeaturesSection() {
  return (
    <section className="features-section py-5 text-center">
      <div className="container">
        <h2 className="fw-bold mb-4">Why Choose CT-Logistics?</h2>
        <div className="row">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <i className={`${feature.icon} feature-icon`}></i>
              <h4 className="fw-bold mt-3">{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
