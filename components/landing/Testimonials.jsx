import React from "react";

const testimonials = [
  {
    name: "Jane Doe",
    review: "CT-Logistics made our warehouse operations 3x faster!",
  },
  {
    name: "John Smith",
    review: "Real-time tracking is a game-changer for our business.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials py-5 text-center">
      <div className="container">
        <h2 className="fw-bold mb-4">What Our Clients Say</h2>
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {testimonials.map((testimony, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <p className="lead">"{testimony.review}"</p>
                <h5 className="fw-bold">{testimony.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
