import dynamic from "next/dynamic";

const AdminLayout = dynamic(
  () => import("../../../../components/admin/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import ContentManagement from "../../../../components/admin/cms/contentmanagment/Content";

export default function CorporateContent() {
  return (
    <AdminLayout>
      <ContentManagement />
    </AdminLayout>
  );
}
