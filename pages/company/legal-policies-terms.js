import ServiceUsagePolicies from "../../components/client/company/Policies";
import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function PoliciesPage() {
  return (
    <DynamicClientLayout>
      <ServiceUsagePolicies />
    </DynamicClientLayout>
  );
}
