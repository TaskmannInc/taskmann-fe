import dynamic from "next/dynamic";
import AboutCompany from "../../components/client/company/AboutCompany";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function AboutusPage() {
  return (
    <DynamicClientLayout>
      <AboutCompany />
    </DynamicClientLayout>
  );
}
