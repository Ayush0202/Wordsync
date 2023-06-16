import React from "react"

// bootstrap
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {Link, useLocation} from "react-router-dom"
import './Header.css'

// mui
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import {useAuthContext} from "../../hooks/useAuthContext"

const Header = () => {

    // material ui
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const {user} = useAuthContext()

    const {dispatch} = useAuthContext()

    const location = useLocation()

    // logout function
    const handleClick = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
    }

    return (
        <>
            <Navbar className='navbar-color' variant='dark'>
                <Container className='navbar-container'>

                    <Navbar.Brand className='navbar-heading-name' as={Link} to="/">Wordsync</Navbar.Brand>


                    {/* navbar of home page when user is not logged in */}
                    {location.pathname === '/' && !user && (
                        <Nav className="d-flex navbar-button">
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </Nav>
                    )}

                    
                    {/* navbar of home page when user is logged in */}
                    {location.pathname === '/' && user && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                style={{ color: 'white' }}
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>{user ? user.checkUser.firstName : 'User Name'}</MenuItem>
                                <MenuItem as={Link} to="/docs/new" style={{ color: 'black' }} onClick={handleClose}>New Document</MenuItem>
                                <MenuItem as={Link} to="/docs/dashboard" style={{ color: 'black' }} onClick={handleClose}>Your Documents</MenuItem>
                                <MenuItem as={Link} to="/delete" style={{ color: 'black' }} onClick={handleClose}>Delete Account</MenuItem>
                                <MenuItem as={Link} style={{ color: 'black' }} onClick={handleClick}>Logout</MenuItem>

                            </Menu>
                        </div>
                    )}


                    {/* navbar of dashboard page */}
                    {location.pathname === '/docs/dashboard' && user && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                                style={{ color: 'white' }}
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>{user ? user.checkUser.firstName : 'User Name'}</MenuItem>
                                <MenuItem as={Link} to="/docs/new" style={{ color: 'black' }} onClick={handleClose}>New Document</MenuItem>
                                <MenuItem as={Link} to="/delete" style={{ color: 'black' }} onClick={handleClose}>Delete Account</MenuItem>
                                <MenuItem as={Link} style={{ color: 'black' }} onClick={handleClick}>Logout</MenuItem>

                            </Menu>
                        </div>
                    )}

                </Container>
            </Navbar>

        </>
    )
}

export default Header