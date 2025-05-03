/* Navigation - Stateful Parent Component for NavBar */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkUser, getUser, logoutUser } from '../Auth/AuthService'
import NavigationView from './NavigationView.jsx'

const Navigation = () => {
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const navigate = useNavigate()

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)
    const handleCloseNavMenu = () => setAnchorElNav(null)
    const handleCloseUserMenu = () => setAnchorElUser(null)

    const handlePageNav = (page) => {
        handleCloseNavMenu()
        navigate(`/${page.toLowerCase()}`)
    }

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

