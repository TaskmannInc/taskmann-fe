import dynamic from "next/dynamic";
import AdminCareer from "../../components/client/about/career";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function AdminCareers() {
  return (
    <DynamicClientLayout>
      <AdminCareer />
    </DynamicClientLayout>
  );
}
