import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import logo from '../../assets/nd_logo.png'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from "../Auth/AuthService"

const pages = ['Home', 'Explore', 'Contact']
const settings = ['Logout']

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    const navigate = useNavigate()

    const handleLogout = () => {
        logoutUser()  // Call the logoutUser function directly
        .then(() => {
            console.log("User logged out successfully");
            navigate("/auth/login"); // Redirect to login page after logout
        })
        .catch((error) => {
            console.error("Error logging out:", error);
            // Optionally show an error to the user
            alert("Error logging out. Please try again.");
        });

        handleCloseUserMenu();  // Close the settings menu after logout
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#ffffff' }} elevation={0}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                {/* Desktop Logo Image */}
                <Box
                    component="img"
                    sx={{
                        height: 35,
                        display: { xs: 'none', md: 'flex' },
                        mr: 2,
                    }}
                    alt="Notre Dame Logo"
                    src={logo}
                />
                {/* Desktop Logo Title */}
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    letterSpacing: '.3rem',
                    color: 'info.main',
                    fontWeight: 700,
                    textDecoration: 'none',
                    }}
                >
                    UNIVERSITY OF NOTRE DAME
                </Typography>
                
                {/* Mobile Navigation Menu */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    {/* Hamburger Icon */}
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    sx={{ color: 'info.dark' }}
                    >
                    <MenuIcon />
                    </IconButton>
                    {/* Menu Dropdown */}
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: 'block', md: 'none' } }}
                    >
                    {pages.map((page) => (
                        <MenuItem 
                            key={page} 
                            onClick={() => {
                                handleCloseNavMenu();    // close the dropdown
                                navigate(`/${page.toLowerCase()}`);   // navigate to the right route
                            }}>
                        <Typography 
                            sx={{ 
                                textAlign: 'center',
                                color: 'info.dark'
                            }}
                        >{page}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>

                {/* Mobile Logo Image */}
                <Box
                    sx={{
                        display: { xs: 'flex', md: 'none' }, 
                        justifyContent: 'center',  
                        alignItems: 'center',  
                        width: '100%',  
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            height: 35,  // Logo height
                            mr: 1,  // Right margin (optional)
                        }}
                        alt="Notre Dame Logo"
                        src={logo}
                    />
                </Box>

                {/* Desktop Menu */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', mr: 1 }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        onClick={() => {
                            handleCloseNavMenu()
                            navigate(`/${page.toLowerCase()}`) // navigate to /home, /explore, /contact
                        }}
                        sx={{ my: 2, color: 'info.dark', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>

                {/* User Avatar */}
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleLogout}>
                        <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                        </MenuItem>
                ))}
                </Menu>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
  )
}
export default NavBar
