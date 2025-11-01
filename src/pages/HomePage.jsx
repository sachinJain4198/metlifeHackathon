import React from "react";

export default function HomePage() {
  return (
    <section className="d-flex flex-column justify-content-center align-items-center text-center vh-100 bg-light px-3">
      <div className="container">
        {/* Heading */}
        <h1 className="fw-bold display-4 mb-3 text-dark">
          Intelligent Claims Processing <br />
          <span style={{ color: "#0096d6" }}>
            Made Simple
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-muted fs-5 mb-4">
          Reduce processing time by 75% with AI-powered fraud detection, 
          automated workflows, and real-time analytics. Transform your 
          claims management today.
        </p>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3">
          <a href="/submit" className="btn btn-primary btn-lg px-4" style={{backgroundColor:"#0096d6"}}>
            Launch Platform →
          </a>
          <a href="/learn-more" className="btn btn-outline-secondary btn-lg px-4">
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
