import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { ArrowLeft, User, Clock, FileText, Building, DollarSign, Hash } from 'lucide-react'
import ClaimDetailCard from '../components/common/ClaimDetailCard.jsx'
import { getClaimDetailsAsync } from '../features/claims/claimsSlice.js'

export default function ClaimDetails() {
  const { claimId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { claimDetails, detailsLoading, detailsError } = useSelector(state => state.claims)
  const claim = claimDetails[claimId]

  useEffect(() => {
    // Fetch claim details when component mounts
    dispatch(getClaimDetailsAsync(claimId))
  }, [dispatch, claimId])

  if (detailsLoading) {
    return (
      <Box className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (detailsError) {
    return (
      <Box className="p-4">
        <Alert severity="error">Error loading claim details: {detailsError}</Alert>
        <Button 
          onClick={() => navigate('/claims')}
          startIcon={<ArrowLeft size={16} />}
          className="mt-3"
        >
          Back to Claims
        </Button>
      </Box>
    )
  }

  if (!claim) {
    return (
      <Box className="p-4">
        <Typography variant="h5">Claim not found</Typography>
        <Button 
          onClick={() => navigate('/claims')}
          startIcon={<ArrowLeft size={16} />}
          className="mt-3"
        >
          Back to Claims
        </Button>
      </Box>
    )
  }

  const getStatusChip = (status) => {
    const statusConfig = {
      approved: { 
        label: 'APPROVED', 
        backgroundColor: '#4caf50',
        color: 'white'
      },
      pending: { 
        label: 'PENDING', 
        backgroundColor: '#ff9800',
        color: 'white'
      },
      flagged: { 
        label: 'FLAGGED', 
        backgroundColor: '#f44336',
        color: 'white'
      },
      rejected: { 
        label: 'REJECTED', 
        backgroundColor: '#9e9e9e',
        color: 'white'
      }
    }
    
    const config = statusConfig[status] || statusConfig.pending
    return (
      <Chip 
        label={config.label}
        sx={{ 
          backgroundColor: config.backgroundColor,
          color: config.color,
          fontWeight: 700,
          fontSize: '0.75rem',
          padding: '0 8px',
          height: '32px'
        }}
      />
    )
  }

  return (
    <Box className="p-4 max-w-4xl mx-auto">
      {/* Header Card */}
      <Card 
        className="mb-4 shadow-lg"
        sx={{
          background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
          color: 'white'
        }}
      >
        <CardContent className="p-4">
          <Box className="d-flex justify-content-between align-items-start mb-3">
            <Box>
              <Typography variant="h4" className="font-bold mb-2">
                Claim {claim.policyId}
              </Typography>
              <Typography variant="body1" className="opacity-90">
                Submitted on {new Date(claim.dateOfSubmission).toLocaleDateString()}
              </Typography>
            </Box>
            {getStatusChip(claim.claimStatus)}
          </Box>
        </CardContent>
      </Card>

      {/* Details Card */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <Box className="row g-0">
            <Box className="col-md-6">
              <ClaimDetailCard
                icon={<User size={20} />}
                label="Policy Holder"
                value={claim.policyHolderName}
                color="#1976d2"
              />
              
              <ClaimDetailCard
                icon={<FileText size={20} />}
                label="Claim Type"
                value={claim.claimType}
                color="#1976d2"
              />
              
              <ClaimDetailCard
                icon={<DollarSign size={20} />}
                label="Claim Amount"
                value={`$${claim.amount.toFixed(2)}`}
                color="#1976d2"
              />
            </Box>
            
            <Box className="col-md-6">
              <ClaimDetailCard
                icon={<Clock size={20} />}
                label="Date Submitted"
                value={new Date(claim.dateOfSubmission).toLocaleDateString()}
                color="#1976d2"
              />
              
              <ClaimDetailCard
                icon={<Building size={20} />}
                label="Status"
                value={claim.claimStatus}
                color="#1976d2"
              />
              
              <ClaimDetailCard
                icon={<Hash size={20} />}
                label="Policy ID"
                value={claim.policyId}
                color="#1976d2"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Back Button */}
      <Box className="mt-4">
        <Button 
          variant="outlined"
          onClick={() => navigate('/claims')}
          startIcon={<ArrowLeft size={16} />}
          className="rounded-pill px-4"
          sx={{ textTransform: 'none' }}
        >
          Back to My Claims
        </Button>
      </Box>
    </Box>
  )
}