import dynamic from "next/dynamic";
import { useState } from "react";
import StaffAccountNavigation from "../../../components/admin/account-related/AccountNavigation";
import StaffAccountRelatedInfo from "../../../components/admin/account-related/AccountRelatedWrapper";
import styles from "../../../styles/admin/Account.module.css";

const AdminLayout = dynamic(
  () => import("../../../components/admin/Globals/LayoutWrapper"),
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
    <AdminLayout>
      <div className={styles.staffAccountRelatedSettings}>
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
    </AdminLayout>
  );
}
