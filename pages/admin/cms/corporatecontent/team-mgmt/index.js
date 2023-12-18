import dynamic from "next/dynamic";
import TeamManagementWrapper from "../../../../../components/admin/cms/contentmanagment/team/membersWrapper";
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
      <TeamManagementWrapper styles={styles} />
    </AdminLayout>
  );
}
