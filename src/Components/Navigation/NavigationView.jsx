/* Navigation View - Stateless Child Component for NavBar */
import * as React from 'react'
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu,
  Container, Avatar, Button, Tooltip, MenuItem
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import logo from '../../assets/nd_logo.png'

const NavigationView = ({
    pages,
    settings,
    anchorElNav,
    anchorElUser,
    handleOpenNavMenu,
    handleOpenUserMenu,
    handleCloseNavMenu,
    handleCloseUserMenu,
    handlePageNav,
    handleUserAction,
    userInitial
    }) => (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff' }} elevation={0}>
        <Container maxWidth="xl">
        <Toolbar disableGutters>
            {/* Desktop Logo */}
            <Box component="img" sx={{ height: 35, display: { xs: 'none', md: 'flex' }, mr: 2 }} src={logo} alt="Notre Dame Logo" />
            <Typography variant="h6" noWrap sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, letterSpacing: '.3rem', color: 'secondary.main', fontWeight: 700, textDecoration: 'none' }}>
            UNIVERSITY OF NOTRE DAME
            </Typography>

            {/* Mobile Hamburger Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleOpenNavMenu} sx={{ color: 'secondary.main' }}>
                <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                sx={{ display: { xs: 'block', md: 'none' } }}>
                {pages.map((page) => (
                <MenuItem key={page} onClick={() => handlePageNav(page)}>
                    <Typography sx={{ textAlign: 'center', color: 'info.dark' }}>{page}</Typography>
                </MenuItem>
                ))}
            </Menu>
            </Box>

            {/* Mobile Logo */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Box component="img" sx={{ height: 35, mr: 1 }} src={logo} alt="Notre Dame Logo" />
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', mr: 1 }}>
            {pages.map((page) => (
                <Button key={page} onClick={() => handlePageNav(page)} sx={{ my: 2, color: 'secondary.main' }}>
                {page}
                </Button>
            ))}
            </Box>

            {/* Avatar & User Menu */}
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'secondary.main' }}>{userInitial}</Avatar>
                </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ mt: '45px' }}>
                {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleUserAction(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
                ))}
            </Menu>
            </Box>
        </Toolbar>
        </Container>
    </AppBar>
)

export default NavigationView
