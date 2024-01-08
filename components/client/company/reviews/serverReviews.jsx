import Image from "next/image";
import { ImStarFull } from "react-icons/im";

export default function ServerReviewPreview({
  viewReviewDetails,
  review,
  styles,
}) {
  return (
    <div className={styles.review}>
      <Image
        className={styles.reviewerAvatar}
        width={70}
        height={70}
        src="/assets/trademarks/taskmann-logo.png"
        alt="user-image"
      />
      <h3 className={styles.reviewer}>{review.name}</h3>
      <div className={styles.reviewRating}>
        {[...Array(5)].map((_, i) => (
          <ImStarFull key={i} size={20} />
        ))}
      </div>
      <p className={styles.reviewContent}>
        {review.statement?.length > 600
          ? `${review.statement?.slice(0, 599)}...`
          : review?.statement}
      </p>
      {review.message?.length > 600 && (
        <button
          onClick={() => viewReviewDetails(review)}
          className={styles.moreBtn}
        >
          More
        </button>
      )}
    </div>
  );
}
