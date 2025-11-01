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
import { Menu as MenuIcon, FileText, ClipboardList, LayoutGrid, Shield } from 'lucide-react'

const actions = [
  { to: '/', label: 'Submit Claim', icon: <FileText size={14} />, variant: 'contained' },
  { to: '/claims', label: 'My Claims', icon: <ClipboardList size={14} />, variant: 'outlined' },
  { to: '/admin', label: 'Admin Dashboard', icon: <LayoutGrid size={14} />, variant: 'outlined' },
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
            <Avatar variant="rounded" sx={{ bgcolor: '#13c1cf', width: 40, height: 40 }}>
              <Shield size={20} color="#fff" />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ lineHeight: 1, fontWeight: 700 }}>SmartClaims</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' }, mt: 0.5 }}>Intelligent Claims Processing</Typography>
            </Box>
          </Box>
          <Box className="d-none d-md-flex align-items-center gap-2">
            {actions.map(a => (
              <Button key={a.to} component={Link} to={a.to} startIcon={a.icon} className={`rounded-pill px-3 ${pathname===a.to?"selected-button-color":"button-color"}`} size="medium" variant={pathname===a.to? 'contained': a.variant} color={pathname===a.to? 'primary': 'inherit'}>
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
