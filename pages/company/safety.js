import dynamic from "next/dynamic";
import SafetyPage from "../../components/client/company/Safety";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function Safety() {
  return (
    <DynamicClientLayout>
      <SafetyPage />
    </DynamicClientLayout>
  );
}
