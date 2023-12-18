import { useState } from "react";
import { MdCancel, MdFormatListBulletedAdd } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import Image from "next/image";
import { ImStarFull } from "react-icons/im";

export default function SelectedReviewDetail({
  onAddReview,
  styles,
  closeForm,
}) {
  var _selected_review, _storageItem;

  if (typeof window !== "undefined") {
    _storageItem = window.localStorage.getItem("_view_review");
    _storageItem !== "undefined"
      ? (_selected_review = JSON.parse(_storageItem))
      : null;
  } else {
    console.log(null);
  }

  return (
    <div className={styles.reviewDetail}>
      <div className={styles.reviewHeader}>
        <span className={styles.closeWrapper}>
          <button
            className={styles.closeBtn}
            onClick={() => closeForm(_selected_review)}
          >
            <MdCancel size={20} />
          </button>
        </span>
        {/* <FaStar size={50} style={{ color: `var(--gold)` }} /> */}
      </div>
      <Image
        className={styles.reviewerAvatar}
        width={70}
        height={70}
        src="/assets/trademarks/taskmann-logo.png"
        alt="user-image"
      />
      <h3 className={styles.reviewer}>{_selected_review.name}</h3>
      <div className={styles.reviewRating}>
        {[...Array(_selected_review.rating)].map((e, i) => (
          <ImStarFull key={i} size={20} />
        ))}
      </div>
      <p className={styles.reviewContent}>{_selected_review.message}</p>
    </div>
  );
}
