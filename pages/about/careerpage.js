import dynamic from "next/dynamic";
import AdminCareerPage from "../../components/client/about/careerpages";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function AdminCareerPages() {
  return (
    <DynamicClientLayout>
      <AdminCareerPage />
    </DynamicClientLayout>
  );
}
