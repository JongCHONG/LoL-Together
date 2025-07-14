import React from "react";

import DashboardStyles from "./dashboard.module.scss";

const page = () => {
  return (
    <>
      <div className={DashboardStyles.banner}>
        <h1 className={DashboardStyles.title}>Bienvenue</h1>
      </div>
    </>
  );
};

export default page;
