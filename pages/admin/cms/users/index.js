import dynamic from "next/dynamic";
import UsersManagement from "../../../../components/admin/cms/usermanagement/Users";
const AdminLayout = dynamic(
  () => import("../../../../components/admin/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function Users() {
  return (
    <AdminLayout>
      <UsersManagement />
    </AdminLayout>
  );
}
