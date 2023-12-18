import { useState } from "react";
import ClientProfileInformation from "./bio/profileInformation";
import ClientProfileImage from "./bio/profileImage";

export default function ClientBioSettings({ styles, session }) {
  const [tabAction, setTabAction] = useState("basic");
  return (
    <div className={styles.clientBioSettings}>
      <div className={styles.componentHeader}>
        <h4>
          Hey,{" "}
          <small>
            {" "}
            <i style={{ color: "var(--green-darker)" }}>customer name. </i>
            looking to update your info?
          </small>
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
          <ClientProfileInformation styles={styles} session={session} />
        )}
        {tabAction == "image" && (
          <ClientProfileImage styles={styles} session={session} />
        )}
      </div>
    </div>
  );
}
