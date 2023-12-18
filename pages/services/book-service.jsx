import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import OrderPackage from "../../components/client/services/orderService";

export default function SubservicePage() {
  return (
    <DynamicClientLayout>
      <OrderPackage />
    </DynamicClientLayout>
  );
}
