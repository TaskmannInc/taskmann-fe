import Image from "next/image";
import { ImStarFull } from "react-icons/im";
export const initialReviews = [
  {
    id: 1,
    name: "John Doe",
    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed elit eu metus eleifend commodo ut vel massa.
      `,
    rating: 4,
  },
  {
    id: 2,
    name: "Jane Smith",
    message: `
      Vestibulum vulputate erat a nisi eleifend, vel commodo nisl interdum. Nam blandit, augue vel tristique vestibulum, libero nulla malesuada ex, vel malesuada metus nunc et risus.
      Vestibulum vulputate erat a nisi eleifend, vel commodo nisl interdum. Nam blandit, augue vel tristique vestibulum, libero nulla malesuada ex, vel malesuada metus nunc et risus.
      Vestibulum vulputate erat a nisi eleifend, vel commodo nisl interdum. Nam blandit, augue vel tristique vestibulum, libero nulla malesuada ex, vel malesuada metus nunc et risus.
      Vestibulum vulputate erat a nisi eleifend, vel commodo nisl interdum. Nam blandit, augue vel tristique vestibulum, libero nulla malesuada ex, vel malesuada metus nunc et risus.
      Vestibulum vulputate erat a nisi eleifend, vel commodo nisl interdum. Nam blandit, augue vel tristique vestibulum, libero nulla malesuada ex, vel malesuada metus nunc et risus.
            `,
    rating: 5,
  },
  {
    id: 3,
    name: "Mark Johnson",
    message: `
      Suspendisse euismod ante leo, non euismod velit tristique non. Etiam in mauris eu nunc commodo ullamcorper.
      Suspendisse euismod ante leo, non euismod velit tristique non. Etiam in mauris eu nunc commodo ullamcorper.
      Suspendisse euismod ante leo, non euismod velit tristique non. Etiam in mauris eu nunc commodo ullamcorper.
      Suspendisse euismod ante leo, non euismod velit tristique non. Etiam in mauris eu nunc commodo ullamcorper.
      `,
    rating: 3,
  },
];

export default function SelectedReviewDetail({
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
        {[...Array(review.rating)].map((e, i) => (
          <ImStarFull key={i} size={20} />
        ))}
      </div>
      <p className={styles.reviewContent}>
        {review.message?.length > 600
          ? `${review.message?.slice(0, 599)}...`
          : review?.message}
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
