import { StoreProvider } from "../../../store/staffContextStore";
import styles from "../../../styles/taskers/Layout.module.css";
import Footer from "./Footer";
import Header from "./Header";
import SideNavigation from "./SideNavigation";

export default function LayoutWrapper({ children }) {
  return (
    <StoreProvider>
      <div className={styles.taskerWrapper}>
        <Header styles={styles} />
        <div className={styles.taskerLayout}>
          <SideNavigation styles={styles} />
          {children}
        </div>
        <Footer styles={styles} />
      </div>
    </StoreProvider>
  );
}
