import dynamic from "next/dynamic";
import Updatepage from "../../components/client/services/Updates";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function Updates() {
  return (
    <DynamicClientLayout>
      <Updatepage />
    </DynamicClientLayout>
  );
}
