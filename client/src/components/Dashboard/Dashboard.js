import React from "react";
import DashboardTable from "./DashboardTable";
const Dashboard = () => {
    return (
        <>
            <div className='dashboard-container'>
                <h1 className='dashboard-heading'>Your Documents</h1>
                <DashboardTable />
            </div>

        </>
    )
}

export default Dashboard