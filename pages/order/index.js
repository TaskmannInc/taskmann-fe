import dynamic from "next/dynamic";
import OrderPaymentStatus from "../../components/client/order-status/OrderStatuses";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);

export default function CustomerOrders() {
  return (
    <DynamicClientLayout>
      <OrderPaymentStatus />
    </DynamicClientLayout>
  );
}
