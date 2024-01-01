import dynamic from "next/dynamic";
import TaskmannWebCustomServices from "../../components/client/services/taskmannWeb";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);

export default function Servicepage() {
  return (
    <DynamicClientLayout>
      <TaskmannWebCustomServices />
    </DynamicClientLayout>
  );
}
