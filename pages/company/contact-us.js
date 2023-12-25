import dynamic from "next/dynamic";
import ContactCustomerCare from "../../components/client/company/ContactUs";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);

export default function ContactPage() {
  return (
    <DynamicClientLayout>
      <ContactCustomerCare />
    </DynamicClientLayout>
  );
}
