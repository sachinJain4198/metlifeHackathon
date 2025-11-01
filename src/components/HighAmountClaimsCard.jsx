import React from "react";
import { useDispatch, useSelector } from "react-redux";


const HighAmountClaimsCard = () => {

  const { claims, loading, error } = useSelector((state) => state.claims);
  const [selectedClaim, setSelectedClaim] = React.useState(null);

  const highAmountClaims = React.useMemo(() => {
    if (!claims || claims.length === 0) return [];
    return claims
      .filter((claim) => claim.amount > 500000)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [claims]);

  return (
    <div className="col-lg-6 mb-4 w-100">
      <h1>High Amount Claims</h1>
      <p>Claims requiring immediate attention</p>

      <div className="d-flex flex-column gap-3">
        {highAmountClaims.map((claim) => (
          <div
            key={claim.id}
            className="d-flex align-items-center justify-content-between p-3 bg-light rounded border hover-shadow"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedClaim(claim)}
          >
            <div>
              <div className="fw-semibold">{claim.id}</div>
              <div className="text-muted small">
                ₹{claim.amount.toLocaleString()}
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span
                className={`badge text-uppercase ${
                  claim.claimsStatus === "APPROVED"
                    ? "bg-success"
                    : claim.claimsStatus === "PENDING"
                    ? "bg-warning"
                    : claim.claimsStatus === "FRAUD"
                    ? "bg-secondary"
                    : "bg-danger"
                }`}
              >
                {claim.claimsStatus}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Claim Details Modal */}
      {selectedClaim && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedClaim(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Claim Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedClaim(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Claim ID:</strong> {selectedClaim.id}
                </p>
                <p>
                  <strong>Amount:</strong> ₹
                  {selectedClaim.amount.toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {selectedClaim.claimsStatus}
                </p>
                {selectedClaim.policyHolderName && (
                  <p>
                    <strong>Claimant:</strong> {selectedClaim.policyHolderName}
                  </p>
                )}
                {selectedClaim.submissionDate && (
                  <p>
                    <strong>Submission Date:</strong>{" "}
                    {selectedClaim.submissionDate}
                  </p>
                )}
                {selectedClaim.desc && (
                  <p>
                    <strong>Description:</strong> {selectedClaim.desc}
                  </p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedClaim(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighAmountClaimsCard;
