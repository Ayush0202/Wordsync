import React from 'react'
import {Link} from 'react-router-dom'
import './HomePage.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
const HomePage = () => {

    let imageName = require('../../images/wordsync2.JPG')

    return (
        <>
            <Header />

            <div className="main-div" >

                <div className="main-heading--div" >
                    <h1 className="main-heading"><span style={{ color: '#623C3D' }} >Word</span><span style={{ color: '#6B645C' }} >sync</span></h1>
                </div>

                <div className="main-content--div" >
                    <div className="main-content-image--div" >
                        <img src={imageName} height="300" width="450" alt="wordsync"  ></img>
                    </div>

                    <div className="headerDivider" ></div>

                    <div className="main-content-content--div">

                        <h1 className="heading-secondary-home" >Web app for managing documents!</h1>
                        <h5>

                            With a simple rich text editor made with quilljs! <br/>
                            Manage documents easily without any hassle. <br />
                            Live collaboration is now a feature!

                        </h5>

                        <Link to='/login'><button className="login-button--sm">Log In</button></Link>

                    </div>

                </div>

            </div>

            <Footer />

        </>
    )
}

export default HomePage