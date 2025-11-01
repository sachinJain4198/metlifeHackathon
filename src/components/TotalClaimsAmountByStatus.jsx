import React from "react";
import { useDispatch, useSelector } from "react-redux";


export default function TotalClaimsAmountByStatus() {

  const { claims, loading, error } = useSelector((state) => state.allClaims);
  console.log(claims)
    
  const totals = React.useMemo(() => {
    if (!claims || claims.length === 0)
      return { APPROVED: 0, PENDING: 0, REJECTED: 0, FRAUD: 0, TOTAL: 0 };

    const grouped = claims.reduce(
      (acc, claim) => {
        const status = claim.claimsStatus?.toUpperCase() || "UNKNOWN";
        const amount = claim.amount || 0;
        acc[status] = (acc[status] || 0) + amount;
        acc.TOTAL += amount;
        return acc;
      },
      { APPROVED: 0, PENDING: 0, REJECTED: 0, FRAUD: 0, TOTAL: 0 }
    );

    return grouped;
  }, [claims]);

  // Helper to get percentage safely
  const getPercentage = (value) =>
    totals.TOTAL > 0 ? ((value / totals.TOTAL) * 100).toFixed(1) : 0;

  return (
    <div>
      <h1>Claims by Status</h1>
      <p>Distribution of total claim amounts (in ₹ and %)</p>

      {/* Approved */}
      <div className="d-flex align-items-center justify-content-between p-4 bg-success rounded text-white mb-3">
        <div>
          <div className="text-white-50 small">Approved</div>
          <div className="fs-3 fw-bold">
            ₹{totals.APPROVED.toLocaleString()}
          </div>
        </div>
        <div className="fs-4 fw-bold">{getPercentage(totals.APPROVED)}%</div>
      </div>

      {/* Pending */}
      <div className="d-flex align-items-center justify-content-between p-4 bg-warning rounded text-white mb-3">
        <div>
          <div className="text-white-50 small">Pending Review</div>
          <div className="fs-3 fw-bold">
            ₹{totals.PENDING.toLocaleString()}
          </div>
        </div>
        <div className="fs-4 fw-bold">{getPercentage(totals.PENDING)}%</div>
      </div>

      {/* Rejected */}
      <div className="d-flex align-items-center justify-content-between p-4 bg-danger rounded text-white mb-3">
        <div>
          <div className="text-white-50 small">Rejected</div>
          <div className="fs-3 fw-bold">
            ₹{totals.REJECTED.toLocaleString()}
          </div>
        </div>
        <div className="fs-4 fw-bold">{getPercentage(totals.REJECTED)}%</div>
      </div>

      {/* Fraudulent */}
      <div className="d-flex align-items-center justify-content-between p-4 bg-secondary rounded text-white">
        <div>
          <div className="text-white-50 small">Fraudulent</div>
          <div className="fs-3 fw-bold">
            ₹{totals.FRAUD.toLocaleString()}
          </div>
        </div>
        <div className="fs-4 fw-bold">{getPercentage(totals.FRAUD)}%</div>
      </div>
    </div>
  );
}
