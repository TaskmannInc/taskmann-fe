import dynamic from "next/dynamic";
import AllServiceTasks from "../../../components/tasker/tasks/serviceTasks";
const TaskerLayout = dynamic(
  () => import("../../../components/tasker/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  return (
    <TaskerLayout>
      <AllServiceTasks />
    </TaskerLayout>
  );
}
