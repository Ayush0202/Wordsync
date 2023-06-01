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
            <Navbar className='navbar-main' expand="lg">
                <Container>
                    <Navbar.Brand className='navbar-heading' as={Link} to="/">Wordsync</Navbar.Brand>
                        <Nav className="me-auto">

                            {/* navbar of home page when user is not signed in */}
                            {location.pathname === '/' && (
                                <Nav>
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                </Nav>
                            )}

                            {/* navbar of home page when user is signed in */}
                            {location.pathname === '/' && (
                                <Nav>
                                    <NavDropdown title="User Name" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/">New Document</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/docs/dashboard"> Your Documents </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/"> Logout </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            )}

                            {/* navbar at other routes */}
                            {location.pathname === '/docs/dashboard' && (
                                <Nav>
                                    <NavDropdown title="User Name" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/">New Document</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/">Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            )}


                        </Nav>
                </Container>
            </Navbar>

        </>
    )
}

export default Header