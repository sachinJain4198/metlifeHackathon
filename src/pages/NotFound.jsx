import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Box className="text-center">
      <Typography variant="h4" gutterBottom>Not Found</Typography>
      <Button component={Link} to="/" variant="contained">Go Home</Button>
    </Box>
  )
}
