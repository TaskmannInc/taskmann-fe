import dynamic from "next/dynamic";
const Layout = dynamic(() => import("./LayoutWrapper"), {
  ssr: false,
});

export default function CustomerDynamicWrapper({ children }) {
  return <Layout>{children}</Layout>;
}
