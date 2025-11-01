import React from "react";

const StatCard = ({ stat }) => {
  const Icon = stat.icon;

  return (
    <div
      className="d-flex align-items-start justify-content-around p-3 rounded shadow mb-3 gap-2"
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Left Section */}
      <div>
        <div
          className="text-muted mb-1"
          style={{ fontSize: "0.9rem" }}
        >
          {stat.title}
        </div>
        <div
          className="fw-bold"
          style={{ fontSize: "1.8rem", color: "#000" }}
        >
          {stat.value}
        </div>
      </div>

      {/* Right Section (Icon Box) */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "10px",
          background: "linear-gradient(to bottom right, #3b82f6, #6366f1)", // blue to indigo gradient
        }}
      >
        <Icon size={22} color="#fff" />
      </div>
    </div>
  );
};

export default StatCard;
