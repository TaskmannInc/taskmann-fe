import { StoreProvider } from "../../../store/staffContextStore";
import styles from "../../../styles/admin/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";
import SideNavigation from "./SideNavigation";

export default function LayoutWrapper({ children }) {
  return (
    <StoreProvider>
      <div className={styles.adminWrapper}>
        <Header styles={styles} />
        <div className={styles.adminLayout}>
          <SideNavigation styles={styles} />
          {children}
        </div>
        <Footer styles={styles} />
      </div>
    </StoreProvider>
  );
}
