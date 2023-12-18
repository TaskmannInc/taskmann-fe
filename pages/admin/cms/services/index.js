import dynamic from "next/dynamic";

const AdminLayout = dynamic(
  () => import("../../../../components/admin/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import ServiceManagement from "../../../../components/admin/cms/servicesmanangement/Services";

export default function Services() {
  return (
    <AdminLayout>
      <ServiceManagement />
    </AdminLayout>
  );
}
