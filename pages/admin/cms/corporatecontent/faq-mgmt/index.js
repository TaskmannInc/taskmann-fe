import dynamic from "next/dynamic";
import FAQsManagementWrapper from "../../../../../components/admin/cms/contentmanagment/faq/faqWrapper";
import styles from "../../../../../styles/admin/Contentmgmt.module.css";

const AdminLayout = dynamic(
  () => import("../../../../../components/admin/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function FAQManagement() {
  return (
    <AdminLayout>
      <FAQsManagementWrapper styles={styles} />
    </AdminLayout>
  );
}
