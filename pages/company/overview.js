import Overviewpage from "../../components/client/company/Overview";
import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function Overview() {
  return (
    <DynamicClientLayout>
      <Overviewpage />
    </DynamicClientLayout>
  );
}
