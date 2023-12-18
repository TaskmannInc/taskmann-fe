import dynamic from "next/dynamic";
import PoliciesManagementWrapper from "../../../../../components/admin/cms/contentmanagment/policies/policiesWrapper";
import styles from "../../../../../styles/admin/Contentmgmt.module.css";

const AdminLayout = dynamic(
  () => import("../../../../../components/admin/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function PolicyManagement() {
  return (
    <AdminLayout>
      <PoliciesManagementWrapper styles={styles} />
    </AdminLayout>
  );
}
