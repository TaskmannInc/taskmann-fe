import dynamic from "next/dynamic";
import { useState } from "react";
import StaffAccountNavigation from "../../../components/tasker/account-related/AccountNavigation";
import StaffAccountRelatedInfo from "../../../components/tasker/account-related/AccountRelatedWrapper";
import styles from "../../../styles/taskers/Account.module.css";

const TaskerLayout = dynamic(
  () => import("../../../components/tasker/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);

export default function AccountDashboard() {
  //component states
  const [activeComponent, setActiveComponent] = useState("bio");
  const changeComponent = (value) => {
    setActiveComponent(value);
  };

  return (
    <TaskerLayout>
      <div className={styles.taskerAccountRelatedSettings}>
        <div className={styles.navigationWrapper}>
          <StaffAccountNavigation
            styles={styles}
            changeComponent={changeComponent}
            activeComponent={activeComponent}
          />
        </div>
        <div className={styles.accountRelatedComponent}>
          <StaffAccountRelatedInfo
            styles={styles}
            activeComponent={activeComponent}
          />
        </div>
      </div>
    </TaskerLayout>
  );
}
