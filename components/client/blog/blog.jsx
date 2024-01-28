import DOMPurify from "dompurify";
import Link from "next/link";
import styles from "../../../styles/Blog.module.css";
import { GetBlogPostsHook } from "../../utils/hooks/blogMgmtHook";
import { useState } from "react";
import { NoClientData } from "../../ui-fragments/dataInteractions";
export default function BlogSite() {
  const [featuredBlogPosts, setFeaturedBlogPosts] = useState([]);
  const [allBlogPosts, setAllBlogPosts] = useState([]);
  //---blogs api handler---//
  const onSuccess = (response) => {
    var blogResponse = response?.data?.result;

    const featuredList = blogResponse?.filter((item, _) => {
      return (
        item?.category == "featured" || item?.category?.includes("featured")
      );
    });
    setFeaturedBlogPosts(featuredList?.splice(0, 3));
    setAllBlogPosts(response?.data?.result);
  };

  const onError = (response) => {
    console.log("error", response);
  };

  //get blog post <--> request
  const { isLoading, isSuccess } = GetBlogPostsHook(onSuccess, onError);

  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });

  return (
    <>
      <div className={styles.titleSection}>
        <h4>The Taskmann Blog</h4>
        <p>
          Learn about <i>{"everything Taskmann"}</i>, from news, service
          information, new features, additions and more...
        </p>
      </div>
      {isLoading ? (
        <div className={styles.featuredWrapperLoading}>
          <h4>Featured</h4>
          <div className={styles.featuredSection}>
            {[...Array(3)].map((_, index) => {
              return (
                <div
                  key={index + 1}
                  className={styles.featuredPost}
                  style={{
                    backgroundImage: `url(/others/contractcleaner1_1.jpg)`,
                  }}
                >
                  <h4>Blog title</h4>
                  <p className={styles.previewDescription}>
                    Blog brief goes here
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : isSuccess && featuredBlogPosts?.length > 0 ? (
        <div className={styles.featuredWrapper}>
          <h4>Featured</h4>
          <div className={styles.featuredSection}>
            {featuredBlogPosts.map((item, index) => {
              // const sanitizedData = DOMPurify.sanitize(item?.content);
              return (
                <div
                  key={index + 1}
                  className={styles.featuredPost}
                  style={{
                    backgroundImage:
                      `url(${item?.blog_image?.image_url})` ??
                      `url(/assets/trademarks/taskmann-logo.png)`,
                  }}
                >
                  <h4 style={{ textTransform: "capitalize" }}>
                    {item?.title?.length > 100
                      ? item?.title?.slice(0, 100) + "..."
                      : item?.title}
                  </h4>
                  <p className={styles.previewDescription}></p>

                  <Link
                    href={`/blog/article?i=${item?._id}`}
                    className={styles.readMoreLink}
                  >
                    Read more...
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className={styles.mainBlog}>
        <h4>All posts</h4>
        {isLoading ? (
          <div className={styles.postsLoading}>
            {[...Array(4)].map((_, index) => {
              return (
                <div
                  key={index + 1}
                  className={styles.postCard}
                  style={{
                    backgroundImage: `url(/assets/trademarks/taskmann-logo.png)`,
                  }}
                >
                  <h4>Blog title</h4>
                  <p className={styles.previewDescription}>
                    Keeping Your Car Looking Its Best Your car is an important
                    investment, and taking care of it means more
                  </p>
                </div>
              );
            })}
          </div>
        ) : isSuccess && allBlogPosts?.length > 0 ? (
          <div className={styles.posts}>
            {allBlogPosts?.map((item, index) => {
              return (
                <div
                  key={index + 1}
                  className={styles.postCard}
                  style={{
                    backgroundImage:
                      `url(${item?.blog_image?.image_url})` ??
                      `url(/assets/trademarks/taskmann-logo.png)`,
                  }}
                >
                  <h4>
                    {item?.title?.length > 50
                      ? item?.title?.slice(0, 60) + "..."
                      : item?.title}
                  </h4>
                  <p
                    className={styles.previewDescription}
                    dangerouslySetInnerHTML={sanitizedData(
                      item?.content?.length > 150
                        ? `${item?.content?.slice(0, 150)}...`
                        : item?.content
                    )}
                  ></p>
                  <Link
                    href={`/blog/article?i=${item?._id}`}
                    className={styles.readMoreLink}
                  >
                    Read more...
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <NoClientData />
        )}
      </div>
    </>
  );
}
