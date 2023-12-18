import dynamic from "next/dynamic";

const AdminLayout = dynamic(
  () => import("../../../../components/admin/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import AllSystemOrders from "../../../../components/admin/cms/ordermanagement/Orders";

export default function Orders() {
  return (
    <AdminLayout>
      <AllSystemOrders />
    </AdminLayout>
  );
}
