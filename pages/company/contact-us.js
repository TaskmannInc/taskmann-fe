import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import Contact from "../../components/client/company/ContactUs";

export default function ContactPage() {
  return (
    <DynamicClientLayout>
      <Contact />
    </DynamicClientLayout>
  );
}
