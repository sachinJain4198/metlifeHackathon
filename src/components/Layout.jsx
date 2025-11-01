import { Outlet, Link, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import DescriptionIcon from '@mui/icons-material/Description'
import ListAltIcon from '@mui/icons-material/ListAlt'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'

const actions = [
  { to: '/submit', label: 'Submit Claim', icon: <DescriptionIcon fontSize="small" />, variant: 'contained' },
  { to: '/claims', label: 'My Claims', icon: <ListAltIcon fontSize="small" />, variant: 'outlined' },
  { to: '/admin', label: 'Admin Dashboard', icon: <DashboardIcon fontSize="small" />, variant: 'outlined' },
]

export default function Layout() {
  const { pathname } = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar className="d-flex justify-content-between align-items-center">
          <Box className="d-flex align-items-center gap-3">
            <Avatar variant="rounded" sx={{ bgcolor: '#13c1cf' }}>
              <AssignmentTurnedInIcon sx={{ color: 'white' }} />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ lineHeight: 1 }}>SmartClaims</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>Intelligent Claims Processing</Typography>
            </Box>
          </Box>
          <Box className="d-none d-md-flex align-items-center gap-2">
            {actions.map(a => (
              <Button key={a.to} component={Link} to={a.to} startIcon={a.icon} className="rounded-pill" variant={pathname===a.to? 'contained': a.variant} color={pathname===a.to? 'primary': 'inherit'}>
                {a.label}
              </Button>
            ))}
          </Box>
          <Box className="d-md-none">
            <IconButton onClick={(e)=>setAnchorEl(e.currentTarget)} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={()=>setAnchorEl(null)}>
              {actions.map(a => (
                <MenuItem key={a.to} component={Link} to={a.to} onClick={()=>setAnchorEl(null)} selected={pathname===a.to}>
                  <Box className="d-flex align-items-center gap-2">
                    {a.icon}
                    <span>{a.label}</span>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ flex: 1, py: 3 }}>
        <Outlet />
      </Container>
      <Box component="footer" className="d-flex justify-content-center align-items-center" sx={{ py: 2, bgcolor: 'background.paper' }}>
        <Typography variant="body2">© {new Date().getFullYear()} SmartClaims</Typography>
      </Box>
    </Box>
  )
}
