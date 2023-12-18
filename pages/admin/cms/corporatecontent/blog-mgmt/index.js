import dynamic from "next/dynamic";
import BlogDataManagement from "../../../../../components/admin/cms/contentmanagment/blog/BlogWrapper";
import styles from "../../../../../styles/admin/Contentmgmt.module.css";
const AdminLayout = dynamic(
  () => import("../../../../../components/admin/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function BlogManagement() {
  return (
    <AdminLayout>
      <BlogDataManagement styles={styles} />
    </AdminLayout>
  );
}
