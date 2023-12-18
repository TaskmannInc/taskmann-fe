import { useState } from "react";
import StaffProfileImage from "./bio/profileImage";
import StaffProfileInformation from "./bio/profileInformation";

export default function StaffBioSettings({ styles, session }) {
  const [tabAction, setTabAction] = useState("basic");
  return (
    <div className={styles.staffBioSettings}>
      <div className={styles.componentHeader}>
        <h4>
          {tabAction == "basic" && <span>Basic information</span>}
          {tabAction == "image" && <span>Profile avatar</span>}
        </h4>
        <div className={styles.actionTab}>
          <button
            onClick={() => setTabAction("basic")}
            className={`${styles.tabButton} ${
              tabAction == "basic" && styles.tabButtonActive
            }`}
          >
            Basic information
          </button>
          <button
            onClick={() => setTabAction("image")}
            className={`${styles.tabButton} ${
              tabAction == "image" && styles.tabButtonActive
            }`}
          >
            Profile image
          </button>
        </div>
      </div>
      <div className={styles.bioContainer}>
        {tabAction == "basic" && (
          <StaffProfileInformation styles={styles} session={session} />
        )}
        {tabAction == "image" && (
          <StaffProfileImage styles={styles} session={session} />
        )}
      </div>
    </div>
  );
}
