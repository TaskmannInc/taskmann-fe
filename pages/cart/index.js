import dynamic from "next/dynamic";
import SessionCart from "../../components/client/cart/ClientCart";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);

export default function CustomerCart() {
  return (
    <DynamicClientLayout>
      <SessionCart />
    </DynamicClientLayout>
  );
}
