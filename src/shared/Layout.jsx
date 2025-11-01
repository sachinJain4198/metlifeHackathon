import { Outlet, Link, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="sticky" color="primary">
        <Toolbar className="d-flex justify-content-between align-items-center">
          <Typography variant="h6">MetLife</Typography>
          <Box className="d-flex gap-2">
            <Button component={Link} to="/" color={pathname==='/'?'secondary':'inherit'} variant={pathname==='/'?'contained':'text'}>Home</Button>
            <Button component={Link} to="/about" color={pathname==='/about'?'secondary':'inherit'} variant={pathname==='/about'?'contained':'text'}>About</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>
      <Box component="footer" className="d-flex justify-content-center align-items-center" sx={{ py: 2, bgcolor: 'background.paper' }}>
        <Typography variant="body2">© {new Date().getFullYear()} MetLife Hackathon</Typography>
      </Box>
    </Box>
  )
}
