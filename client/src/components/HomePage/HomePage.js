import React from 'react'
import {Link} from 'react-router-dom'
import './HomePage.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import imageName from "../../images/wordsync2.JPG";
const HomePage = () => {

    let imageName = require('../../images/wordsync2.JPG')

    return (
        <>
            <Header />

            <div className=" wrapper container-fluid">

                <div className="home home-page-text">
                    <h1 className="main-page-heading">Web app for managing <br/>Documents!</h1>
                    <h4 className="main-page-text">With a simple rich text editor <br/> made with quilljs</h4>
                    <h5 className="main-page-text">Live collaboration is now a feature</h5>
                </div>

                <div className="home home-page-image">
                    <img src={imageName} alt="Gif File" />
                </div>

            </div>

            <Footer />

        </>
    )
}

export default HomePage