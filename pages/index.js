import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import Landing from "../components/client/landing/Landing";

export default function Home() {
  return (
    <DynamicClientLayout>
      <Landing />
    </DynamicClientLayout>
  );
}
