import dynamic from "next/dynamic";
import InAppMessaging from "../../../components/tasker/messaging/appMessaging";
const TaskerLayout = dynamic(
  () => import("../../../components/tasker/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  return (
    <TaskerLayout>
      <InAppMessaging />
    </TaskerLayout>
  );
}
