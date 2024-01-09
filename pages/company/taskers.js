import dynamic from "next/dynamic";
import TaskersUsagePolicies from "../../components/client/company/Taskers";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function TaskersPage() {
  return (
    <DynamicClientLayout>
      <TaskersUsagePolicies />
    </DynamicClientLayout>
  );
}
