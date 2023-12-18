import dynamic from "next/dynamic";
import CareersManagementWarapper from "../../../../../components/admin/cms/contentmanagment/careers/OpeningWrapper";
import styles from "../../../../../styles/admin/Contentmgmt.module.css";

const AdminLayout = dynamic(
  () => import("../../../../../components/admin/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function CareersManagement() {
  return (
    <AdminLayout>
      <CareersManagementWarapper styles={styles} />
    </AdminLayout>
  );
}
