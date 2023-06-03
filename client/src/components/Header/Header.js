import React from "react"
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import {Link, useLocation} from "react-router-dom"
import './Header.css'
const Header = () => {

    const location = useLocation()

    return (
        <>
            <Navbar className='navbar-color' variant='dark'>
                <Container className='navbar-container'>

                    <Navbar.Brand className='navbar-heading-name' as={Link} to="/">Wordsync</Navbar.Brand>

                    {/* navbar of home page when user is not logged in */}
                    {location.pathname === '/' && (
                        <Nav className="d-flex navbar-button">
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        </Nav>
                    )}

                    {/* navbar of home page when user is logged in */}
                    {/*{location.pathname === '/' && (*/}
                    {/*    <Nav className="d-flex">*/}
                    {/*            <NavDropdown title='user name' id="basic-nav-dropdown">*/}
                    {/*            <NavDropdown.Item as={Link} to="/docs/dashboard">New Document</NavDropdown.Item>*/}
                    {/*            <NavDropdown.Item as={Link} to="/docs/dashboard">Your Documents</NavDropdown.Item>*/}
                    {/*            <NavDropdown.Item as={Link} to="/docs/dashboard">Delete Account</NavDropdown.Item>*/}
                    {/*            <NavDropdown.Item as={Link} to="/docs/dashboard" >Log Out</NavDropdown.Item>*/}
                    {/*        </NavDropdown>*/}
                    {/*    </Nav>*/}
                    {/*)}*/}

                    {/* navbar of dashboard page */}
                    {location.pathname === '/docs/dashboard' && (
                        <Nav className="d-flex">
                            <NavDropdown title='user name' id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/docs/dashboard">New Document</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/docs/dashboard">Delete Account</NavDropdown.Item>
                                <NavDropdown.Item as={Link} >Log Out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}

                </Container>
            </Navbar>

        </>
    )
}

export default Header