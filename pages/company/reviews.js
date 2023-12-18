import OurReviews from "../../components/client/company/OurReviews";
import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
export default function OurReviewsPage() {
  return (
    <DynamicClientLayout>
      <OurReviews />
    </DynamicClientLayout>
  );
}
