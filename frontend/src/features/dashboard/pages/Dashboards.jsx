import React from "react";
import DashboardAsideBar from "./DashboardAsideBar";
import DashboardServices from "./DashboardServices";

const Dashboards = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row gap-4 lg:gap-6 p-3 sm:p-5 lg:p-6">

      {/* Sidebar */}
      <DashboardAsideBar />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <DashboardServices />
      </main>

    </div>
  );
};

export default Dashboards;