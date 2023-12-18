import dynamic from "next/dynamic";
import HowTo from "../../components/client/company/FAQs";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function ContactPage() {
  return (
    <DynamicClientLayout>
      <HowTo />
    </DynamicClientLayout>
  );
}
