import dynamic from "next/dynamic";
const DynamicClientLayout = dynamic(
  () => import("../../components/client/Globals/LayoutWrapper"),
  {
    ssr: false,
  }
);
import BlogDetails from "../../components/client/blog/blogdetails";

export default function CustomerBlogArticle() {
  return (
    <DynamicClientLayout>
      <BlogDetails />
    </DynamicClientLayout>
  );
}
