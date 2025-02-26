"use client";
import Link from "next/link";
import React from "react";

function CallToAction() {
  return (
    <section className="cta-section text-center py-5 bg-primary text-white">
      <div className="container">
        <h2 className="fw-bold">Get Started with CT-Logistics Today!</h2>
        <p className="lead">
          Efficient warehouse & logistics management at your fingertips.
        </p>
        <Link href="/auth/business/signup" className="btn btn-light btn-lg mt-3">
          Sign Up Now
        </Link>
      </div>
    </section>
  );
}

export default CallToAction;
