import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import AllServicePricings from "../../components/client/services/allPricings";

export default function ServicepricingPage() {
  return (
    <DynamicClientLayout>
      <AllServicePricings />
    </DynamicClientLayout>
  );
}
