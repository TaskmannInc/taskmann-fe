import { ContextStore } from "../../../store/contextStore";
import ClientBioSettings from "./account/BioSettings";
import ClientPasswordSettings from "./account/PasswordSettings";
import ClientOrderHistory from "./order-history/OrderHistory";

export default function UserAccountRelatedInfo({ styles, activeComponent }) {
  //get logged in user session
  const { session } = ContextStore();
  return (
    <>
      {activeComponent == "bio" && (
        <ClientBioSettings styles={styles} session={session} />
      )}
      {activeComponent == "password" && (
        <ClientPasswordSettings styles={styles} />
      )}
      {activeComponent == "orders" && <ClientOrderHistory styles={styles} />}
    </>
  );
}
