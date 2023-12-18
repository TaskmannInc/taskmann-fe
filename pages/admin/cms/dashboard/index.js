import dynamic from "next/dynamic";
const AdminLayout = dynamic(
  () => import("../../../../components/admin/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import AdminDashboard from "../../../../components/admin/cms/dashboard/dashboard";

export default function Dashboard() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
}
