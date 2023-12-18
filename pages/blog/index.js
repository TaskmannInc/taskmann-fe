import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import BlogSite from "../../components/client/blog/blog";

export default function CustomerBlog() {
  return (
    <DynamicClientLayout>
      <BlogSite />
    </DynamicClientLayout>
  );
}
