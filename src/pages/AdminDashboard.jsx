import React from "react";
import {
  ShieldAlert,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
} from "lucide-react";
import StatCard from "../components/StatCard";
import HighAmountClaimsCard from "../components/HighAmountClaimsCard";
import TotalClaimsAmountByStatus from "../components/TotalClaimsAmountByStatus";
import ClaimsOverTime from "../components/ClaimsOverTime";
import { useDispatch, useSelector } from "react-redux";
import {
  setClaims,
  setLoading,
  setError,
} from "../features/claims/claimDataSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { claims, loading, error } = useSelector((state) => state.allClaims);

  const stats = React.useMemo(() => {
    if (!claims || claims.length === 0) return [];

    const totalClaims = claims.length;
    const processed = claims.filter(
      (c) => c.claimsStatus === "APPROVED"
    ).length;
    const pending = claims.filter((c) => c.claimsStatus === "PENDING").length;
    const rejected = claims.filter((c) => c.claimsStatus === "REJECTED").length;
    const frauds = claims.filter((c) => c.claimsStatus === "FRAUD").length;

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
      {
        id: crypto.randomUUID(),
        title: "Fraudulent Claims",
        value: frauds,
        icon: ShieldAlert,
      },
    ];
  }, [claims]);

  React.useEffect(() => {
    const fetchClaims = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch("/mockClaimsData.json");
        if (!response.ok) throw new Error("Failed to fetch claims data");
        const data = await response.json();
        dispatch(setClaims(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchClaims();
  }, []);

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

      <div className="container mt-4">
        <div className="row">
          {/* Left column - Claims by Status */}
          <div className="col-lg-6 mb-4">
            <TotalClaimsAmountByStatus />
          </div>

          {/* Right column - High Risk Claims */}
          <div className="col-lg-6 mb-4">
            <HighAmountClaimsCard />
          </div>
        </div>
      </div>
      <div className="col-lg-12 mb-4">
        <ClaimsOverTime claims={claims} />
      </div>
    </div>
  );
}
