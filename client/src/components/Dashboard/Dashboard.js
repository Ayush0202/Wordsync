import React from "react";

import DashboardTable from "./DashboardTable";
import Header from "../Header/Header";
import Footer from '../Footer/Footer'
import './Dashboard.css'
const Dashboard = () => {
    return (
        <>
            <Header />
            <div className='dashboard-container'>
                <h1 className='dashboard-heading'>Your Documents</h1>
                <DashboardTable />
            </div>
            <Footer />

        </>
    )
}

export default Dashboard