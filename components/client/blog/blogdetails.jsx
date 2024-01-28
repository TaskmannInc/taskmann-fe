import Link from "next/link";
import { useState } from "react";
import styles from "../../../styles/Blog.module.css";
import {
  GetBlogPostsHook,
  GetSelectedBlogPostHook,
} from "../../utils/hooks/blogMgmtHook";
import { useRouter } from "next/router";
import { NoClientData } from "../../ui-fragments/dataInteractions";
import DOMPurify from "dompurify";

export default function BlogDetails() {
  //initialize router instance

  const router = useRouter();
  var articleID = router?.query?.i;

  const [articleInformation, setArticleInformation] = useState({});
  const [relatedArticles, setRelatedArticles] = useState([]);

  //---articles api handler---//
  const onSuccess = (response) => {
    setArticleInformation(response?.data?.result);
  };

  const onError = (response) => {
    console.log("error", response);
  };

  //get blog post <--> request
  const {
    isLoading,
    isSuccess,
    data: serviceData,
  } = GetSelectedBlogPostHook(onSuccess, onError, articleID);

  //--- related articles api handler---//
  const onRelatedSuccess = (response) => {
    const allBlogPostsToFilter = response?.data?.result;
    const relatedArticles = allBlogPostsToFilter
      ?.filter((item) => {
        return (
          item?.category == articleInformation?.category ||
          item?.category?.includes(articleInformation?.category)
        );
      })
      ?.splice(0, 3);
    setRelatedArticles(relatedArticles);
  };

  const onRelatedError = (response) => {
    console.log("error", response);
  };

  //get blog post <--> request
  const { isLoading: relatedisLoading, isSuccess: relatedisSuccess } =
    GetBlogPostsHook(onRelatedSuccess, onRelatedError);

  const sanitizedData = (param) => ({
    __html: DOMPurify.sanitize(param),
  });
  return (
    <>
      {isLoading ? (
        <div
          style={{ width: "100%", height: "maxContent", filter: "blur(20px)" }}
        >
          <section
            className={styles.postBanner}
            style={{
              backgroundImage: `url(/others/contractcleaner1_1.jpg)`,
            }}
          >
            <h2 className={styles.postHeading}>Title</h2>
            <p className={styles.tagLine}>
              <span>0 minutes read</span>
            </p>
          </section>
          <section className={styles.postDetails}>
            <div className={styles.postInfo}>
              <caption className={styles.postHeading}>
                Post by: <i>author</i>
              </caption>
              &nbsp;|&nbsp;
              <time>Date posted</time>
            </div>
            <div className={styles.postRead}>{articleInformation?.content}</div>
          </section>
          <div className={styles.featuredWrapper}>
            <h4>Related posts</h4>
            <div className={styles.featuredSection}>
              {[...Array(3)].map((_, index) => {
                return (
                  <div
                    key={index + 1}
                    className={styles.fetauredPost}
                    style={{
                      backgroundImage: `url(/others/contractcleaner1_1.jpg)`,
                    }}
                  >
                    <h4>Blog title</h4>
                    <p className={styles.previewDescription}>
                      Brief description
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : isSuccess ? (
        <>
          <section
            className={styles.postBanner}
            style={{
              backgroundImage:
                `url(${articleInformation?.blog_image?.image_url})` ??
                `url(/others/contractcleaner1_1.jpg)`,
            }}
          >
            <h2 className={styles.postHeading}>{articleInformation?.title}</h2>
            <p className={styles.tagLine}>
              {articleInformation?.content?.length < 1000 && (
                <span>A two {"(2)"} minutes read</span>
              )}
              {articleInformation?.content?.length == 1000 &&
                articleInformation?.content?.length < 5000 && (
                  <span>A five {"(5)"} minutes read</span>
                )}
              {articleInformation?.content?.length > 5000 && (
                <span>A {"five (5) +"} minutes read</span>
              )}
            </p>
          </section>
          <section className={styles.postDetails}>
            <div className={styles.postInfo}>
              <caption className={styles.postHeading}>
                Post by: <i> {articleInformation?.author}</i>
              </caption>
              &nbsp;|&nbsp;
              <span>
                {articleInformation?.created_at?.split("T")[0] ?? "Unavailable"}
              </span>
            </div>
            <div
              className={styles.postRead}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(articleInformation?.content),
              }}
            ></div>
          </section>
          {isLoading || relatedisLoading ? (
            <div
              className={`${styles.featuredWrapper} ${
                relatedisLoading && "loadingStateBlur"
              }`}
            >
              <h4>Related posts</h4>
              <div className={styles.featuredSection}>
                {[...Array(3)].map((_, index) => {
                  return (
                    <div
                      key={index + 1}
                      className={styles.featuredPost}
                      style={{
                        backgroundImage: `url(/assets/trademarks/taskmann-logo.png)`,
                      }}
                    >
                      <h4>Blog title</h4>
                      <p className={styles.previewDescription}>
                        Brief description
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : relatedisSuccess && relatedArticles?.length > 0 ? (
            <div className={styles.featuredWrapper}>
              <h4>Related posts</h4>
              <div className={styles.featuredSection}>
                {relatedArticles?.map((item, index) => {
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
                      <h4>{item?.title}</h4>
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
        </>
      ) : (
        <NoClientData />
      )}
    </>
  );
}
