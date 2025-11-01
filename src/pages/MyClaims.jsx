import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { Eye, Clock, AlertTriangle, CheckCircle, XCircle, Clock3 } from 'lucide-react'
import { getAllClaimsAsync } from '../features/claims/claimsSlice.js'

export default function MyClaims() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { claims, loading, error } = useSelector((state) => state.claims)

  useEffect(() => {
    // Only fetch claims if we don't have any or if claims array is empty
    if (claims.length === 0) {
      dispatch(getAllClaimsAsync())
    }
  }, [dispatch, claims.length])

  const handleViewDetails = (policyId) => {
    navigate(`/claims/${policyId}`)
  }

  const getStatusChip = (status) => {
    const statusConfig = {
      approved: { 
        label: 'Approved', 
        color: 'success', 
        icon: <CheckCircle size={14} />,
        className: 'bg-green-100 text-green-800'
      },
      pending: { 
        label: 'Pending', 
        color: 'warning', 
        icon: <Clock size={14} />,
        className: 'bg-orange-100 text-orange-800'
      },
      flagged: { 
        label: 'Flagged', 
        color: 'error', 
        icon: <AlertTriangle size={14} />,
        className: 'bg-red-100 text-red-800'
      },
      rejected: { 
        label: 'Rejected', 
        color: 'default', 
        icon: <XCircle size={14} />,
        className: 'bg-gray-100 text-gray-800'
      }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return (
      <Chip 
        label={config.label}
        color={config.color}
        variant="filled"
        size="small"
        icon={config.icon}
        className={`${config.className} font-medium`}
        sx={{ fontWeight: 600, fontSize: '0.75rem' }}
      />
    )
  }


  if (loading) {
    return (
      <Box className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="p-4">
        <Alert severity="error">Error loading claims: {error}</Alert>
      </Box>
    )
  }

  return (
    <Box className="p-4">
      <Box className="mb-4">
        <Typography variant="h4" className="font-bold text-gray-900 mb-2">
          My Claims
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Track and manage your submitted claims
        </Typography>
      </Box>

      <Box className="d-flex flex-column gap-4">
        {claims.map((claim) => (
          <Card 
            key={claim.policyId} 
            className="shadow-sm border-0 rounded-3"
            sx={{ 
              transition: 'box-shadow 0.2s',
              '&:hover': { boxShadow: 3 }
            }}
          >
            <CardContent className="p-4">
              <Box className="d-flex justify-content-between align-items-start mb-3">
                <Box className="d-flex align-items-center gap-3">
                  <Typography variant="h6" className="font-bold text-gray-900 mb-0">
                    {claim.policyId}
                  </Typography>
                  {getStatusChip(claim.claimStatus)}
                </Box>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Eye size={14} />}
                  className="rounded-pill px-3 text-gray-600 border-gray-300"
                  sx={{ textTransform: 'none', fontSize: '0.875rem' }}
                  onClick={() => handleViewDetails(claim.policyId)}
                >
                  View Details
                </Button>
              </Box>

              <Box className="row g-0 mb-3">
                <Box className="col-md-3 col-6">
                  <Typography variant="body2" className="text-gray-500 mb-1">
                    Policy Holder
                  </Typography>
                  <Typography variant="body1" className="font-medium text-gray-900">
                    {claim.policyHolderName}
                  </Typography>
                </Box>
                <Box className="col-md-2 col-6">
                  <Typography variant="body2" className="text-gray-500 mb-1">
                    Type
                  </Typography>
                  <Typography variant="body1" className="font-medium text-gray-900 capitalize">
                    {claim.claimType}
                  </Typography>
                </Box>
                <Box className="col-md-2 col-6">
                  <Typography variant="body2" className="text-gray-500 mb-1">
                    Amount
                  </Typography>
                  <Typography variant="body1" className="font-bold text-gray-900">
                    ${claim.amount.toFixed(2)}
                  </Typography>
                </Box>
                <Box className="col-md-2 col-6">
                  <Typography variant="body2" className="text-gray-500 mb-1">
                    Submitted
                  </Typography>
                  <Typography variant="body1" className="font-medium text-gray-900">
                    {new Date(claim.dateOfSubmission).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
