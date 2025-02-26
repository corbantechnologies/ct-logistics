import React from "react";

const steps = [
  {
    number: "1️⃣",
    title: "Register & Set Up Warehouses",
    description: "Create an account and add warehouses.",
  },
  {
    number: "2️⃣",
    title: "Add Products & Track Stock",
    description: "Easily monitor and transfer stock between locations.",
  },
  {
    number: "3️⃣",
    title: "Optimize Routes & Deliveries",
    description: "AI-powered route optimization for logistics.",
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works py-5 text-center">
      <div className="container">
        <h2 className="fw-bold mb-4">How It Works</h2>
        <div className="row">
          {steps.map((step, index) => (
            <div key={index} className="col-md-4">
              <div className="step-box">
                <h1>{step.number}</h1>
                <h4 className="fw-bold">{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
