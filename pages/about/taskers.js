import dynamic from "next/dynamic";
import AdminTaskers from "../../components/client/about/Tasker";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function AdminTasker() {
  return (
    <DynamicClientLayout>
      <AdminTaskers />
    </DynamicClientLayout>
  );
}
