import dynamic from "next/dynamic";
import ReviewsManagementWarapper from "../../../../../components/admin/cms/contentmanagment/reviews/reviewWrapper";
import styles from "../../../../../styles/admin/Contentmgmt.module.css";

const AdminLayout = dynamic(
  () => import("../../../../../components/admin/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function ReviewManagement() {
  return (
    <AdminLayout>
      <ReviewsManagementWarapper styles={styles} />
    </AdminLayout>
  );
}
