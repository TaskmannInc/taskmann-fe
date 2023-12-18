import dynamic from "next/dynamic";
import Payout from "../../../components/tasker/payouts/taskerPayouts";
const TaskerLayout = dynamic(
  () => import("../../../components/tasker/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  return (
    <TaskerLayout>
      <Payout />
    </TaskerLayout>
  );
}
