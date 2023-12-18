import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import SubServiceDetails from "../../components/client/services/subservice";

export default function SubservicePage() {
  return (
    <DynamicClientLayout>
      <SubServiceDetails />
    </DynamicClientLayout>
  );
}
