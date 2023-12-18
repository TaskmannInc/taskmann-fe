import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import ServicePricing from "../../components/client/services/servicePricing";

export default function ServicepricingPage() {
  return (
    <DynamicClientLayout>
      <ServicePricing />
    </DynamicClientLayout>
  );
}
