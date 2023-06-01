import React from "react";
import DashboardTable from "./DashboardTable";
import Header from "../Header/Header";
const Dashboard = () => {
    return (
        <>
            <Header />
            <div className='dashboard-container'>
                <h1 className='dashboard-heading'>Your Documents</h1>
                <DashboardTable />
            </div>

        </>
    )
}

export default Dashboard