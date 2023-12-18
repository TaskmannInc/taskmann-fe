import { StaffContextStore } from "../../../store/staffContextStore";
import StaffBioSettings from "./account/BioSettings";
import StaffPasswordSettings from "./account/PasswordSettings";
import StaffHelpLine from "./account/help-and-support/Help";
export default function StaffAccountRelatedInfo({ styles, activeComponent }) {
  //get logged in user session
  const { session } = StaffContextStore();
  return (
    <>
      {activeComponent == "bio" && (
        <StaffBioSettings styles={styles} session={session} />
      )}
      {activeComponent == "password" && (
        <StaffPasswordSettings styles={styles} />
      )}
      {activeComponent == "help" && <StaffHelpLine styles={styles} />}
    </>
  );
}
