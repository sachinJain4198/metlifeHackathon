import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import SubmitClaim from './pages/SubmitClaim.jsx'
import MyClaims from './pages/MyClaims.jsx'
import ClaimDetails from './pages/ClaimDetails.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import HomePage from './pages/HomePage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit" element={<SubmitClaim />} />
        <Route path="/claims" element={<MyClaims />} />
        <Route path="/claims/:claimId" element={<ClaimDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
