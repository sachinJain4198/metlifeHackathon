import React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
} from "lucide-react";
import StatCard from "../components/StatCard";
import { useDispatch, useSelector } from "react-redux";
import {
  setClaims,
  setLoading,
  setError,
} from "../features/claims/claimDataSlice";

export default function AdminDashboard() {
  // const stats = [
  //   {
  //     id : crypto.randomUUID(),
  //     title: "Total Claims",
  //     value: "1,234",
  //     icon: FileText,
  //   },
  //   {
  //     id : crypto.randomUUID(),
  //     title: "Claims Processed",
  //     value: "892",
  //     icon: CheckCircle,
  //   },
  //   {
  //     id : crypto.randomUUID(),
  //     title: "Pending Claims",
  //     value: "45",
  //     icon: AlertTriangle,
  //   },
  //   {
  //     id : crypto.randomUUID(),
  //     title: "Rejected Claims",
  //     value: "2.4 hrs",
  //     icon: Clock,
  //   },
  // ];

  const dispatch = useDispatch();
  const { claims, loading, error } = useSelector((state) => state.claims);

  const stats = React.useMemo(() => {
    if (!claims || claims.length === 0) return [];

    const totalClaims = claims.length;
    const processed = claims.filter(
      (c) => c.claimsStatus === "APPROVED"
    ).length;
    const pending = claims.filter((c) => c.claimsStatus === "PENDING").length;
    const rejected = claims.filter((c) => c.claimsStatus === "REJECTED").length;

    return [
      {
        id: crypto.randomUUID(),
        title: "Total Claims",
        value: totalClaims,
        icon: FileText,
      },
      {
        id: crypto.randomUUID(),
        title: "Claims Processed",
        value: processed,
        icon: CheckCircle,
      },
      {
        id: crypto.randomUUID(),
        title: "Pending Claims",
        value: pending,
        icon: Clock,
      },
      {
        id: crypto.randomUUID(),
        title: "Rejected Claims",
        value: rejected,
        icon: AlertTriangle,  
      },
    ];
  }, [claims]);

   const highAmountClaims = React.useMemo(() => {
    if (!claims || claims.length === 0) return [];
    return claims.filter((claim) => claim.amount > 500000);
  }, [claims]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Real-time analytics and claim monitoring
        </p>
      </div>

      <div className="gap-4 flex justify-content-around">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return <StatCard key={stat.id} stat={stat} />;
        })}
      </div>

      {/* <div className="grid lg:grid-cols-2 gap-6">
        <h1>Claims by Status</h1>
        <p>Distribution of claim statuses</p>

        <div className="flex items-center justify-between p-4 bg-gradient-success rounded-lg">
          <div>
            <div className="text-white/90 text-sm">Approved</div>
            <div className="text-2xl font-bold text-white">542</div>
          </div>
          <div className="text-3xl font-bold text-white">62%</div>
        </div>
        <div className="flex items-center justify-between p-4 bg-gradient-warning rounded-lg">
          <div>
            <div className="text-white/90 text-sm">Pending Review</div>
            <div className="text-2xl font-bold text-white">305</div>
          </div>
          <div className="text-3xl font-bold text-white">25%</div>
        </div>
        <div className="flex items-center justify-between p-4 bg-gradient-danger rounded-lg">
          <div>
            <div className="text-white/90 text-sm">Flagged</div>
            <div className="text-2xl font-bold text-white">45</div>
          </div>
          <div className="text-3xl font-bold text-white">13%</div>
        </div>

        <h1>High Risk Claims</h1>
        <p>Claims requiring immediate attention</p>

        <div className="space-y-3">
          {recentClaims.map((claim) => (
            <div
              key={claim.id}
              className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-semibold">{claim.id}</div>
                  <div className="text-sm text-muted-foreground">
                    ${claim.amount.toFixed(2)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`
                      ${claim.status === "approved" ? "bg-success" : ""}
                      ${claim.status === "pending" ? "bg-warning" : ""}
                      ${claim.status === "flagged" ? "bg-destructive" : ""}
                    `}
                >
                  {claim.status}
                </div>
                <div
                  variant="outline"
                  className={`
                      ${claim.risk < 30 ? "border-success text-success" : ""}
                      ${
                        claim.risk >= 30 && claim.risk < 60
                          ? "border-warning text-warning"
                          : ""
                      }
                      ${
                        claim.risk >= 60
                          ? "border-destructive text-destructive"
                          : ""
                      }
                    `}
                >
                  Risk: {claim.risk}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <div className="container mt-4">
  <div className="row">
    {/* Left column - Claims by Status */}
    <div className="col-lg-6 mb-4">
      <h1>Claims by Status</h1>
      <p>Distribution of claim statuses</p>

      <div className="d-flex align-items-center justify-content-between p-4 bg-success rounded text-white mb-3">
        <div>
          <div className="text-white-50 small">Approved</div>
          <div className="fs-3 fw-bold">542</div>
        </div>
        <div className="fs-2 fw-bold">62%</div>
      </div>

      <div className="d-flex align-items-center justify-content-between p-4 bg-warning rounded text-white mb-3">
        <div>
          <div className="text-white-50 small">Pending Review</div>
          <div className="fs-3 fw-bold">305</div>
        </div>
        <div className="fs-2 fw-bold">25%</div>
      </div>

      <div className="d-flex align-items-center justify-content-between p-4 bg-danger rounded text-white">
        <div>
          <div className="text-white-50 small">Flagged</div>
          <div className="fs-3 fw-bold">45</div>
        </div>
        <div className="fs-2 fw-bold">13%</div>
      </div>
    </div>

    {/* Right column - High Risk Claims */}
    <div className="col-lg-6 mb-4">
      <h1>High Amount Claims</h1>
      <p>Claims requiring immediate attention</p>

      <div className="d-flex flex-column gap-3">
        {highAmountClaims.map((claim) => (
          <div
            key={claim.id}
            className="d-flex align-items-center justify-content-between p-3 bg-light rounded border"
          >
            <div>
              <div className="fw-semibold">{claim.id}</div>
              <div className="text-muted small">${claim.amount.toFixed(2)}</div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span
                className={`badge text-uppercase ${
                  claim.claimsStatus === "APPROVED"
                    ? "bg-success"
                    : claim.claimsStatus === "PENDING"
                    ? "bg-warning"
                    : "bg-danger"
                }`}
              >
                {claim.claimsStatus}
              </span>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>


      {/* <h1>AI Processing Performance</h1>
      <p>Automated decision-making metrics</p> */}

      {/* <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-gradient-primary rounded-lg">
          <div className="text-4xl font-bold text-white mb-2">94%</div>
          <div className="text-white/90">Auto-Approval Rate</div>
        </div>
        <div className="text-center p-6 bg-gradient-success rounded-lg">
          <div className="text-4xl font-bold text-white mb-2">98.5%</div>
          <div className="text-white/90">Fraud Detection Accuracy</div>
        </div>
        <div className="text-center p-6 bg-gradient-warning rounded-lg">
          <div className="text-4xl font-bold text-white mb-2">1.2s</div>
          <div className="text-white/90">Avg. AI Processing Time</div>
        </div>
      </div> */}
    </div>
  );
}
