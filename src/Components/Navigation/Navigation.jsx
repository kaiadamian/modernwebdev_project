/* Navigation - Stateful Parent Component for NavBar */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkUser, getUser, logoutUser } from '../Auth/AuthService'
import NavigationView from './NavigationView.jsx'

const Navigation = () => {
    // track where to open the dropdown menus
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)

    const navigate = useNavigate()

    // menu handlers
    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)
    const handleCloseNavMenu = () => setAnchorElNav(null)
    const handleCloseUserMenu = () => setAnchorElUser(null)

    // navigation handler
    const handlePageNav = (page) => {
        handleCloseNavMenu()
        navigate(`/${page.toLowerCase()}`)
    }

    // handles user dropdown action (logout/login)
    const handleUserAction = (action) => {
        if (action === 'Logout') {
        logoutUser()
            .then(() => {
            console.log('User logged out successfully')
            navigate('/auth/login')
            })
            .catch((error) => {
            console.error('Error logging out:', error)
            alert('Error logging out. Please try again.')
            })
        } else if (action === 'Login') {
        const isAuthenticated = checkUser()
        if (!isAuthenticated) {
            navigate('/auth/login')
        } else {
            alert('You are already signed in!')
        }
        }
        handleCloseUserMenu()
    }

    return (
        // pass data down to NavigationView
        <NavigationView
        pages={['Home', 'Explore', 'Contact', 'Manage', 'About']}
        settings={['Login', 'Logout']}
        anchorElNav={anchorElNav}
        anchorElUser={anchorElUser}
        handleOpenNavMenu={handleOpenNavMenu}
        handleOpenUserMenu={handleOpenUserMenu}
        handleCloseNavMenu={handleCloseNavMenu}
        handleCloseUserMenu={handleCloseUserMenu}
        handlePageNav={handlePageNav}
        handleUserAction={handleUserAction}
        userInitial={getUser() ? getUser().get('firstName')?.charAt(0).toUpperCase() : '?'}
        />
    )
}

export default Navigation

