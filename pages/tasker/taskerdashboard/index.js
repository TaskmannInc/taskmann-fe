import dynamic from "next/dynamic";
import TaskerDashboard from "../../../components/tasker/dashboard/dashboard";
const TaskerLayout = dynamic(
  () => import("../../../components/tasker/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  return (
    <TaskerLayout>
      <TaskerDashboard />
    </TaskerLayout>
  );
}
