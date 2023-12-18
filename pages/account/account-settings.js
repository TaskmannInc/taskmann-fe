import dynamic from "next/dynamic";
import { useState } from "react";
import ClientAccountNavigation from "../../components/client/account-related/AccountNavigation";
import UserAccountRelatedInfo from "../../components/client/account-related/AccountRelatedWrapper";
import styles from "../../styles/client/Account.module.css";

const CustomerLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
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
    <CustomerLayout>
      <div className={styles.clientAccountRelatedSettings}>
        <div className={styles.navigationWrapper}>
          <ClientAccountNavigation
            styles={styles}
            changeComponent={changeComponent}
            activeComponent={activeComponent}
          />
        </div>
        <div className={styles.accountRelatedComponent}>
          <UserAccountRelatedInfo
            styles={styles}
            activeComponent={activeComponent}
          />
        </div>
      </div>
    </CustomerLayout>
  );
}
