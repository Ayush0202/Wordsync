import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
const Footer = () => {
    return (
        <footer>
            <div className="navbar-bottom navbar-expand-lg">
                <div className="footer-text">
                    <p>Created by <Link to="https://www.linkedin.com/in/ayushkumargupta02/">Ayush Kumar Gupta</Link>.</p>

                    <p>Copyright © 2023. All rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer