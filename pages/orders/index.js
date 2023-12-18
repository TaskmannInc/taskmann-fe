import dynamic from "next/dynamic";
import SessionOrders from "../../components/client/orders/ClientOrders";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);

export default function CustomerOrders() {
  return (
    <DynamicClientLayout>
      <SessionOrders />
    </DynamicClientLayout>
  );
}
