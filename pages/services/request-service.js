import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import ServiceRequest from "../../components/client/services/serviceRequest";

export default function ServiceRequestPage() {
  return (
    <DynamicClientLayout>
      <ServiceRequest />
    </DynamicClientLayout>
  );
}
