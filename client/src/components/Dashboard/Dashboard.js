import React from "react";

import DashboardTable from "./DashboardTable";
import Header from "../Header/Header";
import './Dashboard.css'
const Dashboard = () => {
    return (
        <>
            <Header />
            <div className='dashboard-container'>
                <DashboardTable />
            </div>
        </>
    )
}

export default Dashboard