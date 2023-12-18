import dynamic from "next/dynamic";
import AboutManagementWrapper from "../../../../../components/admin/cms/contentmanagment/about/aboutWrapper";
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
      <AboutManagementWrapper styles={styles} />
    </AdminLayout>
  );
}
