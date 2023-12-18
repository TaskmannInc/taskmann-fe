import dynamic from "next/dynamic";
import ContactMessagesManagementWrapper from "../../../../../components/admin/cms/contentmanagment/contact/contactWrapper";
import styles from "../../../../../styles/admin/Contentmgmt.module.css";

const AdminLayout = dynamic(
  () => import("../../../../../components/admin/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function ContactMessagesManagement() {
  return (
    <AdminLayout>
      <ContactMessagesManagementWrapper styles={styles} />
    </AdminLayout>
  );
}
