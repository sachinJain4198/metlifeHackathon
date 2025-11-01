import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function ClaimDetailCard({ icon, label, value, color = '#1976d2' }) {
  return (
    <Box className="d-flex align-items-center gap-3 py-3">
      <Box 
        className="d-flex align-items-center justify-content-center rounded-circle"
        sx={{ 
          width: 40, 
          height: 40, 
          backgroundColor: color,
          color: 'white'
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" className="text-gray-600 mb-1">
          {label}
        </Typography>
        <Typography variant="body1" className="font-bold text-gray-900">
          {value}
        </Typography>
      </Box>
    </Box>
  )
}