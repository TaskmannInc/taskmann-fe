import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import Allservices from "../../components/client/services/services";

export default function Servicepage() {
  return (
    <DynamicClientLayout>
      <Allservices />
    </DynamicClientLayout>
  );
}
