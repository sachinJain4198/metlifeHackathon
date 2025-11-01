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
    console.log("HItted")
    const fetchClaims = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch("/mockClaimsData.json");
        console.log("Respense", response)
        if (!response.ok) throw new Error("Failed to fetch claims data");
        const data = await response.json();
        console.log("Data",data)
        dispatch(setClaims(data));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    console.log("abkjdfkaj")
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
            <HighAmountClaimsCard claims={claims} />
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
