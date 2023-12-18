import React, { useState } from "react";
import styles from "../../../styles/client/Reviews.module.css";
import Review, { initialReviews } from "./reviews/allReviews";
import ReviewForm from "./reviews/reviewForm";
import SelectedReviewDetail from "./reviews/reviewDetail";

/*Modal Imports*/
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

export default function ReviewPage() {
  //component states
  const [reviews, setReviews] = useState(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReviewDetails, setShowReviewDetails] = useState(false);

  //---->Modal event triggers<------//
  const viewReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  const viewReviewDetails = (review) => {
    setShowReviewDetails(!showReviewDetails);
    localStorage.setItem("_view_review", JSON.stringify(review));
  };

  return (
    <>
      <section className={styles.reviewsBanner}>
        <h2 className={styles.reviewsHeading}>What our clients say...</h2>
        {/* <p className={styles.tagLine}>
          Find in here testimonials from our clientelle
        </p> */}
      </section>

      <div className={styles.reviewsSection}>
        <span className={styles.sectionHeader}>
          <h1>All reviews</h1>
          <button
            type="button"
            className={styles.addReview}
            onClick={() => viewReviewForm()}
          >
            Review us here...😊
          </button>
        </span>
        <div className={styles.reviewsContainer}>
          {reviews.map((review) => (
            <Review
              styles={styles}
              key={review.id}
              review={review}
              viewReviewDetails={viewReviewDetails}
            />
          ))}
        </div>
      </div>
      {showReviewForm && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewReviewForm}
          onClose={viewReviewForm}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewReviewForm}>
            <Box sx={ModalStyle}>
              <ReviewForm styles={styles} closeForm={viewReviewForm} />
            </Box>
          </Fade>
        </Modal>
      )}
      {showReviewDetails && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={viewReviewDetails}
          onClose={viewReviewDetails}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={viewReviewDetails}>
            <Box sx={ModalStyle}>
              <SelectedReviewDetail
                styles={styles}
                closeForm={viewReviewDetails}
              />
            </Box>
          </Fade>
        </Modal>
      )}
    </>
  );
}

const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: `var(--white)`,
  border: "none",
  boxShadow: 24,
  borderRadius: `var(--radius-sm)`,
  p: 2,
};
